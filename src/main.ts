import { seedDatabase, getAllPages, getPage, savePage, deletePage, WikiPage, PageRevision, saveRevision, getPageRevisions, deleteRevision, getTagColors, saveTagColor, clearDatabase, Attachment, AuditLog, saveAttachment, getAttachment, saveAuditLog, getAllAuditLogs, clearAuditLogs, pruneAuditLogs } from './db';
import { renderMarkdownSecure, validateImportedPage, escapeHtml, getSanitizationCount, sanitizeUnicode, deriveKey, encryptText, decryptText, computePageSignature } from './security';
import './index.css';

// State Management
let currentPageSlug = 'home';
let isEditing = false;
let isNewPage = false;
let searchQuery = '';
let selectedTag = '';
let wikiPagesList: WikiPage[] = [];
let deferredInstallPrompt: any = null;
let networkStatus = navigator.onLine ? 'SECURE_LINK' : 'OFFLINE_CACHE';
let currentTheme = localStorage.getItem('secops-wiki-theme') || 'dark';

// Settings configuration states
let maskEncryptedTitles = localStorage.getItem('secops-wiki-mask-encrypted') === 'true';
let isSplitScreen = localStorage.getItem('secops-wiki-split-screen') !== 'false';
let globalTagColors: { [tag: string]: string } = {};

let activeMasterKey: CryptoKey | null = null;

async function logSecurityEvent(event: string, details: string) {
  const log: AuditLog = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
    timestamp: Date.now(),
    event,
    details
  };
  await saveAuditLog(log);
}

async function getPageSecure(slug: string): Promise<WikiPage | null> {
  const page = await getPage(slug);
  if (!page) return null;
  
  if (page.isEncryptedAtRest && page.encryptedData) {
    if (!activeMasterKey) {
      return {
        slug: page.slug,
        title: '[DATABASE LOCKED]',
        content: 'Master passphrase required to unlock this database record.',
        tags: [],
        isSystem: page.isSystem,
        isEncrypted: false,
        updatedAt: page.updatedAt
      };
    }
    try {
      const decryptedStr = await decryptText(page.encryptedData, activeMasterKey);
      const decryptedData = JSON.parse(decryptedStr);
      return {
        slug: page.slug,
        title: decryptedData.title,
        content: decryptedData.content,
        tags: decryptedData.tags,
        isSystem: page.isSystem,
        isEncrypted: decryptedData.isEncrypted,
        signature: decryptedData.signature,
        updatedAt: decryptedData.updatedAt
      };
    } catch (err) {
      console.error('Failed to decrypt page at rest:', err);
      return null;
    }
  }
  return page;
}

async function savePageSecure(page: WikiPage): Promise<void> {
  const isDbEncrypted = localStorage.getItem('secops-wiki-db-encrypted') === 'true';
  if (isDbEncrypted && activeMasterKey) {
    const plaintextData = {
      title: page.title,
      content: page.content,
      tags: page.tags,
      isEncrypted: page.isEncrypted,
      signature: page.signature,
      updatedAt: page.updatedAt
    };
    const encryptedStr = await encryptText(JSON.stringify(plaintextData), activeMasterKey);
    const encryptedPage: WikiPage = {
      slug: page.slug,
      title: '[REDACTED AT REST]',
      content: '[REDACTED AT REST]',
      tags: [],
      isSystem: page.isSystem,
      isEncryptedAtRest: true,
      encryptedData: encryptedStr,
      updatedAt: page.updatedAt
    };
    await savePage(encryptedPage);
  } else {
    await savePage(page);
  }
  localStorage.setItem('secops-wiki-last-update', Date.now().toString());
}

async function getAllPagesSecure(): Promise<WikiPage[]> {
  const rawPages = await getAllPages();
  const pages: WikiPage[] = [];
  for (const page of rawPages) {
    const securePage = await getPageSecure(page.slug);
    if (securePage) {
      pages.push(securePage);
    }
  }
  return pages;
}

async function cacheTagColors() {
  try {
    const list = await getTagColors();
    globalTagColors = {};
    list.forEach(c => {
      globalTagColors[c.tag] = c.color;
    });
  } catch {
    globalTagColors = {};
  }
}

function renderTagBadge(tag: string): string {
  const color = globalTagColors[tag] || 'slate';
  let colorClass = 'bg-slate-950/20 text-slate-400 border-slate-900/30'; // default slate
  
  if (color === 'emerald') {
    colorClass = 'bg-emerald-950/20 text-emerald-400 border-emerald-900/30';
  } else if (color === 'blue') {
    colorClass = 'bg-blue-950/20 text-blue-400 border-blue-900/30';
  } else if (color === 'red') {
    colorClass = 'bg-red-950/20 text-red-400 border-red-900/30';
  } else if (color === 'amber') {
    colorClass = 'bg-amber-950/20 text-amber-400 border-amber-900/30';
  }
  
  return `
    <span class="text-[10px] font-mono px-2 py-0.5 rounded border ${colorClass}">#${escapeHtml(tag)}</span>
  `;
}

function autolinkDOMTextNodes(element: HTMLElement) {
  const pagesToLink = wikiPagesList.filter(p => p.slug !== currentPageSlug);
  if (pagesToLink.length === 0) return;
  
  pagesToLink.sort((a, b) => b.title.length - a.title.length);
  
  const escapeRegex = (s: string) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  
  const textNodes: Node[] = [];
  const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      let parent = node.parentElement;
      while (parent && parent !== element) {
        const tagName = parent.tagName.toLowerCase();
        if (tagName === 'a' || tagName === 'code' || tagName === 'pre') {
          return NodeFilter.FILTER_REJECT;
        }
        parent = parent.parentElement;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  
  let currentNode = walk.nextNode();
  while (currentNode) {
    textNodes.push(currentNode);
    currentNode = walk.nextNode();
  }
  
  for (const node of textNodes) {
    const parent = node.parentNode;
    if (!parent) continue;
    
    let text = node.nodeValue || '';
    
    for (const page of pagesToLink) {
      const isRedacted = page.isEncrypted && !activeCryptoKey && maskEncryptedTitles;
      if (isRedacted) continue;
      
      const titleEsc = escapeRegex(page.title);
      const slugEsc = escapeRegex(page.slug);
      
      const pattern = new RegExp(`\\b(${titleEsc}|${slugEsc})\\b`, 'i');
      const match = pattern.exec(text);
      
      if (match) {
        const matchedText = match[0];
        const matchIdx = match.index;
        
        const beforeText = text.substring(0, matchIdx);
        const afterText = text.substring(matchIdx + matchedText.length);
        
        const beforeNode = document.createTextNode(beforeText);
        const linkNode = document.createElement('a');
        linkNode.href = `#/page/${page.slug}`;
        linkNode.className = 'autolink text-teal-400 hover:text-teal-350 underline decoration-dotted transition';
        linkNode.textContent = matchedText;
        const afterNode = document.createTextNode(afterText);
        
        parent.insertBefore(beforeNode, node);
        parent.insertBefore(linkNode, node);
        parent.insertBefore(afterNode, node);
        parent.removeChild(node);
        break;
      }
    }
  }
}

function updateRecentBreadcrumbs(slug: string) {
  if (!slug || slug === 'system' || slug === 'graph') return;
  let recent: string[] = [];
  try {
    recent = JSON.parse(sessionStorage.getItem('secops-wiki-breadcrumbs') || '[]');
  } catch {}
  if (!Array.isArray(recent)) recent = [];
  
  recent = recent.filter(s => s !== slug);
  recent.unshift(slug);
  if (recent.length > 5) {
    recent = recent.slice(0, 5);
  }
  sessionStorage.setItem('secops-wiki-breadcrumbs', JSON.stringify(recent));
}

function getPageTitle(slug: string): string {
  const p = wikiPagesList.find(x => x.slug === slug);
  if (!p) return slug;
  const isRedacted = p.isEncrypted && !activeCryptoKey && maskEncryptedTitles;
  return isRedacted ? `[REDACTED CORE]` : p.title;
}

// Extended State Management (Encryption, Command Palette, Autocomplete)
let activeCryptoKey: CryptoKey | null = null;
let isCommandPaletteOpen = false;
let activeCommandIndex = 0;
let isAutocompleteActive = false;
let autocompleteStartIndex = -1;
let autocompleteQuery = '';

// Decryption lockout helpers
function getFailedDecryptAttempts(): number {
  return parseInt(localStorage.getItem('secops-decrypt-failed-attempts') || '0', 10);
}
function setFailedDecryptAttempts(val: number) {
  localStorage.setItem('secops-decrypt-failed-attempts', val.toString());
}
function getDecryptLockoutTime(): number {
  return parseInt(localStorage.getItem('secops-decrypt-lockout-until') || '0', 10);
}
function setDecryptLockoutTime(val: number) {
  localStorage.setItem('secops-decrypt-lockout-until', val.toString());
}
function isDecryptionLockedOut(): boolean {
  return Date.now() < getDecryptLockoutTime();
}
function handleFailedDecryptionAttempt() {
  const attempts = getFailedDecryptAttempts() + 1;
  setFailedDecryptAttempts(attempts);
  if (attempts >= 3) {
    const cooldown = 5 * 60 * 1000 * Math.pow(2, attempts - 3);
    setDecryptLockoutTime(Date.now() + cooldown);
  }
}
function handleSuccessfulDecryption() {
  setFailedDecryptAttempts(0);
  setDecryptLockoutTime(0);
}

// Inactivity lock logic
let inactivityTimeoutId: any = null;

function resetInactivityTimeout() {
  if (inactivityTimeoutId) {
    clearTimeout(inactivityTimeoutId);
  }
  const timeoutMin = parseInt(localStorage.getItem('secops-wiki-session-timeout') || '15', 10);
  if (timeoutMin === 0) {
    return;
  }
  inactivityTimeoutId = setTimeout(() => {
    if (activeCryptoKey) {
      activeCryptoKey = null;
      alert(`SECURITY TIMEOUT: Session idle for ${timeoutMin} minutes. Passphrase keys wiped from memory.`);
      if (window.location.hash.startsWith('#/page/')) {
        window.location.hash = '#/page/home';
      } else {
        renderLayout();
      }
    }
  }, timeoutMin * 60 * 1000);
}

// Bind session activity listeners
['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(eventName => {
  window.addEventListener(eventName, resetInactivityTimeout, { passive: true });
});
resetInactivityTimeout();

// Clipboard wiping security layer for encrypted pages
let clipboardWipeTimeoutId: any = null;

document.addEventListener('copy', () => {
  const isEncryptedPage = document.body.classList.contains('encrypted-page-active');
  if (isEncryptedPage) {
    const selectedText = window.getSelection()?.toString() || '';
    if (selectedText) {
      scheduleClipboardWipe();
    }
  } else {
    // Cancel wipe if user copies non-encrypted content
    if (clipboardWipeTimeoutId) {
      clearTimeout(clipboardWipeTimeoutId);
      clipboardWipeTimeoutId = null;
    }
  }
});

function scheduleClipboardWipe() {
  if (clipboardWipeTimeoutId) {
    clearTimeout(clipboardWipeTimeoutId);
  }
  clipboardWipeTimeoutId = setTimeout(async () => {
    try {
      await navigator.clipboard.writeText('[SECURE WIPE: Decrypted secret cleared from clipboard]');
      showClipboardWipeToast();
      await logSecurityEvent('CLIPBOARD_WIPE', 'Automatically cleared decrypted secret from clipboard.');
    } catch (err) {
      console.warn('Clipboard wipe failed:', err);
    }
    clipboardWipeTimeoutId = null;
  }, 30000);
}

function showClipboardWipeToast() {
  const oldToast = document.getElementById('clipboard-wipe-toast');
  if (oldToast) oldToast.remove();

  const toast = document.createElement('div');
  toast.id = 'clipboard-wipe-toast';
  toast.className = 'fixed bottom-4 left-4 z-50 glass-panel border border-red-500/30 p-3 rounded-xl shadow-xl font-mono text-[10px] text-red-400 select-none animate-fade-in';
  toast.innerHTML = '⚠️ SECURITY WIPE: Decrypted secret cleared from clipboard.';
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

function validatePasswordStrength(password: string): { valid: boolean; message: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long.' };
  }
  let hasUpper = false;
  let hasLower = false;
  let hasDigit = false;
  let hasSpecial = false;
  const specials = /[!@#$%^&*(),.?":{}|<>_+\\-]/;
  for (const char of password) {
    if (char >= 'A' && char <= 'Z') hasUpper = true;
    else if (char >= 'a' && char <= 'z') hasLower = true;
    else if (char >= '0' && char <= '9') hasDigit = true;
    else if (specials.test(char)) hasSpecial = true;
  }
  if (!hasUpper || !hasLower || !hasDigit || !hasSpecial) {
    return {
      valid: false,
      message: 'Password must include uppercase, lowercase, numbers, and special symbols (!@#$%^&*, etc.).'
    };
  }
  return { valid: true, message: '' };
}

// Quick-Lock Global Hotkeys
function activateQuickLock() {
  if (activeCryptoKey) {
    activeCryptoKey = null;
    alert('QUICK LOCK: In-memory session keys cleared. Documents locked.');
    window.location.hash = '#/page/home';
    renderLayout();
  }
}
let escPressCount = 0;
let escPressTimer: any = null;
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    escPressCount++;
    if (escPressTimer) clearTimeout(escPressTimer);
    if (escPressCount >= 3) {
      escPressCount = 0;
      activateQuickLock();
    } else {
      escPressTimer = setTimeout(() => {
        escPressCount = 0;
      }, 1000);
    }
  }
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
    e.preventDefault();
    activateQuickLock();
  }
});


function applyTheme() {
  const html = document.documentElement;
  const path = document.getElementById('theme-icon-path');
  if (currentTheme === 'light') {
    html.classList.add('light-theme');
    if (path) {
      path.setAttribute('d', 'M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z');
    }
  } else {
    html.classList.remove('light-theme');
    if (path) {
      path.setAttribute('d', 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z');
    }
  }
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('secops-wiki-theme', currentTheme);
  applyTheme();
}

function highlightText(html: string, query: string): string {
  if (!query || query.trim().length === 0) return html;
  const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`(?![^<>]*>)(${escapedQuery})`, 'gi');
  return html.replace(regex, '<mark class="bg-teal-500/30 text-teal-300 px-0.5 rounded font-medium">$1</mark>');
}

function getTagColor(tag: string): { bg: string, text: string, border: string, className: string } {
  const t = tag.toLowerCase().trim();
  if (/(sec|security|critical|panic|destruct|lock|key|auth)/.test(t)) {
    return { bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171', border: 'rgba(239, 68, 68, 0.3)', className: 'tag-color-red' };
  }
  if (/(doc|manual|wiki|guide|system|dashboard|home)/.test(t)) {
    return { bg: 'rgba(20, 184, 166, 0.15)', text: '#2dd4bf', border: 'rgba(20, 184, 166, 0.3)', className: 'tag-color-teal' };
  }
  if (/(config|settings|sys|admin|db|telemetry)/.test(t)) {
    return { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)', className: 'tag-color-blue' };
  }
  if (/(warning|caution|issue|bug|fix)/.test(t)) {
    return { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)', className: 'tag-color-amber' };
  }
  return { bg: 'rgba(148, 163, 184, 0.15)', text: '#cbd5e1', border: 'rgba(148, 163, 184, 0.3)', className: 'tag-color-slate' };
}

function scoreSearchResult(page: WikiPage, query: string): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  
  let score = 0;
  const title = page.title.toLowerCase();
  const content = page.content.toLowerCase();
  const tags = page.tags.map(t => t.toLowerCase());
  
  if (title === q) score += 100;
  else if (title.startsWith(q)) score += 80;
  else if (title.includes(q)) score += 50;
  
  tags.forEach(tag => {
    if (tag === q) score += 30;
    else if (tag.includes(q)) score += 15;
  });
  
  if (content.includes(q)) {
    score += 10;
    const matches = content.split(q).length - 1;
    score += Math.min(10, matches);
  }
  
  return score;
}

function calculateCRC32(data: Uint8Array): number {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc = table[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function generateZipArchive(files: { name: string, content: string }[]): Blob {
  const enc = new TextEncoder();
  const parts: BlobPart[] = [];
  const fileOffsets: number[] = [];
  
  let currentOffset = 0;
  
  files.forEach(f => {
    fileOffsets.push(currentOffset);
    const fileNameBytes = enc.encode(f.name);
    const fileDataBytes = enc.encode(f.content);
    const crc = calculateCRC32(fileDataBytes);
    
    const header = new ArrayBuffer(30);
    const view = new DataView(header);
    
    view.setUint32(0, 0x04034b50, true);          // Signature
    view.setUint16(4, 10, true);                  // Version needed (1.0)
    view.setUint16(6, 0, true);                   // Flags
    view.setUint16(8, 0, true);                   // Compression (Stored)
    view.setUint16(10, 0, true);                  // Mod time
    view.setUint16(12, 0, true);                  // Mod date
    view.setUint32(14, crc, true);                // CRC-32
    view.setUint32(18, fileDataBytes.length, true); // Compressed size
    view.setUint32(22, fileDataBytes.length, true); // Uncompressed size
    view.setUint16(26, fileNameBytes.length, true); // File name length
    view.setUint16(28, 0, true);                  // Extra field length
    
    const headerBytes = new Uint8Array(header);
    parts.push(headerBytes);
    parts.push(fileNameBytes);
    parts.push(fileDataBytes);
    
    currentOffset += headerBytes.length + fileNameBytes.length + fileDataBytes.length;
  });
  
  const centralDirectoryOffset = currentOffset;
  let centralDirectorySize = 0;
  
  files.forEach((f, idx) => {
    const fileNameBytes = enc.encode(f.name);
    const fileDataBytes = enc.encode(f.content);
    const crc = calculateCRC32(fileDataBytes);
    const offset = fileOffsets[idx];
    
    const cdHeader = new ArrayBuffer(46);
    const view = new DataView(cdHeader);
    
    view.setUint32(0, 0x02014b50, true);          // Signature
    view.setUint16(4, 20, true);                  // Made by (2.0)
    view.setUint16(6, 10, true);                  // Needed (1.0)
    view.setUint16(8, 0, true);                   // Flags
    view.setUint16(10, 0, true);                  // Compression
    view.setUint16(12, 0, true);                  // Mod time
    view.setUint16(14, 0, true);                  // Mod date
    view.setUint32(16, crc, true);                // CRC-32
    view.setUint32(20, fileDataBytes.length, true); // Compressed size
    view.setUint32(24, fileDataBytes.length, true); // Uncompressed size
    view.setUint16(28, fileNameBytes.length, true); // File name length
    view.setUint16(30, 0, true);                  // Extra length
    view.setUint16(32, 0, true);                  // Comment length
    view.setUint16(34, 0, true);                  // Disk start
    view.setUint16(36, 0, true);                  // Internal attrs
    view.setUint32(38, 0x20, true);               // External attrs
    view.setUint32(42, offset, true);             // Local header offset
    
    const cdHeaderBytes = new Uint8Array(cdHeader);
    parts.push(cdHeaderBytes);
    parts.push(fileNameBytes);
    
    centralDirectorySize += cdHeaderBytes.length + fileNameBytes.length;
    currentOffset += cdHeaderBytes.length + fileNameBytes.length;
  });
  
  const eocd = new ArrayBuffer(22);
  const view = new DataView(eocd);
  
  view.setUint32(0, 0x06054b50, true);            // Signature
  view.setUint16(4, 0, true);                    // Disk number
  view.setUint16(6, 0, true);                    // CD disk
  view.setUint16(8, files.length, true);          // CD records on disk
  view.setUint16(10, files.length, true);         // Total CD records
  view.setUint32(12, centralDirectorySize, true); // Size of CD
  view.setUint32(16, centralDirectoryOffset, true); // Offset of start of CD
  view.setUint16(20, 0, true);                    // Comment length
  
  parts.push(new Uint8Array(eocd));
  
  return new Blob(parts, { type: 'application/zip' });
}

// BroadcastChannel for cross-tab database sync
const syncChannel = new BroadcastChannel('wiki-db-sync');
syncChannel.onmessage = async (event) => {
  if (event.data === 'refresh') {
    await refreshPagesList();
    await renderLayout();
  }
};

let lastKnownUpdate = localStorage.getItem('secops-wiki-last-update') || '0';
window.addEventListener('focus', async () => {
  const currentUpdate = localStorage.getItem('secops-wiki-last-update') || '0';
  if (currentUpdate !== lastKnownUpdate) {
    lastKnownUpdate = currentUpdate;
    await refreshPagesList();
    await renderLayout();
  }
});

// Session Lock State
let idleTimer: any = null;
const IDLE_TIMEOUT = 15 * 60 * 1000; // 15 minutes

// DOM Elements cache
let appEl: HTMLElement;

// Initialize Application
async function init() {
  applyTheme();
  appEl = document.getElementById('app')!;
  
  // Seed initial pages if DB is empty
  await seedDatabase();
  await cacheTagColors();
  try {
    await checkAndPurgeExpiredPages();
  } catch (err) {
    console.warn('Failed to purge expired pages on init:', err);
  }
  try {
    await pruneAuditLogs(30);
  } catch (err) {
    console.warn('Failed to auto-prune audit logs on init:', err);
  }
  
  // Register Service Worker for PWA
  registerServiceWorker();

  // Check if database is encrypted and locked
  const isDbEncrypted = localStorage.getItem('secops-wiki-db-encrypted') === 'true';
  if (isDbEncrypted && !activeMasterKey) {
    showMasterUnlockScreen();
  } else {
    // Load pages for the sidebar
    await refreshPagesList();

    // Setup session locking
    setupIdleTracker();

    // Setup command palette modal
    setupCommandPalette();

    // Handle routing
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
  
  // PWA Install Prompt Listener
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const installBtn = document.getElementById('pwa-install-btn');
    if (installBtn) installBtn.classList.remove('hidden');
  });

  // Global command palette keyboard trigger listeners
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key === 'k') || (e.ctrlKey && e.key === 'K')) {
      e.preventDefault();
      toggleCommandPalette();
    }
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
      e.preventDefault();
      toggleCommandPalette();
    }
    if (e.ctrlKey && e.altKey && (e.key === 'e' || e.key === 'E')) {
      e.preventDefault();
      if (isEditing) {
        const form = document.getElementById('edit-page-form') as HTMLFormElement;
        if (form) {
          form.requestSubmit();
        }
      } else {
        if (currentPageSlug && currentPageSlug !== 'home' && currentPageSlug !== 'system') {
          window.location.hash = `#/edit/${currentPageSlug}`;
        }
      }
    }
  });

  // Initial Route Resolution
  handleRoute();
  
  // Expiration daemon periodic check every 30 seconds
  setInterval(async () => {
    try {
      await checkAndPurgeExpiredPages();
    } catch (err) {
      console.warn('Failed periodic expired page purge:', err);
    }
  }, 30000);
  }
}

function resetIdleTimer() {
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(lockSession, IDLE_TIMEOUT);
}

function lockSession() {
  const lockScreen = document.getElementById('idle-lock-screen');
  if (!lockScreen) return;
  
  const isDbEncrypted = localStorage.getItem('secops-wiki-db-encrypted') === 'true';
  if (isDbEncrypted) {
    activeMasterKey = null;
    activeCryptoKey = null;
    renderLayout().catch(() => {});
  }
  
  const hasBioGate = localStorage.getItem('secops-wiki-webauthn-gate') === 'true';
  
  if (isDbEncrypted) {
    lockScreen.innerHTML = `
      <div class="glass-panel border border-slate-800 p-8 rounded-xl max-w-sm w-full text-center glow-border shadow-2xl">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <h2 class="text-lg font-bold font-mono text-white mb-2 uppercase tracking-wide">TERMINAL_LOCKED</h2>
        <p class="text-slate-400 text-[10px] font-mono mb-6 leading-relaxed">System locked due to inactivity.<br>Enter master passphrase or use biometrics.</p>
        
        <form id="idle-unlock-form" class="space-y-4">
          <input type="password" id="idle-unlock-password-input" placeholder="ENTER MASTER KEY..." required class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none transition font-mono text-center">
          <div class="flex gap-2">
            ${hasBioGate ? `
              <button type="button" id="idle-unlock-biometric-btn" class="flex-1 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-mono text-[10px] uppercase rounded transition hover:text-white flex items-center justify-center gap-1">
                Biometric
              </button>
            ` : ''}
            <button type="submit" class="flex-1 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-[10px] uppercase rounded font-bold transition">
              Unlock
            </button>
          </div>
        </form>
        <div id="idle-lock-error" class="hidden mt-3 text-[9px] font-mono text-red-400 font-bold uppercase">Invalid credentials.</div>
      </div>
    `;
    
    const form = lockScreen.querySelector('#idle-unlock-form') as HTMLFormElement;
    const pwdInput = lockScreen.querySelector('#idle-unlock-password-input') as HTMLInputElement;
    const errDiv = lockScreen.querySelector('#idle-lock-error') as HTMLElement;
    const bioBtn = lockScreen.querySelector('#idle-unlock-biometric-btn') as HTMLButtonElement;
    
    setTimeout(() => pwdInput?.focus(), 50);
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errDiv.classList.add('hidden');
      const pwd = pwdInput.value;
      try {
        const derivedKey = await deriveKey(pwd);
        const isCorrect = await verifyMasterKey(derivedKey);
        if (isCorrect) {
          activeMasterKey = derivedKey;
          await refreshPagesList();
          unlockSession();
          await renderLayout();
          await logSecurityEvent('SESSION_RESTORE', 'Restored session via master passphrase.');
        } else {
          errDiv.classList.remove('hidden');
        }
      } catch {
        errDiv.classList.remove('hidden');
      }
    });
    
    if (bioBtn) {
      bioBtn.addEventListener('click', async () => {
        errDiv.classList.add('hidden');
        try {
          const payload = localStorage.getItem('secops-wiki-webauthn-payload') || '';
          const challenge = crypto.getRandomValues(new Uint8Array(32));
          const assertion = await navigator.credentials.get({
            publicKey: {
              challenge,
              rpId: window.location.hostname || "localhost",
              userVerification: "required",
              timeout: 60000
            }
          });
          
          if (assertion) {
            const credIdBytes = new Uint8Array((assertion as any).rawId);
            const credIdHex = Array.from(credIdBytes).map(b => b.toString(16).padStart(2, '0')).join('');
            const saltHex = localStorage.getItem('secops-wiki-webauthn-salt') || '';
            if (!saltHex) throw new Error('Biometric salt missing.');
            
            const combinedEntropy = `${credIdHex}:${saltHex}`;
            const encKey = await deriveKey(combinedEntropy);
            const decryptedPwd = await decryptText(payload, encKey);
            const derivedKey = await deriveKey(decryptedPwd);
            
            const isCorrect = await verifyMasterKey(derivedKey);
            if (isCorrect) {
              activeMasterKey = derivedKey;
              await refreshPagesList();
              unlockSession();
              await renderLayout();
              await logSecurityEvent('SESSION_RESTORE_BIOMETRIC', 'Restored session via biometric WebAuthn verification.');
            } else {
              errDiv.classList.remove('hidden');
            }
          }
        } catch (err: any) {
          alert(`Biometric verification failed: ${err.message}`);
          await logSecurityEvent('WEBAUTHN_FAIL', `Idle lock biometric unlock failed: ${err.message}`);
        }
      });
    }
  } else {
    lockScreen.innerHTML = `
      <div class="glass-panel border border-slate-800 p-8 rounded-xl max-w-sm w-full text-center glow-border shadow-2xl">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <h2 class="text-lg font-bold font-mono text-white mb-2 uppercase tracking-wide">TERMINAL_LOCKED</h2>
        <p class="text-slate-400 text-[10px] font-mono mb-6 leading-relaxed">System locked due to inactivity.<br>Click restore to resume your session.</p>
        <button id="idle-unlock-btn" class="w-full py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-[10px] uppercase font-bold rounded transition">
          RESTORE SESSION
        </button>
      </div>
    `;
    
    const unlockBtn = lockScreen.querySelector('#idle-unlock-btn') as HTMLButtonElement;
    unlockBtn.addEventListener('click', () => {
      unlockSession();
    });
  }
  
  lockScreen.classList.remove('hidden');
}

