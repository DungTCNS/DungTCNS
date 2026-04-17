import fs from 'fs';

const data = JSON.parse(fs.readFileSync('gviz.json', 'utf-8'));
const rows = data.table.rows;

rows.forEach((row, i) => {
  if (!row.c) return;
  row.c.forEach((cell, j) => {
    if (cell && cell.v && typeof cell.v === 'string' && cell.v.includes('http')) {
      console.log(`Row ${i}, Col ${j}: ${cell.v}`);
    }
  });
});
