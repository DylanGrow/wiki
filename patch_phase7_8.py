import re

with open('src/main.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure getAllAttachments is in the db import list
db_import_match = re.search(r"import \{(.*?)\} from '\./db';", content, re.DOTALL)
if db_import_match:
    imports = db_import_match.group(1)
    if 'getAllAttachments' not in imports:
        new_imports = imports + ', getAllAttachments'
        content = content.replace(db_import_match.group(0), f"import {{{new_imports}}} from './db';")

with open('src/main.ts', 'w', encoding='utf-8') as f:
    f.write(content)
