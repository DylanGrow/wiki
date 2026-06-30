import re

with open('src/main.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Pin Page Event Binding
pin_event = '''
  const pinBtn = document.getElementById('pin-page-btn');
  const pinText = document.getElementById('pin-page-text');
  if (pinBtn && pinText) {
    let pinnedSlugs = JSON.parse(localStorage.getItem('pinned_docs') || '[]');
    if (pinnedSlugs.includes(page.slug)) {
      pinBtn.classList.add('text-amber-400');
      pinText.innerText = 'Unpin';
    }
    pinBtn.addEventListener('click', () => {
      pinnedSlugs = JSON.parse(localStorage.getItem('pinned_docs') || '[]');
      if (pinnedSlugs.includes(page.slug)) {
        pinnedSlugs = pinnedSlugs.filter((s: string) => s !== page.slug);
        pinBtn.classList.remove('text-amber-400');
        pinText.innerText = 'Pin';
      } else {
        pinnedSlugs.push(page.slug);
        pinBtn.classList.add('text-amber-400');
        pinText.innerText = 'Unpin';
      }
      localStorage.setItem('pinned_docs', JSON.stringify(pinnedSlugs));
      renderLayout();
    });
  }
'''
if 'pinBtn.addEventListener' not in content:
    content = content.replace('const exportDropdownBtn = document.getElementById(\'page-export-dropdown-btn\');', pin_event + '\n  const exportDropdownBtn = document.getElementById(\'page-export-dropdown-btn\');')

# Clone Page Event Binding
clone_event = '''
  const cloneBtn = document.getElementById('clone-page-btn');
  if (cloneBtn) {
    cloneBtn.addEventListener('click', async () => {
      const newSlug = page.slug + '-copy';
      const clonedPage = { ...page, slug: newSlug, title: 'Copy of ' + page.title, id: crypto.randomUUID(), createdAt: Date.now(), updatedAt: Date.now() };
      await savePageSecure(clonedPage);
      window.location.hash = `#/edit/${newSlug}`;
    });
  }
'''
if 'cloneBtn.addEventListener' not in content:
    content = content.replace('const singleMdBtn = document.getElementById(\'export-single-md\')!;', clone_event + '\n    const singleMdBtn = document.getElementById(\'export-single-md\')!;')

# Rename Tag Event Binding
rename_event = '''
  const renameBtns = managerDiv.querySelectorAll('.rename-tag-btn');
  renameBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const oldTag = (e.currentTarget as HTMLButtonElement).getAttribute('data-tag')!;
      const newTag = prompt(`Rename tag "#${oldTag}" to:`);
      if (newTag && newTag.trim() && newTag !== oldTag) {
        const cleanNewTag = newTag.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
        if (cleanNewTag.length > 0) {
          for (const page of wikiPagesList) {
            if (page.tags.includes(oldTag)) {
              page.tags = page.tags.map(t => t === oldTag ? cleanNewTag : t);
              await savePageSecure(page);
            }
          }
          logSecurityEvent('TAG_RENAME', `Renamed tag ${oldTag} to ${cleanNewTag}`);
          await renderLayout();
        }
      }
    });
  });
'''
if 'renameBtns.forEach' not in content:
    content = content.replace('const selects = managerDiv.querySelectorAll(\'.tag-color-select\');', rename_event + '\n  const selects = managerDiv.querySelectorAll(\'.tag-color-select\');')

with open('src/main.ts', 'w', encoding='utf-8') as f:
    f.write(content)
