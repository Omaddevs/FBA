import { computeScore, categoryForScore } from './ball';

// ---- Joriy o'quvchi (demo) ----
export const me = {
  id: 1,
  name: 'Diyora Karimova',
  phone: '+998 90 123 45 67',
  email: 'diyora.k@gmail.com',
  linkedin: 'linkedin.com/in/diyorak',
  telegram: '@diyora_k',
  city: 'Toshkent',
  birthYear: 2001,
  group: 'FA 320',
  course: 'ACCA Financial Accounting',
  coins: 1840,
  rank: 4,
  // Tab 2 — ish va ta'lim
  position: 'Junior Accountant',
  company: 'EPAM Systems',
  jobStatus: 'working', // working | searching
  positionLevel: 2, // amaldagi lavozim kategoriyasi
  university: 'TDIU',
  gradYear: 2023,
  fbaPlaced: false,
  salaryExpect: 8,
  lookingForJob: true,
  // Tab 3 — skills (ball asosi)
  skills: {
    acca: ['BT', 'MA', 'FA', 'LW', 'PM'],
    dipifr: false,
    experienceYears: 2,
    certificates: ['CFA L1'],
    trainings: ['SQL'],
    finModeling: 'Inter',
    powerBI: 'Basic',
    erp: ['1C'],
    excel: 'Adv',
    english: 'B2',
  },
  verified: { acca: true, certificates: false, erp: true }, // tasdiqlangan skill'lar
};

// ---- Yangiliklar (SMM) ----
export const news = [
  {
    id: 1, title: 'Yangi ACCA SBR guruhi ochildi', tag: 'Kurs', date: '28 May',
    author: 'Sanjar Q.', views: 1240, readTime: 2, cover: ['#6d5dfc', '#3b82f6'], featured: true,
    excerpt: 'Iyun oyidan boshlab kechki guruh. Tajribali tyutorlar, jonli mashg\'ulotlar va FlexiQuiz vazifalar.',
    body: 'Iyun oyidan boshlab kechki ACCA SBR (Strategic Business Reporting) guruhi ochilmoqda. Dars jadvali: dushanba, chorshanba, juma 18:00–20:00. Tajribali tyutorlar, jonli mashg\'ulotlar, FlexiQuiz vazifalar va mock imtihonlar. Joylar cheklangan — ro\'yxatdan o\'ting!',
  },
  {
    id: 2, title: 'FBA Career Day 2026', tag: 'Tadbir', date: '24 May',
    author: 'HR jamoasi', views: 2380, readTime: 3, cover: ['#19b36b', '#10b981'],
    excerpt: '15+ hamkor kompaniya, jonli intervyular. Joylar cheklangan.',
    body: 'FBA Career Day 2026 — yilning eng katta karyera tadbiri. 15+ hamkor kompaniya, jonli intervyular, CV ko\'rigi va networking. Eng yuqori ball to\'plagan o\'quvchilar uchun maxsus sessiyalar.',
  },
  {
    id: 3, title: 'Do\'konda yangi takliflar', tag: 'Do\'kon', date: '20 May',
    author: 'SMM', views: 870, readTime: 1, cover: ['#f7b733', '#fc9842'],
    excerpt: '1000 coin = 100,000 so\'m chegirma. Coinlaringizni sarflang.',
    body: 'Do\'konda yangi takliflar! 1000 coin = 100,000 so\'m chegirma. Coinlaringizni kitoblar, kurslar va FBA merch mahsulotlariga almashtiring.',
  },
  {
    id: 4, title: 'May oyi reytingi e\'lon qilindi', tag: 'Tadbir', date: '18 May',
    author: 'SMM', views: 1560, readTime: 2, cover: ['#ec4899', '#f43f5e'],
    excerpt: 'Eng faol o\'quvchilar va guruhlar. Top 3 ga sovg\'alar.',
    body: 'May oyining eng faol o\'quvchilari va guruhlari e\'lon qilindi. Reytingda yuqori o\'rinlarni egallagan o\'quvchilarga maxsus coin bonuslari va sovg\'alar topshiriladi.',
  },
];