function unlockSession() {
  const lockScreen = document.getElementById('idle-lock-screen');
  if (lockScreen) {
    lockScreen.classList.add('hidden');
  }
  resetIdleTimer();
}

function setupIdleTracker() {
  // Create Lock Screen overlay
  let lockScreen = document.getElementById('idle-lock-screen');
  if (!lockScreen) {
    lockScreen = document.createElement('div');
    lockScreen.id = 'idle-lock-screen';
    lockScreen.className = 'fixed inset-0 bg-[#090d16]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center hidden';
    document.body.appendChild(lockScreen);
  }

  resetIdleTimer();
  window.addEventListener('mousemove', resetIdleTimer, { passive: true });
  window.addEventListener('keydown', resetIdleTimer, { passive: true });
  window.addEventListener('click', resetIdleTimer, { passive: true });
  window.addEventListener('scroll', resetIdleTimer, { passive: true });
}

function showUpdateToast() {
  if (document.getElementById('pwa-update-toast')) return;

  const toast = document.createElement('div');
  toast.id = 'pwa-update-toast';
  toast.className = 'fixed bottom-4 right-4 z-50 max-w-sm glass-panel border border-teal-500/30 p-4 rounded-xl shadow-2xl glow-border flex items-center justify-between gap-4 font-mono text-xs select-none';
  toast.innerHTML = `
    <div class="flex items-center gap-2 text-teal-400">
      <svg class="w-5 h-5 text-teal-400 animate-bounce shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
      </svg>
      <div>
        <div class="font-bold text-white uppercase">UPDATE_INGESTED</div>
        <div class="text-[10px] text-slate-500">Restart session to apply updates.</div>
      </div>
    </div>
    <button id="pwa-update-reload-btn" class="px-3 py-1.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold rounded shadow-[0_0_8px_rgba(20,184,166,0.2)] transition uppercase text-[10px] shrink-0">
      RESTART
    </button>
  `;
  document.body.appendChild(toast);

  const btn = document.getElementById('pwa-update-reload-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      window.location.reload();
    });
  }
}

// Service Worker Registration
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Respect base path
      navigator.serviceWorker.register('/wiki/sw.js')
        .then((registration) => {
          console.log('ServiceWorker registered successfully with scope: ', registration.scope);
          
          // Check if there's already an updated worker waiting
          if (registration.waiting) {
            showUpdateToast();
          }

          // Check for future updates
          registration.addEventListener('updatefound', () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.addEventListener('statechange', () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  showUpdateToast();
                }
              });
            }
          });
        })
        .catch((err) => {
          console.error('ServiceWorker registration failed: ', err);
        });
    });
  }
}

// Network Status Updater
function updateNetworkStatus() {
  networkStatus = navigator.onLine ? 'SECURE_LINK' : 'OFFLINE_CACHE';
  const indicator = document.getElementById('system-status-indicator');
  const textLabel = document.getElementById('system-status-label');
  
  if (indicator && textLabel) {
    if (navigator.onLine) {
      indicator.className = 'w-2 h-2 rounded-full bg-emerald-400 glow-text-emerald pulse-indicator';
      textLabel.innerText = 'SECURE_LINK';
      textLabel.className = 'text-xs text-emerald-400 font-mono tracking-wider';
    } else {
      indicator.className = 'w-2 h-2 rounded-full bg-amber-500 pulse-indicator';
      textLabel.innerText = 'OFFLINE_CACHE';
      textLabel.className = 'text-xs text-amber-500 font-mono tracking-wider';
    }
  }
}

// Fetch pages and update cache list
async function refreshPagesList() {
  wikiPagesList = await getAllPagesSecure();
  await rebuildSearchIndex();
  lastKnownUpdate = localStorage.getItem('secops-wiki-last-update') || '0';
}

async function checkAndPurgeExpiredPages() {
  const pages = await getAllPages();
  const now = Date.now();
  let deletedAny = false;
  for (const page of pages) {
    if (page.expiresAt && now > page.expiresAt) {
      await deletePage(page.slug);
      await logSecurityEvent('SELF_DESTRUCT_EXPIRY', `Intel Entry "${page.title}" (slug: ${page.slug}) has self-destructed due to lease expiration.`);
      deletedAny = true;
      if (currentPageSlug === page.slug) {
        currentPageSlug = 'home';
        window.location.hash = '#/page/home';
      }
    }
  }
  if (deletedAny) {
    await refreshPagesList();
    await renderLayout();
    syncChannel.postMessage('refresh');
  }
}

