import fs from 'fs';

const data = fs.readFileSync('src/data/mockData.ts', 'utf-8');
const ids = [];
const regex = /"id": "([^"]+)"/g;
let match;
while ((match = regex.exec(data)) !== null) {
  ids.push(match[1]);
}

const duplicates = ids.filter((item, index) => ids.indexOf(item) !== index);
console.log("Duplicates:", [...new Set(duplicates)]);
