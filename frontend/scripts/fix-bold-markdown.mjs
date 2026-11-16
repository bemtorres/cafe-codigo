import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, '../src/pages/course');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  
  // Find frontmatter boundaries
  let frontmatterCount = 0;
  let htmlStartIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      frontmatterCount++;
      if (frontmatterCount === 2) {
        htmlStartIndex = i + 1;
        break;
      }
    }
  }

  let inCodeBlock = false;
  let modified = false;

  for (let i = htmlStartIndex; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect code block boundaries
    if (line.includes('<CodeBlock') || line.includes('<CodeBlockMulti')) {
      inCodeBlock = true;
    }

    if (!inCodeBlock) {
      // Perform the bold replacement: **text** -> <strong>text</strong>
      const boldRegex = /\*\*([^*]+?)\*\*/g;
      if (boldRegex.test(line)) {
        lines[i] = line.replace(boldRegex, '<strong>$1</strong>');
        modified = true;
      }
    }

    // Check if code block ends on this line
    if (inCodeBlock && (line.includes('/>') || line.includes('</CodeBlock>') || line.includes('</CodeBlockMulti>'))) {
      inCodeBlock = false;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`Updated bold markers in: ${path.relative(pagesDir, filePath)}`);
  }
}

function traverse(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      traverse(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.astro')) {
      processFile(fullPath);
    }
  }
}

console.log('Starting bold markup fix under src/pages/course...');
traverse(pagesDir);
console.log('Finished fixing bold markups!');
