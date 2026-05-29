import { useSyncExternalStore } from 'react';

const KEY = 'fba_staff_users';

const seed = [
  { id: 1, name: 'Jasur Rahimov', phone: '+998 90 111 22 33', username: 'jasur.rahimov', password: 'Tutor@2026', role: 'main_tutor', group: 'FA 320', active: true },
  { id: 2, name: 'Madina Aliyeva', phone: '+998 91 222 33 44', username: 'madina.aliyeva', password: 'Tutor@8421', role: 'support_tutor', group: 'FA 320', active: true },
  { id: 3, name: 'Bekzod Karimov', phone: '+998 93 333 44 55', username: 'bekzod.karimov', password: 'Tutor@5190', role: 'main_tutor', group: 'FA 321', active: false },
];

function load() {
  try { const r = localStorage.getItem(KEY); if (r) return JSON.parse(r); } catch { /* ignore */ }
  return seed;
}

let items = load();
const listeners = new Set();
function sub(cb) { listeners.add(cb); return () => listeners.delete(cb); }
function emit() { localStorage.setItem(KEY, JSON.stringify(items)); listeners.forEach((l) => l()); }

export function genPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let p = '';
  for (let i = 0; i < 8; i++) p += chars[Math.floor(Math.random() * chars.length)];
  return p;
}

export function usernameFrom(name) {
  return name.trim().toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/).filter(Boolean).slice(0, 2).join('.');
}

export function addStaff({ name, phone, username, password, role, group }) {
  const item = {
    id: Date.now(),
    name: name.trim(),
    phone: phone.trim(),
    username: (username || usernameFrom(name)).trim(),
    password: password || genPassword(),
    role,
    group: group || '',
    active: true,
  };
  items = [item, ...items];
  emit();
  return item;
}

export function resetPassword(id) {
  const pwd = genPassword();
  items = items.map((s) => (s.id === id ? { ...s, password: pwd } : s));
  emit();
  return pwd;
}

export function toggleActive(id) {
  items = items.map((s) => (s.id === id ? { ...s, active: !s.active } : s));
  emit();
}

export function removeStaff(id) {
  items = items.filter((s) => s.id !== id);
  emit();
}

export function authenticate(login, password) {
  const l = (login || '').trim().toLowerCase();
  const found = items.find(
    (s) => s.active && (s.username.toLowerCase() === l || s.phone.replace(/\s/g, '') === login.replace(/\s/g, '')) && s.password === password
  );
  return found || null;
}

export function useStaff() {
  return useSyncExternalStore(sub, () => items);
}