// ---- Kurslar (marketing) ----
export const courses = [
  { id: 1, code: 'FA', title: 'Financial Accounting', mine: true, color: '#6d5dfc', students: 24, progress: 62 },
  { id: 2, code: 'FM', title: 'Financial Management', mine: false, color: '#3b82f6', students: 19 },
  { id: 3, code: 'SBR', title: 'Strategic Business Reporting', mine: false, color: '#19b36b', students: 12 },
  { id: 4, code: 'AFM', title: 'Advanced Financial Mgmt', mine: false, color: '#f59e0b', students: 9 },
];

// ---- Davomat kalendari (kunma-kun) ----
export const attendanceDays = (() => {
  const out = [];
  const pattern = [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1];
  for (let i = 0; i < pattern.length; i++) {
    out.push({ day: i + 1, date: `${i + 1} May`, present: pattern[i] === 1 });
  }
  return out;
})();

export const attendancePct = Math.round(
  (attendanceDays.filter((d) => d.present).length / attendanceDays.length) * 100
);

// Kumulyativ davomat foizi (grafik)
export const attendanceTrend = (() => {
  let present = 0;
  return attendanceDays.map((d, i) => {
    if (d.present) present++;
    return { lesson: i + 1, pct: Math.round((present / (i + 1)) * 100) };
  });
})();

// ---- Darslar (modul → dars) ----
export const modules = [
  {
    id: 1, title: 'Module 1 — Asoslar', done: true,
    lessons: [
      { id: 1, title: 'Buxgalteriya tushunchasi', video: true, task: true, taskScore: 92, done: true },
      { id: 2, title: 'Double-entry tizimi', video: true, task: true, taskScore: 85, done: true },
      { id: 3, title: 'Trial Balance', video: true, task: true, taskScore: 78, done: true },
    ],
  },
  {
    id: 2, title: 'Module 2 — Moliyaviy hisobot',
    lessons: [
      { id: 4, title: 'Income Statement', video: true, task: true, taskScore: 88, done: true },
      { id: 5, title: 'Balance Sheet', video: true, task: false, done: false, current: true },
      { id: 6, title: 'Cash Flow Statement', video: true, task: false, locked: true },
    ],
  },
  {
    id: 3, title: 'Module 3 — Standartlar',
    lessons: [
      { id: 7, title: 'IFRS asoslari', video: true, task: false, locked: true },
      { id: 8, title: 'Inventories (IAS 2)', video: true, task: false, locked: true },
    ],
  },
];

// ---- Ranking ----
export const ranking = [
  { id: 11, name: 'Jasur Toshmatov', coins: 2940, group: 'FA 320' },
  { id: 12, name: 'Madina Yusupova', coins: 2510, group: 'FA 320' },
  { id: 13, name: 'Bekzod Aliyev', coins: 2120, group: 'FA 321' },
  { id: 1, name: 'Diyora Karimova', coins: 1840, group: 'FA 320', me: true },
  { id: 14, name: 'Nilufar Saidova', coins: 1730, group: 'FA 320' },
  { id: 15, name: 'Sardor Rashidov', coins: 1610, group: 'FA 321' },
  { id: 16, name: 'Kamola Ergasheva', coins: 1450, group: 'FA 320' },
  { id: 17, name: 'Aziz Qodirov', coins: 1290, group: 'FA 321' },
];

// ---- Coin tarixi ----
export const coinHistory = [
  { id: 1, reason: 'Haftalik 100% davomat', amount: 100, date: '28 May' },
  { id: 2, reason: 'Vazifa o\'z vaqtida (FA L4)', amount: 15, date: '27 May' },
  { id: 3, reason: 'Darsga kelish', amount: 10, date: '27 May' },
  { id: 4, reason: 'Mock yuqori (88%)', amount: 50, date: '25 May' },
  { id: 5, reason: '5 dars streak', amount: 30, date: '24 May' },
];

