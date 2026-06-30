const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/script-src 'self';/, "script-src 'self' https://cdnjs.cloudflare.com;");
html = html.replace(/style-src 'self' 'unsafe-inline';/, "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com;");
html = html.replace('</head>', `
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js"></script>
</head>`);
fs.writeFileSync('index.html', html);
console.log('index.html updated');
