// TZ 7 — Ruxsat tizimi (permissions)

export const PERMISSIONS = {
  'students.view_own': 'O\'z o\'quvchilarini ko\'rish',
  'students.view_all': 'Barcha o\'quvchilarni ko\'rish',
  'students.search': 'Qidiruv (/find)',
  'students.add': 'Yangi o\'quvchi qo\'shish',
  'messages.send_individual': 'Individual xabar',
  'messages.broadcast': 'Broadcast',
  'attendance.view_all': 'Davomat (umumiy) ko\'rish',
  'attendance.mark': 'Davomat kiritish',
  'grades.view': 'Vazifa/Mock ko\'rish',
  'cv.view': 'CV ko\'rish',
  'vacancy.create': 'Vakansiya yaratish',
  'groups.create': 'Guruh ochish',
  'groups.manage_own': 'Guruh boshqaruvi (o\'z)',
  'groups.manage_all': 'Guruh boshqaruvi (barcha)',
  'news.publish': 'Yangilik yuklash',
  'courses.manage': 'Kurslar boshqaruvi',
  'coin.config': 'Coin sozlamalari',
  'hr.dashboard': 'HR dashboard',
  'hr.underutilized': 'Underutilized ro\'yxati',
  'staff.manage': 'Hodim boshqaruvi',
  'roles.create': 'Yangi rol yaratish',
};

export const ROLES = {
  super_admin: {
    label: 'Super Admin',
    color: '#6d5dfc',
    perms: Object.keys(PERMISSIONS),
  },
  admin: {
    label: 'Admin',
    color: '#3b82f6',
    perms: Object.keys(PERMISSIONS).filter((p) => p !== 'roles.create'),
  },
  ssm: {
    label: 'SSM',
    color: '#19b36b',
    perms: ['students.view_all', 'students.search', 'attendance.view_all', 'messages.send_individual', 'messages.broadcast'],
  },
  main_tutor: {
    label: 'Main Tutor',
    color: '#f59e0b',
    perms: ['students.view_own', 'attendance.mark', 'attendance.view_all', 'grades.view', 'groups.manage_own', 'messages.send_individual'],
  },
  support_tutor: {
    label: 'Support Tutor',
    color: '#fc9842',
    perms: ['students.view_own', 'attendance.mark', 'grades.view', 'messages.send_individual'],
  },
  sales: {
    label: 'Sales',
    color: '#ef4444',
    perms: ['students.view_own', 'students.search', 'students.add', 'messages.send_individual', 'messages.broadcast', 'groups.create', 'groups.manage_own', 'courses.manage'],
  },
  smm: {
    label: 'SMM',
    color: '#ec4899',
    perms: ['news.publish', 'courses.manage'],
  },
  hr: {
    label: 'HR Recruiter',
    color: '#0ea5e9',
    perms: ['cv.view', 'vacancy.create', 'hr.dashboard', 'hr.underutilized', 'students.search', 'messages.broadcast'],
  },
  student: {
    label: 'O\'quvchi',
    color: '#6d5dfc',
    perms: [],
  },
};

export function can(role, perm) {
  return ROLES[role]?.perms.includes(perm);
}
