import re

with open('src/main.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Pin Document Button (1. Pinned Docs)
if 'id="pin-page-btn"' not in content:
    pin_btn = '''
            <button id="pin-page-btn" class="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:text-amber-400 text-slate-300 font-mono text-xs rounded transition uppercase">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span id="pin-page-text">Pin</span>
            </button>
            <a href="#/edit/${page.slug}"'''
    content = content.replace('<a href="#/edit/${page.slug}"', pin_btn)

# Batch Tag Rename (6. Batch Tag Rename)
if 'rename-tag-btn' not in content:
    rename_btn = '''<span class="text-xs font-mono text-slate-400">#${escapeHtml(tag)}</span>
        <div class="flex gap-2 items-center">
          <button class="rename-tag-btn px-2 py-1 bg-slate-900 border border-slate-700 text-xs text-blue-400 hover:text-blue-300 rounded" data-tag="${escapeHtml(tag)}">Rename</button>
          <select class="tag-color-select bg-slate-900 border border-slate-850 text-xs font-mono text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-teal-500 cursor-pointer" data-tag="${escapeHtml(tag)}">'''
    content = content.replace('<span class="text-xs font-mono text-slate-400">#${escapeHtml(tag)}</span>\n        <select class="tag-color-select bg-slate-900', rename_btn)
    content = content.replace('</select>\n      </div>', '</select>\n        </div>\n      </div>')

# 10. Full DB Export with Attachments
if 'attachmentsToExport' not in content:
    export_handler = '''exportBtn.addEventListener('click', async () => {
    const pagesToExport = getScopedPages();
    const attachmentsToExport = await getAllAttachments();
    const exportPayload = {
      pages: pagesToExport,
      attachments: attachmentsToExport
    };
    const password = prompt('Secure Backup: Enter a password to encrypt this database backup file (leave blank for plain JSON):');'''
    content = re.sub(r"exportBtn\.addEventListener\('click', async \(\) => \{\n\s*const pagesToExport = getScopedPages\(\);\n\s*const password = prompt.*?;", export_handler, content, flags=re.DOTALL)
    content = content.replace('const dataStr = JSON.stringify(pagesToExport, null, 2);', 'const dataStr = JSON.stringify(exportPayload, null, 2);')
    content = content.replace('payload: pagesToExport', 'payload: exportPayload')
    
with open('src/main.ts', 'w', encoding='utf-8') as f:
    f.write(content)
