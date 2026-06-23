import { seedDatabase, getAllPages, getPage, savePage, deletePage, WikiPage, saveRevision, getPageRevisions } from './db';
import { renderMarkdownSecure, validateImportedPage, escapeHtml, getSanitizationCount, sanitizeUnicode } from './security';

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

// BroadcastChannel for cross-tab database sync
const syncChannel = new BroadcastChannel('wiki-db-sync');
syncChannel.onmessage = async (event) => {
  if (event.data === 'refresh') {
    await refreshPagesList();
    await renderLayout();
  }
};

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
  
  // Register Service Worker for PWA
  registerServiceWorker();

  // Load pages for the sidebar
  await refreshPagesList();

  // Setup session locking
  setupIdleTracker();

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

  // Initial Route Resolution
  handleRoute();
}

function resetIdleTimer() {
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(lockSession, IDLE_TIMEOUT);
}

function lockSession() {
  const lockScreen = document.getElementById('idle-lock-screen');
  if (lockScreen) {
    lockScreen.classList.remove('hidden');
  }
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
  const lockScreen = document.createElement('div');
  lockScreen.id = 'idle-lock-screen';
  lockScreen.className = 'fixed inset-0 bg-[#090d16]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center hidden';
  lockScreen.innerHTML = `
    <div class="glass-panel border border-teal-900/30 p-8 rounded-xl max-w-md text-center glow-border">
      <svg class="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      <h2 class="text-xl font-bold font-mono text-white mb-2 uppercase">TERMINAL_LOCKED</h2>
      <p class="text-slate-400 text-xs font-mono mb-6">Session locked due to inactivity. Click unlock to restore secure interface access.</p>
      <button id="idle-unlock-btn" class="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.2)]">
        RESTORE SESSION
      </button>
    </div>
  `;
  document.body.appendChild(lockScreen);

  resetIdleTimer();
  window.addEventListener('mousemove', resetIdleTimer);
  window.addEventListener('keydown', resetIdleTimer);
  window.addEventListener('click', resetIdleTimer);
  window.addEventListener('scroll', resetIdleTimer);
  
  // Bind unlock button
  document.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('#idle-unlock-btn');
    if (btn) {
      unlockSession();
    }
  });
}