// Routing Handler
async function handleRoute() {
  await checkAndPurgeExpiredPages();
  const hash = window.location.hash || '#/page/home';
  isEditing = false;
  isNewPage = false;
  let targetAnchor = '';
  
  if (hash.startsWith('#/page/')) {
    const pagePart = hash.replace('#/page/', '');
    const parts = pagePart.split('#');
    currentPageSlug = parts[0];
    if (parts.length > 1) {
      targetAnchor = parts[1];
    }
  } else if (hash.startsWith('#/edit/')) {
    currentPageSlug = hash.replace('#/edit/', '');
    isEditing = true;
  } else if (hash === '#/new') {
    isEditing = true;
    isNewPage = true;
    currentPageSlug = '';
  } else if (hash === '#/system') {
    currentPageSlug = 'system';
  } else if (hash === '#/graph') {
    currentPageSlug = 'graph';
  } else if (hash.startsWith('#/import-p2p')) {
    currentPageSlug = 'import-p2p';
  } else {
    currentPageSlug = 'home';
  }

  if (!isEditing && currentPageSlug && currentPageSlug !== 'system' && currentPageSlug !== 'graph') {
    updateRecentBreadcrumbs(currentPageSlug);
  }

  await renderLayout();

  if (targetAnchor) {
    // Wait a brief tick for async markdown rendering to attach to the DOM
    setTimeout(() => {
      const el = document.getElementById(targetAnchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  }
}

function renderSidebarPages(pages: WikiPage[]): string {
  const systemPages = pages.filter(p => p.isSystem);
  const encryptedPages = pages.filter(p => !p.isSystem && p.isEncrypted);
  const standardPages = pages.filter(p => !p.isSystem && !p.isEncrypted);

  let html = '';

  if (systemPages.length > 0) {
    html += `
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          ⚙️ SYSTEM PROCEDURES
        </div>
        <div class="space-y-0.5">
          ${systemPages.map(p => renderPageLink(p)).join('')}
        </div>
      </div>
    `;
  }

  if (encryptedPages.length > 0) {
    html += `
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-red-400/80 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          🔒 SECURE CORES
        </div>
        <div class="space-y-0.5">
          ${encryptedPages.map(p => renderPageLink(p)).join('')}
        </div>
      </div>
    `;
  }

  if (standardPages.length > 0) {
    html += `
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-teal-400/80 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          📄 OPERATIONAL INTEL
        </div>
        <div class="space-y-0.5">
          ${standardPages.map(p => renderPageLink(p)).join('')}
        </div>
      </div>
    `;
  }

  return html;
}

function renderPageLink(page: WikiPage): string {
  const isActive = currentPageSlug === page.slug && !isEditing;
  const isRedacted = page.isEncrypted && !activeCryptoKey && maskEncryptedTitles;
  const displayTitle = isRedacted ? `[REDACTED CORE]` : page.title;
  const targetHref = isRedacted ? 'javascript:void(0)' : `#/page/${page.slug}`;
  const clickHandler = isRedacted ? `onclick="alert('SECURITY WARNING: Document is locked. Enter passphrase to decrypt cores first.');"` : '';

  let snippetHtml = '';
  if (searchQuery.trim().length > 0) {
    const isLocked = page.isEncrypted && !activeCryptoKey;
    const indexedPage = decryptedSearchIndex.find(dp => dp.slug === page.slug) || page;
    if (!isLocked && indexedPage.content) {
      const idx = indexedPage.content.toLowerCase().indexOf(searchQuery.toLowerCase());
      if (idx !== -1) {
        const start = Math.max(0, idx - 20);
        const end = Math.min(indexedPage.content.length, idx + searchQuery.length + 30);
        let snippet = indexedPage.content.substring(start, end);
        if (start > 0) snippet = '...' + snippet;
        if (end < indexedPage.content.length) snippet = snippet + '...';
        
        const escapedSnippet = escapeHtml(snippet);
        const regex = new RegExp(`(${searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
        const highlightedSnippet = escapedSnippet.replace(regex, '<span class="bg-teal-950 text-teal-350 px-0.5 rounded font-bold">$1</span>');
        
        snippetHtml = `<div class="text-[10px] text-slate-500 font-mono mt-1 pl-4 break-all whitespace-normal leading-normal">${highlightedSnippet}</div>`;
      }
    }
  }

  return `
    <a href="${targetHref}" ${clickHandler} class="block px-3 py-2 rounded-lg text-xs font-mono transition group ${isActive ? 'bg-teal-950/30 text-teal-400 font-bold border-l-2 border-teal-500' : 'text-slate-450 hover:bg-slate-900/40 hover:text-slate-200'}">
      <div class="flex items-center justify-between">
        <span class="truncate flex items-center gap-1.5">
          ${page.isEncrypted ? '<span class="text-red-450 text-[9px]">🔒</span>' : '<span class="text-slate-650 group-hover:text-slate-500 text-[9px]">⊙</span>'}
          ${escapeHtml(displayTitle)}
        </span>
      </div>
      ${snippetHtml}
    </a>
  `;
}

// Layout Renderer
async function renderLayout() {
  await refreshPagesList();

  // Filter and sort pages list by fuzzy relevance scoring and selected tag
  let filteredPages = wikiPagesList;
  if (searchQuery.trim().length > 0) {
    filteredPages = filteredPages
      .map(page => ({ page, score: scoreSearchResult(decryptedSearchIndex.find(dp => dp.slug === page.slug) || page, searchQuery) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.page);
  }
  if (selectedTag) {
    filteredPages = filteredPages.filter(page => page.tags.includes(selectedTag));
  }

  const allTags = Array.from(new Set(wikiPagesList.flatMap(p => p.tags)));

  // Main UI Shell
  appEl.innerHTML = `
    <!-- Top Secure Header Bar -->
    <header class="glass-panel border-b border-teal-900/30 px-4 md:px-6 py-4 flex items-center justify-between z-10 shrink-0">
      <div class="flex items-center gap-2 md:gap-3">
        <!-- Mobile Sidebar Toggle -->
        <button id="sidebar-toggle-btn" class="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-900/50 rounded-lg focus:outline-none" aria-label="Toggle Navigation Sidebar">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div class="w-8 h-8 md:w-10 md:h-10 glow-border rounded-lg flex items-center justify-center bg-slate-900/50 shrink-0">
          <svg class="w-5 h-5 md:w-6 md:h-6 text-teal-400" viewBox="0 0 512 512" fill="currentColor">
            <path d="M256 70 C198 70, 134 88, 115 140 C115 270, 205 375, 256 425 C307 375, 397 270, 397 140 C378 88, 314 70, 256 70 Z" fill="none" stroke="currentColor" stroke-width="32"/>
            <rect x="196" y="160" width="120" height="150" rx="8" fill="none" stroke="currentColor" stroke-width="24"/>
            <line x1="220" y1="210" x2="270" y2="210" stroke="currentColor" stroke-width="20" stroke-linecap="round"/>
            <line x1="220" y1="250" x2="290" y2="250" stroke="currentColor" stroke-width="20" stroke-linecap="round"/>
          </svg>
        </div>
        <div>
          <h1 class="text-sm md:text-lg font-bold tracking-tight text-white font-mono uppercase">SecOps Intel</h1>
          <p class="text-[10px] text-slate-500 font-mono hidden sm:block">CLASSIFICATION: CONFIDENTIAL // SYSTEM REVISION 1.4.0</p>
        </div>
      </div>

      <div class="flex items-center gap-2 md:gap-4">
        <!-- Telemetry Widget -->
        <div class="hidden sm:flex items-center gap-4 bg-slate-950/80 border border-slate-800 rounded-lg px-4 py-2">
          <div class="flex items-center gap-2">
            <div id="system-status-indicator" class="w-2 h-2 rounded-full ${navigator.onLine ? 'bg-emerald-400 glow-text-emerald' : 'bg-amber-500'} pulse-indicator"></div>
            <span id="system-status-label" class="text-xs ${navigator.onLine ? 'text-emerald-400' : 'text-amber-500'} font-mono tracking-wider">${networkStatus}</span>
          </div>
          <div class="h-4 w-px bg-slate-800"></div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-500 font-mono">CSP INTEGRITY:</span>
            <span class="text-xs text-teal-400 font-mono glow-text-cyan">ENFORCED</span>
          </div>
        </div>

        <!-- Theme Toggle Button -->
        <button id="theme-toggle-btn" class="p-1.5 text-slate-400 hover:text-white rounded-lg focus:outline-none hover:bg-slate-900/50 transition" aria-label="Toggle Theme">
          <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path id="theme-icon-path" stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        </button>

        <!-- PWA Install Button -->
        <button id="pwa-install-btn" class="hidden px-2.5 py-1.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-[10px] md:text-xs text-white font-mono uppercase font-bold rounded hover:from-teal-500 hover:to-cyan-500 transition shadow-[0_0_10px_rgba(20,184,166,0.2)]">
          INSTALL
        </button>

        <!-- Panic Button -->
        <button id="system-panic-btn" class="px-2.5 py-1.5 bg-red-950/40 border border-red-900/30 text-[10px] md:text-xs text-red-400 font-mono uppercase font-bold rounded hover:bg-red-905 hover:text-red-300 transition shadow-[0_0_10px_rgba(239,68,68,0.15)]">
          <span class="sm:inline hidden">PANIC PURGE</span>
          <span class="inline sm:hidden">PANIC</span>
        </button>
      </div>
    </header>

    <!-- Main Workspace -->
    <div class="flex-1 flex overflow-hidden min-h-0 relative">
      <!-- Sidebar mobile backdrop overlay -->
      <div id="sidebar-backdrop" class="fixed inset-0 bg-black/60 z-20 hidden md:hidden"></div>

      <!-- Left Navigation Drawer -->
      <aside id="sidebar" class="fixed inset-y-0 left-0 z-30 w-72 glass-panel border-r border-slate-800/80 flex flex-col shrink-0 transform -translate-x-full md:translate-x-0 md:static transition-transform duration-300 ease-in-out">
        <!-- Search Launcher -->
        <div class="p-4 border-b border-slate-800/80 shrink-0">
          <button id="sidebar-search-trigger" class="w-full bg-slate-950/80 border border-slate-800 hover:border-slate-700/80 hover:bg-slate-900/20 rounded-lg py-2.5 px-3 flex items-center justify-between text-slate-500 transition font-mono focus:outline-none cursor-pointer">
            <div class="flex items-center gap-2 font-mono">
              <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span class="text-xs text-slate-450">Search database...</span>
            </div>
            <kbd class="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono select-none uppercase scale-90">Ctrl+K</kbd>
          </button>
        </div>

        <!-- Tag Filter Cloud -->
        ${allTags.length > 0 ? `
          <div class="px-4 py-2 border-b border-slate-800/80 flex flex-wrap gap-1 max-h-24 overflow-y-auto shrink-0 select-none">
            <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${!selectedTag ? 'bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]' : 'bg-slate-900 text-slate-400 hover:bg-slate-850'}" data-tag="">#ALL</button>
            ${allTags.map(tag => {
              const color = getTagColor(tag);
              return `
                <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${selectedTag === tag ? 'bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]' : `${color.className} hover:opacity-85`}" data-tag="${escapeHtml(tag)}">#${escapeHtml(tag.toUpperCase())}</button>
              `;
            }).join('')}
          </div>
        ` : ''}

        <!-- Wiki Index List -->
        <div class="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          <div class="px-3 mb-2 flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono">Wiki Database</span>
            <div class="flex items-center gap-1">
              <a href="#/new" class="p-1 hover:bg-teal-950/30 rounded text-teal-400 hover:text-teal-300 transition" title="New Intel Document">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </a>
              <button id="sidebar-close-btn" class="md:hidden p-1 hover:bg-slate-900/50 rounded text-slate-400 hover:text-white transition" title="Close Panel">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div id="pages-list" class="space-y-1">
            ${renderSidebarPages(filteredPages)}
            ${filteredPages.length === 0 ? `
              <div class="text-center py-6 text-xs text-slate-650 font-mono">No entries found</div>
            ` : ''}
          </div>

          <div class="px-3 mb-2 mt-6 flex items-center justify-between border-t border-slate-900/60 pt-4 select-none shrink-0">
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">🏷️ Tag Explorer</span>
          </div>
          <div id="tag-tree-container" class="space-y-1 px-1 max-h-48 overflow-y-auto pr-1">
            ${renderTagTree(buildTagTree(filteredPages))}
          </div>
        </div>

        <!-- Footer Control Center -->
        <div class="p-4 border-t border-slate-800/80 bg-slate-950/30 flex gap-2 shrink-0">
          <a href="#/graph" class="flex-1 text-center py-2 px-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-[10px] font-mono text-slate-300 uppercase hover:text-white transition">
            MAP VIEW
          </a>
          <a href="#/system" class="flex-1 text-center py-2 px-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-[10px] font-mono text-slate-300 uppercase hover:text-white transition">
            ADMIN
          </a>
        </div>
      </aside>

      <!-- Center content portal -->
      <main class="flex-1 overflow-y-auto bg-gradient-to-b from-[#0a0f1d] to-[#090d16] p-4 md:p-8">
        <div class="max-w-4xl mx-auto">
          <div id="main-content">
            <!-- Loading placeholder resolved dynamically -->
          </div>
        </div>
      </main>
    </div>
  `;

  // Bind Event Listeners
  const searchInput = document.getElementById('wiki-search-input') as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = (e.target as HTMLInputElement).value;
      // Trigger dynamic sidebar filter only, preventing whole page redraw to preserve input focus
      const filtered = decryptedSearchIndex.filter(page => 
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      const pagesListContainer = document.getElementById('pages-list')!;
      pagesListContainer.innerHTML = renderSidebarPages(filtered);
      if (filtered.length === 0) {
        pagesListContainer.innerHTML = `<div class="text-center py-6 text-xs text-slate-650 font-mono">No entries found</div>`;
      }
    });
  }

  const installBtn = document.getElementById('pwa-install-btn');
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        const { outcome } = await deferredInstallPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('User accepted the PWA install prompt');
        }
        deferredInstallPrompt = null;
        installBtn.classList.add('hidden');
      }
    });
  }

  const panicBtn = document.getElementById('system-panic-btn');
  if (panicBtn) {
    panicBtn.addEventListener('click', async () => {
      if (confirm('CRITICAL SYSTEM COMPROMISE PROTOCOL: Purge entire local database, clear all service worker caches, unregister service workers, and force self-destruct reload immediately?')) {
        // Delete DB
        indexedDB.deleteDatabase('secops-wiki-db');
        
        // Clear Caches
        if ('caches' in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map(key => caches.delete(key)));
        }

        // Unregister Service Workers
        if ('serviceWorker' in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          await Promise.all(registrations.map(r => r.unregister()));
        }

        // Hardened self-destruct state clearing
        localStorage.clear();
        sessionStorage.clear();
        activeCryptoKey = null;

        // Wipe history stack and redirect
        window.history.replaceState(null, '', 'about:blank');
        window.location.replace('about:blank');
      }
    });
  }

  // Bind Sidebar Mobile toggles
  const toggleBtn = document.getElementById('sidebar-toggle-btn');
  const closeBtn = document.getElementById('sidebar-close-btn');
  const backdrop = document.getElementById('sidebar-backdrop');
  
  const closeSidebar = () => {
    const sidebarEl = document.getElementById('sidebar');
    const backdropEl = document.getElementById('sidebar-backdrop');
    if (sidebarEl && backdropEl) {
      sidebarEl.classList.add('-translate-x-full');
      backdropEl.classList.add('hidden');
    }
  };

  const openSidebar = () => {
    const sidebarEl = document.getElementById('sidebar');
    const backdropEl = document.getElementById('sidebar-backdrop');
    if (sidebarEl && backdropEl) {
      sidebarEl.classList.remove('-translate-x-full');
      backdropEl.classList.remove('hidden');
    }
  };

  if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (backdrop) backdrop.addEventListener('click', closeSidebar);

  // Close sidebar on link navigation clicks (on mobile)
  const navLinks = document.querySelectorAll('#sidebar a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        closeSidebar();
      }
    });
  });

  // Bind Theme Toggle
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Bind Tag Filter badges
  document.querySelectorAll('.tag-badge').forEach(badge => {
    badge.addEventListener('click', async (e) => {
      const btn = e.currentTarget as HTMLButtonElement;
      selectedTag = btn.getAttribute('data-tag') || '';
      await renderLayout();
    });
  });

  // Bind Tag Tree folder expand/collapse and key events
  const tagTreeContainer = document.getElementById('tag-tree-container');
  if (tagTreeContainer) {
    tagTreeContainer.addEventListener('click', (e) => {
      const header = (e.target as HTMLElement).closest('.tree-folder-header') as HTMLElement;
      if (header) {
        const childrenContainer = header.nextElementSibling as HTMLElement;
        const icon = header.querySelector('.tree-folder-icon') as HTMLElement;
        if (childrenContainer) {
          const isHidden = childrenContainer.classList.toggle('hidden');
          if (icon) {
            icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(90deg)';
          }
        }
      }
    });

    tagTreeContainer.addEventListener('keydown', (e) => {
      const active = document.activeElement as HTMLElement;
      if (!active || !tagTreeContainer.contains(active)) return;
      
      const elements = Array.from(tagTreeContainer.querySelectorAll('.tree-folder-header, .tree-folder-children a')) as HTMLElement[];
      const visibleElements = elements.filter(el => {
        let parent = el.parentElement;
        while (parent && parent !== tagTreeContainer) {
          if (parent.classList.contains('tree-folder-children') && parent.classList.contains('hidden')) {
            return false;
          }
          parent = parent.parentElement;
        }
        return true;
      });
      
      const idx = visibleElements.indexOf(active);
      if (idx === -1) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIdx = (idx + 1) % visibleElements.length;
        visibleElements[nextIdx]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIdx = (idx - 1 + visibleElements.length) % visibleElements.length;
        visibleElements[prevIdx]?.focus();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        active.click();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (active.classList.contains('tree-folder-header')) {
          const childrenContainer = active.nextElementSibling as HTMLElement;
          const icon = active.querySelector('.tree-folder-icon') as HTMLElement;
          if (childrenContainer && childrenContainer.classList.contains('hidden')) {
            childrenContainer.classList.remove('hidden');
            if (icon) icon.style.transform = 'rotate(90deg)';
          }
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (active.classList.contains('tree-folder-header')) {
          const childrenContainer = active.nextElementSibling as HTMLElement;
          const icon = active.querySelector('.tree-folder-icon') as HTMLElement;
          if (childrenContainer && !childrenContainer.classList.contains('hidden')) {
            childrenContainer.classList.add('hidden');
            if (icon) icon.style.transform = 'rotate(0deg)';
          }
        }
      }
    });
  }

  // Populate actual view page
  await resolveContentView();
}

// View Resolver
async function resolveContentView() {
  const contentPortal = document.getElementById('main-content')!;

  if (currentPageSlug === 'graph') {
    await renderGraphView(contentPortal);
    return;
  }

  if (currentPageSlug === 'system') {
    renderSystemView(contentPortal);
    return;
  }

  if (currentPageSlug === 'import-p2p') {
    await renderP2PImportView(contentPortal);
    return;
  }

  if (isEditing) {
    await renderEditView(contentPortal);
    return;
  }

  await renderPageView(contentPortal);
}

// 1. Render Wiki Page Reader View
async function renderPageView(container: HTMLElement) {
  const page = await getPageSecure(currentPageSlug);

  if (!page) {
    container.innerHTML = `
      <div class="text-center py-20 bg-slate-950/40 border border-red-950/20 rounded-xl px-6 glow-border">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <h2 class="text-2xl font-bold font-mono text-white mb-2 uppercase">DATA_MISSING</h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-6">Requested intel document slug "${escapeHtml(currentPageSlug)}" is not registered in index database.</p>
        <a href="#/new" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
          Create New Document
        </a>
      </div>
    `;
    return;
  }

  // Load Revisions
  const revisions = await getPageRevisionsSecure(page.slug);

  let displayContent = page.content;
  let isLocked = false;
  
  if (page.isEncrypted) {
    if (activeCryptoKey) {
      try {
        displayContent = await decryptText(page.content, activeCryptoKey);
      } catch (err) {
        isLocked = true;
      }
    } else {
      isLocked = true;
    }
  }

  if (isLocked) {
    const isLockedOut = isDecryptionLockedOut();
    let lockoutMessage = '';
    if (isLockedOut) {
      const remaining = Math.ceil((getDecryptLockoutTime() - Date.now()) / 1000);
      lockoutMessage = `<p class="text-red-500 text-xs font-mono font-bold mt-2 animate-pulse uppercase">SECURITY LOCKOUT: Too many failures. Locked out for ${remaining}s.</p>`;
    }

    container.innerHTML = `
      <div class="max-w-md mx-auto my-20 p-6 glass-panel border border-teal-900/30 rounded-xl text-center glow-border select-none">
        <svg class="w-16 h-16 text-teal-500 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <h2 class="text-xl font-bold font-mono text-white mb-2 uppercase">DECRYPT_REQUIRED</h2>
        <p class="text-slate-400 text-xs font-mono mb-6">This document payload is encrypted. Enter passphrase to decrypt.</p>
        <form id="decrypt-doc-form" class="space-y-4">
          <input type="password" id="decrypt-password-input" placeholder="Enter security passphrase..." ${isLockedOut ? 'disabled' : ''} class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base text-slate-200 focus:outline-none transition font-mono text-center disabled:opacity-40 disabled:cursor-not-allowed">
          <button type="submit" ${isLockedOut ? 'disabled' : ''} class="w-full py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.2)] disabled:opacity-40 disabled:cursor-not-allowed">
            DECRYPT IN-MEMORY
          </button>
        </form>
        <div id="decrypt-lockout-timer">${lockoutMessage}</div>
      </div>
    `;
    
    if (isLockedOut) {
      const timerId = setInterval(async () => {
        const remaining = Math.ceil((getDecryptLockoutTime() - Date.now()) / 1000);
        const timerDiv = document.getElementById('decrypt-lockout-timer');
        if (remaining <= 0) {
          clearInterval(timerId);
          await renderPageView(container);
        } else if (timerDiv) {
          timerDiv.innerHTML = `<p class="text-red-500 text-xs font-mono font-bold mt-2 animate-pulse uppercase">SECURITY LOCKOUT: Too many failures. Locked out for ${remaining}s.</p>`;
        }
      }, 1000);
    }
    
    setTimeout(() => {
      const pwdInput = document.getElementById('decrypt-password-input');
      pwdInput?.focus();
    }, 50);
    
    const form = document.getElementById('decrypt-doc-form') as HTMLFormElement;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (isDecryptionLockedOut()) {
        alert('Security Lockout active.');
        return;
      }
      const pwd = (document.getElementById('decrypt-password-input') as HTMLInputElement).value;
      try {
        const key = await deriveKey(pwd);
        // Test decrypt
        await decryptText(page.content, key);
        handleSuccessfulDecryption();
        activeCryptoKey = key;
        await renderLayout(); // Rerender
      } catch (err) {
        handleFailedDecryptionAttempt();
        alert('Security Alert: Authentication failed. Invalid security passphrase.');
        await renderPageView(container); // Refresh to lock inputs immediately
      }
    });
    return;
  }

  // Estimate Read Time (200 words per minute average)
  const wordCount = displayContent.split(/\s+/).filter(w => w.length > 0).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  const rawRenderedContent = renderMarkdownSecure(displayContent);
  const updatedDate = new Date(page.updatedAt).toLocaleString();

  // Create temporary container to parse headings and apply autolinking
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = rawRenderedContent;
  autolinkDOMTextNodes(tempDiv);
  const autolinkedHtml = tempDiv.innerHTML;
  
  // Highlight search queries
  const renderedContent = highlightText(autolinkedHtml, searchQuery);
  const articleHeadings = tempDiv.querySelectorAll('h1, h2, h3');
  
  let tocHtml = '';
  if (articleHeadings.length > 0) {
    tocHtml = `
      <div class="hidden lg:block w-60 shrink-0 self-start sticky top-8">
        <div class="glass-panel border border-slate-800/80 rounded-xl p-4">
          <h4 class="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest border-b border-slate-800/60 pb-2 mb-3">Outline</h4>
          <nav class="space-y-2 text-xs font-mono max-h-[350px] overflow-y-auto pr-1">
            ${Array.from(articleHeadings).map(h => {
              const text = h.textContent || '';
              const id = h.id || text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              const level = h.tagName.toLowerCase();
              const indent = level === 'h1' ? 'pl-0 font-semibold' : level === 'h2' ? 'pl-3 border-l border-slate-800' : 'pl-6 border-l border-slate-800';
              return `
                <a href="#/page/${page.slug}#${id}" class="block text-slate-500 hover:text-teal-400 transition truncate ${indent}" title="${escapeHtml(text)}">
                  ${escapeHtml(text)}
                </a>
              `;
            }).join('')}
          </nav>
        </div>
      </div>
    `;
  }

  // Parse checklists in the page
  const uncheckedMatches = displayContent.match(/^(\s*[-*] )\[ \]/gm) || [];
  const checkedMatches = displayContent.match(/^(\s*[-*] )\[[xX]\]/gm) || [];
  const totalCheckboxes = uncheckedMatches.length + checkedMatches.length;
  let checklistProgressHtml = '';
  if (totalCheckboxes > 0) {
    const checkedCount = checkedMatches.length;
    const percentage = Math.round((checkedCount / totalCheckboxes) * 100);
    const barLength = 10;
    const filledLength = Math.round((checkedCount / totalCheckboxes) * barLength);
    const emptyLength = barLength - filledLength;
    const barString = '█'.repeat(filledLength) + '░'.repeat(emptyLength);
    
    checklistProgressHtml = `
      <div class="glass-panel border border-slate-800/80 p-3 rounded-lg flex items-center justify-between mb-6 text-[10px] sm:text-xs font-mono select-none">
        <div class="flex items-center gap-2 sm:gap-3">
          <span class="text-teal-400 font-bold">📋 TASK STATUS:</span>
          <span class="text-slate-400 font-bold">${barString}</span>
          <span class="text-teal-400 font-bold">${percentage}%</span>
        </div>
        <div class="text-slate-500">
          ${checkedCount}/${totalCheckboxes} COMPLETED
        </div>
      </div>
    `;
  }

  // Generate breadcrumb trail
  let breadcrumbsHtml = '';
  try {
    const crumbs: string[] = JSON.parse(sessionStorage.getItem('secops-wiki-breadcrumbs') || '[]');
    if (crumbs.length > 1) {
      breadcrumbsHtml = `
        <div class="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 mb-3 select-none overflow-x-auto whitespace-nowrap pb-1">
          <span class="text-slate-600 uppercase">RECENT:</span>
          ${crumbs.map((c, i) => {
            const title = getPageTitle(c);
            const isCurrent = c === page.slug;
            const linkClass = isCurrent ? 'text-teal-400 font-bold' : 'text-slate-450 hover:text-slate-350 transition';
            const separator = i < crumbs.length - 1 ? '<span class="text-slate-850">/</span>' : '';
            return `
              <a href="#/page/${c}" class="${linkClass}">${escapeHtml(title)}</a>
              ${separator}
            `;
          }).join('')}
        </div>
      `;
    }
  } catch {}

  // Verify integrity signature
  let integrityBadgeHtml = '';
  if (page.signature) {
    const computedSig = await computePageSignature(page);
    if (computedSig !== page.signature) {
      integrityBadgeHtml = `<span class="px-2 py-0.5 bg-red-950/40 text-red-400 border border-red-900/30 rounded text-[9px] font-mono font-bold animate-pulse">⚠️ INTEGRITY FAIL</span>
                            <button id="reconcile-integrity-btn" class="ml-1.5 px-2 py-0.5 bg-red-950/50 hover:bg-red-900/40 text-red-400 hover:text-white border border-red-900/30 hover:border-red-700 rounded text-[9px] font-mono font-bold uppercase transition">Reconcile</button>`;
    } else {
      integrityBadgeHtml = `<span class="px-2 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 rounded text-[9px] font-mono font-bold">✓ INTEGRITY OK</span>`;
    }
  } else {
    integrityBadgeHtml = `<span class="px-2 py-0.5 bg-amber-950/40 text-amber-400 border border-amber-900/30 rounded text-[9px] font-mono font-bold">⚠️ UNSIGNED</span>`;
  }

  // Toggle body print layout class
  if (page.isEncrypted) {
    document.body.classList.add('encrypted-page-active');
  } else {
    document.body.classList.remove('encrypted-page-active');
  }

  const classification = page.classification || 'UNCLASSIFIED';
  let bannerColorClass = 'border-emerald-500/20 text-emerald-400 bg-emerald-950/10';
  let borderGlowClass = 'classification-glow-unclassified';
  
  if (classification === 'CONFIDENTIAL') {
    bannerColorClass = 'border-blue-500/20 text-blue-400 bg-blue-950/10';
    borderGlowClass = 'classification-glow-confidential';
  } else if (classification === 'SECRET') {
    bannerColorClass = 'border-amber-500/20 text-amber-500 bg-amber-950/10';
    borderGlowClass = 'classification-glow-secret';
  } else if (classification === 'TOP SECRET') {
    bannerColorClass = 'border-red-500/30 text-red-500 bg-red-950/10 animate-pulse';
    borderGlowClass = 'classification-glow-topsecret';
  }
  
  const topBannerHtml = `
    <div class="border ${bannerColorClass} px-4 py-1.5 rounded-lg text-center text-[10px] font-bold font-mono uppercase tracking-widest select-none mb-6">
      ✦ ${classification} ✦
    </div>
  `;

  const bottomBannerHtml = `
    <div class="border ${bannerColorClass} px-4 py-1.5 rounded-lg text-center text-[10px] font-bold font-mono uppercase tracking-widest select-none mt-8">
      ✦ ${classification} ✦
    </div>
  `;

  container.innerHTML = `
    <div class="flex gap-8 items-start">
      <!-- Main Content Area -->
      <div class="flex-1 min-w-0 glass-panel border rounded-xl p-5 md:p-6 shadow-xl ${borderGlowClass}">
        <!-- Breadcrumb navigation trail -->
        ${breadcrumbsHtml}
        
        <!-- Top Classification Banner -->
        ${topBannerHtml}
        <!-- Page Header telemetry -->
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-slate-800 pb-6 mb-6 gap-4">
          <div>
            <h2 class="text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight">${escapeHtml(page.title)}</h2>
            <div class="flex flex-wrap items-center gap-3 mt-3">
              <span class="text-xs font-mono text-slate-500 uppercase">SYS_REF: ${escapeHtml(page.slug)}</span>
              <span class="h-3 w-px bg-slate-800"></span>
              <span class="text-xs font-mono text-slate-500 uppercase">UPDATED: ${updatedDate}</span>
              <span class="h-3 w-px bg-slate-800"></span>
              <span class="text-xs font-mono text-teal-400 uppercase">⏱️ ${readTime} MIN READ</span>
              ${integrityBadgeHtml}
              <span class="h-3 w-px bg-slate-800"></span>
              ${page.tags.map(tag => renderTagBadge(tag)).join('')}
            </div>
          </div>
          
          <div class="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <div class="relative inline-block text-left" id="page-export-dropdown-wrapper">
              <button id="page-export-dropdown-btn" class="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 font-mono text-xs rounded transition uppercase">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Export
              </button>
              <div id="page-export-menu" class="hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-slate-950 border border-slate-800 ring-1 ring-black ring-opacity-5 z-20 divide-y divide-slate-800">
                <div class="py-1">
                  <button id="export-single-md" class="w-full text-left px-4 py-2 text-xs font-mono text-slate-300 hover:bg-slate-900 hover:text-white transition">
                    MARKDOWN (.MD)
                  </button>
                  <button id="export-single-html" class="w-full text-left px-4 py-2 text-xs font-mono text-slate-300 hover:bg-slate-900 hover:text-white transition">
                    OFFLINE HTML (.HTML)
                  </button>
                </div>
                <div class="py-1">
                  <button id="export-single-p2p" class="w-full text-left px-4 py-2 text-xs font-mono text-slate-300 hover:bg-slate-900 hover:text-white transition">
                    SHAREABLE P2P LINK
                  </button>
                  <button id="export-single-print" class="w-full text-left px-4 py-2 text-xs font-mono text-slate-300 hover:bg-slate-900 hover:text-white transition">
                    PRINT / PDF
                  </button>
                </div>
              </div>
            </div>

            <a href="#/edit/${page.slug}" class="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 font-mono text-xs rounded transition uppercase">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Modify
            </a>
            ${!page.isSystem ? `
              <button id="delete-page-btn" class="flex items-center gap-2 px-3 py-1.5 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-xs rounded transition uppercase">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Purge
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Rendered Markdown Wiki Page -->
        ${checklistProgressHtml}
        <article class="wiki-content prose prose-invert max-w-none">
          ${renderedContent}
        </article>

        <!-- Revision History Database Panel -->
        <div class="border-t border-slate-800 mt-12 pt-6">
          <details class="group glass-panel border border-slate-800/60 rounded-xl p-4 transition-all">
            <summary class="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono cursor-pointer list-none flex items-center justify-between">
              <span>Revision History Logs [${revisions.length}]</span>
              <svg class="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div class="mt-4 space-y-3 divide-y divide-slate-800/60 max-h-48 overflow-y-auto pr-1">
              ${revisions.map((rev, idx) => `
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 first:pt-0">
                  <div class="min-w-0">
                    <p class="text-xs font-mono text-slate-300 break-words">REV_${revisions.length - idx} // ${escapeHtml(rev.title)}</p>
                    <p class="text-[10px] font-mono text-slate-500">${new Date(rev.updatedAt).toLocaleString()}</p>
                  </div>
                  <button class="restore-rev-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${escapeHtml(rev.id)}">
                    ROLLBACK
                  </button>
                </div>
              `).join('')}
              ${revisions.length === 0 ? `
                <p class="text-[10px] font-mono text-slate-600">No revisions archived.</p>
              ` : ''}
            </div>
          </details>
        </div>
        ${bottomBannerHtml}
      </div>

      <!-- Outline / TOC (Desktop only) -->
      ${tocHtml}
    </div>
    <!-- Print elements for security marking -->
    ${page.isEncrypted ? `
      <div class="print-watermark">[CLASSIFIED - SECURE OPS]</div>
      <div class="print-banner-top">[CLASSIFIED - SECURE OPS]</div>
      <div class="print-banner-bottom">[CLASSIFIED - SECURE OPS]</div>
    ` : ''}
  `;

  // Bind Export Dropdown Action
  const exportDropdownBtn = document.getElementById('page-export-dropdown-btn');
  const exportMenu = document.getElementById('page-export-menu');
  if (exportDropdownBtn && exportMenu) {
    exportDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      exportMenu.classList.toggle('hidden');
    });
    
    document.addEventListener('click', () => {
      exportMenu.classList.add('hidden');
    });

    const singleMdBtn = document.getElementById('export-single-md')!;
    singleMdBtn.addEventListener('click', async () => {
      let content = page.content;
      if (page.isEncrypted && activeCryptoKey) {
        try {
          content = await decryptText(page.content, activeCryptoKey);
        } catch {
          // Fallback
        }
      }
      
      const fileHeader = `---
title: ${page.title}
slug: ${page.slug}
tags: ${page.tags.join(', ')}
updated: ${new Date(page.updatedAt).toISOString()}
encrypted: ${!!page.isEncrypted}
---

`;
      const blob = new Blob([fileHeader + content], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${page.slug}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    const singleHtmlBtn = document.getElementById('export-single-html')!;
    singleHtmlBtn.addEventListener('click', async () => {
      let content = page.content;
      if (page.isEncrypted && activeCryptoKey) {
        try {
          content = await decryptText(page.content, activeCryptoKey);
        } catch {
          // Fallback
        }
      }
      const rendered = renderMarkdownSecure(content);
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(page.title)} - SecOps Wiki Offline</title>
  <style>
    body {
      background-color: #0b0f19;
      color: #cbd5e1;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }
    h1 {
      font-size: 2.25rem;
      color: #f8fafc;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 0.5rem;
      margin-bottom: 0.5rem;
    }
    h2 { font-size: 1.5rem; color: #f1f5f9; margin-top: 2rem; border-bottom: 1px solid #1e293b; padding-bottom: 0.3rem; }
    h3 { font-size: 1.25rem; color: #f1f5f9; margin-top: 1.5rem; }
    a { color: #2dd4bf; text-decoration: none; }
    a:hover { text-decoration: underline; }
    pre {
      background: #020617;
      border: 1px solid #1e293b;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
    }
    code {
      font-family: ui-monospace, monospace;
      background: #1e293b;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
      color: #e2e8f0;
    }
    pre code { background: none; padding: 0; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { border: 1px solid #1e293b; padding: 0.5rem; text-align: left; }
    th { background: #0f172a; color: #f1f5f9; }
    blockquote {
      border-left: 4px solid #0d9488;
      padding-left: 1rem;
      margin-left: 0;
      color: #94a3b8;
      font-style: italic;
    }
    .metadata {
      font-size: 0.75rem;
      color: #64748b;
      margin-bottom: 2rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .badge {
      display: inline-block;
      background: #134e4a;
      color: #2dd4bf;
      padding: 0.1rem 0.4rem;
      border-radius: 4px;
      font-size: 0.7rem;
      margin-right: 0.5rem;
      border: 1px solid #115e59;
    }
  </style>
</head>
<body>
  <h1>${escapeHtml(page.title)}</h1>
  <div class="metadata">
    Slug: ${page.slug} &nbsp;|&nbsp; 
    Updated: ${new Date(page.updatedAt).toLocaleString()} &nbsp;|&nbsp;
    Tags: ${page.tags.map(t => `<span class="badge">#${escapeHtml(t)}</span>`).join('')}
  </div>
  <article>
    ${rendered}
  </article>
</body>
</html>`;
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${page.slug}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    const singlePrintBtn = document.getElementById('export-single-print')!;
    singlePrintBtn.addEventListener('click', () => {
      window.print();
    });

    const singleP2pBtn = document.getElementById('export-single-p2p')!;
    if (singleP2pBtn) {
      singleP2pBtn.addEventListener('click', async () => {
        let content = page.content;
        if (page.isEncrypted && activeCryptoKey) {
          try {
            content = await decryptText(page.content, activeCryptoKey);
          } catch {
            // Fallback
          }
        }
        
        const pwd = prompt('Create a secure sharing passphrase for this peer link (min 4 characters):');
        if (!pwd) return;
        if (pwd.length < 4) {
          alert('Security Requirement: Passphrase must be at least 4 characters long.');
          return;
        }
        
        try {
          const key = await deriveKey(pwd);
          const payloadData = {
            title: page.title,
            content: content,
            tags: page.tags,
            classification: page.classification || 'UNCLASSIFIED'
          };
          const encryptedStr = await encryptText(JSON.stringify(payloadData), key);
          const base64Data = btoa(encryptedStr);
          const shareLink = `${window.location.origin}${window.location.pathname}#/import-p2p?data=${encodeURIComponent(base64Data)}&key=${encodeURIComponent(pwd)}`;
          
          await navigator.clipboard.writeText(shareLink);
          alert('✓ SECURE P2P LINK GENERATED: The encrypted link has been copied to your clipboard. Share it securely with your peer.');
          await logSecurityEvent('P2P_LINK_EXPORT', `Generated secure share link for document: ${page.title}`);
        } catch (err: any) {
          alert(`Encryption error: Failed to generate sharing link - ${err.message}`);
        }
      });
    }
    
    // Bind Reconcile Integrity Button
    const reconcileBtn = document.getElementById('reconcile-integrity-btn');
    if (reconcileBtn) {
      reconcileBtn.addEventListener('click', async () => {
        const choice = confirm(`RECONCILIATION NOTICE: Confirm restoration of document "${page.title}" to its last cryptographically verified historical revision? Unverified changes will be discarded.`);
        if (!choice) return;
        
        let restored = false;
        for (const rev of revisions) {
          if (rev.signature) {
            const computedSig = await computePageSignature({
              slug: rev.slug,
              title: rev.title,
              content: rev.content,
              updatedAt: rev.updatedAt,
              tags: rev.tags || []
            });
            if (computedSig === rev.signature) {
              await savePageSecure({
                slug: rev.slug,
                title: rev.title,
                content: rev.content,
                updatedAt: Date.now(),
                tags: rev.tags || [],
                classification: rev.classification || 'UNCLASSIFIED',
                isSystem: page.isSystem,
                isEncrypted: rev.isEncrypted
              });
              restored = true;
              break;
            }
          }
        }
        if (restored) {
          alert('✓ RECONCILIATION COMPLETED: The document has been restored to its last verified authentic state.');
          await refreshPagesList();
          await renderLayout();
        } else {
          alert('⚠️ RECONCILIATION FAILED: No historical revision could be cryptographically verified. Check audit logs.');
          await logSecurityEvent('RECONCILE_FAILED', `Reconciliation failed for "${page.title}". No authentic revisions found.`);
        }
      });
    }
  }

  // Bind Delete Page Button
  const deleteBtn = document.getElementById('delete-page-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', async () => {
      if (confirm(`CRITICAL SYSTEM NOTICE: Confirm total purge of intel document "${page.title}"? This action is irreversible.`)) {
        await deletePage(page.slug);
        localStorage.setItem('secops-wiki-last-update', Date.now().toString());
        syncChannel.postMessage('refresh');
        window.location.hash = '#/page/home';
      }
    });
  }

  // Bind Copy Buttons to Code Blocks
  container.querySelectorAll('pre').forEach(pre => {
    const wrapper = document.createElement('div');
    wrapper.className = 'relative group';
    pre.parentNode!.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const button = document.createElement('button');
    button.className = 'absolute top-2 right-2 px-2 py-1 bg-slate-900/80 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white font-mono rounded opacity-0 group-hover:opacity-100 transition focus:opacity-100 border border-slate-800 focus:outline-none';
    button.textContent = 'COPY';
    
    button.addEventListener('click', () => {
      const code = pre.querySelector('code')?.textContent || pre.textContent || '';
      navigator.clipboard.writeText(code).then(() => {
        button.textContent = 'COPIED';
        setTimeout(() => button.textContent = 'COPY', 2000);
        if (document.body.classList.contains('encrypted-page-active')) {
          scheduleClipboardWipe();
        }
      });
    });
    wrapper.appendChild(button);
  });

  // Bind Rollback Revision Buttons
  container.querySelectorAll('.restore-rev-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const revId = (e.currentTarget as HTMLButtonElement).getAttribute('data-rev-id');
      const targetRev = revisions.find(r => r.id === revId);
      if (targetRev && confirm(`ROLLBACK COMMAND: Revert current page content to revision state "${targetRev.title}" saved on ${new Date(targetRev.updatedAt).toLocaleString()}?`)) {
        
        // Save current page state as a new revision before restoring!
        const currentRef = await getPageSecure(page.slug);
        if (currentRef) {
          await saveRevisionSecure({
            id: `${currentRef.slug}-${Date.now()}`,
            slug: currentRef.slug,
            title: currentRef.title,
            content: currentRef.content,
            updatedAt: Date.now(),
            tags: currentRef.tags,
            classification: currentRef.classification,
            signature: currentRef.signature
          });
        }
        
        // Restore
        await savePageSecure({
          slug: targetRev.slug,
          title: targetRev.title,
          content: targetRev.content,
          updatedAt: Date.now(),
          tags: page.tags,
          isSystem: page.isSystem
        });
        
        alert('Revision successfully restored.');
        await refreshPagesList();
        await renderLayout(); // Rerender sidebar list and content view
      }
    });
  });

  // Bind Checklist Click Handler to toggle checkbox in IndexedDB content
  container.querySelectorAll('.wiki-content input[type="checkbox"]').forEach((checkbox, idx) => {
    const cb = checkbox as HTMLInputElement;
    cb.removeAttribute('disabled');
    cb.classList.add('cursor-pointer', 'accent-teal-500');
    cb.addEventListener('change', async (e) => {
      const target = e.target as HTMLInputElement;
      await toggleMarkdownCheckbox(page.slug, idx, target.checked);
    });
  });

  // Bind attachments & sandboxes
  await resolveAttachments(container);
  setupSandboxes(container);
}

// 2. Render Wiki Page Editor (Edit & New Page)
async function renderEditView(container: HTMLElement) {
  let initialTitle = '';
  let initialSlug = '';
  let initialContent = '';
  let currentTagsList: string[] = [];
  let isSystemPage = false;

  let isEncryptedInit = false;
  let initialClassification = 'UNCLASSIFIED';
  let initialExpiryValue = 0;
  if (!isNewPage) {
    const page = await getPageSecure(currentPageSlug);
    if (page) {
      initialTitle = page.title;
      initialSlug = page.slug;
      initialContent = page.content;
      currentTagsList = [...page.tags];
      isSystemPage = !!page.isSystem;
      isEncryptedInit = !!page.isEncrypted;
      initialClassification = page.classification || 'UNCLASSIFIED';
      if (page.expiresAt && page.updatedAt) {
        const durationMin = Math.round((page.expiresAt - page.updatedAt) / (60 * 1000));
        initialExpiryValue = durationMin;
      }
      
      if (page.isEncrypted) {
        if (activeCryptoKey) {
          try {
            initialContent = await decryptText(page.content, activeCryptoKey);
          } catch {
            initialContent = 'ERROR: Decryption key mismatch. Please go back and re-decrypt.';
          }
        } else {
          initialContent = 'ERROR: This page is encrypted. Decrypt it in the reader view first.';
        }
      }
    }
  }

  // Load Autosaved draft if it exists
  const draftKey = `secops-wiki-draft-${isNewPage ? 'new' : currentPageSlug}`;
  let draftBannerHtml = '';
  const rawDraft = localStorage.getItem(draftKey);
  if (rawDraft) {
    try {
      const draft = JSON.parse(rawDraft);
      initialTitle = draft.title || initialTitle;
      initialContent = draft.content || initialContent;
      if (Array.isArray(draft.tags)) {
        currentTagsList = draft.tags;
      } else if (typeof draft.tags === 'string') {
        currentTagsList = draft.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0);
      }
      
      draftBannerHtml = `
        <div id="draft-restore-banner" class="bg-teal-950/40 border border-teal-800 text-teal-400 p-3 rounded-lg text-xs font-mono mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>RESTORED DRAFT: Unsaved changes restored (${new Date(draft.updatedAt).toLocaleTimeString()})</span>
          <button type="button" id="discard-draft-btn" class="underline hover:text-teal-300 font-bold shrink-0">DISCARD</button>
        </div>
      `;
    } catch {
      // Ignore
    }
  }

  container.innerHTML = `
    <div class="glass-panel border border-slate-800 rounded-xl p-4 md:p-6 glow-border">
      <div class="border-b border-slate-800 pb-4 mb-6">
        <h2 class="text-xl font-bold font-mono text-white uppercase">${isNewPage ? 'Establish New Intel Entry' : 'Update Intel Entry'}</h2>
        <p class="text-xs text-slate-500 font-mono">All text payloads are sanitized client-side against XSS vectors.</p>
      </div>

      ${draftBannerHtml}

      <form id="edit-page-form" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Title Input -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Document Title</label>
            <input type="text" id="edit-title" value="${escapeHtml(initialTitle)}" required maxlength="100" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono">
          </div>

          <!-- Slug Input -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Index Slug ID</label>
            <input type="text" id="edit-slug" value="${escapeHtml(initialSlug)}" ${!isNewPage ? 'disabled' : ''} required pattern="^[a-z0-9-_]+$" placeholder="e.g. operational-manual" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono disabled:opacity-40 disabled:cursor-not-allowed">
            ${isNewPage ? '<p class="text-[10px] text-slate-500 mt-1 font-mono">Only lowercase letters, numbers, hyphens, and underscores are allowed.</p>' : ''}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Security Classification dropdown select -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Security Classification</label>
            <select id="edit-classification" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono cursor-pointer">
              <option value="UNCLASSIFIED" ${initialClassification === 'UNCLASSIFIED' ? 'selected' : ''}>UNCLASSIFIED</option>
              <option value="CONFIDENTIAL" ${initialClassification === 'CONFIDENTIAL' ? 'selected' : ''}>CONFIDENTIAL</option>
              <option value="SECRET" ${initialClassification === 'SECRET' ? 'selected' : ''}>SECRET</option>
              <option value="TOP SECRET" ${initialClassification === 'TOP SECRET' ? 'selected' : ''}>TOP SECRET</option>
            </select>
          </div>
          <!-- Document Expiry Timer -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Intel Expiry Timer (Self-Destruct)</label>
            <select id="edit-expiry" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono cursor-pointer">
              <option value="0" ${initialExpiryValue === 0 ? 'selected' : ''}>NEVER</option>
              <option value="60" ${initialExpiryValue === 60 ? 'selected' : ''}>1 HOUR</option>
              <option value="720" ${initialExpiryValue === 720 ? 'selected' : ''}>12 HOURS</option>
              <option value="1440" ${initialExpiryValue === 1440 ? 'selected' : ''}>24 HOURS</option>
              <option value="10080" ${initialExpiryValue === 10080 ? 'selected' : ''}>7 DAYS</option>
            </select>
          </div>
        </div>

        <!-- Tags Input -->
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Associated Tags</label>
          <div id="tag-pills-container" class="flex flex-wrap items-center gap-2 w-full bg-slate-950/80 border border-slate-800 focus-within:border-teal-500/50 rounded-lg p-2 min-h-[42px] transition font-mono">
            <!-- Dynamic pills go here -->
            <input type="text" id="tag-pill-input" placeholder="Type tag and press Enter..." class="bg-transparent border-0 text-base md:text-sm text-slate-200 focus:outline-none flex-1 min-w-[120px] p-0.5">
          </div>
          <div class="relative mt-1">
            <div id="tag-pill-dropdown" class="absolute left-0 top-0 w-64 bg-slate-950 border border-slate-800 rounded-lg shadow-lg hidden font-mono text-xs max-h-40 overflow-y-auto z-20"></div>
          </div>
          <p class="text-[10px] text-slate-500 mt-1 font-mono">Type and press Enter, comma, or select from dropdown list.</p>
        </div>

        <!-- Mobile Tab Selector -->
        <div class="flex border-b border-slate-800/80 mb-4 md:hidden select-none shrink-0">
          <button type="button" id="edit-tab-write" class="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400">WRITE_SOURCE</button>
          <button type="button" id="edit-tab-preview" class="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500">PREVIEW_INGEST</button>
        </div>

        <!-- Content Area -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">Markdown Content payload</label>
            <span class="hidden md:inline text-[10px] text-slate-500 font-mono">Live editor preview enabled (Type [[ for page links)</span>
          </div>
          <!-- Formatting Toolbar -->
          <div class="flex flex-wrap gap-1 p-2 bg-slate-950/80 border border-slate-800 border-b-0 rounded-t-lg select-none items-center justify-between">
            <div class="flex flex-wrap gap-1">
              <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="bold">B</button>
              <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="italic">I</button>
              <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="header">H3</button>
              <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="code">Code</button>
              <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="link">Link</button>
              <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="table">Table</button>
              <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="checklist">Todo</button>
              <button type="button" id="toolbar-sketch-btn" class="px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-450 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold">Sketch</button>
            </div>
            <button type="button" id="toggle-split-btn" class="hidden md:inline-block px-2.5 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase font-bold">Toggle Split</button>
          </div>
          <div id="editor-layout-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div id="edit-content-container" class="block relative">
              <textarea id="edit-content" rows="16" required class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-b-lg p-4 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono border-t-0" placeholder="Enter markdown payload here...">${escapeHtml(initialContent)}</textarea>
              <!-- Auto-complete popup -->
              <div id="autocomplete-popup" class="absolute left-4 top-12 w-64 editor-autocomplete-list rounded-lg hidden font-mono text-xs max-h-40 overflow-y-auto"></div>
            </div>
            <div id="live-preview-container" class="hidden md:block">
              <div id="live-preview-box" class="w-full h-[375px] md:h-full min-h-[384px] overflow-y-auto bg-slate-950/30 border border-slate-800 rounded-lg p-4 wiki-content">
                <span class="text-xs text-slate-600 font-mono">Markdown preview updates in real-time...</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Encryption Option & Actions -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-800">
          <div class="flex items-center gap-2">
            <input type="checkbox" id="edit-encrypt" ${isEncryptedInit ? 'checked' : ''} class="w-4 h-4 rounded border-slate-850 bg-slate-950 text-teal-500 focus:ring-teal-500/50 cursor-pointer">
            <label for="edit-encrypt" class="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono cursor-pointer select-none">Encrypt Document (AES-GCM)</label>
          </div>
          <div class="flex gap-3 justify-end self-end sm:self-auto">
            <a href="${isNewPage ? '#/page/home' : `#/page/${currentPageSlug}`}" id="cancel-edit-btn" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Cancel
            </a>
            <button type="submit" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">
              Commit Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  `;

  // Bind Elements
  const form = document.getElementById('edit-page-form') as HTMLFormElement;
  const textarea = document.getElementById('edit-content') as HTMLTextAreaElement;
  const previewBox = document.getElementById('live-preview-box')!;
  const cancelBtn = document.getElementById('cancel-edit-btn')!;
  const discardBtn = document.getElementById('discard-draft-btn');

  // Mobile Tabs
  const tabWrite = document.getElementById('edit-tab-write');
  const tabPreview = document.getElementById('edit-tab-preview');
  const writeContainer = document.getElementById('edit-content-container');
  const previewContainer = document.getElementById('live-preview-container');

  if (tabWrite && tabPreview && writeContainer && previewContainer) {
    tabWrite.addEventListener('click', () => {
      tabWrite.className = 'flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400';
      tabPreview.className = 'flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500';
      writeContainer.className = 'block';
      previewContainer.className = 'hidden md:block';
    });

    tabPreview.addEventListener('click', () => {
      tabPreview.className = 'flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400';
      tabWrite.className = 'flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500';
      previewContainer.className = 'block';
      writeContainer.className = 'hidden md:block';
    });
  }

  // Live Markdown Preview
  const updatePreview = () => {
    const markdown = textarea.value;
    if (markdown.trim().length === 0) {
      previewBox.innerHTML = `<span class="text-slate-600 font-mono text-xs">No input content.</span>`;
      return;
    }
    previewBox.innerHTML = renderMarkdownSecure(markdown);
  };

  function formatMarkdownTable(tableText: string): string {
    const lines = tableText.trim().split('\n');
    if (lines.length < 2) return tableText;
    
    const tableData = lines.map(line => {
      let content = line.trim();
      if (content.startsWith('|')) content = content.slice(1);
      if (content.endsWith('|')) content = content.slice(0, -1);
      return content.split('|').map(cell => cell.trim());
    });
    
    const colCount = Math.max(...tableData.map(row => row.length));
    if (colCount === 0) return tableText;
    
    const colWidths = Array(colCount).fill(0);
    for (let r = 0; r < tableData.length; r++) {
      const isSeparator = r === 1 && tableData[r].every(cell => /^:-*-*:?$/.test(cell) || /^-+$/.test(cell));
      for (let c = 0; c < colCount; c++) {
        const val = tableData[r][c] || '';
        if (!isSeparator && val.length > colWidths[c]) {
          colWidths[c] = val.length;
        }
      }
    }
    
    for (let c = 0; c < colCount; c++) {
      colWidths[c] = Math.max(colWidths[c], 3);
    }
    
    const formattedLines = tableData.map((row, r) => {
      const isSeparator = r === 1 && row.every(cell => /^:-*-*:?$/.test(cell) || /^-+$/.test(cell));
      
      const cells = Array(colCount).fill('').map((_, c) => {
        const val = row[c] || '';
        if (isSeparator) {
          const hasLeftColon = val.startsWith(':');
          const hasRightColon = val.endsWith(':');
          const dashesCount = colWidths[c] - (hasLeftColon ? 1 : 0) - (hasRightColon ? 1 : 0);
          return (hasLeftColon ? ':' : '') + '-'.repeat(Math.max(1, dashesCount)) + (hasRightColon ? ':' : '');
        } else {
          return val.padEnd(colWidths[c], ' ');
        }
      });
      
      return `| ${cells.join(' | ')} |`;
    });
    
    return formattedLines.join('\n');
  }

  // Bind sketch and attachment handlers
  const sketchBtn = document.getElementById('toolbar-sketch-btn');
  if (sketchBtn) {
    sketchBtn.addEventListener('click', () => {
      openDrawingCanvas(textarea);
    });
  }
  setupAttachmentHandlers(textarea);

  // Bind Formatting Toolbar inserts
  const insertFormatting = (format: string) => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    let replacement = '';
    
    switch (format) {
      case 'bold':
        replacement = `**${selectedText || 'bold_text'}**`;
        break;
      case 'italic':
        replacement = `*${selectedText || 'italic_text'}*`;
        break;
      case 'header':
        replacement = `\n### ${selectedText || 'Header text'}\n`;
        break;
      case 'code':
        replacement = `\n\`\`\`javascript\n${selectedText || '// code here'}\n\`\`\`\n`;
        break;
      case 'link':
        replacement = `[${selectedText || 'Link text'}](url)`;
        break;
      case 'table':
        if (selectedText && selectedText.includes('|') && selectedText.includes('\n')) {
          try {
            replacement = '\n' + formatMarkdownTable(selectedText) + '\n';
          } catch {
            replacement = `\n| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |\n`;
          }
        } else {
          replacement = `\n| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |\n`;
        }
        break;
      case 'checklist':
        replacement = `\n- [ ] ${selectedText || 'Task description'}\n`;
        break;
    }
    
    textarea.value = text.substring(0, start) + replacement + text.substring(end);
    textarea.focus();
    textarea.selectionStart = start + replacement.length;
    textarea.selectionEnd = start + replacement.length;
    updatePreview();
  };
  
  container.querySelectorAll('.format-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const format = (e.currentTarget as HTMLButtonElement).getAttribute('data-format') || '';
      insertFormatting(format);
    });
  });

  // Autocomplete Link Triggers in Editor
  textarea.addEventListener('keyup', (e) => {
    const val = textarea.value;
    const pos = textarea.selectionStart;
    const lastTwo = val.substring(pos - 2, pos);
    
    if (lastTwo === '[[') {
      isAutocompleteActive = true;
      autocompleteStartIndex = pos;
      autocompleteQuery = '';
      showAutocompletePopup(textarea);
    } else if (isAutocompleteActive) {
      if (e.key === 'Escape' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter') {
        return;
      }
      const currentText = val.substring(autocompleteStartIndex, pos);
      if (currentText.includes('\n') || pos < autocompleteStartIndex) {
        hideAutocompletePopup();
      } else {
        autocompleteQuery = currentText;
        updateAutocompletePopup(textarea);
      }
    }
  });

  textarea.addEventListener('keydown', (e) => {
    if (isAutocompleteActive) {
      const popup = document.getElementById('autocomplete-popup');
      if (!popup) return;
      const items = popup.querySelectorAll('.editor-autocomplete-item');
      let activeIndex = Array.from(items).findIndex(el => el.classList.contains('active'));
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (items.length > 0) {
          if (activeIndex >= 0) items[activeIndex].classList.remove('active', 'bg-teal-950/20', 'text-teal-400');
          activeIndex = (activeIndex + 1) % items.length;
          items[activeIndex].classList.add('active', 'bg-teal-950/20', 'text-teal-400');
          items[activeIndex].scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (items.length > 0) {
          if (activeIndex >= 0) items[activeIndex].classList.remove('active', 'bg-teal-950/20', 'text-teal-400');
          activeIndex = (activeIndex - 1 + items.length) % items.length;
          items[activeIndex].classList.add('active', 'bg-teal-950/20', 'text-teal-400');
          items[activeIndex].scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0) {
          (items[activeIndex] as HTMLElement).click();
        } else if (items.length > 0) {
          (items[0] as HTMLElement).click();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        hideAutocompletePopup();
      }
    }
  });
  
  textarea.addEventListener('input', () => {
    updatePreview();
    saveAutosaveDraft();
  });
  updatePreview(); // Initial render

  // Tag pill manager logic
  const pillsContainer = document.getElementById('tag-pills-container') as HTMLDivElement;
  const pillInput = document.getElementById('tag-pill-input') as HTMLInputElement;
  const tagDropdown = document.getElementById('tag-pill-dropdown') as HTMLDivElement;
  const allExistingTags = Array.from(new Set(wikiPagesList.flatMap(p => p.tags)));

  function renderTagPills() {
    if (!pillsContainer || !pillInput) return;
    
    const badges = pillsContainer.querySelectorAll('.tag-badge-pill');
    badges.forEach(b => b.remove());
    
    currentTagsList.forEach(tag => {
      const badge = document.createElement('span');
      badge.className = 'tag-badge-pill flex items-center gap-1 text-[10px] font-mono bg-teal-950/40 text-teal-400 px-2 py-1 rounded border border-teal-900/30 select-none';
      badge.innerHTML = `
        #${escapeHtml(tag)}
        <button type="button" class="tag-remove-btn hover:text-red-400 font-bold transition focus:outline-none" data-tag="${escapeHtml(tag)}">×</button>
      `;
      pillsContainer.insertBefore(badge, pillInput);
    });
    
    const removeBtns = pillsContainer.querySelectorAll('.tag-remove-btn');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tagToRemove = (e.currentTarget as HTMLButtonElement).getAttribute('data-tag');
        if (tagToRemove) {
          currentTagsList = currentTagsList.filter(t => t !== tagToRemove);
          renderTagPills();
          saveAutosaveDraft();
        }
      });
    });
  }

  function showDropdownSuggestions() {
    if (!tagDropdown || !pillInput) return;
    const query = pillInput.value.trim().toLowerCase();
    const suggestions = allExistingTags.filter(tag => 
      tag.includes(query) && !currentTagsList.includes(tag)
    );
    
    if (suggestions.length === 0) {
      tagDropdown.classList.add('hidden');
      return;
    }
    
    tagDropdown.innerHTML = suggestions.map(tag => `
      <div class="tag-dropdown-item px-3 py-2 cursor-pointer hover:bg-slate-900 hover:text-white text-slate-350 transition" data-tag="${escapeHtml(tag)}">
        #${escapeHtml(tag)}
      </div>
    `).join('');
    
    tagDropdown.classList.remove('hidden');
    
    const items = tagDropdown.querySelectorAll('.tag-dropdown-item');
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        const tag = (e.currentTarget as HTMLDivElement).getAttribute('data-tag');
        if (tag && !currentTagsList.includes(tag)) {
          currentTagsList.push(tag);
          renderTagPills();
          saveAutosaveDraft();
        }
        pillInput.value = '';
        tagDropdown.classList.add('hidden');
        pillInput.focus();
      });
    });
  }

  if (pillInput) {
    pillInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const value = pillInput.value.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '');
        if (value && !currentTagsList.includes(value)) {
          currentTagsList.push(value);
          renderTagPills();
          saveAutosaveDraft();
        }
        pillInput.value = '';
        if (tagDropdown) tagDropdown.classList.add('hidden');
      } else if (e.key === 'Backspace' && pillInput.value === '') {
        currentTagsList.pop();
        renderTagPills();
        saveAutosaveDraft();
      }
    });

    pillInput.addEventListener('input', showDropdownSuggestions);
    pillInput.addEventListener('focus', showDropdownSuggestions);
  }

  // Render initial pills
  renderTagPills();

  // Split-screen editor layout toggle
  const gridEl = document.getElementById('editor-layout-grid');
  const previewCont = document.getElementById('live-preview-container');
  const toggleSplitBtn = document.getElementById('toggle-split-btn');

  function applySplitScreen() {
    if (!gridEl || !previewCont || !toggleSplitBtn) return;
    if (isSplitScreen) {
      gridEl.classList.remove('md:grid-cols-1');
      gridEl.classList.add('md:grid-cols-2');
      previewCont.classList.remove('md:hidden');
      previewCont.classList.add('md:block');
      toggleSplitBtn.textContent = 'Full Width';
      toggleSplitBtn.classList.remove('text-slate-450');
      toggleSplitBtn.classList.add('text-teal-400');
    } else {
      gridEl.classList.remove('md:grid-cols-2');
      gridEl.classList.add('md:grid-cols-1');
      previewCont.classList.remove('md:block');
      previewCont.classList.add('md:hidden');
      toggleSplitBtn.textContent = 'Split Screen';
      toggleSplitBtn.classList.remove('text-teal-400');
      toggleSplitBtn.classList.add('text-slate-450');
    }
  }

  if (toggleSplitBtn) {
    toggleSplitBtn.addEventListener('click', () => {
      isSplitScreen = !isSplitScreen;
      localStorage.setItem('secops-wiki-split-screen', isSplitScreen.toString());
      applySplitScreen();
    });
  }

  // Apply default split-screen layout state
  applySplitScreen();

  const saveAutosaveDraft = () => {
    const titleVal = (document.getElementById('edit-title') as HTMLInputElement)?.value;
    const contentVal = textarea.value;
    if (titleVal || contentVal || currentTagsList.length > 0) {
      localStorage.setItem(draftKey, JSON.stringify({
        title: titleVal,
        content: contentVal,
        tags: currentTagsList,
        updatedAt: Date.now()
      }));
    }
  };

  // Autosave Draft interval (runs every 5 seconds)
  const autoSaveInterval = setInterval(saveAutosaveDraft, 5000);

  const cleanUpOnHashChange = () => {
    clearInterval(autoSaveInterval);
    window.removeEventListener('hashchange', cleanUpOnHashChange);
  };
  window.addEventListener('hashchange', cleanUpOnHashChange);

  // Clean draft utility
  const cleanUpDraft = () => {
    clearInterval(autoSaveInterval);
    window.removeEventListener('hashchange', cleanUpOnHashChange);
    localStorage.removeItem(draftKey);
    hideAutocompletePopup();
  };

  cancelBtn.addEventListener('click', cleanUpDraft);
  if (discardBtn) {
    discardBtn.addEventListener('click', () => {
      cleanUpDraft();
      document.getElementById('draft-restore-banner')?.remove();
      renderEditView(container);
    });
  }

  // Close dropdown on click outside
  const closeDropdownHandler = (e: MouseEvent) => {
    if (tagDropdown && !tagDropdown.contains(e.target as Node) && e.target !== pillInput) {
      tagDropdown.classList.add('hidden');
    }
  };
  document.addEventListener('click', closeDropdownHandler);

  // Ensure clean up of document listeners
  const cleanUpDocListeners = () => {
    document.removeEventListener('click', closeDropdownHandler);
    window.removeEventListener('hashchange', cleanUpDocListeners);
  };
  window.addEventListener('hashchange', cleanUpDocListeners);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = (document.getElementById('edit-title') as HTMLInputElement).value.trim();
    const slug = isNewPage 
      ? (document.getElementById('edit-slug') as HTMLInputElement).value.trim().toLowerCase()
      : initialSlug;
    const content = textarea.value;
    const encryptChecked = (document.getElementById('edit-encrypt') as HTMLInputElement).checked;
    const classification = (document.getElementById('edit-classification') as HTMLSelectElement).value;
    const expirySelect = document.getElementById('edit-expiry') as HTMLSelectElement;
    const expiryMin = expirySelect ? parseInt(expirySelect.value, 10) : 0;

    // Validate input slug
    if (isNewPage && !/^[a-z0-9-_]+$/.test(slug)) {
      alert('Security Alert: Slug contains illegal characters. Use alphanumeric, hyphens, and underscores only.');
      return;
    }

    const tags = currentTagsList.map(tag => sanitizeUnicode(tag.trim()).toLowerCase()).filter(tag => tag.length > 0);

    // Save previous state as revision history before saving new page (if page already exists)
    const prevPage = await getPageSecure(slug);
    if (prevPage) {
      await saveRevisionSecure({
        id: `${prevPage.slug}-${Date.now()}`,
        slug: prevPage.slug,
        title: prevPage.title,
        content: prevPage.content,
        updatedAt: prevPage.updatedAt,
        isEncrypted: prevPage.isEncrypted,
        tags: prevPage.tags,
        classification: prevPage.classification,
        signature: prevPage.signature
      });
    }

    // Encrypt content if checked
    let finalContent = content;
    if (encryptChecked) {
      if (!activeCryptoKey) {
        const pwd = prompt('Enter a security passphrase to encrypt this document (min 8 chars, mixed case, numbers, symbols):');
        if (!pwd) {
          alert('Encryption Aborted: A security passphrase is required to save an encrypted document.');
          return;
        }
        const strength = validatePasswordStrength(pwd);
        if (!strength.valid) {
          alert(`SECURITY ERROR: Passphrase too weak.\n\n${strength.message}`);
          return;
        }
        activeCryptoKey = await deriveKey(pwd);
      }
      try {
        finalContent = await encryptText(content, activeCryptoKey);
      } catch (err: any) {
        alert(`Encryption failure: ${err.message}`);
        return;
      }
    }

    const updatedPage: WikiPage = {
      slug,
      title,
      content: finalContent,
      updatedAt: Date.now(),
      tags,
      isSystem: isSystemPage,
      isEncrypted: encryptChecked,
      classification: classification as any
    };

    if (expiryMin > 0) {
      updatedPage.expiresAt = updatedPage.updatedAt + (expiryMin * 60 * 1000);
    }

    updatedPage.signature = await computePageSignature(updatedPage);

    try {
      await savePageSecure(updatedPage);
      cleanUpDraft();
      syncChannel.postMessage('refresh');
      window.location.hash = `#/page/${slug}`;
    } catch (err: any) {
      alert(`Database transaction error: ${err.message}`);
    }
  });
}

