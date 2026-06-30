export interface WikiPage {
  slug: string;
  title: string;
  content: string;
  updatedAt: number;
  tags: string[];
  isSystem?: boolean;
  isEncrypted?: boolean;
  signature?: string;
  isEncryptedAtRest?: boolean;
  encryptedData?: string;
  classification?: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP SECRET';
  expiresAt?: number;
}

export interface PageRevision {
  id: string; // `${slug}-${timestamp}`
  slug: string;
  title: string;
  content: string;
  updatedAt: number;
  isEncrypted?: boolean;
  isEncryptedAtRest?: boolean;
  encryptedData?: string;
  tags?: string[];
  classification?: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP SECRET';
  signature?: string;
}

const DB_NAME = 'secops-wiki-db';
const STORE_NAME = 'pages';
const REV_STORE_NAME = 'revisions';
const DB_VERSION = 5;

function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => {
        db.close();
        alert('SECURITY NOTICE: The database schema is being updated by another active session. This connection has been closed to prevent blocking. Please reload to resume.');
        window.location.reload();
      };
      resolve(db);
    };
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'slug' });
      }
      if (!db.objectStoreNames.contains(REV_STORE_NAME)) {
        const revStore = db.createObjectStore(REV_STORE_NAME, { keyPath: 'id' });
        revStore.createIndex('slug', 'slug', { unique: false });
      }
      if (!db.objectStoreNames.contains('tagColors')) {
        db.createObjectStore('tagColors', { keyPath: 'tag' });
      }
      if (!db.objectStoreNames.contains('attachments')) {
        db.createObjectStore('attachments', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('auditLogs')) {
        db.createObjectStore('auditLogs', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('templates')) {
        db.createObjectStore('templates', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('backups')) {
        db.createObjectStore('backups', { keyPath: 'id' });
      }
    };
  });
}

export async function getPage(slug: string): Promise<WikiPage | null> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(slug);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || null);
  });
}

export async function savePage(page: WikiPage): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(page);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function deletePage(slug: string): Promise<void> {
  await deletePageRevisions(slug);
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(slug);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function getAllPages(): Promise<WikiPage[]> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || []);
  });
}

export async function saveRevision(rev: PageRevision): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(REV_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(REV_STORE_NAME);
    const request = store.put(rev);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function getPageRevisions(slug: string): Promise<PageRevision[]> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(REV_STORE_NAME, 'readonly');
    const store = transaction.objectStore(REV_STORE_NAME);
    const index = store.index('slug');
    const request = index.getAll(slug);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const results = request.result || [];
      results.sort((a, b) => b.updatedAt - a.updatedAt);
      resolve(results);
    };
  });
}

export async function deletePageRevisions(slug: string): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(REV_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(REV_STORE_NAME);
    const index = store.index('slug');
    const request = index.openCursor(slug);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      } else {
        resolve();
      }
    };
  });
}

export async function deleteRevision(id: string): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(REV_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(REV_STORE_NAME);
    const request = store.delete(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

const DEFAULT_PAGES: WikiPage[] = [
  {
    slug: 'home',
    title: 'Operations Dashboard',
    content: `# Secure Operations Center (SOC) Wiki

Welcome to the **SecOps Wiki Platform**. This is a secure, offline-capable knowledge base designed for critical operations.

### Platform Key Features
1. **Offline First (PWA)**: Works completely offline with cached assets and IndexedDB storage.
2. **Zero Trust Security**: Strict Content Security Policy (CSP), zero remote requests, and absolute XSS sanitization.
3. **Markdown Architecture**: Fast page creation and rich documentation support.
4. **Adblock Resilient**: Zero trackers, ads, or external scripts.

### Security Clearance Levels
* [Level 1 (Unclassified)](#/page/home) - Public system procedures.
* [Level 2 (Confidential)](#/page/security-protocols) - Internal system diagrams.
* [Level 3 (Secret)](#/page/home) - Critical infrastructure passwords/encryption keys (Strictly prohibited on this instance).

---
*Use the navigation panel on the left to browse and edit wiki pages, or import database templates.*`,
    updatedAt: Date.now(),
    tags: ['dashboard', 'system'],
    isSystem: true
  },
  {
    slug: 'security-protocols',
    title: 'Security Protocols',
    content: `# Security Protocols & Hardening Guidelines

This document details the mandatory configuration baseline for all hosts in the secure operations subnet.

### 1. Network Traffic Sanitization
* All incoming payloads must be validated against schemas.
* Outgoing connections to unverified domains are blocked by network firewalls.
* Service workers enforce client-side caching to prevent server resource exhaustion.

### 2. Encryption Keys
* Use SHA-256 for integrity verification.
* RSA keys must be minimum 4096-bit size.
* Under no circumstances should secrets be stored in plain text.

### 3. Content Validation
* Any user-input HTML is processed using \`DOMPurify\` before render.
* Raw input strings are escaped to prevent Cross-Site Scripting (XSS).`,
    updatedAt: Date.now(),
    tags: ['security', 'hardening'],
    isSystem: true
  }
];

export async function seedDatabase(): Promise<void> {
  const pages = await getAllPages();
  if (pages.length === 0) {
    for (const page of DEFAULT_PAGES) {
      await savePage(page);
    }
  }
}

export async function clearDatabase(): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const stores = [STORE_NAME, REV_STORE_NAME, 'tagColors', 'attachments', 'auditLogs'];
    const transaction = db.transaction(stores, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const revStore = transaction.objectStore(REV_STORE_NAME);
    const tagColorsStore = transaction.objectStore('tagColors');
    const attachmentsStore = transaction.objectStore('attachments');
    const auditLogsStore = transaction.objectStore('auditLogs');
    
    store.clear();
    revStore.clear();
    tagColorsStore.clear();
    attachmentsStore.clear();
    auditLogsStore.clear();
    
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export interface TagColor {
  tag: string;
  color: string; // 'slate' | 'emerald' | 'blue' | 'red' | 'amber'
}

export async function getTagColors(): Promise<TagColor[]> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction('tagColors', 'readonly');
      const store = transaction.objectStore('tagColors');
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    } catch (e) {
      // If store doesn't exist yet, return empty list
      resolve([]);
    }
  });
}

