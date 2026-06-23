import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { WikiPage } from './db';

// Configure marked to render links with target="_blank" and rel="noopener noreferrer" for security (tabnabbing protection)
const renderer = new marked.Renderer();
const originalLink = renderer.link.bind(renderer);
renderer.link = (href, title, text) => {
  const html = originalLink(href, title, text);
  return html.replace('<a ', '<a target="_blank" rel="noopener noreferrer" class="text-teal-400 hover:underline" ');
};

renderer.heading = (text, level) => {
  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `<h${level} id="${id}">${text}</h${level}>`;
};

renderer.table = (header, body) => {
  return `<div class="overflow-x-auto my-4 max-w-full"><table class="w-full">${header}${body}</table></div>`;
};

marked.setOptions({
  renderer: renderer,
  gfm: true,
  breaks: true,
});

export function getSanitizationCount(): number {
  try {
    return parseInt(localStorage.getItem('secops-sanitize-count') || '0', 10);
  } catch {
    return 0;
  }
}

function incrementSanitizationCount() {
  try {
    const current = getSanitizationCount();
    localStorage.setItem('secops-sanitize-count', (current + 1).toString());
  } catch {
    // Ignore sandbox limits
  }
}

/**
 * Parses Markdown and runs DOMPurify to prevent XSS.
 */
export function renderMarkdownSecure(content: string): string {
  incrementSanitizationCount();
  const rawHtml = marked.parse(content) as string;
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'a', 'span',
      'ul', 'ol', 'li', 'strong', 'em', 'code', 'pre', 'blockquote',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'id', 'align'],
  });
}

/**
/**
 * Sanitizes Unicode payloads by stripping control characters and hidden homoglyphs/zero-width codes.
 */
export function sanitizeUnicode(str: string): string {
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\u200B-\u200D\uFEFF\u202A-\u202E]/g, '');
}

/**
 * Escapes characters that can break HTML context.
 */
export function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (m) => {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
      default: return m;
    }
  });
}

/**
 * Validate imported wiki page data matches schema.
 */
export function validateImportedPage(data: any): WikiPage {
  incrementSanitizationCount();
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid backup structure: Root must be an object.');
  }

  const { slug, title, content, updatedAt, tags } = data;

  if (typeof slug !== 'string' || !/^[a-z0-9-_]+$/.test(slug)) {
    throw new Error('Invalid slug format: Slugs must contain only lowercase alphanumeric characters, hyphens, and underscores.');
  }

  const cleanSlug = sanitizeUnicode(slug);

  if (typeof title !== 'string' || title.trim().length === 0 || title.length > 100) {
    throw new Error('Invalid title format: Must be a non-empty string under 100 characters.');
  }

  const cleanTitle = sanitizeUnicode(title);

  if (typeof content !== 'string' || content.length > 50000) {
    throw new Error('Invalid content format: Must be a string under 50,000 characters.');
  }

  if (typeof updatedAt !== 'number' || isNaN(updatedAt)) {
    throw new Error('Invalid updated timestamp format.');
  }

  if (!Array.isArray(tags)) {
    throw new Error('Tags must be an array of strings.');
  }

  const cleanTags = tags.map((t: any) => {
    if (typeof t !== 'string') throw new Error('Tags must be strings.');
    return sanitizeUnicode(DOMPurify.sanitize(t)).slice(0, 30);
  });

  return {
    slug: cleanSlug,
    title: DOMPurify.sanitize(cleanTitle),
    content, // Sanity check done during renderMarkdownSecure
    updatedAt,
    tags: cleanTags,
    isSystem: !!data.isSystem
  };
}

/**
 * Derives a CryptoKey from a user passphrase using PBKDF2.
 */
export async function deriveKey(passphrase: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const salt = enc.encode('secops-intel-salt-2026');
  const baseKey = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypts cleartext using AES-GCM 256-bit key.
 */
export async function encryptText(text: string, key: CryptoKey): Promise<string> {
  const enc = new TextEncoder();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    enc.encode(text)
  );
  
  const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');
  const ciphertextBytes = new Uint8Array(ciphertext);
  let ciphertextBinary = '';
  for (let i = 0; i < ciphertextBytes.byteLength; i++) {
    ciphertextBinary += String.fromCharCode(ciphertextBytes[i]);
  }
  const ciphertextBase64 = btoa(ciphertextBinary);
  return `${ivHex}:${ciphertextBase64}`;
}

/**
 * Decrypts ciphertext using AES-GCM 256-bit key.
 */
export async function decryptText(encryptedStr: string, key: CryptoKey): Promise<string> {
  const parts = encryptedStr.split(':');
  if (parts.length !== 2) throw new Error('Invalid cipher format');
  const [ivHex, ciphertextBase64] = parts;
  
  const iv = new Uint8Array(ivHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  const binaryStr = atob(ciphertextBase64);
  const ciphertext = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    ciphertext[i] = binaryStr.charCodeAt(i);
  }
  
  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    ciphertext
  );
  
  return new TextDecoder().decode(decrypted);
}
