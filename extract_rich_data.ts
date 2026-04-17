import fs from 'fs';
import unzipper from 'unzipper';

async function extractRichData() {
  const directory = await unzipper.Open.file('data.xlsx');
  
  const files = [
    'xl/richData/richValueRel.xml',
    'xl/richData/_rels/richValueRel.xml.rels',
    'xl/richData/rdrichvalue.xml',
    'xl/worksheets/sheet1.xml'
  ];
  
  for (const path of files) {
    const file = directory.files.find(f => f.path === path);
    if (file) {
      const content = await file.buffer();
      console.log(`\n--- ${path} ---`);
      console.log(content.toString('utf-8').substring(0, 500));
    }
  }
}
extractRichData();
