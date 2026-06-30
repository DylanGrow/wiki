import re

with open('src/main.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix markdown redeclaration
content = content.replace('''    }

    const markdown = textarea.value;
    if (markdown.trim().length === 0) {''', '''    }

    if (markdown.trim().length === 0) {''')

# Import getAllAttachments
if 'getAllAttachments' not in content[:1000] and 'getAllAttachments' in content:
    content = content.replace('savePageSecure,', 'savePageSecure, getAllAttachments,')

with open('src/main.ts', 'w', encoding='utf-8') as f:
    f.write(content)