// ---- Coin qoidalari (admin tahrirlaydi) ----
export const coinRules = [
  { key: 'attend', label: 'Darsga kelish', value: 10 },
  { key: 'task', label: 'Vazifa o\'z vaqtida', value: 15 },
  { key: 'mock', label: 'Mock yuqori (80%+)', value: 50 },
  { key: 'streak', label: '5 dars streak', value: 30 },
  { key: 'comeback', label: 'Comeback', value: 50 },
  { key: 'week100', label: 'Haftalik 100% davomat', value: 100 },
  { key: 'next', label: 'Keyingi kursga o\'tish', value: 200 },
  { key: 'referral', label: 'Referral (promo-kod)', value: 300 },
];

// ---- SSM: drop-out (xavfli o'quvchilar) ----
export const dropoutStudents = [
  { id: 21, name: 'Otabek Nazarov', group: 'FA 320', attendance: 48, missed: 4, risk: 'high', reason: '2 dars ketma-ket kelmadi' },
  { id: 22, name: 'Gulnoza Tosheva', group: 'FA 321', attendance: 62, missed: 2, risk: 'mid', reason: 'Vazifa past <50%' },
  { id: 23, name: 'Shoxrux Karimov', group: 'FA 320', attendance: 55, missed: 3, risk: 'mid', reason: 'Mock past' },
  { id: 24, name: 'Dilnoza Rasulova', group: 'FA 321', attendance: 40, missed: 5, risk: 'high', reason: 'Status: Stopped xavfi' },
];

// ---- Sales: re-enrollment (4 status) ----
export const reEnrollment = [
  { id: 31, name: 'Aziza Yodgorova', phone: '+998 91 234 56 78', status: 'Passed', course: 'FA', date: '15 May' },
  { id: 32, name: 'Rustam Bekov', phone: '+998 93 345 67 89', status: 'Failed', course: 'FM', date: '12 May' },
  { id: 33, name: 'Sevara Aminova', phone: '+998 94 456 78 90', status: 'No Exam', course: 'FA', date: '10 May' },
  { id: 34, name: 'Jahongir Olimov', phone: '+998 90 567 89 01', status: 'Stopped', course: 'SBR', date: '08 May' },
];

