import re

with open('src/main.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 8. Session Activity Heartbeat Logger
if 'SESSION_HEARTBEAT' not in content:
    reset_timer = '''function resetIdleTimer() {
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(lockSession, IDLE_TIMEOUT);
  
  if (!(window as any).lastHeartbeat) (window as any).lastHeartbeat = Date.now();
  if (Date.now() - (window as any).lastHeartbeat > 5 * 60 * 1000) {
    logSecurityEvent('SESSION_HEARTBEAT', 'User activity heartbeat');
    (window as any).lastHeartbeat = Date.now();
  }
}'''
    content = re.sub(r'function resetIdleTimer\(\) \{.*?\n\}', reset_timer, content, flags=re.DOTALL)

# 7. Reading Position Progress Indicator
if 'id="read-progress"' not in content:
    content = content.replace('<!-- Main Workspace -->', '<!-- Main Workspace -->\n    <div id="read-progress" class="fixed top-0 left-0 h-1 bg-teal-500 z-[100] transition-all duration-150" style="width: 0%"></div>')

# 1. Pinned Docs Sidebar
if '<!-- Pinned Docs -->' not in content:
    pinned_sidebar = '''
        <!-- Pinned Docs -->
        ${(() => {
          const pinnedSlugs = JSON.parse(localStorage.getItem('pinned_docs') || '[]');
          const pinnedPages = wikiPagesList.filter(p => pinnedSlugs.includes(p.slug));
          if (pinnedPages.length > 0) {
            return `
            <div class="px-2 py-4 border-b border-slate-800/80 shrink-0">
              <div class="px-3 mb-2 flex items-center justify-between">
                <span class="text-xs font-semibold text-amber-500 uppercase tracking-widest font-mono flex items-center gap-1">? Pinned Docs</span>
              </div>
              <div class="space-y-1">
                ${renderSidebarPages(pinnedPages)}
              </div>
            </div>`;
          }
          return '';
        })()}
        
        <!-- Tag Filter Cloud -->'''
    content = content.replace('<!-- Tag Filter Cloud -->', pinned_sidebar)

with open('src/main.ts', 'w', encoding='utf-8') as f:
    f.write(content)
