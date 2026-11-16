const fs = require('fs');
const path = require('path');

const dirs = [
  'c:/Users/benja/Desktop/aprende/src/pages/consultas-sql',
  'c:/Users/benja/Desktop/aprende/src/pages/programacion-db'
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.astro')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const regex = /<CodeBlock\s+language=\"sql\">\s*([\s\S]*?)<\/CodeBlock>/g;
      
      let newContent = content.replace(regex, (match, p1) => {
        let cleanCode = p1.trim().replace(/`/g, '\\`'); 
        return `<CodeBlock lang="sql" code={\`${cleanCode}\`} />`;
      });
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log('Fixed:', fullPath);
      }
    }
  }
}

dirs.forEach(processDir);
console.log('Done fixing code blocks!');
