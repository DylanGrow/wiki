with open('src/main.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# =========================================
# ISSUE 1: Page view TOC is shown on desktop only (lg:block) — good.
# But the outer flex "flex gap-8" has no responsive collapse.
# The TOC should only render on lg+ (it already has "hidden lg:block").
# Main content should be full width on mobile:
content = content.replace(
    '<div class="flex gap-8 items-start">',
    '<div class="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start">'
)

# =========================================
# ISSUE 2: Action buttons overflow on mobile.
# Replace the full-width wrapping button bar with an icon+label collapse on mobile.
# On mobile, show only icons (hide text). On sm+, show icons + text.
content = content.replace(
    '<button id="pin-page-btn" class="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:text-amber-400 text-slate-300 font-mono text-xs rounded transition uppercase">',
    '<button id="pin-page-btn" class="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:text-amber-400 text-slate-300 font-mono text-xs rounded transition uppercase">'
)
content = content.replace(
    '<span id="pin-page-text">Pin</span>',
    '<span id="pin-page-text" class="hidden sm:inline">Pin</span>'
)
content = content.replace(
    '<button id="clone-page-btn" class="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 font-mono text-xs rounded transition uppercase">',
    '<button id="clone-page-btn" class="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 font-mono text-xs rounded transition uppercase">'
)
content = content.replace(
    '              Clone\n            </button>',
    '              <span class="hidden sm:inline">Clone</span>\n            </button>'
)
content = content.replace(
    '<a href="#/edit/${page.slug}" class="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 font-mono text-xs rounded transition uppercase">',
    '<a href="#/edit/${page.slug}" class="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 font-mono text-xs rounded transition uppercase">'
)
content = content.replace(
    '              Modify\n            </a>',
    '              <span class="hidden sm:inline">Modify</span>\n            </a>'
)
content = content.replace(
    '<button id="delete-page-btn" class="flex items-center gap-2 px-3 py-1.5 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-xs rounded transition uppercase">',
    '<button id="delete-page-btn" class="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-xs rounded transition uppercase">'
)
content = content.replace(
    '                 Purge\n               </button>',
    '                 <span class="hidden sm:inline">Purge</span>\n               </button>'
)

# =========================================
# ISSUE 3: Page header metadata is cramped on mobile
# SYS_REF and UPDATED are long strings – hide them on very small screens
content = content.replace(
    '<span class="text-xs font-mono text-slate-500 uppercase">SYS_REF: ${escapeHtml(page.slug)}</span>',
    '<span class="hidden sm:inline text-xs font-mono text-slate-500 uppercase">SYS_REF: ${escapeHtml(page.slug)}</span>'
)

# =========================================
# ISSUE 4: Editor grid 2-col splits are already handled by col-span-1 default
# But ensure the word count bar is legible
content = content.replace(
    '<div id="editor-stats" class="text-right text-[10px] text-slate-500 font-mono mt-1 pr-2">Words: 0 | Chars: 0 | Lines: 1</div>',
    '<div id="editor-stats" class="flex flex-wrap justify-end gap-2 text-[10px] text-slate-500 font-mono mt-1 pr-1">Words: 0 | Chars: 0 | Lines: 1</div>'
)

# =========================================
# ISSUE 5: System view forms need vertical stacking on mobile.
# The export/import forms with grids should stack on mobile.
# These are declared with grid-cols-1 md:grid-cols-2 already, so they should be fine.

# =========================================
# ISSUE 6: Page title is too big on very small screens
content = content.replace(
    '<h2 class="text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight">',
    '<h2 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight leading-tight">'
)

# =========================================
# ISSUE 7: Revision history action buttons on mobile (Rollback + Diff side by side gets cramped)
content = content.replace(
    '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 first:pt-0">',
    '<div class="flex flex-col gap-2 pt-3 first:pt-0">'
)
content = content.replace(
    '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 first:pt-0">',
    '<div class="flex flex-col gap-2 pt-3 first:pt-0">'
)

# Make the revision action buttons row
content = content.replace(
    '<button class="restore-rev-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${escapeHtml(rev.id)}">',
    '<button class="restore-rev-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase" data-rev-id="${escapeHtml(rev.id)}">'
)
content = content.replace(
    '<button class="view-rev-diff-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-blue-400 hover:text-blue-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${escapeHtml(rev.id)}">',
    '<button class="view-rev-diff-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-blue-400 hover:text-blue-300 font-mono text-[10px] rounded transition uppercase" data-rev-id="${escapeHtml(rev.id)}">'
)

# Group rev buttons into a flex row
content = content.replace(
    'ROLLBACK\n                  </button>\n                  <button class="view-rev-diff-btn',
    'ROLLBACK\n                  </button>\n                  <div class="flex gap-2 flex-wrap">\n                  <button class="view-rev-diff-btn'
)
content = content.replace(
    'Diff\n                  </button>\n                </div>',
    'Diff\n                  </button>\n                  </div>\n                </div>'
)

with open('src/main.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done. Mobile patches applied.")
