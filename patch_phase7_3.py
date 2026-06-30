import re

with open('src/main.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 5. Page Duplication (Clone Document)
if 'id="clone-page-btn"' not in content:
    clone_btn = '''<button id="clone-page-btn" class="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 font-mono text-xs rounded transition uppercase">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
              </svg>
              Clone
            </button>
            <a href="#/edit/${page.slug}"'''
    content = content.replace('<a href="#/edit/${page.slug}"', clone_btn)

# 2. Live Word & Character Count in Editor
if 'id="editor-stats"' not in content:
    stats_html = '''<textarea id="edit-content" rows="16" required class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-b-lg p-4 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono border-t-0" placeholder="Enter markdown payload here...">${escapeHtml(initialContent)}</textarea>
              <div id="editor-stats" class="text-right text-[10px] text-slate-500 font-mono mt-1 pr-2">Words: 0 | Chars: 0 | Lines: 1</div>'''
    content = content.replace('<textarea id="edit-content" rows="16" required class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-b-lg p-4 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono border-t-0" placeholder="Enter markdown payload here...">${escapeHtml(initialContent)}</textarea>', stats_html)

# 3. Table of Contents Keyboard Navigation
if 'tabindex="0"' not in content and 'toc-link' not in content:
    content = content.replace('<a href="#/page/${page.slug}#${id}" class="block text-slate-500 hover:text-teal-400 transition truncate ${indent}" title="${escapeHtml(text)}">', '<a href="#/page/${page.slug}#${id}" tabindex="0" class="block text-slate-500 hover:text-teal-400 transition truncate ${indent} toc-link" data-id="${id}" title="${escapeHtml(text)}">')

with open('src/main.ts', 'w', encoding='utf-8') as f:
    f.write(content)
