// FBA Connect — HR ball (score) engine.
// Excel formulasi AYNAN kodga ko'chirilgan (TZ 4.1). Max 100 ball.
// Qiymatlar qattiq (admin tahrirlay olmaydi), foydalanuvchi ma'lumoti o'zgarsa darrov yangilanadi.

// ---- ACCA (max 35) ----
const ACCA_KNOWLEDGE = ['BT', 'MA', 'FA']; // 3 ball
const ACCA_SKILLS = ['LW', 'PM', 'TX', 'FR', 'AA', 'FM']; // 3 ball
const ACCA_STRATEGIC = ['SBL', 'SBR', 'AFM', 'APM', 'AAA', 'ATX']; // 2 ball
// DipIFR alohida = 8 ball

// ---- Sertifikatlar (max 10) ----
const CERT_POINTS = {
  CFA: 10, // CFA Charterholder
  CIMA: 8,
  CPA: 8,
  FRM: 5,
  'CFA L2': 5,
  'CFA L1': 3,
  CIA: 3,
};

// ---- Daraja jadvallari ----
const FIN_MODELING = { Basic: 3, Inter: 5, Adv: 8 }; // max 8
const POWER_BI = { Basic: 2, Inter: 4, Adv: 6 };       // max 6
const EXCEL = { Basic: 1, Inter: 3, Adv: 4, Expert: 5 };// max 5
const ENGLISH = { A1: 1, A2: 1, B1: 2, B2: 3, C1: 4, C2: 4 }; // max 4

function clamp(v, max) { return Math.min(v, max); }

function accaScore(subjects = [], dipifr = false) {
  let s = 0;
  for (const sub of subjects) {
    if (ACCA_KNOWLEDGE.includes(sub)) s += 3;
    else if (ACCA_SKILLS.includes(sub)) s += 3;
    else if (ACCA_STRATEGIC.includes(sub)) s += 2;
  }
  if (dipifr) s += 8;
  return clamp(s, 35);
}

function experienceScore(years = 0) {
  return clamp(years * 2.5, 20); // yil × 2.5, max 20
}

function certScore(certs = []) {
  let s = 0;
  for (const c of certs) s += CERT_POINTS[c] || 0;
  return clamp(s, 10);
}

function trainingsScore(trainings = []) {
  // har biri 2 ball, 3+ = 5 (max 5)
  const n = trainings.length;
  if (n >= 3) return 5;
  return clamp(n * 2, 5);
}

function erpScore(erps = []) {
  // 1 ta = 3, 2 ta = 5, 3+ = 7 (max 7)
  const n = erps.length;
  if (n >= 3) return 7;
  if (n === 2) return 5;
  if (n === 1) return 3;
  return 0;
}

function levelScore(table, value) {
  return value ? (table[value] || 0) : 0;
}

// 9 komponent bo'yicha to'liq breakdown qaytaradi
export function computeScore(skills = {}) {
  const breakdown = {
    acca: accaScore(skills.acca, skills.dipifr),
    experience: experienceScore(skills.experienceYears),
    certificates: certScore(skills.certificates),
    trainings: trainingsScore(skills.trainings),
    finModeling: levelScore(FIN_MODELING, skills.finModeling),
    powerBI: levelScore(POWER_BI, skills.powerBI),
    erp: erpScore(skills.erp),
    excel: levelScore(EXCEL, skills.excel),
    english: levelScore(ENGLISH, skills.english),
  };
  const total = Math.round(
    Object.values(breakdown).reduce((a, b) => a + b, 0) * 10
  ) / 10;
  return { total: clamp(total, 100), breakdown };
}

export const COMPONENT_META = [
  { key: 'acca', label: 'ACCA fanlari', max: 35 },
  { key: 'experience', label: 'Tajriba yili', max: 20 },
  { key: 'certificates', label: 'Sertifikatlar', max: 10 },
  { key: 'finModeling', label: 'Financial Modeling', max: 8 },
  { key: 'erp', label: 'ERP dasturlar', max: 7 },
  { key: 'powerBI', label: 'Power BI', max: 6 },
  { key: 'excel', label: 'Excel', max: 5 },
  { key: 'trainings', label: 'Boshqa treninglar', max: 5 },
  { key: 'english', label: 'Ingliz tili', max: 4 },
];

// ---- Lavozim kategoriyalari (6 daraja) — TZ 4.2 ----
export const CATEGORIES = [
  { level: 1, min: 0, max: 15, name: 'Intern / Trainee' },
  { level: 2, min: 16, max: 30, name: 'Finance Assistant' },
  { level: 3, min: 31, max: 50, name: 'Financial Analyst' },
  { level: 4, min: 51, max: 65, name: 'Senior Financist' },
  { level: 5, min: 66, max: 80, name: 'Finance Manager' },
  { level: 6, min: 81, max: 100, name: 'CFO / Finance Director' },
];

export function categoryForScore(score) {
  return CATEGORIES.find((c) => score >= c.min && score <= c.max) || CATEGORIES[0];
}

// ---- Rivojlanish yo'li tavsiyalari — TZ 4.7 ----
export function developmentTips(skills = {}) {
  const tips = [];
  if (!skills.certificates?.includes('CFA L1') && !skills.certificates?.includes('CFA')) {
    tips.push({ text: 'CFA L1 sertifikatini oling', delta: 3 });
  }
  const erpN = (skills.erp || []).length;
  if (erpN < 3) {
    const delta = erpScore([...(skills.erp || []), 'X']) - erpScore(skills.erp);
    if (delta > 0) tips.push({ text: 'ERP dasturi +1 ta o\'rganing', delta });
  }
  if (skills.finModeling !== 'Adv') {
    const next = skills.finModeling === 'Inter' ? 'Adv' : skills.finModeling === 'Basic' ? 'Inter' : 'Basic';
    const delta = FIN_MODELING[next] - (FIN_MODELING[skills.finModeling] || 0);
    tips.push({ text: `Financial Modeling: ${next} darajasiga chiqing`, delta });
  }
  if (skills.excel !== 'Expert') {
    tips.push({ text: 'Excel darajangizni oshiring', delta: 1 });
  }
  if (!skills.dipifr) {
    tips.push({ text: 'DipIFR oling (eng katta o\'sish)', delta: 8 });
  }
  return tips.sort((a, b) => b.delta - a.delta).slice(0, 4);
}

// Options for forms
export const ACCA_OPTIONS = [...ACCA_KNOWLEDGE, ...ACCA_SKILLS, ...ACCA_STRATEGIC];
export const CERT_OPTIONS = Object.keys(CERT_POINTS);
export const LEVEL_BASIC = ['Basic', 'Inter', 'Adv'];
export const EXCEL_OPTIONS = ['Basic', 'Inter', 'Adv', 'Expert'];
export const ENGLISH_OPTIONS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const ERP_OPTIONS = ['1C', 'SAP', 'Oracle', 'MS Dynamics', 'QuickBooks'];
export const TRAINING_OPTIONS = ['Python', 'SQL', 'Tableau', 'VBA', 'R'];
