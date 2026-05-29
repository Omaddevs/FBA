import { useSyncExternalStore } from 'react';
import { ROLES } from './roles';

const PERM_KEY = 'fba_role_perms';
const META_KEY = 'fba_custom_roles';

function defaultPerms() {
  const o = {};
  Object.entries(ROLES).forEach(([k, v]) => { o[k] = [...v.perms]; });
  return o;
}
function load(key, fallback) {
  try { const r = localStorage.getItem(key); if (r) return JSON.parse(r); } catch { /* ignore */ }
  return fallback;
}

let perms = load(PERM_KEY, defaultPerms());
let customRoles = load(META_KEY, []); // [{ key, label, color }]
const listeners = new Set();

function sub(cb) { listeners.add(cb); return () => listeners.delete(cb); }
function emit() {
  localStorage.setItem(PERM_KEY, JSON.stringify(perms));
  localStorage.setItem(META_KEY, JSON.stringify(customRoles));
  listeners.forEach((l) => l());
}

export function togglePerm(role, perm) {
  if (role === 'super_admin') return; // Super Admin doimo barchasiga ega
  const s = new Set(perms[role] || []);
  s.has(perm) ? s.delete(perm) : s.add(perm);
  perms = { ...perms, [role]: [...s] };
  emit();
}

export function setRolePerms(role, list) {
  if (role === 'super_admin') return;
  perms = { ...perms, [role]: [...list] };
  emit();
}

export function canRole(role, perm) {
  if (role === 'super_admin') return true;
  return (perms[role] || []).includes(perm);
}

export function addRole({ name, color = '#6d5dfc', perms: p = [] }) {
  const key = 'role_' + Date.now();
  customRoles = [...customRoles, { key, label: name, color }];
  perms = { ...perms, [key]: [...p] };
  emit();
  return key;
}

export function resetPerms() {
  perms = defaultPerms();
  customRoles = [];
  emit();
}

export function usePerms() {
  return useSyncExternalStore(sub, () => perms);
}

export function useRolesMeta() {
  useSyncExternalStore(sub, () => customRoles);
  return { ...ROLES, ...Object.fromEntries(customRoles.map((r) => [r.key, { label: r.label, color: r.color, perms: [] }])) };
}
