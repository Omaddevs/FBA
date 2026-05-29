import { useSyncExternalStore } from 'react';

let items = [
  {
    id: 1, type: 'danger', title: 'Drop-out xavfi yuqori',
    text: '3 ta o\'quvchi 2 darsdan ko\'p qoldirdi',
    detail: 'Otabek Nazarov (FA 320), Dilnoza Rasulova (FA 321) va yana 1 o\'quvchi ketma-ket 2 darsdan ko\'p qoldirgani aniqlandi. Davomatlari 50% dan past tushdi. Tezroq bog\'lanib, sababini aniqlash va re-engagement choralarini ko\'rish tavsiya etiladi.',
    time: '10 daqiqa oldin', date: '29 May, 17:25', read: false, to: '/staff/ssm', actionLabel: 'SSM paneliga o\'tish',
  },
  {
    id: 2, type: 'warning', title: 'Yangi rekrut signali',
    text: '2 ta kadr yangi lavozimga tayyor (Underutilized)',
    detail: 'Ball tizimi bo\'yicha 2 ta kadrning potensial kategoriyasi amaldagi lavozimidan +2 daraja yuqori. Ular yangi imkoniyatga tayyor — vakansiya yuborish yoki bog\'lanish mumkin. Faqat tasdiqlangan ball asosida hisoblangan.',
    time: '1 soat oldin', date: '29 May, 16:30', read: false, to: '/staff/hr/underutilized', actionLabel: 'Underutilized ro\'yxati',
  },
  {
    id: 3, type: 'info', title: 'Kurs yangilanishi',
    text: 'FA 320 guruhiga yangi dars qo\'shildi',
    detail: 'FA 320 guruhi uchun "Cash Flow Statement" mavzusidagi yangi dars va FlexiQuiz vazifasi qo\'shildi. O\'quvchilarga bildirishnoma yuborildi.',
    time: '3 soat oldin', date: '29 May, 14:10', read: false, to: '/staff/tutor', actionLabel: 'Guruhni ko\'rish',
  },
  {
    id: 4, type: 'success', title: 'Yangi CV qabul qilindi',
    text: '5 ta yangi CV bazaga qo\'shildi',
    detail: 'So\'nggi sutkada 5 ta yangi nomzod CV yubordi. Ular HR tomonidan ko\'rib chiqilishi va skill\'lari tasdiqlanishi kerak.',
    time: '5 soat oldin', date: '29 May, 12:00', read: true, to: '/staff/hr/candidates', actionLabel: 'Kadrlar bazasi',
  },
  {
    id: 5, type: 'info', title: 'Vakansiyaga javob',
    text: 'Sevara A. "Qiziqaman" deb javob berdi',
    detail: 'Sevara Aminova "Financial Analyst — TBC Bank" vakansiyasiga qiziqish bildirdi. Uning ball\'i 42, kategoriyasi: Financial Analyst. Bog\'lanib intervyu belgilashingiz mumkin.',
    time: 'Kecha', date: '28 May, 18:45', read: true, to: '/staff/hr/vacancy', actionLabel: 'Vakansiyalar',
  },
];

const listeners = new Set();
function emit() { listeners.forEach((l) => l()); }

export function markRead(id) {
  items = items.map((n) => (n.id === id ? { ...n, read: true } : n));
  emit();
}
export function markAllRead() {
  items = items.map((n) => ({ ...n, read: true }));
  emit();
}
export function removeNotification(id) {
  items = items.filter((n) => n.id !== id);
  emit();
}
export function addNotification(n) {
  items = [{ id: Date.now(), read: false, time: 'Hozir', type: 'info', ...n }, ...items];
  emit();
}
export function getNotification(id) {
  return items.find((n) => String(n.id) === String(id));
}

export function useNotifications() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => items
  );
}
