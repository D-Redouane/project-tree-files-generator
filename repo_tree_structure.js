const fs = require('fs');
const path = require('path');

function generateTree(dir, prefix = '') {
  const entities = fs.readdirSync(dir);
  const files = entities.filter(file => !fs.statSync(path.join(dir, file)).isDirectory());
  const directories = entities.filter(file => fs.statSync(path.join(dir, file)).isDirectory());

  let tree = '';
  directories.forEach((directory, index) => {
    const isLast = index === directories.length - 1 && files.length === 0;
    const currentPrefix = isLast ? '└── ' : '├── ';
    tree += `${prefix}${currentPrefix}${directory}\n`;
    const nextPrefix = isLast ? '    ' : '│   ';
    tree += generateTree(path.join(dir, directory), prefix + nextPrefix);
  });

  files.forEach((file, index) => {
    const isLast = index === files.length - 1;
    const currentPrefix = isLast ? '└── ' : '├── ';
    tree += `${prefix}${currentPrefix}${file}\n`;
  });

  return tree;
}

const rootDir = '/path/to/your/repo';
const tree = `${path.basename(rootDir)}\n\n` + generateTree(rootDir);
fs.writeFileSync('output.txt', tree);