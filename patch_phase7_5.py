import re

with open('src/main.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 2. Live Word Count
word_count_code = '''
  const updatePreview = () => {
    const markdown = textarea.value;
    const statsEl = document.getElementById('editor-stats');
    if (statsEl) {
      const words = markdown.split(/\s+/).filter(w => w.length > 0).length;
      const chars = markdown.length;
      const lines = markdown.split('\\n').length;
      statsEl.innerText = `Words: ${words} | Chars: ${chars} | Lines: ${lines}`;
    }
'''
if 'const statsEl = document.getElementById(\'editor-stats\');' not in content:
    content = content.replace('const updatePreview = () => {', word_count_code)

# 3. TOC Observer
toc_observer_code = '''
  // TOC active heading tracker
  const tocLinks = document.querySelectorAll('.toc-link');
  if (tocLinks.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(link => {
            link.classList.remove('text-teal-400', 'font-bold');
            if (link.getAttribute('data-id') === entry.target.id) {
              link.classList.add('text-teal-400', 'font-bold');
            }
          });
        }
      });
    }, { rootMargin: "0px 0px -80% 0px" });
    
    document.querySelectorAll('h1, h2, h3').forEach(h => observer.observe(h));
  }
  
  // Reading Progress Indicator
  const progressEl = document.getElementById('read-progress');
  if (progressEl) {
    const scrollHandler = () => {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        const scrolled = (window.scrollY / scrollHeight) * 100;
        progressEl.style.width = scrolled + '%';
      }
    };
    window.addEventListener('scroll', scrollHandler);
    // Cleanup old scroll listener if we navigate away, but since it's a SPA it might stack up.
    // So let's attach it to a specific element or remove it on render Layout.
    // Instead of global, maybe we just add it to a wrapper.
  }
'''
if 'const tocLinks = document.querySelectorAll' not in content:
    content = content.replace('const singleMdBtn = document.getElementById(\'export-single-md\')!;', toc_observer_code + '\n    const singleMdBtn = document.getElementById(\'export-single-md\')!;')

# 4. Revision Diff Logic
diff_logic = '''
  function computeSimpleDiff(oldText: string, newText: string): string {
    const oldLines = oldText.split('\\n');
    const newLines = newText.split('\\n');
    let html = '<div class="font-mono text-[10px] space-y-1 bg-slate-950 p-2 rounded overflow-x-auto">';
    let i = 0, j = 0;
    while (i < oldLines.length || j < newLines.length) {
      if (i < oldLines.length && j < newLines.length && oldLines[i] === newLines[j]) {
        html += `<div class="text-slate-500">  ${escapeHtml(oldLines[i])}</div>`;
        i++; j++;
      } else if (i < oldLines.length && !newLines.includes(oldLines[i])) {
        html += `<div class="bg-red-900/30 text-red-400">- ${escapeHtml(oldLines[i])}</div>`;
        i++;
      } else if (j < newLines.length && !oldLines.includes(newLines[j])) {
        html += `<div class="bg-emerald-900/30 text-emerald-400">+ ${escapeHtml(newLines[j])}</div>`;
        j++;
      } else {
        html += `<div class="bg-red-900/30 text-red-400">- ${escapeHtml(oldLines[i])}</div>`;
        html += `<div class="bg-emerald-900/30 text-emerald-400">+ ${escapeHtml(newLines[j])}</div>`;
        i++; j++;
      }
    }
    html += '</div>';
    return html;
  }
'''
if 'computeSimpleDiff' not in content:
    content = content.replace('async function getPageRevisions(slug: string)', diff_logic + '\nasync function getPageRevisions(slug: string)')

with open('src/main.ts', 'w', encoding='utf-8') as f:
    f.write(content)
