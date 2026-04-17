import fs from 'fs';

async function fetchGviz() {
  const res = await fetch("https://docs.google.com/spreadsheets/d/1dGz4GEU1TZp8lmJ6M7o8AL7KJxwWyk9t/gviz/tq?tqx=out:json&gid=1880543396");
  let text = await res.text();
  
  // The response is wrapped in a function call: /*O_o*/ google.visualization.Query.setResponse({...})
  text = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
  
  fs.writeFileSync('gviz.json', text);
  console.log("Saved gviz.json, length:", text.length);
}
fetchGviz();
