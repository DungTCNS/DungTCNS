import fs from 'fs';
import unzipper from 'unzipper';

async function extractSheet1() {
  const directory = await unzipper.Open.file('data.xlsx');
  const file = directory.files.find(f => f.path === 'xl/worksheets/sheet1.xml');
  const content = await file.buffer();
  fs.writeFileSync('sheet1.xml', content);
  console.log("Saved sheet1.xml");
}
extractSheet1();