function parseMarkdownImport(fileName: string, rawText: string): WikiPage {
  let title = fileName.replace(/\.md$/i, '').replace(/[-_]+/g, ' ');
  title = title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  let slug = fileName.replace(/\.md$/i, '').toLowerCase().replace(/[^a-z0-9-_]+/g, '-');
  let content = rawText;
  let tags: string[] = ['imported'];
  
  if (rawText.startsWith('---')) {
    const endIdx = rawText.indexOf('---', 3);
    if (endIdx !== -1) {
      const frontmatterText = rawText.substring(3, endIdx);
      content = rawText.substring(endIdx + 3).trim();
      
      const lines = frontmatterText.split('\n');
      lines.forEach(line => {
        const colonIdx = line.indexOf(':');
        if (colonIdx !== -1) {
          const key = line.substring(0, colonIdx).trim().toLowerCase();
          const val = line.substring(colonIdx + 1).trim();
          
          if (key === 'title') {
            title = val.replace(/^["']|["']$/g, '');
          } else if (key === 'slug') {
            slug = val.replace(/[^a-z0-9-_]+/g, '-').toLowerCase();
          } else if (key === 'tags') {
            tags = val.split(',').map(t => t.trim().replace(/^["']|["']$/g, '')).filter(t => t.length > 0);
          }
        }
      });
    }
  }
  
  return {
    slug,
    title,
    content,
    updatedAt: Date.now(),
    tags,
    isSystem: false
  };
}

function generateCSVReport(pages: WikiPage[]): string {
  const headers = ['Title', 'Slug', 'Tags', 'Word Count', 'Encrypted', 'Last Updated'];
  const rows = pages.map(p => {
    const wordCount = p.content.split(/\s+/).filter(w => w.length > 0).length;
    return [
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.slug}"`,
      `"${p.tags.join(', ')}"`,
      wordCount,
      p.isEncrypted ? 'TRUE' : 'FALSE',
      `"${new Date(p.updatedAt).toISOString()}"`
    ];
  });
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

function generateConsolidatedHTML(pages: WikiPage[]): string {
  let pagesHtml = '';
  for (const page of pages) {
    let content = page.content;
    if (page.isEncrypted && activeCryptoKey) {
      try {
        content = page.content.includes(':') ? "🔒 [Encrypted Document: Passphrase Required]" : page.content;
      } catch {
        content = `🔒 [Encrypted Document: Passphrase Required]`;
      }
    }
    const rendered = renderMarkdownSecure(content);
    pagesHtml += `
      <section style="page-break-after: always; margin-bottom: 3rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-family: monospace; margin-bottom: 0.5rem; color: #1a202c;">${escapeHtml(page.title)}</h1>
        <div style="font-size: 0.75rem; color: #718096; font-family: monospace; margin-bottom: 1.5rem;">
          SLUG: ${page.slug} | TAGS: #${page.tags.map(t => escapeHtml(t)).join(', #')} | UPDATED: ${new Date(page.updatedAt).toLocaleString()}
        </div>
        <div style="line-height: 1.6; color: #2d3748;">
          ${rendered}
        </div>
      </section>
    `;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SecOps Wiki - Consolidated Document Register</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; color: #1a202c; background-color: #fff; }
    h1, h2, h3 { color: #1a202c; }
    pre { background: #f7fafc; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 4px; overflow-x: auto; }
    code { font-family: monospace; font-size: 0.9em; background: #edf2f7; padding: 0.2rem 0.4rem; border-radius: 3px; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { border: 1px solid #e2e8f0; padding: 0.5rem; text-align: left; }
    th { background: #f7fafc; }
    blockquote { border-left: 4px solid #4a5568; padding-left: 1rem; margin-left: 0; font-style: italic; color: #4a5568; }
    @media print {
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <header style="text-align: center; margin-bottom: 4rem; border-bottom: 3px double #cbd5e0; padding-bottom: 2rem;">
    <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem; font-family: monospace;">SECOPS INTEL REGISTER</h1>
    <p style="font-size: 0.875rem; color: #718096; font-family: monospace; text-transform: uppercase;">Consolidated Offline Backup File // Generated: ${new Date().toLocaleString()}</p>
  </header>
  ${pagesHtml}
</body>
</html>`;
}

function generateStaticWikiZip(pages: WikiPage[]): Blob {
  const files: { name: string; content: string }[] = [];

  const sidebarLinks = pages.map(p => {
    return `<a href="${p.slug}.html" style="display: block; padding: 0.5rem; color: #94a3b8; text-decoration: none; font-family: monospace; font-size: 0.8rem; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='#1e293b'; this.style.color='#2dd4bf'" onmouseout="this.style.background='transparent'; this.style.color='#94a3b8'">${escapeHtml(p.title)}</a>`;
  }).join('\n');

  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SecOps Static Wiki Index</title>
  <style>
    body {
      background-color: #0b0f19;
      color: #cbd5e1;
      font-family: ui-monospace, monospace;
      padding: 2rem;
      max-width: 1000px;
      margin: 0 auto;
      display: flex;
      gap: 2rem;
    }
    aside {
      width: 250px;
      border-right: 1px solid #1e293b;
      padding-right: 1.5rem;
      flex-shrink: 0;
    }
    main {
      flex-grow: 1;
    }
    h1 {
      font-size: 2rem;
      color: #f8fafc;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 0.5rem;
    }
    .page-card {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 8px;
      padding: 1.25rem;
      margin-bottom: 1rem;
    }
    .page-title {
      font-size: 1.25rem;
      font-weight: bold;
      color: #2dd4bf;
      text-decoration: none;
    }
    .page-title:hover {
      text-decoration: underline;
    }
    .metadata {
      font-size: 0.75rem;
      color: #64748b;
      margin-top: 0.5rem;
    }
  </style>
</head>
<body>
  <aside>
    <h3 style="color: #f8fafc; font-size: 0.9rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1rem; font-family: monospace;">Pages Registry</h3>
    <div style="display: flex; flex-direction: column; gap: 0.25rem;">
      ${sidebarLinks}
    </div>
  </aside>
  <main>
    <h1>SecOps Static Wiki Register</h1>
    <p style="margin-bottom: 2rem; color: #94a3b8; font-size: 0.85rem;">This is an offline-friendly static compilation of the active wiki database. Double-click any page in the sidebar or below to navigate.</p>
    <div>
      ${pages.map(p => `
        <div class="page-card">
          <a class="page-title" href="${p.slug}.html">${escapeHtml(p.title)}</a>
          <div class="metadata">
            SLUG: ${p.slug} | TAGS: #${p.tags.map(t => escapeHtml(t)).join(', #')} | UPDATED: ${new Date(p.updatedAt).toLocaleString()}
          </div>
        </div>
      `).join('')}
    </div>
  </main>
</body>
</html>`;

  files.push({ name: 'index.html', content: indexHtml });

  pages.forEach(p => {
    let content = p.content;
    if (p.isEncrypted && activeCryptoKey) {
      try {
        content = p.content.includes(':') ? "🔒 [Encrypted Document: Decrypted view not exported]" : p.content;
      } catch {
        content = "🔒 [Encrypted Document: Decrypted view not exported]";
      }
    }
    
    let rendered = renderMarkdownSecure(content);
    rendered = rendered.replace(/href="#\/page\/([a-z0-9-_]+)"/g, 'href="$1.html"');

    const pageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(p.title)} - SecOps Static Wiki</title>
  <style>
    body {
      background-color: #0b0f19;
      color: #cbd5e1;
      font-family: ui-monospace, monospace;
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      gap: 2rem;
    }
    aside {
      width: 250px;
      border-right: 1px solid #1e293b;
      padding-right: 1.5rem;
      flex-shrink: 0;
      overflow-y: auto;
      max-height: 90vh;
      position: sticky;
      top: 2rem;
    }
    main {
      flex-grow: 1;
      min-width: 0;
    }
    h1 {
      font-size: 2.25rem;
      color: #f8fafc;
      margin-bottom: 0.5rem;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 0.5rem;
    }
    h2 { font-size: 1.5rem; color: #f1f5f9; margin-top: 2rem; border-bottom: 1px solid #1e293b; padding-bottom: 0.3rem; }
    h3 { font-size: 1.25rem; color: #f1f5f9; margin-top: 1.5rem; }
    a { color: #2dd4bf; text-decoration: none; }
    a:hover { text-decoration: underline; }
    pre {
      background: #020617;
      border: 1px solid #1e293b;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
    }
    code {
      font-family: ui-monospace, monospace;
      background: #1e293b;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
      color: #e2e8f0;
    }
    pre code { background: none; padding: 0; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { border: 1px solid #1e293b; padding: 0.5rem; text-align: left; }
    th { background: #0f172a; color: #f1f5f9; }
    blockquote {
      border-left: 4px solid #0d9488;
      padding-left: 1rem;
      margin-left: 0;
      color: #94a3b8;
      font-style: italic;
    }
    .metadata {
      font-size: 0.75rem;
      color: #64748b;
      margin-bottom: 2rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .badge {
      display: inline-block;
      background: #134e4a;
      color: #2dd4bf;
      padding: 0.1rem 0.4rem;
      border-radius: 4px;
      font-size: 0.7rem;
      margin-right: 0.5rem;
      border: 1px solid #115e59;
    }
  </style>
</head>
<body>
  <aside>
    <a href="index.html" style="display: block; margin-bottom: 1.5rem; font-weight: bold; color: #f8fafc; text-decoration: none; font-size: 0.95rem;">← INDEX DIRECTORY</a>
    <h3 style="color: #f8fafc; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1rem;">Pages Registry</h3>
    <div style="display: flex; flex-direction: column; gap: 0.25rem;">
      ${sidebarLinks}
    </div>
  </aside>
  <main>
    <h1>${escapeHtml(p.title)}</h1>
    <div class="metadata">
      Slug: ${p.slug} &nbsp;|&nbsp; 
      Updated: ${new Date(p.updatedAt).toLocaleString()} &nbsp;|&nbsp;
      Tags: ${p.tags.map(t => `<span class="badge">#${escapeHtml(t)}</span>`).join('')}
    </div>
    <article class="wiki-content">
      ${rendered}
    </article>
  </main>
</body>
</html>`;

    files.push({ name: `${p.slug}.html`, content: pageHtml });
  });

  return generateZipArchive(files);
}

function parseCSV(text: string): Record<string, string>[] {
  const lines: string[] = [];
  let currentLine = '';
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      currentLine += char;
    } else if (char === '\n' && !inQuotes) {
      lines.push(currentLine);
      currentLine = '';
    } else {
      currentLine += char;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  
  if (lines.length < 2) return [];
  
  const parseLine = (line: string): string[] => {
    const cells: string[] = [];
    let cell = '';
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQ = !inQ;
      } else if (char === ',' && !inQ) {
        cells.push(cleanCell(cell));
        cell = '';
      } else {
        cell += char;
      }
    }
    cells.push(cleanCell(cell));
    return cells;
  };
  
  const cleanCell = (c: string): string => {
    c = c.trim();
    if (c.startsWith('"') && c.endsWith('"')) {
      c = c.substring(1, c.length - 1);
    }
    return c.replace(/""/g, '"');
  };
  
  const headers = parseLine(lines[0]).map(h => h.toLowerCase());
  const results: Record<string, string>[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const cells = parseLine(lines[i]);
    const obj: Record<string, string> = {};
    headers.forEach((h, index) => {
      obj[h] = cells[index] || '';
    });
    results.push(obj);
  }
  
  return results;
}

function csvRowToWikiPage(row: Record<string, string>): WikiPage {
  const title = row['title'] || 'Untitled CSV Import';
  const content = row['content'] || '';
  let slug = row['slug'] || title.toLowerCase().replace(/[^a-z0-9-_]+/g, '-');
  slug = slug.toLowerCase().replace(/[^a-z0-9-_]+/g, '-');
  if (!slug) {
    slug = `imported-${Date.now()}`;
  }
  
  const tagsStr = row['tags'] || 'imported, csv';
  const tags = tagsStr.split(/[,;|]+/).map(t => t.trim().toLowerCase()).filter(t => t.length > 0);
  
  const updatedAt = row['updatedat'] ? parseInt(row['updatedat']) : Date.now();
  
  return {
    slug,
    title,
    content,
    updatedAt: isNaN(updatedAt) ? Date.now() : updatedAt,
    tags,
    isSystem: false,
    isEncrypted: row['encrypted']?.toLowerCase() === 'true'
  };
}

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  text: string;
}
function computeDiffLines(str1: string, str2: string): DiffLine[] {
  const lines1 = str1.split('\n');
  const lines2 = str2.split('\n');
  const dp: number[][] = Array(lines1.length + 1).fill(0).map(() => Array(lines2.length + 1).fill(0));
  for (let i = 1; i <= lines1.length; i++) {
    for (let j = 1; j <= lines2.length; j++) {
      if (lines1[i-1] === lines2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }
  
  const diff: DiffLine[] = [];
  let i = lines1.length, j = lines2.length;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && lines1[i-1] === lines2[j-1]) {
      diff.unshift({ type: 'unchanged', text: lines1[i-1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) {
      diff.unshift({ type: 'added', text: lines2[j-1] });
      j--;
    } else {
      diff.unshift({ type: 'removed', text: lines1[i-1] });
      i--;
    }
  }
  return diff;
}

function showConflictDiffModal(existing: WikiPage, imported: WikiPage): Promise<'OVERWRITE' | 'REVISION' | 'MERGE_RENAME' | 'SKIP'> {
  return new Promise((resolve) => {
    let modal = document.getElementById('conflict-diff-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'conflict-diff-modal';
      modal.className = 'fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-[100] flex items-center justify-center p-4';
      document.body.appendChild(modal);
    }
    modal.classList.remove('hidden');
    
    const diffLines = computeDiffLines(existing.content, imported.content);
    const diffHtml = diffLines.map(line => {
      let cls = 'diff-line-unchanged';
      let prefix = ' ';
      if (line.type === 'added') {
        cls = 'diff-line-added px-1 rounded';
        prefix = '+';
      } else if (line.type === 'removed') {
        cls = 'diff-line-removed px-1 rounded';
        prefix = '-';
      }
      return `<div class="font-mono text-xs whitespace-pre-wrap ${cls}">${prefix} ${escapeHtml(line.text)}</div>`;
    }).join('\n');
    
    modal.innerHTML = `
      <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col glow-border shadow-2xl">
        <div class="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider">Conflict Detected: ${escapeHtml(existing.slug)}</h3>
          <span class="text-[10px] font-mono bg-red-950/40 text-red-400 border border-red-900/30 px-2 py-0.5 rounded">SLUG DUP_WARN</span>
        </div>
        
        <div class="p-4 overflow-y-auto space-y-4 flex-1">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg space-y-2">
              <h4 class="text-xs font-bold font-mono text-teal-400 uppercase">Existing Document</h4>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TITLE:</span> ${escapeHtml(existing.title)}</p>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TAGS:</span> ${existing.tags.map(t => `#${t}`).join(', ')}</p>
              <p class="text-[10px] font-mono text-slate-500"><span class="text-slate-500">MODIFIED:</span> ${new Date(existing.updatedAt).toLocaleString()}</p>
            </div>
            
            <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg space-y-2">
              <h4 class="text-xs font-bold font-mono text-teal-450 uppercase">Imported Document</h4>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TITLE:</span> ${escapeHtml(imported.title)}</p>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TAGS:</span> ${imported.tags.map(t => `#${t}`).join(', ')}</p>
              <p class="text-[10px] font-mono text-slate-500"><span class="text-slate-500">MODIFIED:</span> ${new Date(imported.updatedAt).toLocaleString()}</p>
            </div>
          </div>
          
          <div class="space-y-1">
            <h4 class="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">Line-by-line Content Diff (- Existing, + Imported)</h4>
            <div class="bg-slate-950 border border-slate-850 p-3 rounded-lg max-h-60 overflow-y-auto space-y-0.5">
              ${diffHtml}
            </div>
          </div>
        </div>
        
        <div class="p-4 border-t border-slate-800 bg-slate-950/50 flex flex-wrap gap-2 justify-end shrink-0">
          <button id="diff-opt-skip" class="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white font-mono text-xs uppercase rounded transition">
            Skip File
          </button>
          <button id="diff-opt-rename" class="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white font-mono text-xs uppercase rounded transition">
            Keep Both (Rename)
          </button>
          <button id="diff-opt-overwrite" class="px-3 py-1.5 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-xs uppercase rounded transition">
            Overwrite
          </button>
          <button id="diff-opt-archive" class="px-3 py-1.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">
            Archive & Replace
          </button>
        </div>
      </div>
    `;
    
    document.getElementById('diff-opt-skip')!.addEventListener('click', () => {
      modal!.classList.add('hidden');
      resolve('SKIP');
    });
    document.getElementById('diff-opt-rename')!.addEventListener('click', () => {
      modal!.classList.add('hidden');
      resolve('MERGE_RENAME');
    });
    document.getElementById('diff-opt-overwrite')!.addEventListener('click', () => {
      modal!.classList.add('hidden');
      resolve('OVERWRITE');
    });
    document.getElementById('diff-opt-archive')!.addEventListener('click', () => {
      modal!.classList.add('hidden');
      resolve('REVISION');
    });
  });
}

async function importWikiPage(page: WikiPage, mode: string): Promise<boolean> {
  const validated = validateImportedPage(page);
  const existing = await getPageSecure(validated.slug);
  
  if (existing) {
    let activeMode = mode;
    if (mode === 'ASK') {
      activeMode = await showConflictDiffModal(existing, validated);
    }
    
    if (activeMode === 'SKIP') {
      return false;
    }
    if (activeMode === 'REVISION') {
      await saveRevisionSecure({
        id: `${existing.slug}-${Date.now()}`,
        slug: existing.slug,
        title: existing.title,
        content: existing.content,
        updatedAt: existing.updatedAt,
        isEncrypted: existing.isEncrypted,
        tags: existing.tags,
        classification: existing.classification,
        signature: existing.signature
      });
      validated.signature = await computePageSignature(validated);
      await savePageSecure(validated);
    } else if (activeMode === 'OVERWRITE') {
      validated.signature = await computePageSignature(validated);
      await savePageSecure(validated);
    } else if (activeMode === 'MERGE_RENAME') {
      let newSlug = `${validated.slug}-imported`;
      let check = await getPageSecure(newSlug);
      let counter = 1;
      while (check) {
        newSlug = `${validated.slug}-imported-${counter}`;
        check = await getPageSecure(newSlug);
        counter++;
      }
      validated.slug = newSlug;
      validated.title = `${validated.title} (Imported)`;
      validated.signature = await computePageSignature(validated);
      await savePageSecure(validated);
    }
  } else {
    validated.signature = await computePageSignature(validated);
    await savePageSecure(validated);
  }
  return true;
}

async function handleFilesImport(files: FileList) {
  if (!files || files.length === 0) return;
  const resolutionMode = (document.getElementById('import-conflict-resolution') as HTMLSelectElement)?.value || 'REVISION';
  let mdSuccess = 0, csvSuccess = 0, jsonSuccess = 0;
  let mdSkip = 0, csvSkip = 0, jsonSkip = 0;
  let mdFail = 0, csvFail = 0, jsonFail = 0;
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = file.name.split('.').pop()?.toLowerCase();
    
    if (ext === 'md') {
      await new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const rawText = event.target?.result as string;
            const wikiPage = parseMarkdownImport(file.name, rawText);
            const success = await importWikiPage(wikiPage, resolutionMode);
            if (success) mdSuccess++;
            else mdSkip++;
          } catch {
            mdFail++;
          }
          resolve();
        };
        reader.readAsText(file);
      });
    } else if (ext === 'csv') {
      await new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const text = event.target?.result as string;
            const rows = parseCSV(text);
            for (const row of rows) {
              try {
                const pageData = csvRowToWikiPage(row);
                const success = await importWikiPage(pageData, resolutionMode);
                if (success) csvSuccess++;
                else csvSkip++;
              } catch {
                csvFail++;
              }
            }
          } catch {
            csvFail++;
          }
          resolve();
        };
        reader.readAsText(file);
      });
    } else if (ext === 'json') {
      await new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const json = JSON.parse(event.target?.result as string);
            let importData = json;
            
            if (json && json.encrypted === true && json.payload) {
              const password = prompt('Secure Backup: Enter password to decrypt database backup file:');
              if (password === null) {
                jsonFail++;
                resolve();
                return;
              }
              try {
                const key = await deriveKey(password);
                const decryptedStr = await decryptText(json.payload, key);
                importData = JSON.parse(decryptedStr);
              } catch (err) {
                alert('Backup Decryption Alert: Authentication failed. Invalid backup passphrase.');
                jsonFail++;
                resolve();
                return;
              }
            } else if (json && json.encrypted === false && json.payload) {
              importData = json.payload;
            }
            
            // Standardize items to an array of objects
            const items = Array.isArray(importData) ? importData : [importData];
            for (const item of items) {
              try {
                // Legacy schema version migration and normalization safeguards
                if (!item.slug && item.title) {
                  item.slug = item.title.toLowerCase().replace(/[^a-z0-9-_]+/g, '-');
                }
                if (!item.slug) {
                  item.slug = `imported-item-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
                }
                if (!item.title) {
                  item.title = item.slug.replace(/[-_]+/g, ' ');
                }
                if (typeof item.tags === 'string') {
                  item.tags = (item.tags as string).split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0);
                }
                if (!Array.isArray(item.tags)) {
                  item.tags = [];
                }
                if (!item.classification) {
                  item.classification = 'UNCLASSIFIED';
                }
                if (typeof item.updatedAt !== 'number') {
                  item.updatedAt = Date.now();
                }
                
                const success = await importWikiPage(item, resolutionMode);
                if (success) jsonSuccess++;
                else jsonSkip++;
              } catch {
                jsonFail++;
              }
            }
          } catch {
            jsonFail++;
          }
          resolve();
        };
        reader.readAsText(file);
      });
    }
  }
  
  alert(`INGESTION COMPLETED (Conflict resolution: ${resolutionMode.toUpperCase()}):\n\n` +
        `Markdown (.md) files:\n- Ingested: ${mdSuccess}\n- Skipped: ${mdSkip}\n- Failed: ${mdFail}\n\n` +
        `CSV files (rows):\n- Ingested: ${csvSuccess}\n- Skipped: ${csvSkip}\n- Failed: ${csvFail}\n\n` +
        `JSON files (records):\n- Ingested: ${jsonSuccess}\n- Skipped: ${jsonSkip}\n- Failed: ${jsonFail}`);
        
  syncChannel.postMessage('refresh');
  await refreshPagesList();
  await renderLayout();
}

async function renderTagColorManager() {
  const managerDiv = document.getElementById('tag-color-palette-manager');
  if (!managerDiv) return;
  
  const allTags = Array.from(new Set(wikiPagesList.flatMap(p => p.tags)));
  const colorsConfig = await getTagColors();
  
  if (allTags.length === 0) {
    managerDiv.innerHTML = `<p class="text-xs font-mono text-slate-500">No active document tags registered.</p>`;
    return;
  }
  
  let html = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">`;
  for (const tag of allTags) {
    const config = colorsConfig.find(c => c.tag === tag);
    const activeColor = config ? config.color : 'slate';
    
    html += `
      <div class="flex items-center justify-between p-2 bg-slate-950/40 border border-slate-800 rounded">
        <span class="text-xs font-mono text-slate-400">#${escapeHtml(tag)}</span>
        <select class="tag-color-select bg-slate-900 border border-slate-850 text-xs font-mono text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-teal-500 cursor-pointer" data-tag="${escapeHtml(tag)}">
          <option value="slate" ${activeColor === 'slate' ? 'selected' : ''}>SLATE GREY</option>
          <option value="emerald" ${activeColor === 'emerald' ? 'selected' : ''}>EMERALD GREEN</option>
          <option value="blue" ${activeColor === 'blue' ? 'selected' : ''}>BLUE TEAM</option>
          <option value="red" ${activeColor === 'red' ? 'selected' : ''}>RED TEAM</option>
          <option value="amber" ${activeColor === 'amber' ? 'selected' : ''}>AMBER CAUTION</option>
        </select>
      </div>
    `;
  }
  html += `</div>`;
  managerDiv.innerHTML = html;
  
  const selects = managerDiv.querySelectorAll('.tag-color-select');
  selects.forEach(select => {
    select.addEventListener('change', async (e) => {
      const tag = (e.currentTarget as HTMLSelectElement).getAttribute('data-tag')!;
      const color = (e.currentTarget as HTMLSelectElement).value;
      await saveTagColor({ tag, color });
      await cacheTagColors();
      await renderLayout();
    });
  });
}

// 3. Render System Administration View
function renderSystemView(container: HTMLElement) {
  const allTags = Array.from(new Set(wikiPagesList.flatMap(p => p.tags)));
  
  container.innerHTML = `
    <div class="space-y-6">
      <!-- Title -->
      <div class="border-b border-slate-800 pb-4">
        <h2 class="text-2xl font-bold font-mono text-white uppercase">System Operations Admin Console</h2>
        <p class="text-xs text-slate-500 font-mono">Diagnostic logs, backups, state sanitization, and security parameters.</p>
      </div>

      <!-- System Diagnostic Panel -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Security Configurations -->
        <div class="glass-panel border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-slate-800 pb-2">Active Security Parameters</h3>
          <ul class="space-y-2 text-xs font-mono">
            <li class="flex justify-between">
              <span class="text-slate-500">XSS SANITIZATION:</span>
              <span class="text-emerald-400">ACTIVE (DOMPurify v3.x)</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">CSP SCRIPT EXECUTIONS:</span>
              <span class="text-emerald-400">RESTRICTED ('self' only)</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">EXTERNAL CONNECTIONS:</span>
              <span class="text-emerald-400">BLOCKED (CSP rules)</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">DATABASE INTEGRITY:</span>
              <span class="text-emerald-400">VERIFIED (IndexedDB)</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">OFFLINE OPERATION:</span>
              <span class="text-emerald-400">ENABLED (PWA Cache v1)</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">AUDIT SCANS RUN:</span>
              <span class="text-emerald-400 font-bold">${getSanitizationCount()}</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">ACTIVE VISUAL THEME:</span>
              <span class="text-emerald-400 font-bold">${currentTheme.toUpperCase()}</span>
            </li>
            <li class="flex justify-between items-center py-0.5">
              <span class="text-slate-500">MASK ENCRYPTED CORES:</span>
              <label class="relative inline-flex items-center cursor-pointer select-none">
                <input type="checkbox" id="system-mask-encrypted-checkbox" class="sr-only peer" ${maskEncryptedTitles ? 'checked' : ''}>
                <div class="w-7 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-450 after:border-slate-350 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-teal-600 peer-checked:after:bg-white"></div>
              </label>
            </li>
            <li class="flex justify-between items-center py-0.5">
              <span class="text-slate-500">DATABASE ENCRYPTION:</span>
              <label class="relative inline-flex items-center cursor-pointer select-none">
                <input type="checkbox" id="system-db-encrypted-checkbox" class="sr-only peer" ${localStorage.getItem('secops-wiki-db-encrypted') === 'true' ? 'checked' : ''}>
                <div class="w-7 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-450 after:border-slate-350 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-teal-600 peer-checked:after:bg-white"></div>
              </label>
            </li>
            <li class="flex justify-between items-center py-0.5">
              <span class="text-slate-500">BIOMETRIC UNLOCK:</span>
              <button id="system-webauthn-register-btn" class="px-2 py-0.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-mono text-[9px] uppercase rounded transition">
                ${localStorage.getItem('secops-wiki-webauthn-gate') === 'true' ? 'DEREGISTER' : 'REGISTER'}
              </button>
            </li>
            <li class="flex justify-between items-center py-0.5">
              <span class="text-slate-500">INACTIVITY TIMEOUT:</span>
              <select id="system-session-timeout-select" class="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-300 focus:outline-none focus:border-teal-500 cursor-pointer">
                <option value="5" ${parseInt(localStorage.getItem('secops-wiki-session-timeout') || '15', 10) === 5 ? 'selected' : ''}>5 MIN</option>
                <option value="15" ${parseInt(localStorage.getItem('secops-wiki-session-timeout') || '15', 10) === 15 ? 'selected' : ''}>15 MIN</option>
                <option value="30" ${parseInt(localStorage.getItem('secops-wiki-session-timeout') || '15', 10) === 30 ? 'selected' : ''}>30 MIN</option>
                <option value="60" ${parseInt(localStorage.getItem('secops-wiki-session-timeout') || '15', 10) === 60 ? 'selected' : ''}>1 HOUR</option>
                <option value="0" ${parseInt(localStorage.getItem('secops-wiki-session-timeout') || '15', 10) === 0 ? 'selected' : ''}>NEVER</option>
              </select>
            </li>
          </ul>
        </div>

        <!-- Database Telemetry -->
        <div class="glass-panel border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-slate-800 pb-2">Database Stats</h3>
          <ul class="space-y-2 text-xs font-mono">
            <li class="flex justify-between">
              <span class="text-slate-500">TOTAL ARTICLES:</span>
              <span class="text-teal-400 font-bold" id="total-articles-telemetry">Calculating...</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">INDEX DB ALLOCATION:</span>
              <span class="text-teal-400">UNRESTRICTED (IndexedDB limit)</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">REVISION VERIFICATION:</span>
              <span class="text-teal-400">OK</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Actions Panel -->
      <div class="glass-panel border border-slate-800 rounded-xl p-5 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-2">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider">Data Operations & Backups</h3>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-mono text-slate-500 uppercase">Export Scope Tag:</span>
            <select id="export-tag-filter" class="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-slate-300 focus:outline-none focus:border-teal-500">
              <option value="ALL">ALL ARTICLES</option>
              ${allTags.map(tag => `
                <option value="${escapeHtml(tag)}">#${escapeHtml(tag)}</option>
              `).join('')}
            </select>
          </div>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Export Database JSON -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Export Database JSON</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Export scoped wiki contents to a validated JSON payload file.</p>
            </div>
            <button id="system-export-btn" class="w-full py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Download JSON
            </button>
          </div>

          <!-- Export Markdown ZIP -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Export Markdown ZIP</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Export scoped articles as separate .md documents inside a ZIP container.</p>
            </div>
            <button id="system-export-zip-btn" class="w-full py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Download ZIP
            </button>
          </div>

          <!-- Export Static Website HTML ZIP -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Static Web Book (ZIP)</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Export scoped articles as fully-functional, hyperlinked offline .html documents in a ZIP.</p>
            </div>
            <button id="system-export-web-zip-btn" class="w-full py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Download Web ZIP
            </button>
          </div>

          <!-- Export Consolidated HTML -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Consolidated HTML Book</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Export scoped pages concatenated into a single styled, printable HTML file.</p>
            </div>
            <button id="system-export-html-btn" class="w-full py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Download HTML
            </button>
          </div>

          <!-- Export CSV Report -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Export CSV Metadata</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Download a metadata and audit log spreadsheet report in CSV format.</p>
            </div>
            <button id="system-export-csv-btn" class="w-full py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Download CSV
            </button>
          </div>

          <!-- Conflict Resolution Options -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Conflict Resolution</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Select system behavior when importing existing page slugs.</p>
            </div>
            <select id="import-conflict-resolution" class="w-full py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition focus:outline-none focus:border-teal-500 text-center cursor-pointer">
              <option value="REVISION">ARCHIVE OLD AS REV</option>
              <option value="OVERWRITE">DIRECT OVERWRITE</option>
              <option value="SKIP">SKIP DUPLICATE</option>
              <option value="MERGE_RENAME">KEEP BOTH (RENAME)</option>
            </select>
          </div>

          <!-- Unified Ingestion Loader -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between sm:col-span-2 lg:col-span-3">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Unified Ingestion Loader</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Ingest JSON backup, CSV spreadsheet, or Markdown files (.md). Extension auto-detection will route and parse automatically.</p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
              <label class="flex-1 text-center py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded cursor-pointer transition hover:text-white block select-none">
                Select File(s)
                <input type="file" id="system-unified-import-file" accept=".json,.md,.csv" multiple class="hidden">
              </label>
              <div id="system-drop-zone" class="flex-[2] border-2 border-dashed border-slate-800 hover:border-teal-500/60 p-2 rounded flex items-center justify-center text-center transition-all cursor-pointer bg-slate-950/20 min-h-[38px]">
                <span class="text-[9px] font-mono text-slate-400 uppercase">Or Drag & Drop files here</span>
              </div>
            </div>
          </div>

          <!-- Tag Color Customization Palette -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between sm:col-span-2 lg:col-span-3">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Tag Theme Palette Manager</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Assign individual visual themes to active document tags.</p>
            </div>
            <div id="tag-color-palette-manager" class="mt-2 space-y-2">
              <!-- Tag manager dynamic elements will render here -->
            </div>
          </div>

          <!-- PWA Offline Cache Buster -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between sm:col-span-2 lg:col-span-3">
            <div>
              <h4 class="text-xs font-bold font-mono text-amber-400 uppercase">PWA Offline Cache Buster</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Purge cached service worker registrations and static asset cache buckets.</p>
            </div>
            <button id="system-cache-bust-btn" class="w-full py-2 bg-amber-950/20 border border-amber-900/30 hover:bg-amber-900/30 text-amber-400 hover:text-amber-300 font-mono text-xs uppercase rounded transition">
              Bust Cache
            </button>
          </div>

          <!-- Reset Default Database -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between sm:col-span-2 lg:col-span-3">
            <div>
              <h4 class="text-xs font-bold font-mono text-red-400 uppercase">Sanitize Storage</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Wipe all user edits and restore default template configuration.</p>
            </div>
            <button id="system-reset-btn" class="w-full py-2 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-xs uppercase rounded transition">
              Perform Wipe
            </button>
          </div>
        </div>
      </div>

      <!-- Database Diagnostics Report Container -->
      <div id="db-health-diagnostics" class="mt-6"></div>

      <!-- Autosave Draft Recovery Console -->
      <div class="glass-panel border border-slate-800 rounded-xl p-5 mt-6 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider">Autosave Draft Recovery Console</h3>
          <button id="system-wipe-all-drafts-btn" class="px-2.5 py-1 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-[10px] rounded transition uppercase">
            Wipe All Drafts
          </button>
        </div>
        <div id="system-drafts-recovery-list" class="space-y-3 max-h-60 overflow-y-auto divide-y divide-slate-850/40 pr-1">
          <!-- Unsaved draft fragments will render dynamically -->
        </div>
      </div>

      <!-- Security Audit Log Console -->
      <div class="glass-panel border border-slate-800 rounded-xl p-5 mt-6 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider">Security Event & Audit Log Console</h3>
          <div class="flex gap-2">
            <button id="system-prune-audit-btn" class="px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase">
              Prune >30 Days
            </button>
            <button id="system-wipe-audit-btn" class="px-2.5 py-1 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-[10px] rounded transition uppercase">
              Clear Audit Logs
            </button>
          </div>
        </div>
        <div id="system-audit-logs-list" class="space-y-2 max-h-60 overflow-y-auto divide-y divide-slate-850/40 pr-1">
          <!-- Dynamic audit logs will render here -->
        </div>
      </div>
    </div>
  `;

  // Bind export/import/wipe/zip actions
  const exportBtn = document.getElementById('system-export-btn')!;
  const exportZipBtn = document.getElementById('system-export-zip-btn')!;
  const exportWebZipBtn = document.getElementById('system-export-web-zip-btn')!;
  const exportCsvBtn = document.getElementById('system-export-csv-btn')!;
  const exportHtmlBtn = document.getElementById('system-export-html-btn')!;
  const unifiedImportInput = document.getElementById('system-unified-import-file') as HTMLInputElement;
  const resetBtn = document.getElementById('system-reset-btn')!;
  const statsLabel = document.getElementById('total-articles-telemetry')!;
  const diagnosticsContainer = document.getElementById('db-health-diagnostics')!;
  const dropZone = document.getElementById('system-drop-zone')!;

  statsLabel.textContent = wikiPagesList.length.toString();

  if (diagnosticsContainer) {
    runDatabaseDiagnostics(diagnosticsContainer);
  }

  // Render tag theme palette manager controls
  renderTagColorManager();

  const getScopedPages = (): WikiPage[] => {
    const filterSelect = document.getElementById('export-tag-filter') as HTMLSelectElement;
    const selectedTag = filterSelect?.value || 'ALL';
    return selectedTag === 'ALL'
      ? wikiPagesList
      : wikiPagesList.filter(p => p.tags.includes(selectedTag));
  };

  // Export database JSON handler
  exportBtn.addEventListener('click', async () => {
    const pagesToExport = getScopedPages();
    const password = prompt('Secure Backup: Enter a password to encrypt this database backup file (leave blank for plain JSON):');
    let finalBlob: Blob;
    let filename = `secops-wiki-backup-${Date.now()}.json`;
    
    if (password) {
      try {
        const key = await deriveKey(password);
        const dataStr = JSON.stringify(pagesToExport, null, 2);
        const ciphertext = await encryptText(dataStr, key);
        const encryptedBackup = {
          encrypted: true,
          schemaVersion: 4,
          payload: ciphertext
        };
        finalBlob = new Blob([JSON.stringify(encryptedBackup, null, 2)], { type: 'application/json' });
        filename = `secops-wiki-encrypted-backup-${Date.now()}.json`;
      } catch (err: any) {
        alert(`Backup encryption failed: ${err.message}`);
        return;
      }
    } else {
      if (password === null) return;
      const plaintextBackup = {
        encrypted: false,
        schemaVersion: 4,
        payload: pagesToExport
      };
      finalBlob = new Blob([JSON.stringify(plaintextBackup, null, 2)], { type: 'application/json' });
    }
    
    const url = URL.createObjectURL(finalBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Export database ZIP handler
  exportZipBtn.addEventListener('click', async () => {
    const pagesToExport = getScopedPages();
    const filesToPack: { name: string; content: string }[] = [];
    for (const page of pagesToExport) {
      let content = page.content;
      if (page.isEncrypted && activeCryptoKey) {
        try {
          content = await decryptText(page.content, activeCryptoKey);
        } catch {
          // Keep encrypted
        }
      }
      
      const fileHeader = `---
title: ${page.title}
slug: ${page.slug}
tags: ${page.tags.join(', ')}
updated: ${new Date(page.updatedAt).toISOString()}
encrypted: ${!!page.isEncrypted}
---

`;
      filesToPack.push({
        name: `${page.slug}.md`,
        content: fileHeader + content
      });
    }

    const zipBlob = generateZipArchive(filesToPack);
    const url = URL.createObjectURL(zipBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `secops-wiki-backup-${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Export Static Web ZIP handler
  exportWebZipBtn.addEventListener('click', () => {
    const pagesToExport = getScopedPages();
    const zipBlob = generateStaticWikiZip(pagesToExport);
    const url = URL.createObjectURL(zipBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `secops-wiki-web-${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Export CSV handler
  exportCsvBtn.addEventListener('click', () => {
    const pagesToExport = getScopedPages();
    const csvContent = generateCSVReport(pagesToExport);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `secops-wiki-report-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Export HTML Book handler
  exportHtmlBtn.addEventListener('click', () => {
    const pagesToExport = getScopedPages();
    const htmlContent = generateConsolidatedHTML(pagesToExport);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `secops-wiki-book-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Unified File Import Ingestion handler
  if (unifiedImportInput) {
    unifiedImportInput.addEventListener('change', async (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        await handleFilesImport(files);
      }
    });
  }

  // Drag & Drop event bindings for unified ingestion
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, false);
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.add('border-teal-500', 'bg-teal-950/10');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.remove('border-teal-500', 'bg-teal-950/10');
    }, false);
  });

  dropZone.addEventListener('drop', async (e) => {
    const dt = e.dataTransfer;
    const files = dt?.files;
    if (files && files.length > 0) {
      await handleFilesImport(files);
    }
  });

  dropZone.addEventListener('click', () => {
    if (unifiedImportInput) {
      unifiedImportInput.click();
    }
  });

  // Hard reset database handler
  resetBtn.addEventListener('click', async () => {
    const confirmation = prompt('CRITICAL SECURITY WARNING: Type "WIPE" to verify you want to delete ALL wiki pages and custom documents:');
    if (confirmation === 'WIPE') {
      try {
        await clearDatabase();
        // Clear SW Cache (Fix 4)
        if ('caches' in window) {
          try {
            const cacheNames = await caches.keys();
            for (const name of cacheNames) {
              await caches.delete(name);
            }
          } catch (err) {
            console.warn('Failed to clear caches: ', err);
          }
        }
        await seedDatabase();
        await cacheTagColors();
        alert('Database successfully wiped, caches invalidated, and seeded with standard operating defaults.');
        localStorage.setItem('secops-wiki-last-update', Date.now().toString());
        syncChannel.postMessage('refresh');
        await refreshPagesList();
        window.location.hash = '#/page/home';
      } catch (err: any) {
        alert(`Reset failed: ${err.message}`);
      }
    } else if (confirmation !== null) {
      alert('Sanitization aborted. Confirmation keyword mismatch.');
    }
  });

  // Bind session timeout select changes
  const timeoutSelect = document.getElementById('system-session-timeout-select') as HTMLSelectElement;
  if (timeoutSelect) {
    timeoutSelect.addEventListener('change', () => {
      localStorage.setItem('secops-wiki-session-timeout', timeoutSelect.value);
      resetInactivityTimeout();
    });
  }

  // Bind PWA Cache Buster click handler
  const cacheBustBtn = document.getElementById('system-cache-bust-btn');
  if (cacheBustBtn) {
    cacheBustBtn.addEventListener('click', async () => {
      if (confirm('CRITICAL DIAGNOSTICS: Purge cached service worker registrations and static asset cache buckets? This triggers an immediate application reload.')) {
        if ('serviceWorker' in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations();
          for (const reg of regs) {
            await reg.unregister();
          }
        }
        if ('caches' in window) {
          const keys = await caches.keys();
          for (const key of keys) {
            await caches.delete(key);
          }
        }
        alert('CACHE WIPE COMPLETED. Reloading system...');
        window.location.reload();
      }
    });
  }

  // Bind settings listeners
  const maskCheckbox = document.getElementById('system-mask-encrypted-checkbox') as HTMLInputElement;
  if (maskCheckbox) {
    maskCheckbox.addEventListener('change', () => {
      maskEncryptedTitles = maskCheckbox.checked;
      localStorage.setItem('secops-wiki-mask-encrypted', maskEncryptedTitles.toString());
      refreshPagesList().then(() => {
        renderLayout();
      });
    });
  }

  const dbEncryptCheckbox = document.getElementById('system-db-encrypted-checkbox') as HTMLInputElement;
  if (dbEncryptCheckbox) {
    dbEncryptCheckbox.addEventListener('change', async () => {
      const checked = dbEncryptCheckbox.checked;
      if (checked) {
        const passphrase = prompt('Enter a new Master Passphrase to secure the database (min 8 chars, mixed case, numbers, symbols):');
        if (!passphrase) {
          dbEncryptCheckbox.checked = false;
          return;
        }
        const strength = validatePasswordStrength(passphrase);
        if (!strength.valid) {
          alert(`SECURITY ERROR: Passphrase too weak.\n\n${strength.message}`);
          dbEncryptCheckbox.checked = false;
          return;
        }
        try {
          const derivedKey = await deriveKey(passphrase);
          activeMasterKey = derivedKey;
          localStorage.setItem('secops-wiki-db-encrypted', 'true');
          
          const rawPages = await getAllPages();
          for (const page of rawPages) {
            if (!page.isEncryptedAtRest) {
              await savePageSecure(page);
            }
          }
          
          alert('Database encryption successfully activated. All records are encrypted at rest.');
          await logSecurityEvent('DB_ENCRYPTION_ENABLED', 'Activated database encryption-at-rest.');
          await refreshPagesList();
          renderSystemView(container);
        } catch (err: any) {
          alert(`Activation failed: ${err.message}`);
          dbEncryptCheckbox.checked = false;
        }
      } else {
        const passphrase = prompt('Enter the current Master Passphrase to confirm decryption:');
        if (!passphrase) {
          dbEncryptCheckbox.checked = true;
          return;
        }
        try {
          const testKey = await deriveKey(passphrase);
          const isCorrect = await verifyMasterKey(testKey);
          if (!isCorrect) {
            alert('Verification Failed: Incorrect master passphrase.');
            dbEncryptCheckbox.checked = true;
            return;
          }
          
          const decryptedPages = await getAllPagesSecure();
          localStorage.setItem('secops-wiki-db-encrypted', 'false');
          localStorage.removeItem('secops-wiki-webauthn-gate');
          localStorage.removeItem('secops-wiki-webauthn-payload');
          localStorage.removeItem('secops-wiki-webauthn-salt');
          activeMasterKey = null;
          
          for (const page of decryptedPages) {
            const plaintextPage: WikiPage = {
              slug: page.slug,
              title: page.title,
              content: page.content,
              tags: page.tags,
              isSystem: page.isSystem,
              isEncrypted: page.isEncrypted,
              signature: page.signature,
              updatedAt: page.updatedAt
            };
            await savePage(plaintextPage);
          }
          
          alert('Database encryption-at-rest successfully deactivated.');
          await logSecurityEvent('DB_ENCRYPTION_DISABLED', 'Deactivated database encryption-at-rest.');
          await refreshPagesList();
          renderSystemView(container);
        } catch (err: any) {
          alert(`Deactivation failed: ${err.message}`);
          dbEncryptCheckbox.checked = true;
        }
      }
    });
  }

  const webauthnBtn = document.getElementById('system-webauthn-register-btn');
  if (webauthnBtn) {
    webauthnBtn.addEventListener('click', async () => {
      const isRegistered = localStorage.getItem('secops-wiki-webauthn-gate') === 'true';
      if (isRegistered) {
        if (confirm('Are you sure you want to deregister biometric credentials?')) {
          localStorage.removeItem('secops-wiki-webauthn-gate');
          localStorage.removeItem('secops-wiki-webauthn-payload');
          localStorage.removeItem('secops-wiki-webauthn-salt');
          alert('Biometric unlock credentials removed.');
          await logSecurityEvent('WEBAUTHN_DEREGISTER', 'Removed biometric credentials.');
          renderSystemView(container);
        }
      } else {
        await registerBiometricUnlock();
      }
    });
  }

  renderAuditLogsConsole();

  const pruneAuditBtn = document.getElementById('system-prune-audit-btn');
  if (pruneAuditBtn) {
    pruneAuditBtn.addEventListener('click', async () => {
      if (confirm('Audit Log Pruning: Confirm deletion of security logs older than 30 days?')) {
        await pruneAuditLogs(30);
        await logSecurityEvent('AUDIT_LOG_PRUNED', 'Manually pruned audit logs older than 30 days.');
        await renderAuditLogsConsole();
        alert('Audit logs successfully pruned.');
      }
    });
  }

  const clearAuditBtn = document.getElementById('system-wipe-audit-btn');
  if (clearAuditBtn) {
    clearAuditBtn.addEventListener('click', async () => {
      if (confirm('CRITICAL ACTION: Are you sure you want to purge the security audit log registers?')) {
        await clearAuditLogs();
        await logSecurityEvent('AUDIT_LOG_CLEARED', 'Security audit log register cleared.');
        await renderAuditLogsConsole();
      }
    });
  }

  // Render draft recovery console and bind its Wipe All button
  renderDraftRecoveryConsole();

  const wipeAllDraftsBtn = document.getElementById('system-wipe-all-drafts-btn');
  if (wipeAllDraftsBtn) {
    wipeAllDraftsBtn.addEventListener('click', () => {
      if (confirm('CRITICAL WARN: Purge all unsaved document draft fragments in local storage?')) {
        const draftKeys = [];
        for (let k = 0; k < localStorage.length; k++) {
          const key = localStorage.key(k) || '';
          if (key.startsWith('secops-wiki-draft-')) {
            draftKeys.push(key);
          }
        }
        draftKeys.forEach(k => localStorage.removeItem(k));
        renderDraftRecoveryConsole();
      }
    });
  }
}

function renderDraftRecoveryConsole() {
  const listContainer = document.getElementById('system-drafts-recovery-list');
  if (!listContainer) return;
  
  const draftKeys: string[] = [];
  for (let k = 0; k < localStorage.length; k++) {
    const key = localStorage.key(k) || '';
    if (key.startsWith('secops-wiki-draft-')) {
      draftKeys.push(key);
    }
  }
  
  const drafts = draftKeys.map(key => {
    try {
      const raw = localStorage.getItem(key) || '';
      const data = JSON.parse(raw);
      const slug = key.substring('secops-wiki-draft-'.length);
      return { key, slug, title: data.title || '(Untitled)', updatedAt: data.updatedAt || Date.now(), size: raw.length };
    } catch {
      return null;
    }
  }).filter(d => d !== null);
  
  if (drafts.length === 0) {
    listContainer.innerHTML = `<p class="text-xs font-mono text-slate-500">No unsaved drafts found in local storage.</p>`;
    return;
  }
  
  listContainer.innerHTML = drafts.map(draft => `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 first:pt-0">
      <div class="min-w-0">
        <p class="text-xs font-mono text-slate-350 truncate">DRAFT // ${escapeHtml(draft.title)}</p>
        <div class="flex items-center gap-2 mt-1 text-[9px] font-mono text-slate-500 uppercase">
          <span>SLUG: ${escapeHtml(draft.slug)}</span>
          <span>•</span>
          <span>SIZE: ${draft.size} B</span>
          <span>•</span>
          <span>SAVED: ${new Date(draft.updatedAt).toLocaleString()}</span>
        </div>
      </div>
      <div class="flex gap-2 shrink-0 self-start sm:self-auto">
        <button class="draft-action-restore px-2 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase" data-slug="${escapeHtml(draft.slug)}">
          Restore
        </button>
        <button class="draft-action-wipe px-2 py-1 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-[10px] rounded transition uppercase" data-key="${escapeHtml(draft.key)}">
          Wipe
        </button>
      </div>
    </div>
  `).join('');
  
  listContainer.querySelectorAll('.draft-action-restore').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const slug = (e.currentTarget as HTMLButtonElement).getAttribute('data-slug')!;
      isEditing = true;
      isNewPage = (slug === 'new');
      currentPageSlug = slug;
      window.location.hash = isNewPage ? '#/new' : `#/edit/${slug}`;
    });
  });
  
  listContainer.querySelectorAll('.draft-action-wipe').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = (e.currentTarget as HTMLButtonElement).getAttribute('data-key')!;
      localStorage.removeItem(key);
      renderDraftRecoveryConsole();
    });
  });
}

interface CommandPaletteItem {
  title: string;
  subtitle: string;
  icon: string;
  action: () => void;
}

// 4. Command Palette Helper Functions
function toggleCommandPalette() {
  const backdrop = document.getElementById('command-palette-backdrop');
  if (!backdrop) return;

  isCommandPaletteOpen = !isCommandPaletteOpen;
  if (isCommandPaletteOpen) {
    backdrop.classList.remove('hidden');
    const input = document.getElementById('command-palette-input') as HTMLInputElement;
    if (input) {
      input.value = '';
      input.focus();
    }
    activeCommandIndex = 0;
    renderPaletteResults();
  } else {
    backdrop.classList.add('hidden');
  }
}

function setupCommandPalette() {
  if (document.getElementById('command-palette-backdrop')) return;

  const backdrop = document.createElement('div');
  backdrop.id = 'command-palette-backdrop';
  backdrop.className = 'fixed inset-0 bg-[#090d16]/85 backdrop-blur-md z-50 flex items-start justify-center pt-20 hidden';
  
  backdrop.innerHTML = `
    <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl mx-4 glow-border">
      <input type="text" id="command-palette-input" placeholder="Search pages or run system commands..." class="w-full bg-slate-950/80 text-white font-mono text-sm p-4 outline-none border-b border-slate-800 focus:border-teal-500/30 placeholder-slate-500 transition">
      <div id="command-palette-results" class="max-h-80 overflow-y-auto divide-y divide-slate-850/40 p-2 space-y-1"></div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const input = document.getElementById('command-palette-input') as HTMLInputElement;
  input.addEventListener('input', () => {
    activeCommandIndex = 0;
    renderPaletteResults();
  });

  input.addEventListener('keydown', handlePaletteKeydown);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      toggleCommandPalette();
    }
  });
}

function renderPaletteResults() {
  const input = document.getElementById('command-palette-input') as HTMLInputElement;
  const resultsContainer = document.getElementById('command-palette-results');
  if (!resultsContainer) return;

  const query = input ? input.value.trim().toLowerCase() : '';
  
  const staticCommands: CommandPaletteItem[] = [
    {
      title: 'CREATE NEW PAGE',
      subtitle: 'Open the editor to establish a new document',
      icon: '➕',
      action: () => { window.location.hash = '#/new'; }
    },
    {
      title: 'TOGGLE THEME',
      subtitle: `Switch visual style (currently ${currentTheme})`,
      icon: '🌓',
      action: () => { toggleTheme(); }
    },
    {
      title: 'SYSTEM ADMIN',
      subtitle: 'Access operations console and db diagnostics',
      icon: '⚙️',
      action: () => { window.location.hash = '#/system'; }
    },
    {
      title: 'TACTICAL MAP VIEW',
      subtitle: 'Display interactive node relationship map',
      icon: '🗺️',
      action: () => { window.location.hash = '#/graph'; }
    },
    {
      title: 'PANIC PURGE PROTOCOL',
      subtitle: 'Emergency self-destruct - wipes all data',
      icon: '🚨',
      action: () => {
        const btn = document.getElementById('system-panic-btn');
        if (btn) btn.click();
      }
    }
  ];

  let itemsHTML = '';
  let indexCounter = 0;

  const matchingStatic = staticCommands.filter(c => 
    c.title.toLowerCase().includes(query) || c.subtitle.toLowerCase().includes(query)
  );

  let matchingPages: { page: WikiPage; score: number }[] = [];
  if (query) {
    matchingPages = wikiPagesList
      .map(page => ({ page, score: scoreSearchResult(decryptedSearchIndex.find(dp => dp.slug === page.slug) || page, query) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);
  } else {
    matchingPages = wikiPagesList.slice(0, 5).map(page => ({ page, score: 0 }));
  }

  const totalItemsCount = matchingStatic.length + matchingPages.length;
  if (activeCommandIndex >= totalItemsCount) {
    activeCommandIndex = 0;
  } else if (activeCommandIndex < 0) {
    activeCommandIndex = totalItemsCount - 1;
  }

  matchingStatic.forEach((cmd) => {
    const isActive = indexCounter === activeCommandIndex;
    itemsHTML += `
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${isActive ? 'command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500' : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'}" data-index="${indexCounter}">
        <div class="flex items-center gap-3">
          <span class="text-base">${cmd.icon}</span>
          <div>
            <div class="font-bold text-white uppercase">${cmd.title}</div>
            <div class="text-[10px] text-slate-500">${cmd.subtitle}</div>
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase">CMD</span>
      </div>
    `;
    indexCounter++;
  });

  matchingPages.forEach((item) => {
    const isActive = indexCounter === activeCommandIndex;
    const page = item.page;
    itemsHTML += `
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${isActive ? 'command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500' : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'}" data-index="${indexCounter}">
        <div class="flex items-center gap-3">
          <span class="text-base">${page.isEncrypted ? '🔒' : '📄'}</span>
          <div>
            <div class="font-bold text-white">${escapeHtml(page.title)}</div>
            <div class="text-[10px] text-slate-500">Slug: ${escapeHtml(page.slug)} ${page.tags.length ? `• tags: #${page.tags.map(t => escapeHtml(t)).join(', #')}` : ''}</div>
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase">PAGE</span>
      </div>
    `;
    indexCounter++;
  });

  if (totalItemsCount === 0) {
    itemsHTML = `<div class="text-center py-6 text-xs text-slate-600 font-mono">No matching commands or pages found.</div>`;
  }

  resultsContainer.innerHTML = itemsHTML;

  const itemElements = resultsContainer.querySelectorAll('.command-palette-item');
  itemElements.forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.getAttribute('data-index') || '0', 10);
      executePaletteAction(idx, matchingStatic, matchingPages);
    });
  });

  scrollActivePaletteItemIntoView();
}

function executePaletteAction(index: number, staticCommands: CommandPaletteItem[], matchingPages: { page: WikiPage }[]) {
  toggleCommandPalette();
  if (index < staticCommands.length) {
    staticCommands[index].action();
  } else {
    const pageIdx = index - staticCommands.length;
    if (pageIdx < matchingPages.length) {
      window.location.hash = `#/page/${matchingPages[pageIdx].page.slug}`;
    }
  }
}

function handlePaletteKeydown(e: KeyboardEvent) {
  const resultsContainer = document.getElementById('command-palette-results');
  if (!resultsContainer) return;

  const items = resultsContainer.querySelectorAll('.command-palette-item');
  if (items.length === 0) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeCommandIndex = (activeCommandIndex + 1) % items.length;
    renderPaletteResults();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeCommandIndex = (activeCommandIndex - 1 + items.length) % items.length;
    renderPaletteResults();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const activeEl = resultsContainer.querySelector('.command-item-active') as HTMLElement;
    if (activeEl) {
      activeEl.click();
    }
  } else if (e.key === 'Escape') {
    e.preventDefault();
    toggleCommandPalette();
  }
}

function scrollActivePaletteItemIntoView() {
  const resultsContainer = document.getElementById('command-palette-results');
  if (!resultsContainer) return;
  const activeEl = resultsContainer.querySelector('.command-item-active') as HTMLElement;
  if (activeEl) {
    activeEl.scrollIntoView({ block: 'nearest' });
  }
}

// 5. Autocomplete Suggestion Helper Functions
function showAutocompletePopup(textarea: HTMLTextAreaElement) {
  const popup = document.getElementById('autocomplete-popup');
  if (!popup) return;
  popup.classList.remove('hidden');
  updateAutocompletePopup(textarea);
}

function hideAutocompletePopup() {
  const popup = document.getElementById('autocomplete-popup');
  if (!popup) return;
  popup.classList.add('hidden');
  isAutocompleteActive = false;
}

function updateAutocompletePopup(textarea: HTMLTextAreaElement) {
  const popup = document.getElementById('autocomplete-popup');
  if (!popup) return;

  const query = autocompleteQuery.toLowerCase().trim();
  const matchingPages = wikiPagesList.filter(page => 
    page.title.toLowerCase().includes(query) || page.slug.toLowerCase().includes(query)
  );

  if (matchingPages.length === 0) {
    popup.innerHTML = `<div class="p-2 text-slate-500 italic">No matches found</div>`;
    return;
  }

  popup.innerHTML = matchingPages.map((page, idx) => `
    <div class="editor-autocomplete-item p-2 cursor-pointer transition ${idx === 0 ? 'active bg-teal-950/20 text-teal-400' : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'}" data-slug="${escapeHtml(page.slug)}" data-title="${escapeHtml(page.title)}">
      <span class="font-bold">${escapeHtml(page.title)}</span>
      <span class="text-[9px] text-slate-500 block truncate">Slug: ${escapeHtml(page.slug)}</span>
    </div>
  `).join('');

  popup.querySelectorAll('.editor-autocomplete-item').forEach(el => {
    el.addEventListener('click', (e) => {
      const item = e.currentTarget as HTMLElement;
      const slug = item.getAttribute('data-slug') || '';
      const title = item.getAttribute('data-title') || '';
      insertAutocompleteLink(textarea, title, slug);
    });
  });

  const coordinates = getCaretCoordinates(textarea, textarea.selectionStart);
  popup.style.left = `${Math.min(textarea.clientWidth - 260, Math.max(16, coordinates.left))}px`;
  popup.style.top = `${Math.min(textarea.clientHeight - 100, Math.max(40, coordinates.top + 20))}px`;
}

function getCaretCoordinates(textarea: HTMLTextAreaElement, position: number) {
  const text = textarea.value.substring(0, position);
  const lines = text.split('\n');
  const currentLineIdx = lines.length - 1;
  const currentLineText = lines[currentLineIdx];
  
  const charWidth = 8;
  const lineHeight = 20;
  
  const left = 16 + (currentLineText.length * charWidth) % (textarea.clientWidth - 40);
  const top = 12 + currentLineIdx * lineHeight - textarea.scrollTop;
  
  return { left, top };
}

function insertAutocompleteLink(textarea: HTMLTextAreaElement, title: string, slug: string) {
  const start = autocompleteStartIndex - 2;
  const end = textarea.selectionStart;
  const val = textarea.value;

  const linkText = `[${title}](#/page/${slug})`;
  textarea.value = val.substring(0, start) + linkText + val.substring(end);
  
  textarea.focus();
  textarea.selectionStart = start + linkText.length;
  textarea.selectionEnd = start + linkText.length;
  
  hideAutocompletePopup();
  
  const previewBox = document.getElementById('live-preview-box')!;
  if (previewBox) {
    previewBox.innerHTML = renderMarkdownSecure(textarea.value);
  }
}

// 6. Interactive Checklist Click Handler
async function toggleMarkdownCheckbox(slug: string, index: number, checked: boolean) {
  const page = await getPageSecure(slug);
  if (!page) return;

  let content = page.content;
  const isEncrypted = !!page.isEncrypted;
  
  if (isEncrypted) {
    if (!activeCryptoKey) {
      alert('Authentication Error: Decryption key is missing. Re-decrypt page first.');
      return;
    }
    try {
      content = await decryptText(content, activeCryptoKey);
    } catch {
      alert('Decryption failure.');
      return;
    }
  }

  let matchCount = 0;
  const checkboxRegex = /([-*+]\s+\[)([ xX])(\])/g;
  
  const updatedContent = content.replace(checkboxRegex, (match, p1, _p2, p3) => {
    if (matchCount === index) {
      matchCount++;
      return `${p1}${checked ? 'x' : ' '}${p3}`;
    }
    matchCount++;
    return match;
  });

  let finalContent = updatedContent;
  if (isEncrypted && activeCryptoKey) {
    finalContent = await encryptText(updatedContent, activeCryptoKey);
  }

  page.content = finalContent;
  page.updatedAt = Date.now();

  page.signature = await computePageSignature(page);
  await savePageSecure(page);
  
  syncChannel.postMessage('refresh');
  await refreshPagesList();
  
  const contentPortal = document.getElementById('main-content')!;
  if (contentPortal) {
    await renderPageView(contentPortal);
  }
}

// 7. Graph Navigation Map & Link Mechanics
interface GraphNode {
  id: string;
  title: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isEncrypted: boolean;
  isSystem: boolean;
}

interface GraphLink {
  source: string;
  target: string;
}

function extractLinksFromContent(content: string): string[] {
  const links: string[] = [];
  const hashLinkRegex = /(?:\(|"|^|\s)#\/page\/([a-z0-9-_]+)/g;
  let match;
  while ((match = hashLinkRegex.exec(content)) !== null) {
    links.push(match[1].toLowerCase());
  }
  return Array.from(new Set(links));
}

async function renderGraphView(container: HTMLElement) {
  container.innerHTML = `
    <div class="space-y-6">
      <div class="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold font-mono text-white uppercase">Tactical Node Relationship Map</h2>
          <p class="text-xs text-slate-500 font-mono">Interactive force-directed graph visualizing document links and citation clusters.</p>
        </div>
        <a href="#/page/home" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white self-start sm:self-auto">
          Back to Dashboard
        </a>
      </div>

      <!-- Canvas Panel -->
      <div class="glass-panel border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center relative min-h-[500px]">
        <canvas id="tactical-map-canvas" class="w-full h-[500px] bg-slate-950/40 rounded-lg"></canvas>
        
        <!-- Search Input Overlay -->
        <div class="absolute top-6 left-6 z-10 select-none max-w-[200px] sm:max-w-xs">
          <input type="text" id="map-search-input" placeholder="Search map nodes..." class="w-full bg-slate-950/90 border border-slate-800 focus:border-teal-500/50 hover:border-slate-700 rounded-lg py-1.5 px-3 text-xs text-slate-200 focus:outline-none transition font-mono shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
        </div>
        
        <!-- Controls Overlay -->
        <div class="absolute top-6 right-6 flex flex-col gap-2 z-10 select-none">
          <button id="map-zoom-in" title="Zoom In" class="w-8 h-8 flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-teal-400 text-slate-400 font-bold rounded shadow transition focus:outline-none">＋</button>
          <button id="map-zoom-out" title="Zoom Out" class="w-8 h-8 flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-teal-400 text-slate-400 font-bold rounded shadow transition focus:outline-none">－</button>
          <button id="map-zoom-reset" title="Reset View" class="w-8 h-8 flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-teal-400 text-slate-400 text-[10px] font-mono rounded shadow transition focus:outline-none uppercase">RST</button>
        </div>

        <!-- Legend Overlay -->
        <div class="absolute bottom-6 left-6 bg-slate-950/90 border border-slate-800 rounded-lg p-3 space-y-2 text-[10px] font-mono select-none pointer-events-none">
          <div class="text-xs font-bold text-white mb-1 uppercase tracking-wider">Map Legend</div>
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]"></span>
            <span class="text-slate-400">Standard Page</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
            <span class="text-slate-400">System Document</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
            <span class="text-slate-400">Encrypted Page</span>
          </div>
          <div class="h-px bg-slate-800 my-1"></div>
          <div class="text-slate-500">Drag nodes or scroll to zoom. Drag background to pan.</div>
        </div>
      </div>
    </div>
  `;

  const canvas = document.getElementById('tactical-map-canvas') as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext('2d')!;
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = 500 * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = 500;

  // Viewport transforms
  let zoom = 1.0;
  let panX = 0;
  let panY = 0;
  let isPanning = false;
  let startPanX = 0;
  let startPanY = 0;

  const nodes: GraphNode[] = wikiPagesList.map(page => {
    const x = width / 2 + (Math.random() - 0.5) * 100;
    const y = height / 2 + (Math.random() - 0.5) * 100;
    return {
      id: page.slug,
      title: page.title,
      x,
      y,
      vx: 0,
      vy: 0,
      radius: page.slug === 'home' ? 14 : 10,
      isEncrypted: !!page.isEncrypted,
      isSystem: !!page.isSystem
    };
  });

  const links: GraphLink[] = [];
  const nodeIds = new Set(nodes.map(n => n.id));

  for (const page of wikiPagesList) {
    let content = page.content;
    if (page.isEncrypted && activeCryptoKey) {
      try {
        content = await decryptText(page.content, activeCryptoKey);
      } catch {
        // cipher links ignored
      }
    }
    const targetSlugs = extractLinksFromContent(content);
    targetSlugs.forEach(target => {
      if (nodeIds.has(target) && target !== page.slug) {
        links.push({
          source: page.slug,
          target
        });
      }
    });
  }

  let dragNode: GraphNode | null = null;
  let hoverNode: GraphNode | null = null;
  let mouseX = 0;
  let mouseY = 0;
  let animationId = 0;

  let mapSearchQuery = '';
  const mapSearchInput = document.getElementById('map-search-input') as HTMLInputElement;
  if (mapSearchInput) {
    mapSearchInput.addEventListener('input', (e) => {
      mapSearchQuery = (e.target as HTMLInputElement).value.trim().toLowerCase();
    });
  }

  const kAttract = 0.02;
  const kRepel = 1200;
  const friction = 0.85;
  const gravity = 0.02;

  // Coordinates translation utility
  function screenToCanvas(sx: number, sy: number) {
    const cx = (sx - width / 2 - panX) / zoom + width / 2;
    const cy = (sy - height / 2 - panY) / zoom + height / 2;
    return { x: cx, y: cy };
  }

  function stepPhysics() {
    for (let i = 0; i < nodes.length; i++) {
      const n1 = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const distSq = dx * dx + dy * dy + 0.1;
        const dist = Math.sqrt(distSq);
        if (dist < 250) {
          const force = kRepel / distSq;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          if (n1 !== dragNode) {
            n1.vx -= fx;
            n1.vy -= fy;
          }
          if (n2 !== dragNode) {
            n2.vx += fx;
            n2.vy += fy;
          }
        }
      }
    }

    links.forEach(link => {
      const n1 = nodes.find(n => n.id === link.source)!;
      const n2 = nodes.find(n => n.id === link.target)!;
      if (!n1 || !n2) return;
      const dx = n2.x - n1.x;
      const dy = n2.y - n1.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
      const force = (dist - 100) * kAttract;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      if (n1 !== dragNode) {
        n1.vx += fx;
        n1.vy += fy;
      }
      if (n2 !== dragNode) {
        n2.vx -= fx;
        n2.vy -= fy;
      }
    });

    nodes.forEach(n => {
      if (n === dragNode) return;
      
      const dx = width / 2 - n.x;
      const dy = height / 2 - n.y;
      n.vx += dx * gravity;
      n.vy += dy * gravity;

      n.x += n.vx;
      n.y += n.vy;

      n.vx *= friction;
      n.vy *= friction;

      n.x = Math.max(n.radius, Math.min(width - n.radius, n.x));
      n.y = Math.max(n.radius, Math.min(height - n.radius, n.y));
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    // Apply viewport scale and translations relative to center
    ctx.translate(width / 2 + panX, height / 2 + panY);
    ctx.scale(zoom, zoom);
    ctx.translate(-width / 2, -height / 2);

    ctx.lineWidth = 1;
    links.forEach(link => {
      const n1 = nodes.find(n => n.id === link.source)!;
      const n2 = nodes.find(n => n.id === link.target)!;
      if (!n1 || !n2) return;

      const isQueryActive = mapSearchQuery.length > 0;
      const isMatch1 = isQueryActive && n1.title.toLowerCase().includes(mapSearchQuery);
      const isMatch2 = isQueryActive && n2.title.toLowerCase().includes(mapSearchQuery);

      const isHighlighted = (hoverNode && (hoverNode.id === n1.id || hoverNode.id === n2.id));
      
      let linkAlpha = 0.4;
      if (isQueryActive) {
        linkAlpha = (isMatch1 && isMatch2) ? 0.6 : 0.05;
      }

      ctx.strokeStyle = isHighlighted ? 'rgba(20, 184, 166, 0.6)' : `rgba(30, 41, 59, ${linkAlpha})`;
      ctx.lineWidth = isHighlighted ? 1.5 / zoom : 1 / zoom;

      ctx.beginPath();
      ctx.moveTo(n1.x, n1.y);
      ctx.lineTo(n2.x, n2.y);
      ctx.stroke();
    });

    nodes.forEach(n => {
      ctx.beginPath();
      
      const isQueryActive = mapSearchQuery.length > 0;
      const isMatch = isQueryActive && n.title.toLowerCase().includes(mapSearchQuery);
      
      let currentRadius = n.radius;
      let alpha = 1.0;
      let pulseGlow = 0;
      
      if (isQueryActive) {
        if (isMatch) {
          const pulse = Math.sin(Date.now() / 150) * 2 + 3;
          currentRadius = n.radius + pulse;
          pulseGlow = 15;
          alpha = 1.0;
        } else {
          alpha = 0.2;
        }
      }

      ctx.arc(n.x, n.y, currentRadius, 0, 2 * Math.PI);
      
      let fillColor = '#14b8a6';
      let shadowColor = 'rgba(20, 184, 166, 0.4)';
      if (n.isEncrypted) {
        fillColor = '#ef4444';
        shadowColor = 'rgba(239, 68, 68, 0.4)';
      } else if (n.isSystem) {
        fillColor = '#3b82f6';
        shadowColor = 'rgba(59, 130, 246, 0.4)';
      }

      ctx.fillStyle = fillColor;
      ctx.globalAlpha = alpha;
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = hoverNode === n ? 12 : (pulseGlow || 6);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * alpha})`;
      ctx.lineWidth = 1.5 / zoom;
      ctx.stroke();

      const isRedacted = n.isEncrypted && !activeCryptoKey && maskEncryptedTitles;
      const nodeTitle = isRedacted ? '[REDACTED CORE]' : n.title;

      ctx.fillStyle = hoverNode === n || isMatch ? `rgba(255, 255, 255, ${alpha})` : `rgba(148, 163, 184, ${alpha})`;
      ctx.font = hoverNode === n || isMatch ? `bold ${10 / zoom}px monospace` : `${9 / zoom}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(nodeTitle, n.x, n.y - currentRadius - (5 / zoom));
    });

    ctx.restore();
    ctx.globalAlpha = 1.0; // Reset global alpha
  }

  function loop() {
    stepPhysics();
    draw();
    animationId = requestAnimationFrame(loop);
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    const canvasMouse = screenToCanvas(sx, sy);
    mouseX = canvasMouse.x;
    mouseY = canvasMouse.y;

    if (dragNode) {
      dragNode.x = mouseX;
      dragNode.y = mouseY;
      dragNode.vx = 0;
      dragNode.vy = 0;
      return;
    }

    if (isPanning) {
      panX = sx - startPanX;
      panY = sy - startPanY;
      return;
    }

    hoverNode = null;
    for (const n of nodes) {
      const dx = n.x - mouseX;
      const dy = n.y - mouseY;
      if (dx * dx + dy * dy < (n.radius + 5) * (n.radius + 5)) {
        hoverNode = n;
        break;
      }
    }
  });

  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    if (hoverNode) {
      dragNode = hoverNode;
      const canvasMouse = screenToCanvas(sx, sy);
      dragNode.x = canvasMouse.x;
      dragNode.y = canvasMouse.y;
    } else {
      isPanning = true;
      startPanX = sx - panX;
      startPanY = sy - panY;
    }
  });

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    const mouseBefore = screenToCanvas(sx, sy);
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    zoom = Math.max(0.2, Math.min(4.0, zoom * zoomFactor));

    panX = sx - (mouseBefore.x - width / 2) * zoom - width / 2;
    panY = sy - (mouseBefore.y - height / 2) * zoom - height / 2;
  }, { passive: false });

  const handleMouseUp = () => {
    dragNode = null;
    isPanning = false;
  };
  window.addEventListener('mouseup', handleMouseUp);

  canvas.addEventListener('click', () => {
    if (hoverNode && !isPanning) {
      cancelAnimationFrame(animationId);
      window.location.hash = `#/page/${hoverNode.id}`;
    }
  });

  // Bind Overlay Controls
  const btnZoomIn = document.getElementById('map-zoom-in')!;
  const btnZoomOut = document.getElementById('map-zoom-out')!;
  const btnReset = document.getElementById('map-zoom-reset')!;

  btnZoomIn.addEventListener('click', () => {
    zoom = Math.min(4.0, zoom * 1.2);
  });
  btnZoomOut.addEventListener('click', () => {
    zoom = Math.max(0.2, zoom / 1.2);
  });
  btnReset.addEventListener('click', () => {
    zoom = 1.0;
    panX = 0;
    panY = 0;
  });

  loop();

  const cleanUpOnHashChange = () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('hashchange', cleanUpOnHashChange);
  };
  window.addEventListener('hashchange', cleanUpOnHashChange);
}

