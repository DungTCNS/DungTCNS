import fs from 'fs';

async function fetchHtml() {
  const res = await fetch("https://docs.google.com/spreadsheets/d/1dGz4GEU1TZp8lmJ6M7o8AL7KJxwWyk9t/htmlview?gid=1644254745");
  const text = await res.text();
  fs.writeFileSync('hs_nhansu.html', text);
  console.log("Saved hs_nhansu.html, length:", text.length);
}
fetchHtml();
