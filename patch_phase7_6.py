import re

with open('src/main.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 4. Revision Diff Viewer Binding
diff_binding = '''
  const diffBtns = container.querySelectorAll('.view-rev-diff-btn');
  diffBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const revId = (e.currentTarget as HTMLButtonElement).getAttribute('data-rev-id')!;
      const rev = revisions.find(r => r.id === revId);
      if (rev) {
        let revContent = rev.content;
        let currentContent = page.content;
        if (page.isEncrypted && activeCryptoKey) {
           try {
             revContent = await decryptText(revContent, activeCryptoKey);
             currentContent = await decryptText(currentContent, activeCryptoKey);
           } catch {}
        }
        const diffHtml = computeSimpleDiff(revContent, currentContent);
        
        // Modal for diff
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4';
        modal.innerHTML = `
          <div class="bg-slate-950 border border-slate-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto glow-border">
            <h3 class="text-lg font-bold font-mono text-white mb-4 uppercase">Revision Diff: ${escapeHtml(rev.title)}</h3>
            <p class="text-xs font-mono text-slate-400 mb-4">Comparing selected revision against current page content.</p>
            ${diffHtml}
            <div class="mt-6 flex justify-end">
              <button class="close-diff-btn px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-mono text-xs uppercase rounded transition">Close</button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.close-diff-btn')?.addEventListener('click', () => modal.remove());
      }
    });
  });
'''
if 'view-rev-diff-btn' not in content:
    # First add the button to the UI
    content = content.replace('ROLLBACK\n                  </button>', 'ROLLBACK\n                  </button>\n                  <button class="view-rev-diff-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-blue-400 hover:text-blue-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${escapeHtml(rev.id)}">\n                    Diff\n                  </button>')
    # Then bind it
    content = content.replace('const restoreBtns = container.querySelectorAll(\'.restore-rev-btn\');', diff_binding + '\n  const restoreBtns = container.querySelectorAll(\'.restore-rev-btn\');')

with open('src/main.ts', 'w', encoding='utf-8') as f:
    f.write(content)
