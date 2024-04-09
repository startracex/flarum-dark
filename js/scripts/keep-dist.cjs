const fs = require('node:fs');

const ignoreFile = '.gitignore';
const content = fs.readFileSync(ignoreFile, 'utf8');

const keepDist = content
  .trim()
  .split('\n')
  .reduce((acc, cur) => {
    cur = cur.trim();
    if (cur === 'dist' || cur === 'dist-typings') {
      cur = `#${cur}`;
    }
    return acc + cur + '\n';
  }, '');

fs.writeFileSync(ignoreFile, keepDist);