// ---- HR kadrlar bazasi (4013 kadr — namuna) ----
const rawCandidates = [
  { id: 101, name: 'Akmal Rahimov', position: 'Financial Analyst', positionLevel: 3, company: 'Uztelecom', jobStatus: 'working', placedYear: 2024, fba: true, salary: 14, university: 'Westminster',
    skills: { acca: ['BT','MA','FA','LW','PM','TX','FR'], dipifr: true, experienceYears: 4, certificates: ['CFA L1'], trainings: ['SQL','Python'], finModeling: 'Adv', powerBI: 'Inter', erp: ['1C','SAP'], excel: 'Expert', english: 'C1' } },
  { id: 102, name: 'Malika Yusupova', position: 'Finance Assistant', positionLevel: 2, company: 'Artel', jobStatus: 'searching', placedYear: 2023, fba: true, salary: 9, university: 'TDIU',
    skills: { acca: ['BT','MA','FA','PM'], dipifr: false, experienceYears: 3, certificates: ['CFA L1'], trainings: ['SQL'], finModeling: 'Inter', powerBI: 'Basic', erp: ['1C'], excel: 'Adv', english: 'B2' } },
  { id: 103, name: 'Sardor Mahmudov', position: 'Senior Financist', positionLevel: 4, company: 'Kapitalbank', jobStatus: 'working', placedYear: 2022, fba: false, salary: 22, university: 'INHA',
    skills: { acca: ['BT','MA','FA','LW','PM','TX','FR','AA','FM','SBR','SBL'], dipifr: true, experienceYears: 6, certificates: ['CFA','FRM'], trainings: ['Python','SQL','Tableau'], finModeling: 'Adv', powerBI: 'Adv', erp: ['1C','SAP','Oracle'], excel: 'Expert', english: 'C1' } },
  { id: 104, name: 'Nigora Saidova', position: 'Intern / Trainee', positionLevel: 1, company: '—', jobStatus: 'searching', placedYear: null, fba: false, salary: 4, university: 'TDIU',
    skills: { acca: ['BT','MA'], dipifr: false, experienceYears: 0, certificates: [], trainings: [], finModeling: null, powerBI: 'Basic', erp: [], excel: 'Inter', english: 'B1' } },
  { id: 105, name: 'Botir Ziyodov', position: 'Finance Assistant', positionLevel: 2, company: 'Beeline', jobStatus: 'working', placedYear: 2024, fba: true, salary: 11, university: 'Westminster',
    skills: { acca: ['BT','MA','FA','LW','PM','TX','FR','AA'], dipifr: true, experienceYears: 5, certificates: ['CIMA'], trainings: ['SQL','Python'], finModeling: 'Adv', powerBI: 'Inter', erp: ['1C','SAP'], excel: 'Expert', english: 'C1' } },
  { id: 106, name: 'Kamola Tursunova', position: 'Financial Analyst', positionLevel: 3, company: 'TBC Bank', jobStatus: 'working', placedYear: 2023, fba: true, salary: 16, university: 'INHA',
    skills: { acca: ['BT','MA','FA','LW','PM','TX'], dipifr: false, experienceYears: 4, certificates: ['CFA L2'], trainings: ['SQL'], finModeling: 'Inter', powerBI: 'Inter', erp: ['1C'], excel: 'Adv', english: 'B2' } },
  { id: 107, name: 'Jamshid Eshonov', position: 'Intern / Trainee', positionLevel: 1, company: 'Hamkorbank', jobStatus: 'working', placedYear: 2025, fba: true, salary: 6, university: 'TDIU',
    skills: { acca: ['BT','MA','FA','LW','PM','TX','FR','AA','FM'], dipifr: false, experienceYears: 2, certificates: ['CFA L1'], trainings: ['SQL','Python'], finModeling: 'Inter', powerBI: 'Inter', erp: ['1C','Oracle'], excel: 'Adv', english: 'B2' } },
  { id: 108, name: 'Feruza Karimova', position: 'Finance Manager', positionLevel: 5, company: 'EPAM', jobStatus: 'working', placedYear: 2021, fba: false, salary: 32, university: 'Westminster',
    skills: { acca: ['BT','MA','FA','LW','PM','TX','FR','AA','FM','SBR','SBL','AFM'], dipifr: true, experienceYears: 8, certificates: ['CFA','CIMA'], trainings: ['Python','SQL','Tableau'], finModeling: 'Adv', powerBI: 'Adv', erp: ['1C','SAP','Oracle'], excel: 'Expert', english: 'C2' } },
];

export const candidates = rawCandidates.map((c) => {
  const { total } = computeScore(c.skills);
  const cat = categoryForScore(total);
  return {
    ...c,
    score: total,
    scoreLevel: cat.level,
    scoreCategory: cat.name,
    gap: cat.level - c.positionLevel, // Underutilized = ball_kat − lavozim_kat
  };
});

// ---- Vakansiyalar ----
export const vacancies = [
  { id: 201, title: 'Financial Analyst', company: 'TBC Bank', minScore: 31, category: 3, sent: 12, interested: 5, status: 'active' },
  { id: 202, title: 'Senior Financist', company: 'Kapitalbank', minScore: 51, category: 4, sent: 8, interested: 3, status: 'active' },
  { id: 203, title: 'Finance Assistant', company: 'Artel', minScore: 16, category: 2, sent: 20, interested: 9, status: 'closed' },
];
