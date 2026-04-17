import fs from 'fs';

const xml = fs.readFileSync('sheet1.xml', 'utf-8');
const matches = xml.match(/<c r="L\d+"[^>]*>.*?<\/c>/g);
if (matches) {
  console.log(matches.slice(0, 10).join('\n'));
} else {
  console.log("No matches found");
}
