export interface WikiPage {
  slug: string;
  title: string;
  content: string;
  updatedAt: number;
  tags: string[];
  isSystem?: boolean;
}

export interface PageRevision {
  id: string; // `${slug}-${timestamp}`
  slug: string;
  title: string;
  content: string;
  updatedAt: number;
}

const DB_NAME = 'secops-wiki-db';
const STORE_NAME = 'pages';
const REV_STORE_NAME = 'revisions';
const DB_VERSION = 2;

function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'slug' });
      }
      if (!db.objectStoreNames.contains(REV_STORE_NAME)) {
        const revStore = db.createObjectStore(REV_STORE_NAME, { keyPath: 'id' });
        revStore.createIndex('slug', 'slug', { unique: false });
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