// 8. Database Health & Link Checker Diagnostics
async function runDatabaseDiagnostics(container: HTMLElement) {
  container.innerHTML = `
    <div class="text-xs font-mono text-slate-500 animate-pulse">Running security & link integrity scan...</div>
  `;

  const pages = await getAllPagesSecure();
  
  let totalBytes = 0;
  const encoder = new TextEncoder();
  pages.forEach(p => {
    const pageStr = JSON.stringify(p);
    totalBytes += encoder.encode(pageStr).length;
  });

  const sizeFormatted = totalBytes < 1024 
    ? `${totalBytes} Bytes`
    : totalBytes < 1024 * 1024
      ? `${(totalBytes / 1024).toFixed(2)} KB`
      : `${(totalBytes / (1024 * 1024)).toFixed(2)} MB`;

  const pageSlugs = new Set(pages.map(p => p.slug));
  const incomingLinks: { [slug: string]: string[] } = {};
  
  pages.forEach(p => {
    incomingLinks[p.slug] = [];
  });

  const brokenLinks: { source: string; target: string }[] = [];

  for (const page of pages) {
    let content = page.content;
    if (page.isEncrypted && activeCryptoKey) {
      try {
        content = await decryptText(page.content, activeCryptoKey);
      } catch {
        // encrypted contents ignored
      }
    }
    const targets = extractLinksFromContent(content);
    targets.forEach(target => {
      if (pageSlugs.has(target)) {
        if (target !== page.slug) {
          incomingLinks[target].push(page.slug);
        }
      } else {
        brokenLinks.push({ source: page.slug, target });
      }
    });
  }

  const orphanPages = pages.filter(p => p.slug !== 'home' && incomingLinks[p.slug].length === 0);

  container.innerHTML = `
    <div class="glass-panel border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
      <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-slate-800 pb-2">Database Integrity Report</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-center">
          <div class="text-[10px] text-slate-500 font-mono uppercase">Total Database Footprint</div>
          <div class="text-base font-bold text-teal-400 font-mono mt-1">${sizeFormatted}</div>
        </div>
        <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-center">
          <div class="text-[10px] text-slate-500 font-mono uppercase">Broken Reference Citations</div>
          <div class="text-base font-bold font-mono mt-1 ${brokenLinks.length > 0 ? 'text-red-400 animate-pulse' : 'text-emerald-400'}">${brokenLinks.length}</div>
        </div>
        <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-center">
          <div class="text-[10px] text-slate-500 font-mono uppercase">Orphaned Intel Documents</div>
          <div class="text-base font-bold font-mono mt-1 ${orphanPages.length > 0 ? 'text-amber-500' : 'text-emerald-400'}">${orphanPages.length}</div>
        </div>
      </div>

      <!-- Details -->
      <div class="space-y-3 pt-2 text-xs font-mono">
        <!-- Broken Links Details -->
        <div>
          <span class="text-slate-400 font-bold uppercase block mb-1">Broken Links Analysis:</span>
          ${brokenLinks.length === 0 ? `
            <span class="text-emerald-400 text-[10px]">✓ All internal page link references verified intact.</span>
          ` : `
            <div class="max-h-24 overflow-y-auto space-y-1 pr-1">
              ${brokenLinks.map(link => `
                <div class="text-[10px] text-red-400/80">📄 [${escapeHtml(link.source)}] references non-existent [${escapeHtml(link.target)}]</div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- Orphan Details -->
        <div>
          <span class="text-slate-400 font-bold uppercase block mb-1">Orphaned Documents (No incoming links):</span>
          ${orphanPages.length === 0 ? `
            <span class="text-emerald-400 text-[10px]">✓ All custom documents linked to operational flows.</span>
          ` : `
            <div class="max-h-24 overflow-y-auto space-y-1 pr-1">
              ${orphanPages.map(p => `
                <div class="text-[10px] text-amber-500/80">📄 [${escapeHtml(p.title)}] (slug: ${escapeHtml(p.slug)}) has zero citations</div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

// Kickstart App on Content Loaded

// ==========================================
// PHASE 4: ENTERPRISE ENHANCEMENTS
// ==========================================

let decryptedSearchIndex: WikiPage[] = [];

async function rebuildSearchIndex() {
  decryptedSearchIndex = [];
  for (const page of wikiPagesList) {
    let content = page.content;
    let title = page.title;
    if (page.isEncrypted && activeCryptoKey && page.slug === currentPageSlug) {
      try {
        content = await decryptText(page.content, activeCryptoKey);
      } catch {}
    }
    decryptedSearchIndex.push({
      ...page,
      content,
      title
    });
  }
}

async function saveRevisionSecure(rev: PageRevision): Promise<void> {
  const isDbEncrypted = localStorage.getItem('secops-wiki-db-encrypted') === 'true';
  if (isDbEncrypted && activeMasterKey) {
    const plaintextData = {
      title: rev.title,
      content: rev.content,
      isEncrypted: rev.isEncrypted,
      updatedAt: rev.updatedAt,
      tags: rev.tags,
      classification: rev.classification,
      signature: rev.signature
    };
    const encryptedStr = await encryptText(JSON.stringify(plaintextData), activeMasterKey);
    const encryptedRev: PageRevision = {
      id: rev.id,
      slug: rev.slug,
      title: '[REDACTED AT REST]',
      content: '[REDACTED AT REST]',
      updatedAt: rev.updatedAt,
      isEncryptedAtRest: true,
      encryptedData: encryptedStr
    };
    await saveRevision(encryptedRev);
  } else {
    await saveRevision(rev);
  }

  // Compact historical revisions (retaining maximum 20 revisions)
  try {
    const allRevs = await getPageRevisions(rev.slug);
    if (allRevs.length > 20) {
      for (let i = 20; i < allRevs.length; i++) {
        await deleteRevision(allRevs[i].id);
      }
    }
  } catch (err) {
    console.warn('Failed to compact revisions for slug:', rev.slug, err);
  }
}

async function getPageRevisionsSecure(slug: string): Promise<PageRevision[]> {
  const rawRevs = await getPageRevisions(slug);
  const revs: PageRevision[] = [];
  for (const rev of rawRevs) {
    if (rev.isEncryptedAtRest && rev.encryptedData) {
      if (!activeMasterKey) {
        revs.push({
          id: rev.id,
          slug: rev.slug,
          title: '[DATABASE LOCKED]',
          content: 'Master passphrase required to unlock this database record.',
          updatedAt: rev.updatedAt,
          isEncrypted: false
        });
        continue;
      }
      try {
        const decryptedStr = await decryptText(rev.encryptedData, activeMasterKey);
        const decryptedData = JSON.parse(decryptedStr);
        revs.push({
          id: rev.id,
          slug: rev.slug,
          title: decryptedData.title,
          content: decryptedData.content,
          updatedAt: decryptedData.updatedAt,
          isEncrypted: decryptedData.isEncrypted,
          tags: decryptedData.tags,
          classification: decryptedData.classification,
          signature: decryptedData.signature
        });
      } catch (err) {
        console.error('Failed to decrypt revision at rest:', err);
      }
    } else {
      revs.push(rev);
    }
  }
  return revs;
}

async function verifyMasterKey(key: CryptoKey): Promise<boolean> {
  const rawPages = await getAllPages();
  for (const p of rawPages) {
    if (p.isEncryptedAtRest && p.encryptedData) {
      try {
        await decryptText(p.encryptedData, key);
        return true; // decrypted at least one successfully
      } catch {
        return false;
      }
    }
  }
  return true; // assume correct if no encrypted records exist
}

function showMasterUnlockScreen() {
  let unlockEl = document.getElementById('master-unlock-overlay');
  if (!unlockEl) {
    unlockEl = document.createElement('div');
    unlockEl.id = 'master-unlock-overlay';
    unlockEl.className = 'fixed inset-0 bg-[#060814]/98 backdrop-blur-xl z-[100] flex items-center justify-center p-4';
    document.body.appendChild(unlockEl);
  }
  
  const hasGate = localStorage.getItem('secops-wiki-webauthn-gate') === 'true';
  const bioBtnHtml = hasGate ? `
    <button type="button" id="master-unlock-biometric-btn" class="flex-1 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-mono text-xs uppercase rounded transition hover:text-white flex items-center justify-center gap-1.5">
      <span>👤 TouchID/Hello</span>
    </button>
  ` : '';
  
  unlockEl.innerHTML = `
    <div class="glass-panel border border-red-900/30 rounded-xl w-full max-w-md p-6 space-y-6 glow-border shadow-2xl text-center">
      <div class="space-y-2">
        <div class="w-16 h-16 bg-red-950/30 border border-red-900/50 rounded-full flex items-center justify-center mx-auto mb-2 text-red-500 animate-pulse">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h2 class="text-xl font-bold font-mono text-white uppercase tracking-wider">DATABASE LOCKED</h2>
        <p class="text-xs text-slate-500 font-mono">This SecOps Wiki instance enforces database encryption-at-rest. Enter the master passphrase to derive the AES-GCM session key.</p>
      </div>

      <form id="master-unlock-form" class="space-y-4">
        <input type="password" id="master-unlock-input" placeholder="Enter Master Passphrase..." required class="w-full bg-slate-950/80 border border-slate-800 focus:border-red-500/50 rounded-lg p-3 text-sm text-slate-200 focus:outline-none transition font-mono text-center">
        <div id="master-unlock-error" class="text-[10px] text-red-400 font-mono hidden">INCORRECT PASSPHRASE - DECRYPTION KEY DERIVATION FAILED</div>
        
        <div class="flex gap-2 pt-2">
          ${bioBtnHtml}
          <button type="submit" class="flex-[2] py-2.5 bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-600 hover:to-rose-600 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_15px_rgba(220,38,38,0.2)]">
            Decrypt Database
          </button>
        </div>
      </form>

      <div class="border-t border-slate-900 pt-4 flex flex-col items-center gap-2">
        <button id="master-unlock-wipe-btn" class="text-[10px] text-red-400 hover:text-red-300 font-mono uppercase underline">
          Sanitize & Wipe Database
        </button>
      </div>
    </div>
  `;

  const form = document.getElementById('master-unlock-form') as HTMLFormElement;
  const input = document.getElementById('master-unlock-input') as HTMLInputElement;
  const errDiv = document.getElementById('master-unlock-error')!;
  const wipeBtn = document.getElementById('master-unlock-wipe-btn')!;
  const bioBtn = document.getElementById('master-unlock-biometric-btn')!;

  setTimeout(() => input?.focus(), 50);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errDiv.classList.add('hidden');
    const pwd = input.value;
    try {
      const derivedKey = await deriveKey(pwd);
      const isCorrect = await verifyMasterKey(derivedKey);
      if (isCorrect) {
        activeMasterKey = derivedKey;
        unlockDatabaseRest();
      } else {
        errDiv.classList.remove('hidden');
        input.value = '';
        input.focus();
        await logSecurityEvent('DECRYPT_FAIL', 'Master database unlock attempt with invalid passphrase.');
      }
    } catch (err: any) {
      errDiv.textContent = `ERROR: ${err.message.toUpperCase()}`;
      errDiv.classList.remove('hidden');
    }
  });

  wipeBtn.addEventListener('click', async () => {
    if (confirm('CRITICAL ACTION: Are you sure you want to completely wipe this database? All encrypted records and system procedures will be permanently deleted.')) {
      const verify = prompt('Type "WIPE" to confirm sanitization:');
      if (verify === 'WIPE') {
        await clearDatabase();
        await seedDatabase();
        localStorage.removeItem('secops-wiki-db-encrypted');
        localStorage.removeItem('secops-wiki-webauthn-gate');
        localStorage.removeItem('secops-wiki-webauthn-payload');
        localStorage.removeItem('secops-wiki-webauthn-salt');
        activeMasterKey = null;
        unlockEl.remove();
        alert('Database successfully wiped and reset to default plaintext configuration.');
        window.location.reload();
      }
    }
  });

  if (bioBtn) {
    bioBtn.addEventListener('click', async () => {
      await handleBiometricUnlock();
    });
  }
}

function unlockDatabaseRest() {
  const unlockEl = document.getElementById('master-unlock-overlay');
  if (unlockEl) {
    unlockEl.remove();
  }
  logSecurityEvent('SESSION_UNLOCK', 'Database session unlocked and decrypted at rest.');
  
  refreshPagesList().then(() => {
    setupIdleTracker();
    setupCommandPalette();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    handleRoute();
  });
}

function setupAttachmentHandlers(textarea: HTMLTextAreaElement) {
  const handleFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = (reader.result as string).split(',')[1];
      const id = `att-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      let keyToUse = activeCryptoKey || activeMasterKey;
      let finalData = base64Data;
      
      if (keyToUse) {
        try {
          finalData = await encryptText(base64Data, keyToUse);
        } catch (err) {
          console.error('Failed to encrypt attachment:', err);
        }
      }
      
      const att: Attachment = {
        id,
        name: file.name,
        mimeType: file.type,
        data: finalData
      };
      
      await saveAttachment(att);
      await logSecurityEvent('ATTACHMENT_SAVE', `Saved attachment ${file.name} (ID: ${id}, size: ${file.size} bytes).`);
      
      const insertText = file.type.startsWith('image/')
        ? `![${file.name}](attachment://${id})`
        : `[Attachment: ${file.name}](attachment://${id})`;
      
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, start) + insertText + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + insertText.length;
      textarea.dispatchEvent(new Event('input'));
    };
    reader.readAsDataURL(file);
  };

  textarea.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  textarea.addEventListener('drop', async (e) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        await handleFile(files[i]);
      }
    }
  });

  textarea.addEventListener('paste', async (e) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'file') {
          const file = items[i].getAsFile();
          if (file) {
            await handleFile(file);
          }
        }
      }
    }
  });
}

