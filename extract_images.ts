import fs from 'fs';

const html = fs.readFileSync('sheet.html', 'utf-8');
const regex = /items\.push\(\{name: "([^"]+)",/g;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log(match[1]);
}