export async function saveTagColor(tagColor: TagColor): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('tagColors', 'readwrite');
    const store = transaction.objectStore('tagColors');
    const request = store.put(tagColor);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function deleteTagColor(tag: string): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('tagColors', 'readwrite');
    const store = transaction.objectStore('tagColors');
    const request = store.delete(tag);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export interface Attachment {
  id: string;
  name: string;
  mimeType: string;
  data: string; // Base64 ciphertext (ivHex:ciphertextBase64)
}

export interface AuditLog {
  id: string;
  timestamp: number;
  event: string;
  details: string;
}

export async function saveAttachment(att: Attachment): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('attachments', 'readwrite');
    const store = transaction.objectStore('attachments');
    const request = store.put(att);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function getAttachment(id: string): Promise<Attachment | null> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction('attachments', 'readonly');
      const store = transaction.objectStore('attachments');
      const request = store.get(id);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    } catch {
      resolve(null);
    }
  });
}


export async function getAllAttachments(): Promise<Attachment[]> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction('attachments', 'readonly');
      const store = transaction.objectStore('attachments');
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    } catch {
      resolve([]);
    }
  });
}

export async function deleteAttachment(id: string): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('attachments', 'readwrite');
    const store = transaction.objectStore('attachments');
    const request = store.delete(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function saveAuditLog(log: AuditLog): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction('auditLogs', 'readwrite');
      const store = transaction.objectStore('auditLogs');
      const request = store.put(log);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    } catch (e) {
      console.error('Audit logging transaction failed:', e);
      resolve(); // Do not block application on log failure
    }
  });
}

export async function getAllAuditLogs(): Promise<AuditLog[]> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction('auditLogs', 'readonly');
      const store = transaction.objectStore('auditLogs');
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const results = request.result || [];
        results.sort((a, b) => b.timestamp - a.timestamp);
        resolve(results);
      };
    } catch {
      resolve([]);
    }
  });
}

export async function clearAuditLogs(): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('auditLogs', 'readwrite');
    const store = transaction.objectStore('auditLogs');
    const request = store.clear();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function pruneAuditLogs(daysToKeep: number): Promise<void> {
  const db = await getDB();
  const threshold = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction('auditLogs', 'readwrite');
      const store = transaction.objectStore('auditLogs');
      const request = store.openCursor();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          const log = cursor.value as AuditLog;
          if (log.timestamp < threshold) {
            cursor.delete();
          }
          cursor.continue();
        } else {
          resolve();
        }
      };
    } catch (e) {
      reject(e);
    }
  });
}
export interface Template { id: string; name: string; content: string; }
export async function getTemplates(): Promise<Template[]> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('templates', 'readonly');
    const store = transaction.objectStore('templates');
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}
export async function saveTemplate(template: Template): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('templates', 'readwrite');
    const store = transaction.objectStore('templates');
    const request = store.put(template);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}
export async function deleteTemplate(id: string): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('templates', 'readwrite');
    const store = transaction.objectStore('templates');
    const request = store.delete(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export interface Backup { id: string; timestamp: number; data: string; }
export async function saveBackup(backup: Backup): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('backups', 'readwrite');
    const store = transaction.objectStore('backups');
    const request = store.put(backup);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}
