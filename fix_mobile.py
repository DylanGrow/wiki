import re

# 1. Update index.css for table wrapping
with open('src/index.css', 'r', encoding='utf-8') as f:
    css = f.read()

if '.prose table' not in css:
    css += '''
.prose table {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}
'''
    with open('src/index.css', 'w', encoding='utf-8') as f:
        f.write(css)

# 2. Update main.ts for responsive actions, toolbar, modals
with open('src/main.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Action buttons wrapper - Make it flex-wrap or horizontally scrollable
content = content.replace('<div class="flex items-center gap-2 shrink-0 self-start sm:self-auto">', '<div class="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 self-start sm:self-auto w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">')

# Editor formatting toolbar - Make it flex-wrap
content = content.replace('<div class="flex flex-wrap gap-1 p-2 bg-slate-950/80 border border-slate-800 border-b-0 rounded-t-lg select-none items-center justify-between">', '<div class="flex flex-col sm:flex-row gap-2 p-2 bg-slate-950/80 border border-slate-800 border-b-0 rounded-t-lg select-none items-start sm:items-center justify-between">')
content = content.replace('<div class="flex flex-wrap gap-1">', '<div class="flex flex-wrap gap-1 w-full sm:w-auto">')

# Modals responsiveness
content = content.replace('w-full max-w-4xl max-h-[90vh] overflow-y-auto', 'w-[95vw] sm:w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-auto')

with open('src/main.ts', 'w', encoding='utf-8') as f:
    f.write(content)