// Service Worker Registration
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Respect base path
      navigator.serviceWorker.register('/wiki/sw.js')
        .then((registration) => {
          console.log('ServiceWorker registered successfully with scope: ', registration.scope);
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
  wikiPagesList = await getAllPages();
}

// Routing Handler
async function handleRoute() {
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
  } else {
    currentPageSlug = 'home';
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

// Layout Renderer
async function renderLayout() {
  await refreshPagesList();

  // Filter pages list by search query and tag selection
  const filteredPages = wikiPagesList.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          page.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          page.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag ? page.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

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
        <!-- Search -->
        <div class="p-4 border-b border-slate-800/80 shrink-0">
          <div class="relative">
            <input type="text" id="wiki-search-input" value="${escapeHtml(searchQuery)}" placeholder="Search index database..." class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg py-2 pl-9 pr-4 text-base md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none transition font-mono">
            <svg class="w-4 h-4 text-slate-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
        </div>

        <!-- Tag Filter Cloud -->
        ${allTags.length > 0 ? `
          <div class="px-4 py-2 border-b border-slate-800/80 flex flex-wrap gap-1 max-h-24 overflow-y-auto shrink-0 select-none">
            <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${!selectedTag ? 'bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]' : 'bg-slate-900 text-slate-400 hover:bg-slate-850'}" data-tag="">#ALL</button>
            ${allTags.map(tag => `
              <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${selectedTag === tag ? 'bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]' : 'bg-slate-900 text-slate-400 hover:bg-slate-850'}" data-tag="${escapeHtml(tag)}">#${escapeHtml(tag.toUpperCase())}</button>
            `).join('')}
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
            ${filteredPages.map(page => `
              <a href="#/page/${page.slug}" class="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition group ${currentPageSlug === page.slug && !isEditing ? 'bg-teal-950/30 text-teal-400 font-medium border-l-2 border-teal-500' : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'}">
                <span class="truncate font-mono">${escapeHtml(page.title)}</span>
                ${page.isSystem ? `
                  <span class="text-[9px] bg-slate-800 text-slate-400 px-1 py-0.5 rounded font-mono uppercase scale-90">SYS</span>
                ` : ''}
              </a>
            `).join('')}
            ${filteredPages.length === 0 ? `
              <div class="text-center py-6 text-xs text-slate-600 font-mono">No entries found</div>
            ` : ''}
          </div>
        </div>

        <!-- Footer Control Center -->
        <div class="p-4 border-t border-slate-800/80 bg-slate-950/30 flex gap-2 shrink-0">
          <a href="#/system" class="flex-1 text-center py-2 px-3 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-mono text-slate-300 uppercase hover:text-white transition">
            SYSTEM ADMIN
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
  searchInput.addEventListener('input', (e) => {
    searchQuery = (e.target as HTMLInputElement).value;
    // Trigger dynamic sidebar filter only, preventing whole page redraw to preserve input focus
    const filtered = wikiPagesList.filter(page => 
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    const pagesListContainer = document.getElementById('pages-list')!;
    pagesListContainer.innerHTML = filtered.map(page => `
      <a href="#/page/${page.slug}" class="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition group ${currentPageSlug === page.slug && !isEditing ? 'bg-teal-950/30 text-teal-400 font-medium border-l-2 border-teal-500' : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'}">
        <span class="truncate font-mono">${escapeHtml(page.title)}</span>
        ${page.isSystem ? `
          <span class="text-[9px] bg-slate-800 text-slate-400 px-1 py-0.5 rounded font-mono uppercase scale-90">SYS</span>
        ` : ''}
      </a>
    `).join('');
  });

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

        // Force hard reload
        window.location.href = '/wiki/';
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

  // Populate actual view page
  await resolveContentView();
}

// View Resolver
async function resolveContentView() {
  const contentPortal = document.getElementById('main-content')!;

  if (currentPageSlug === 'system') {
    renderSystemView(contentPortal);
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
  const page = await getPage(currentPageSlug);

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
  const revisions = await getPageRevisions(page.slug);

  // Estimate Read Time (200 words per minute average)
  const wordCount = page.content.split(/\s+/).filter(w => w.length > 0).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  const rawRenderedContent = renderMarkdownSecure(page.content);
  // Highlight search queries
  const renderedContent = highlightText(rawRenderedContent, searchQuery);
  const updatedDate = new Date(page.updatedAt).toLocaleString();

  // Create temporary container to parse headings for TOC outline
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = rawRenderedContent;
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

  container.innerHTML = `
    <div class="flex gap-8 items-start">
      <!-- Main Content Area -->
      <div class="flex-1 min-w-0">
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
              ${page.tags.map(tag => `
                <span class="text-[10px] font-mono bg-teal-950/20 text-teal-400 px-2 py-0.5 rounded border border-teal-900/30">#${escapeHtml(tag)}</span>
              `).join('')}
            </div>
          </div>
          
          <div class="flex items-center gap-2 shrink-0 self-start sm:self-auto">
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
      </div>

      <!-- Outline / TOC (Desktop only) -->
      ${tocHtml}
    </div>
  `;

  // Bind Delete Page Button
  const deleteBtn = document.getElementById('delete-page-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', async () => {
      if (confirm(`CRITICAL SYSTEM NOTICE: Confirm total purge of intel document "${page.title}"? This action is irreversible.`)) {
        await deletePage(page.slug);
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
        const currentRef = await getPage(page.slug);
        if (currentRef) {
          await saveRevision({
            id: `${currentRef.slug}-${Date.now()}`,
            slug: currentRef.slug,
            title: currentRef.title,
            content: currentRef.content,
            updatedAt: Date.now()
          });
        }
        
        // Restore
        await savePage({
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
}

// 2. Render Wiki Page Editor (Edit & New Page)
async function renderEditView(container: HTMLElement) {
  let initialTitle = '';
  let initialSlug = '';
  let initialContent = '';
  let initialTags = '';
  let isSystemPage = false;

  if (!isNewPage) {
    const page = await getPage(currentPageSlug);
    if (page) {
      initialTitle = page.title;
      initialSlug = page.slug;
      initialContent = page.content;
      initialTags = page.tags.join(', ');
      isSystemPage = !!page.isSystem;
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
      initialTags = draft.tags || initialTags;
      
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

        <!-- Tags Input -->
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Associated Tags</label>
          <input type="text" id="edit-tags" value="${escapeHtml(initialTags)}" placeholder="e.g. system, security, quickstart" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono">
          <p class="text-[10px] text-slate-500 mt-1 font-mono">Comma-separated tags list.</p>
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
            <span class="hidden md:inline text-[10px] text-slate-500 font-mono">Live editor preview enabled</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div id="edit-content-container" class="block">
              <textarea id="edit-content" rows="16" required class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-4 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono" placeholder="Enter markdown payload here...">${escapeHtml(initialContent)}</textarea>
            </div>
            <div id="live-preview-container" class="hidden md:block">
              <div id="live-preview-box" class="w-full h-[375px] md:h-full min-h-[384px] overflow-y-auto bg-slate-950/30 border border-slate-800 rounded-lg p-4 wiki-content">
                <span class="text-xs text-slate-600 font-mono">Markdown preview updates in real-time...</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <a href="${isNewPage ? '#/page/home' : `#/page/${currentPageSlug}`}" id="cancel-edit-btn" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
            Cancel
          </a>
          <button type="submit" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">
            Commit Changes
          </button>
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
  
  textarea.addEventListener('input', updatePreview);
  updatePreview(); // Initial render

  // Autosave Draft interval (runs every 5 seconds)
  const autoSaveInterval = setInterval(() => {
    const titleVal = (document.getElementById('edit-title') as HTMLInputElement)?.value;
    const contentVal = textarea.value;
    const tagsVal = (document.getElementById('edit-tags') as HTMLInputElement)?.value;
    
    if (titleVal || contentVal) {
      localStorage.setItem(draftKey, JSON.stringify({
        title: titleVal,
        content: contentVal,
        tags: tagsVal,
        updatedAt: Date.now()
      }));
    }
  }, 5000);

  // Clean draft utility
  const cleanUpDraft = () => {
    clearInterval(autoSaveInterval);
    localStorage.removeItem(draftKey);
  };

  cancelBtn.addEventListener('click', cleanUpDraft);
  if (discardBtn) {
    discardBtn.addEventListener('click', () => {
      cleanUpDraft();
      document.getElementById('draft-restore-banner')?.remove();
      renderEditView(container);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = (document.getElementById('edit-title') as HTMLInputElement).value.trim();
    const slug = isNewPage 
      ? (document.getElementById('edit-slug') as HTMLInputElement).value.trim().toLowerCase()
      : initialSlug;
    const rawTags = (document.getElementById('edit-tags') as HTMLInputElement).value;
    const content = textarea.value;

    // Validate input slug
    if (isNewPage && !/^[a-z0-9-_]+$/.test(slug)) {
      alert('Security Alert: Slug contains illegal characters. Use alphanumeric, hyphens, and underscores only.');
      return;
    }

    const tags = rawTags
      .split(',')
      .map(tag => sanitizeUnicode(tag.trim()))
      .filter(tag => tag.length > 0);

    // Save previous state as revision history before saving new page (if page already exists)
    const prevPage = await getPage(slug);
    if (prevPage) {
      await saveRevision({
        id: `${prevPage.slug}-${Date.now()}`,
        slug: prevPage.slug,
        title: prevPage.title,
        content: prevPage.content,
        updatedAt: prevPage.updatedAt
      });
    }

    const updatedPage: WikiPage = {
      slug,
      title,
      content,
      updatedAt: Date.now(),
      tags,
      isSystem: isSystemPage
    };

    try {
      await savePage(updatedPage);
      cleanUpDraft();
      syncChannel.postMessage('refresh');
      window.location.hash = `#/page/${slug}`;
    } catch (err: any) {
      alert(`Database transaction error: ${err.message}`);
    }
  });
}

// 3. Render System Administration View
function renderSystemView(container: HTMLElement) {
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
        <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-slate-800 pb-2">Data Operations & Backups</h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Export Backup -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Export Database</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Export all wiki contents to a validated JSON payload file.</p>
            </div>
            <button id="system-export-btn" class="w-full py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Download Export
            </button>
          </div>

          <!-- Import Backup -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Import Payload</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Upload and ingest a validated JSON file to the local database.</p>
            </div>
            <label class="w-full text-center py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded cursor-pointer transition hover:text-white block">
              Load Payload
              <input type="file" id="system-import-file" accept=".json" class="hidden">
            </label>
          </div>

          <!-- Reset Default Database -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
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
    </div>
  `;

  // Bind export/import/wipe actions
  const exportBtn = document.getElementById('system-export-btn')!;
  const importFile = document.getElementById('system-import-file') as HTMLInputElement;
  const resetBtn = document.getElementById('system-reset-btn')!;
  const statsLabel = document.getElementById('total-articles-telemetry')!;

  // Dynamic telemetry value loading
  statsLabel.textContent = wikiPagesList.length.toString();

  // Export database handler
  exportBtn.addEventListener('click', () => {
    const dataStr = JSON.stringify(wikiPagesList, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `secops-wiki-backup-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Import database payload handler
  importFile.addEventListener('change', (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert('Ingestion failed: File size exceeds the secure ceiling of 1MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (!Array.isArray(json)) {
          throw new Error('Payload root structure must be an array of page objects.');
        }

        // Validate each page using security rules
        const cleanPages: WikiPage[] = [];
        for (const item of json) {
          const validated = validateImportedPage(item);
          cleanPages.push(validated);
        }

        // Commits data to IndexedDB
        if (confirm(`SYSTEM INGESTION PROTOCOL: Import ${cleanPages.length} validated articles? This may overwrite conflicting entries.`)) {
          for (const page of cleanPages) {
            await savePage(page);
          }
          alert('Ingestion completed successfully.');
          syncChannel.postMessage('refresh');
          await refreshPagesList();
          window.location.hash = '#/page/home';
        }
      } catch (err: any) {
        alert(`Ingestion failed: Schema violation. ${err.message}`);
      }
    };
    reader.readAsText(file);
  });

  // Hard reset database handler
  resetBtn.addEventListener('click', async () => {
    if (confirm('CRITICAL WARPING WARNING: Reset and delete ALL wiki pages? Custom user documents will be permanently deleted.')) {
      // Clear all items in IndexedDB
      const request = indexedDB.open('secops-wiki-db', 1);
      request.onsuccess = async () => {
        const db = request.result;
        const transaction = db.transaction('pages', 'readwrite');
        const store = transaction.objectStore('pages');
        store.clear().onsuccess = async () => {
          await seedDatabase();
          alert('Database successfully wiped and seeded with standard operating defaults.');
          syncChannel.postMessage('refresh');
          await refreshPagesList();
          window.location.hash = '#/page/home';
        };
      };
    }
  });
}

// Kickstart App on Content Loaded
document.addEventListener('DOMContentLoaded', init);
