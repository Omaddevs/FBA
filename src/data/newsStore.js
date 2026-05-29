import { useSyncExternalStore } from 'react';
import { news as initial } from './mock';

let items = [...initial];
const listeners = new Set();
function emit() { listeners.forEach((l) => l()); }

export function addNews(item) {
  items = [{ id: Date.now(), views: 0, readTime: 1, author: 'SMM', date: 'Hozir', ...item }, ...items];
  emit();
}

export function removeNews(id) {
  items = items.filter((n) => n.id !== id);
  emit();
}

export function getNews(id) {
  return items.find((n) => String(n.id) === String(id));
}

const viewed = new Set();
export function incrementViews(id) {
  if (viewed.has(String(id))) return;
  viewed.add(String(id));
  items = items.map((n) => (String(n.id) === String(id) ? { ...n, views: n.views + 1 } : n));
  emit();
}

export function useNews() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => items
  );
}
