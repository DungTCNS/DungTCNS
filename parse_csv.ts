import fs from 'fs';
import Papa from 'papaparse';

const csv = fs.readFileSync('dulieudauvao.csv', 'utf-8');
const parsed = Papa.parse(csv, { header: false });
const rows = parsed.data;

const imageMapping = JSON.parse(fs.readFileSync('image_mapping.json', 'utf-8'));

const employees = [];

for (let i = 3; i < rows.length; i++) {
  const row = rows[i];
  if (!row || row.length < 2 || !row[1]) continue;
  
  // Excel row is i + 1
  const excelRow = i + 1;
  const imageFile = imageMapping[`L${excelRow}`];
  const avatarUrl = imageFile ? `/images/${imageFile}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(row[2] || 'User')}&background=random`;
  
  const emp = {
    id: row[1] || '',
    fullName: row[2] || '',
    dateOfBirth: row[3] || '',
    gender: row[4] || '',
    age: row[5] || '',
    hometown: row[6] || '',
    joinDate: row[7] || '',
    position: row[8] || '',
    department: row[9] || '',
    yearsOfService: row[10] || '',
    avatarUrl: avatarUrl,
    education: row[12] || '',
    major: row[13] || '',
    graduationYear: row[14] || '',
    university: row[15] || '',
    educationType: row[16] || '',
    salaryLevel: row[17] || '',
    entryEducation: row[18] || '',
    partyJoinDate: row[19] || '',
    politicalTheory: row[20] || '',
    foreignLanguage: row[21] || '',
    phone: row[22] || '',
    email: row[23] || '',
    workHistory: row[24] || '',
    discipline: row[25] || '',
    status: 'Đang làm việc'
  };
  employees.push(emp);
}

// Ensure unique IDs
const seenIds = new Set();
employees.forEach((emp, idx) => {
  if (seenIds.has(emp.id)) {
    emp.id = `${emp.id}_${idx}`;
  }
  seenIds.add(emp.id);
});

const tsContent = `import { Employee } from '../types';

export const mockEmployees: Employee[] = ${JSON.stringify(employees, null, 2)};
`;

fs.writeFileSync('src/data/mockData.ts', tsContent);
console.log(`Generated mockData.ts with ${employees.length} employees`);
