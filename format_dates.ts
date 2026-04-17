import fs from 'fs';

const content = fs.readFileSync('src/data/mockData.ts', 'utf-8');
const jsonMatch = content.match(/export const mockEmployees: Employee\[\] = (\[[\s\S]*\]);/);

if (jsonMatch) {
  let employees = JSON.parse(jsonMatch[1]);
  
  function formatDate(dateStr: string) {
    if (!dateStr || typeof dateStr !== 'string') return dateStr;
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      // Assuming input is M/D/YYYY
      const m = parts[0].padStart(2, '0');
      const d = parts[1].padStart(2, '0');
      const y = parts[2];
      return `${d}/${m}/${y}`;
    }
    return dateStr;
  }

  employees = employees.map((emp: any) => {
    emp.dateOfBirth = formatDate(emp.dateOfBirth);
    emp.partyJoinDate = formatDate(emp.partyJoinDate);
    emp.joinDate = formatDate(emp.joinDate); // Cập nhật luôn ngày vào ngành điện cho đồng bộ
    return emp;
  });

  const tsContent = `import { Employee } from '../types';\n\nexport const mockEmployees: Employee[] = ${JSON.stringify(employees, null, 2)};\n`;
  fs.writeFileSync('src/data/mockData.ts', tsContent);
  console.log('Dates formatted successfully.');
} else {
  console.log('Could not parse mockData.ts');
}
