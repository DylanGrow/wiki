import re

with open('src/db.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Add getAllAttachments
if 'export async function getAllAttachments' not in content:
    get_att_code = '''
export async function getAllAttachments(): Promise<Attachment[]> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction('attachments', 'readonly');
      const store = transaction.objectStore('attachments');
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    } catch {
      resolve([]);
    }
  });
}
'''
    content = content.replace('export async function deleteAttachment', get_att_code + '\nexport async function deleteAttachment')

with open('src/db.ts', 'w', encoding='utf-8') as f:
    f.write(content)