async function resolveAttachments(container: HTMLElement) {
  const imgs = container.querySelectorAll('img[src^="attachment://"]');
  for (const img of Array.from(imgs) as HTMLImageElement[]) {
    const id = img.src.replace('attachment://', '').split('/').pop() || '';
    const att = await getAttachment(id);
    if (att) {
      const objectUrl = await decryptAttachmentToUrl(att);
      if (objectUrl) {
        img.src = objectUrl;
      }
    }
  }

  const links = container.querySelectorAll('a[href^="attachment://"]');
  for (const link of Array.from(links) as HTMLAnchorElement[]) {
    const id = link.href.replace('attachment://', '').split('/').pop() || '';
    const att = await getAttachment(id);
    if (att) {
      const objectUrl = await decryptAttachmentToUrl(att);
      if (objectUrl) {
        link.href = objectUrl;
        link.download = att.name;
      }
    }
  }
}

async function decryptAttachmentToUrl(att: any): Promise<string | null> {
  let rawBase64 = att.data;
  if (rawBase64.includes(':')) {
    let decrypted = null;
    if (activeCryptoKey) {
      try {
        decrypted = await decryptText(rawBase64, activeCryptoKey);
      } catch {}
    }
    if (!decrypted && activeMasterKey) {
      try {
        decrypted = await decryptText(rawBase64, activeMasterKey);
      } catch {}
    }
    if (!decrypted) return null;
    rawBase64 = decrypted;
  }
  
  try {
    const binary = atob(rawBase64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([array], { type: att.mimeType });
    return URL.createObjectURL(blob);
  } catch (e) {
    console.error('Failed to parse base64 for attachment:', e);
    return null;
  }
}

async function renderAuditLogsConsole() {
  const listContainer = document.getElementById('system-audit-logs-list');
  if (!listContainer) return;
  
  const logs = await getAllAuditLogs();
  if (logs.length === 0) {
    listContainer.innerHTML = `<p class="text-xs font-mono text-slate-500">No security audit logs found.</p>`;
    return;
  }
  
  listContainer.innerHTML = `
    <table class="w-full text-[10px] font-mono text-slate-350">
      <thead>
        <tr class="border-b border-slate-800 text-slate-500 text-left">
          <th class="py-1">TIMESTAMP</th>
          <th class="py-1">EVENT TYPE</th>
          <th class="py-1">DETAILS / DIAGNOSTICS</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-900/50">
        ${logs.map(log => `
          <tr class="hover:bg-slate-950/20">
            <td class="py-1.5 text-slate-500 select-none">${new Date(log.timestamp).toLocaleString()}</td>
            <td class="py-1.5 font-bold ${log.event.includes('FAIL') || log.event.includes('DELETE') || log.event.includes('WIPE') ? 'text-red-400' : 'text-teal-400'}">${escapeHtml(log.event)}</td>
            <td class="py-1.5 text-slate-400 max-w-xs truncate" title="${escapeHtml(log.details)}">${escapeHtml(log.details)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function openDrawingCanvas(textarea: HTMLTextAreaElement) {
  let modal = document.getElementById('drawing-canvas-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'drawing-canvas-modal';
    modal.className = 'fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-50 flex items-center justify-center p-4';
    document.body.appendChild(modal);
  }
  
  modal.innerHTML = `
    <div class="glass-panel border border-slate-800 rounded-xl w-full max-w-2xl p-5 space-y-4 glow-border shadow-2xl flex flex-col">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2 shrink-0">
        <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider">Tactical Drawing Canvas</h3>
        <span class="text-[10px] font-mono text-slate-500">Draw topologies, flows, or diagrams</span>
      </div>
      
      <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-2 border border-slate-850 rounded-lg shrink-0 select-none">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-[10px] font-mono text-slate-500 uppercase">Tool:</span>
          <button id="draw-tool-pen" class="px-2 py-1 bg-teal-950/40 border border-teal-800 text-teal-400 font-mono text-[10px] rounded font-bold uppercase">Pen</button>
          <button id="draw-tool-eraser" class="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 font-mono text-[10px] rounded hover:text-white uppercase">Eraser</button>
          <button id="draw-tool-line" class="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 font-mono text-[10px] rounded hover:text-white uppercase">Line</button>
          <button id="draw-tool-arrow" class="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 font-mono text-[10px] rounded hover:text-white uppercase">Arrow</button>
          <button id="draw-tool-rect" class="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 font-mono text-[10px] rounded hover:text-white uppercase">Box</button>
          <button id="draw-tool-circle" class="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 font-mono text-[10px] rounded hover:text-white uppercase">Circle</button>
        </div>
        
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-mono text-slate-500 uppercase">Size:</span>
          <select id="draw-brush-size" class="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-300 focus:outline-none cursor-pointer">
            <option value="2">Thin (2px)</option>
            <option value="5" selected>Medium (5px)</option>
            <option value="10">Thick (10px)</option>
            <option value="20">Marker (20px)</option>
          </select>
        </div>
        
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-mono text-slate-500 uppercase">Color:</span>
          <div class="flex gap-1" id="draw-color-palette">
            <button class="w-4 h-4 rounded-full border border-white bg-white" data-color="#ffffff"></button>
            <button class="w-4 h-4 rounded-full border border-transparent bg-teal-400" data-color="#2dd4bf"></button>
            <button class="w-4 h-4 rounded-full border border-transparent bg-emerald-400" data-color="#34d399"></button>
            <button class="w-4 h-4 rounded-full border border-transparent bg-blue-400" data-color="#60a5fa"></button>
            <button class="w-4 h-4 rounded-full border border-transparent bg-amber-400" data-color="#fbbf24"></button>
            <button class="w-4 h-4 rounded-full border border-transparent bg-red-400" data-color="#f87171"></button>
          </div>
        </div>
        
        <div class="flex items-center gap-1.5">
          <button id="draw-undo-btn" class="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 hover:text-white font-mono text-[10px] rounded uppercase">Undo</button>
          <button id="draw-redo-btn" class="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 hover:text-white font-mono text-[10px] rounded uppercase">Redo</button>
          <button id="draw-clear-btn" class="px-2 py-1 bg-red-950/20 border border-red-900/30 text-red-400 hover:bg-red-900/30 font-mono text-[10px] rounded transition uppercase">Clear</button>
        </div>
      </div>
      
      <div class="bg-slate-950 border border-slate-850 rounded-lg overflow-hidden flex items-center justify-center p-2 min-h-[300px] flex-1 relative">
        <canvas id="sketch-canvas" width="600" height="350" class="bg-slate-950 border border-slate-900 cursor-crosshair rounded shadow-inner block max-w-full max-h-[350px]"></canvas>
      </div>
      
      <div class="flex justify-end gap-3 shrink-0 pt-2 border-t border-slate-800">
        <button id="draw-cancel-btn" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-mono text-xs uppercase rounded transition hover:text-white">Cancel</button>
        <button id="draw-save-btn" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">Save & Embed</button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  const canvas = document.getElementById('sketch-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  
  const dpr = window.devicePixelRatio || 1;
  const logicalWidth = 600;
  const logicalHeight = 350;
  
  canvas.width = logicalWidth * dpr;
  canvas.height = logicalHeight * dpr;
  canvas.style.width = `${logicalWidth}px`;
  canvas.style.height = `${logicalHeight}px`;
  
  ctx.scale(dpr, dpr);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 5;

  ctx.fillStyle = '#060814';
  ctx.fillRect(0, 0, logicalWidth, logicalHeight);

  let drawing = false;
  let currentTool = 'pen'; // pen, eraser, line, arrow, rect, circle
  let currentColor = '#ffffff';
  let startX = 0;
  let startY = 0;
  let snapshot: ImageData;

  // Undo/Redo History Stack
  const undoStack: ImageData[] = [];
  const redoStack: ImageData[] = [];

  // Capture initial blank state
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));

  const getMousePos = (e: MouseEvent | TouchEvent) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (logicalWidth / rect.width),
      y: (clientY - rect.top) * (logicalHeight / rect.height)
    };
  };

  const startDraw = (e: MouseEvent | TouchEvent) => {
    drawing = true;
    const pos = getMousePos(e);
    startX = pos.x;
    startY = pos.y;
    
    // Capture snapshot for shape previews
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    if (currentTool === 'pen' || currentTool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
    }
    e.preventDefault();
  };

  const draw = (e: MouseEvent | TouchEvent) => {
    if (!drawing) return;
    const pos = getMousePos(e);
    const brushWidth = parseInt(sizeSelect.value, 10);
    
    if (currentTool === 'pen' || currentTool === 'eraser') {
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = currentTool === 'eraser' ? '#060814' : currentColor;
      ctx.lineWidth = brushWidth;
      ctx.stroke();
    } else {
      // Restore previous state snapshot to clear last preview
      ctx.putImageData(snapshot, 0, 0);
      
      // Draw shape preview
      ctx.beginPath();
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushWidth;
      
      if (currentTool === 'line') {
        ctx.moveTo(startX, startY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      } else if (currentTool === 'arrow') {
        ctx.moveTo(startX, startY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        
        // Draw arrowhead at current pointer
        const angle = Math.atan2(pos.y - startY, pos.x - startX);
        const headLength = Math.max(10, brushWidth * 2.5);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(pos.x - headLength * Math.cos(angle - Math.PI / 6), pos.y - headLength * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(pos.x - headLength * Math.cos(angle + Math.PI / 6), pos.y - headLength * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fillStyle = currentColor;
        ctx.fill();
      } else if (currentTool === 'rect') {
        ctx.rect(startX, startY, pos.x - startX, pos.y - startY);
        ctx.stroke();
      } else if (currentTool === 'circle') {
        const radius = Math.sqrt(Math.pow(pos.x - startX, 2) + Math.pow(pos.y - startY, 2));
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
    e.preventDefault();
  };

  const stopDraw = () => {
    if (drawing) {
      if (currentTool === 'pen' || currentTool === 'eraser') {
        ctx.closePath();
      }
      drawing = false;
      
      // Save committed state to history stack
      undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      redoStack.length = 0; // Clear redo history
    }
  };

  const triggerUndo = () => {
    if (undoStack.length > 1) {
      const currentState = undoStack.pop()!;
      redoStack.push(currentState);
      const prevState = undoStack[undoStack.length - 1];
      ctx.putImageData(prevState, 0, 0);
    }
  };

  const triggerRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.pop()!;
      undoStack.push(nextState);
      ctx.putImageData(nextState, 0, 0);
    }
  };

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  window.addEventListener('mouseup', stopDraw);

  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  window.addEventListener('touchend', stopDraw);

  // Bind keydown events for Ctrl+Z and Ctrl+Y
  const handleCanvasKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault();
      triggerUndo();
    } else if (e.ctrlKey && e.key === 'y') {
      e.preventDefault();
      triggerRedo();
    }
  };
  window.addEventListener('keydown', handleCanvasKeydown);

  // Tool buttons configuration
  const tools = ['pen', 'eraser', 'line', 'arrow', 'rect', 'circle'];
  const setTool = (tool: string) => {
    currentTool = tool;
    tools.forEach(t => {
      const btn = document.getElementById(`draw-tool-${t}`)!;
      if (t === tool) {
        btn.className = 'px-2 py-1 bg-teal-950/40 border border-teal-800 text-teal-400 font-mono text-[10px] rounded font-bold uppercase';
      } else {
        btn.className = 'px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 font-mono text-[10px] rounded hover:text-white uppercase';
      }
    });
  };

  tools.forEach(t => {
    const btn = document.getElementById(`draw-tool-${t}`)!;
    btn.addEventListener('click', () => setTool(t));
  });

  const sizeSelect = document.getElementById('draw-brush-size') as HTMLSelectElement;
  const clearBtn = document.getElementById('draw-clear-btn')!;
  const cancelBtn = document.getElementById('draw-cancel-btn')!;
  const saveBtn = document.getElementById('draw-save-btn')!;
  const colorPalette = document.getElementById('draw-color-palette')!;
  const undoBtn = document.getElementById('draw-undo-btn')!;
  const redoBtn = document.getElementById('draw-redo-btn')!;

  colorPalette.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('button');
    if (btn) {
      currentColor = btn.getAttribute('data-color') || '#ffffff';
      colorPalette.querySelectorAll('button').forEach(b => b.classList.replace('border-white', 'border-transparent'));
      btn.classList.replace('border-transparent', 'border-white');
    }
  });

  clearBtn.addEventListener('click', () => {
    if (confirm('Clear the canvas drawing?')) {
      ctx.fillStyle = '#060814';
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);
      undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      redoStack.length = 0;
    }
  });

  undoBtn.addEventListener('click', triggerUndo);
  redoBtn.addEventListener('click', triggerRedo);

  const cleanup = () => {
    window.removeEventListener('mouseup', stopDraw);
    window.removeEventListener('touchend', stopDraw);
    window.removeEventListener('keydown', handleCanvasKeydown);
    modal!.classList.add('hidden');
  };

  cancelBtn.addEventListener('click', cleanup);

  saveBtn.addEventListener('click', () => {
    const dataUrl = canvas.toDataURL('image/png');
    const markdown = `![Tactical Sketch](${dataUrl})`;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    textarea.value = textarea.value.substring(0, start) + markdown + textarea.value.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + markdown.length;
    textarea.dispatchEvent(new Event('input'));
    cleanup();
  });
}

async function registerBiometricUnlock() {
  if (!activeMasterKey) {
    alert('Unlock Required: Unlock the database using your passphrase before registering biometric lock.');
    return;
  }
  
  const pwd = prompt('Verify Identity: Enter your current master passphrase to bind to biometric unlock:');
  if (!pwd) return;
  
  const testKey = await deriveKey(pwd);
  const isCorrect = await verifyMasterKey(testKey);
  if (!isCorrect) {
    alert('Verification Failed: Incorrect passphrase.');
    return;
  }
  
  try {
    const challenge = crypto.getRandomValues(new Uint8Array(32));
    const credential = await navigator.credentials.create({
      publicKey: {
        challenge,
        rp: { name: "SecOps Wiki", id: window.location.hostname || "localhost" },
        user: {
          id: crypto.getRandomValues(new Uint8Array(16)),
          name: "operator@secops.local",
          displayName: "SecOps Operator"
        },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 },
          { type: "public-key", alg: -257 }
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required"
        },
        timeout: 60000
      }
    }) as any;
    
    if (credential) {
      const credIdBytes = new Uint8Array((credential as any).rawId);
      const credIdHex = Array.from(credIdBytes).map(b => b.toString(16).padStart(2, '0')).join('');
      
      const saltBytes = crypto.getRandomValues(new Uint8Array(32));
      const saltHex = Array.from(saltBytes).map(b => b.toString(16).padStart(2, '0')).join('');
      localStorage.setItem('secops-wiki-webauthn-salt', saltHex);
      
      const combinedEntropy = `${credIdHex}:${saltHex}`;
      const encKey = await deriveKey(combinedEntropy);
      const encryptedPwd = await encryptText(pwd, encKey);
      
      localStorage.setItem('secops-wiki-webauthn-payload', encryptedPwd);
      localStorage.setItem('secops-wiki-webauthn-gate', 'true');
      alert('Biometric credential successfully registered with WebAuthn platform gate.');
      await logSecurityEvent('WEBAUTHN_REGISTER', 'Biometric credentials registered successfully.');
      renderSystemView(document.getElementById('main-content')!);
    }
  } catch (e: any) {
    alert(`Biometric registration failed: ${e.message}`);
    await logSecurityEvent('WEBAUTHN_FAIL', `Biometric registration failed: ${e.message}`);
  }
}

async function handleBiometricUnlock() {
  const hasGate = localStorage.getItem('secops-wiki-webauthn-gate') === 'true';
  const payload = localStorage.getItem('secops-wiki-webauthn-payload');
  if (!hasGate || !payload) {
    alert('Biometric Unlock is not registered. Setup biometric credentials in settings first.');
    return;
  }
  
  try {
    const challenge = crypto.getRandomValues(new Uint8Array(32));
    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge,
        rpId: window.location.hostname || "localhost",
        userVerification: "required",
        timeout: 60000
      }
    });
    
    if (assertion) {
      const credIdBytes = new Uint8Array((assertion as any).rawId);
      const credIdHex = Array.from(credIdBytes).map(b => b.toString(16).padStart(2, '0')).join('');
      
      const saltHex = localStorage.getItem('secops-wiki-webauthn-salt') || '';
      if (!saltHex) {
        throw new Error('Biometric decryption salt is missing from storage.');
      }
      
      const combinedEntropy = `${credIdHex}:${saltHex}`;
      const encKey = await deriveKey(combinedEntropy);
      const decryptedPwd = await decryptText(payload, encKey);
      const derivedKey = await deriveKey(decryptedPwd);
      
      const isCorrect = await verifyMasterKey(derivedKey);
      if (isCorrect) {
        activeMasterKey = derivedKey;
        unlockDatabaseRest();
      } else {
        alert('Biometric validation failed: Stored credentials mismatch.');
      }
    }
  } catch (e: any) {
    alert(`Biometric verification failed: ${e.message}`);
    await logSecurityEvent('WEBAUTHN_FAIL', `Biometric unlock failed: ${e.message}`);
  }
}

interface TagTreeNode {
  name: string;
  fullPath: string;
  children: { [name: string]: TagTreeNode };
  pages: WikiPage[];
}

function buildTagTree(pages: WikiPage[]): TagTreeNode {
  const root: TagTreeNode = { name: 'Root', fullPath: '', children: {}, pages: [] };
  for (const page of pages) {
    for (const tag of page.tags) {
      const parts = tag.split('/');
      let current = root;
      let pathAccumulator = '';
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i].trim();
        if (!part) continue;
        pathAccumulator = pathAccumulator ? `${pathAccumulator}/${part}` : part;
        if (!current.children[part]) {
          current.children[part] = {
            name: part,
            fullPath: pathAccumulator,
            children: {},
            pages: []
          };
        }
        current = current.children[part];
      }
      current.pages.push(page);
    }
  }
  return root;
}

function renderTagTree(node: TagTreeNode, depth = 0): string {
  let html = '';
  const keys = Object.keys(node.children).sort();
  
  for (const key of keys) {
    const child = node.children[key];
    const hasChildren = Object.keys(child.children).length > 0 || child.pages.length > 0;
    if (!hasChildren) continue;
    
    const path = child.fullPath;
    html += `
      <div class="tree-folder">
        <div class="tree-folder-header flex items-center gap-1.5 px-3 py-1 cursor-pointer hover:bg-slate-900/40 text-xs font-mono text-slate-450 select-none rounded-lg" data-path="${escapeHtml(path)}" tabindex="0">
          <span class="tree-folder-icon text-[9px] transition-transform duration-200 text-slate-600" style="display: inline-block;">▶</span>
          <span>📁 ${escapeHtml(child.name)}</span>
        </div>
        <div class="tree-folder-children hidden pl-3.5 space-y-0.5 animate-fade-in" data-path="${escapeHtml(path)}">
          ${renderTagTree(child, depth + 1)}
          ${child.pages.map(p => {
            const isActive = currentPageSlug === p.slug && !isEditing;
            const isRedacted = p.isEncrypted && !activeCryptoKey && maskEncryptedTitles;
            const displayTitle = isRedacted ? `[REDACTED CORE]` : p.title;
            const targetHref = isRedacted ? 'javascript:void(0)' : `#/page/${p.slug}`;
            const clickHandler = isRedacted ? `onclick="alert('SECURITY WARNING: Document is locked. Enter passphrase to decrypt cores first.');"` : '';
            return `
              <a href="${targetHref}" ${clickHandler} class="flex items-center justify-between px-3 py-1 rounded-lg text-[11px] font-mono transition ${isActive ? 'bg-teal-950/20 text-teal-400 font-bold border-l border-teal-500' : 'text-slate-450 hover:bg-slate-900/30 hover:text-slate-200'}" tabindex="0">
                <span class="truncate flex items-center gap-1">
                  ${p.isEncrypted ? '🔒' : '⊙'} ${escapeHtml(displayTitle)}
                </span>
              </a>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
  return html;
}

function setupSandboxes(container: HTMLElement) {
  const codeElements = container.querySelectorAll('code.language-javascript-sandbox, code.language-html-sandbox');
  codeElements.forEach((codeEl) => {
    const pre = codeEl.parentElement;
    if (!pre || pre.tagName.toLowerCase() !== 'pre') return;
    if (pre.querySelector('.sandbox-run-btn')) return;
    
    const isHtml = codeEl.classList.contains('language-html-sandbox');
    const code = codeEl.textContent || '';
    
    const runBtn = document.createElement('button');
    runBtn.className = 'sandbox-run-btn absolute top-2 right-12 px-2 py-0.5 bg-teal-950/40 border border-teal-800 text-teal-400 hover:text-teal-300 font-mono text-[9px] rounded uppercase font-bold transition z-10';
    runBtn.textContent = 'Run Sandbox';
    
    pre.classList.add('relative');
    pre.appendChild(runBtn);
    
    const sandboxWrapper = document.createElement('div');
    sandboxWrapper.className = 'sandbox-iframe-wrapper mt-2 hidden border border-slate-800 rounded-lg overflow-hidden bg-slate-950';
    pre.after(sandboxWrapper);
    
    runBtn.addEventListener('click', () => {
      const isHidden = sandboxWrapper.classList.toggle('hidden');
      if (isHidden) {
        runBtn.textContent = 'Run Sandbox';
        sandboxWrapper.innerHTML = '';
      } else {
        runBtn.textContent = 'Close Sandbox';
        sandboxWrapper.innerHTML = `
          <div class="bg-slate-900 px-3 py-1 border-b border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400 select-none">
            <span>LIVE ISO-SANDBOX CONSOLE</span>
            <button class="sandbox-close-inner-btn text-red-400 hover:text-red-300 font-bold">CLOSE</button>
          </div>
          <iframe sandbox="allow-scripts" class="w-full h-64 bg-slate-950" id="sandbox-frame-${Date.now()}"></iframe>
        `;
        
        const iframe = sandboxWrapper.querySelector('iframe') as HTMLIFrameElement;
        let iframeContent = '';
        if (isHtml) {
          iframeContent = code;
        } else {
          iframeContent = `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body {
                    background-color: #060814;
                    color: #cbd5e1;
                    font-family: monospace;
                    font-size: 12px;
                    padding: 12px;
                    margin: 0;
                  }
                  #console {
                    white-space: pre-wrap;
                  }
                </style>
              </head>
              <body>
                <div id="console"></div>
                <script>
                  const consoleDiv = document.getElementById('console');
                  const log = (...args) => {
                    consoleDiv.textContent += args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ') + '\\n';
                  };
                  window.console = {
                    log: log,
                    info: log,
                    warn: log,
                    error: log
                  };
                  try {
                    ${code}
                  } catch (err) {
                    log('ERROR:', err.message);
                  }
                </script>
              </body>
            </html>
          `;
        }
        iframe.srcdoc = iframeContent;
        
        sandboxWrapper.querySelector('.sandbox-close-inner-btn')?.addEventListener('click', () => {
          sandboxWrapper.classList.add('hidden');
          runBtn.textContent = 'Run Sandbox';
          sandboxWrapper.innerHTML = '';
        });
      }
    });
  });
}

async function renderP2PImportView(container: HTMLElement) {
  const hash = window.location.hash;
  const queryIdx = hash.indexOf('?');
  if (queryIdx === -1) {
    container.innerHTML = `<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P IMPORT ERROR: Missing decryption parameters in link.</div>`;
    return;
  }
  
  const urlParams = new URLSearchParams(hash.substring(queryIdx));
  const dataBase64 = urlParams.get('data');
  const sharePassword = urlParams.get('key');
  
  if (!dataBase64 || !sharePassword) {
    container.innerHTML = `<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P IMPORT ERROR: Invalid parameters.</div>`;
    return;
  }
  
  try {
    const key = await deriveKey(sharePassword);
    const encryptedStr = atob(decodeURIComponent(dataBase64));
    const decryptedStr = await decryptText(encryptedStr, key);
    const payload = JSON.parse(decryptedStr);
    
    container.innerHTML = `
      <div class="glass-panel border border-teal-905 rounded-xl p-6 space-y-6 glow-border">
        <div class="border-b border-slate-800 pb-4">
          <h2 class="text-xl font-bold font-mono text-white uppercase">Secure P2P Page Import</h2>
          <p class="text-xs text-slate-500 font-mono">Verify and import the decrypted document below into your offline storage.</p>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-[10px] font-mono text-slate-500 uppercase">Document Title:</label>
            <div class="text-white font-mono text-sm font-bold mt-1">${escapeHtml(payload.title)}</div>
          </div>
          
          <div>
            <label class="block text-[10px] font-mono text-slate-500 uppercase">Associated Tags:</label>
            <div class="flex gap-1.5 mt-1">
              ${payload.tags.map((t: string) => `<span class="bg-slate-900/60 text-slate-400 border border-slate-850 px-2 py-0.5 rounded text-[10px] font-mono">#${escapeHtml(t)}</span>`).join('')}
            </div>
          </div>
          
          <div>
            <label class="block text-[10px] font-mono text-slate-500 uppercase">Decrypted Content Preview:</label>
            <div class="bg-slate-950/60 p-4 border border-slate-850 rounded-lg max-h-60 overflow-y-auto text-xs font-mono text-slate-350 wiki-content whitespace-pre-wrap mt-1">${escapeHtml(payload.content)}</div>
          </div>
        </div>
        
        <div class="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <a href="#/page/home" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-mono text-xs uppercase rounded transition hover:text-white">Cancel</a>
          <button id="p2p-import-confirm-btn" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">Import to Database</button>
        </div>
      </div>
    `;
    
    document.getElementById('p2p-import-confirm-btn')?.addEventListener('click', async () => {
      let slug = payload.title.toLowerCase().replace(/[^a-z0-9-_]+/g, '-');
      if (!slug) slug = `p2p-import-${Date.now()}`;
      
      let newSlug = slug;
      let check = await getPageSecure(newSlug);
      if (check) {
        const overwrite = confirm(`CONFLICT ALERT: A document with slug "${newSlug}" already exists in your wiki database.\n\nClick OK to overwrite the existing document.\nClick Cancel to import it as a duplicate under an auto-generated title.`);
        if (!overwrite) {
          let counter = 1;
          while (check) {
            newSlug = `${slug}-${counter}`;
            check = await getPageSecure(newSlug);
            counter++;
          }
        }
      }
      
      const newPage: WikiPage = {
        slug: newSlug,
        title: payload.title,
        content: payload.content,
        tags: payload.tags,
        updatedAt: Date.now()
      };
      
      newPage.signature = await computePageSignature(newPage);
      await savePageSecure(newPage);
      await logSecurityEvent('P2P_IMPORT_SUCCESS', `Imported decrypted page: ${payload.title} (slug: ${newSlug})`);
      alert('Intel Entry imported successfully.');
      window.location.hash = `#/page/${newSlug}`;
    });
    
  } catch (err: any) {
    container.innerHTML = `<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P DECRYPTION ERROR: ${escapeHtml(err.message)}</div>`;
  }
}


document.addEventListener('DOMContentLoaded', init);
