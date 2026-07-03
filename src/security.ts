import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { WikiPage } from './db';

// Configure marked to render links with target="_blank" and rel="noopener noreferrer" for security (tabnabbing protection)
const renderer = new marked.Renderer();
const originalLink = renderer.link.bind(renderer);
// Overriding code renderer for secure offline syntax highlighting
renderer.code = (code, lang) => {
  const language = lang || '';
  if (language === 'mermaid') {
    const lines = code.split('\n');
    let diagramHtml = '<div class="flex flex-col items-center gap-4 bg-slate-950 p-6 rounded-lg border border-slate-800/80 my-4 select-none">';
    const nodes = new Map<string, string>();
    const edges: { from: string; to: string; label?: string }[] = [];
    
    lines.forEach(line => {
      const cleanLine = line.trim();
      if (!cleanLine) return;
      const nodeDefMatch = cleanLine.match(/^([A-Za-z0-9_-]+)\[(.*?)\]$/);
      if (nodeDefMatch) {
        nodes.set(nodeDefMatch[1], nodeDefMatch[2]);
        return;
      }
      const edgeMatch = cleanLine.match(/^([A-Za-z0-9_-]+)\s*-->\s*(?:\|(.*?)\|)?\s*([A-Za-z0-9_-]+)$/);
      if (edgeMatch) {
        const from = edgeMatch[1];
        const label = edgeMatch[2] || '';
        const to = edgeMatch[3];
        edges.push({ from, to, label });
        if (!nodes.has(from)) nodes.set(from, from);
        if (!nodes.has(to)) nodes.set(to, to);
      }
    });

    if (nodes.size > 0) {
      diagramHtml += '<div class="space-y-4 w-full flex flex-col items-center">';
      const childNodes = new Set(edges.map(e => e.to));
      const roots = Array.from(nodes.keys()).filter(id => !childNodes.has(id));
      const children = Array.from(nodes.keys()).filter(id => childNodes.has(id));
      
      const renderNodeBlock = (id: string) => {
        const label = nodes.get(id) || id;
        return `<div class="px-4 py-2 bg-teal-950/40 text-teal-400 border border-teal-800 rounded font-mono text-xs shadow-[0_0_10px_rgba(20,184,166,0.15)]">${escapeHtml(label)}</div>`;
      };

      if (roots.length > 0) {
        diagramHtml += '<div class="flex flex-wrap gap-4 justify-center">';
        diagramHtml += roots.map(renderNodeBlock).join('');
        diagramHtml += '</div>';
      }
      if (edges.length > 0) {
        diagramHtml += '<div class="text-slate-650 text-xs">↓</div>';
      }
      if (children.length > 0) {
        diagramHtml += '<div class="flex flex-wrap gap-4 justify-center">';
        diagramHtml += children.map(renderNodeBlock).join('');
        diagramHtml += '</div>';
      }
      diagramHtml += '</div></div>';
      return diagramHtml;
    }
  }
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  
  if (language) {
    const keywords = /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|import|export|class|extends|new|try|catch|finally|throw|def|print|elif|in|is|not|and|or|lambda|as|with|pass|public|private|protected|static|void|int|string|boolean|select|from|where|insert|update|delete|create|table|drop|values|into|join|on|group|by|order|true|false|null|None)\b/g;
    const strings = /(["'`])(.*?)\1/g;
    const comments = /(\/\/.*|#.*)/g;

    html = html.replace(comments, '<span class="text-slate-500">$1</span>');
    html = html.replace(strings, '<span class="text-amber-400">$0</span>');
    html = html.replace(keywords, '<span class="text-teal-400 font-bold">$1</span>');
  }

  return `<pre class="bg-slate-950 p-4 rounded-lg overflow-x-auto border border-slate-800/80 my-4 text-xs font-mono"><code class="language-${language}">${html}</code></pre>`;
};

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
  
  DOMPurify.addHook('uponSanitizeElement', (node) => {
    if (node instanceof Element) {
      const tagName = node.tagName.toLowerCase();
      if (tagName === 'video' || tagName === 'audio' || tagName === 'iframe' || tagName === 'source' || tagName === 'img') {
        const srcAttr = node.getAttribute('src');
        if (srcAttr) {
          const url = srcAttr.trim().toLowerCase();
          const isSafe = url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('attachment:') || url.startsWith('/') || url.startsWith('./') || url.startsWith('../');
          if (!isSafe) {
            node.setAttribute('src', '#');
            console.warn('SECURITY BLOCK: Prevented connection to remote source URL:', srcAttr);
          }
        }
        
        if (tagName === 'iframe') {
          node.setAttribute('sandbox', 'allow-scripts');
        }
      }
    }
  });

  const clean = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'a', 'span',
      'ul', 'ol', 'li', 'strong', 'em', 'code', 'pre', 'blockquote',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'img', 'input',
      'video', 'audio', 'iframe', 'source'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'class', 'id', 'align', 'src', 'alt', 
      'type', 'checked', 'disabled', 'controls', 'sandbox', 'width', 'height'
    ],
  });

  DOMPurify.removeHook('uponSanitizeElement');
  return clean;
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

/**
 * Computes a SHA-256 integrity signature for a page.
 */
export async function computePageSignature(page: { slug: string; title: string; content: string; updatedAt: number; tags: string[] }): Promise<string> {
  const canonical = `${page.slug}|${page.title}|${page.content}|${page.updatedAt}|${page.tags.join(',')}|secops-integrity-salt-2026`;
  const msgBuffer = new TextEncoder().encode(canonical);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

