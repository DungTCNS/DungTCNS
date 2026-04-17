import fs from 'fs';
import unzipper from 'unzipper';

async function extractSheet2() {
  const directory = await unzipper.Open.file('data.xlsx');
  const file = directory.files.find(f => f.path === 'xl/worksheets/sheet2.xml');
  const content = await file.buffer();
  fs.writeFileSync('sheet2.xml', content);
  console.log("Saved sheet2.xml");
  
  const matches = content.toString().match(/<c r="L\d+"[^>]*>.*?<\/c>/g);
  if (matches) {
    console.log(matches.slice(0, 10).join('\n'));
  } else {
    console.log("No matches found in sheet2");
  }
}
extractSheet2();
