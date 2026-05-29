import { useState } from 'react';
import { Plus, X, ShieldCheck, Coins, RotateCcw, Lock } from 'lucide-react';
import { PERMISSIONS } from '../../data/roles';
import { usePerms, useRolesMeta, togglePerm, addRole, resetPerms, canRole } from '../../data/rolesStore';
import { coinRules as initialCoinRules } from '../../data/mock';

const PERM_KEYS = Object.keys(PERMISSIONS);

export default function Permissions() {
  usePerms(); // store o'zgarishiga obuna (jadval yangilanishi uchun)
  const meta = useRolesMeta();
  const roleKeys = Object.keys(meta).filter((k) => k !== 'student');

  const [showNew, setShowNew] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', perms: [] });
  const [coinRules, setCoinRules] = useState(initialCoinRules);

  function toggleNewPerm(p) {
    setNewRole((r) => ({ ...r, perms: r.perms.includes(p) ? r.perms.filter((x) => x !== p) : [...r.perms, p] }));
  }
  function saveRole() {
    if (!newRole.name.trim()) return;
    addRole({ name: newRole.name.trim(), perms: newRole.perms });
    setNewRole({ name: '', perms: [] });
    setShowNew(false);
  }

  return (
    <div className="fade-up">
      <div className="row between wrap gap-12" style={{ marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>Ruxsatlar tizimi</h2>
          <p className="muted">Har bir rol uchun ruxsatlarni checkbox orqali belgilang. O'zgarishlar darrov saqlanadi.</p>
        </div>
        <div className="row gap-8">
          <button className="btn btn-sm" onClick={resetPerms} title="Standart holatga qaytarish"><RotateCcw size={15} /> Reset</button>
          <button className="btn btn-primary" onClick={() => setShowNew(true)}><Plus size={16} /> Yangi rol</button>
        </div>
      </div>

      <div className="card table-wrap">
        <table className="tbl perm-tbl">
          <thead>
            <tr>
              <th>Ruxsat</th>
              {roleKeys.map((r) => (
                <th key={r} style={{ textAlign: 'center', color: meta[r].color }}>
                  {meta[r].label}
                  {r === 'super_admin' && <Lock size={11} style={{ verticalAlign: -1, marginLeft: 4, opacity: .6 }} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERM_KEYS.map((p) => (
              <tr key={p}>
                <td style={{ fontWeight: 600 }}>{PERMISSIONS[p]}<div className="dim" style={{ fontSize: 11 }}>{p}</div></td>
                {roleKeys.map((r) => {
                  const locked = r === 'super_admin';
                  return (
                    <td key={r} style={{ textAlign: 'center' }}>
                      <label className={`perm-check ${locked ? 'locked' : ''}`} style={{ '--c': meta[r].color }}>
                        <input
                          type="checkbox"
                          checked={canRole(r, p)}
                          disabled={locked}
                          onChange={() => togglePerm(r, p)}
                        />
                        <span className="perm-box" />
                      </label>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Coin sozlamalari */}
      <div className="section-title"><Coins size={14} style={{ verticalAlign: -2 }} /> Coin sozlamalari (admin tahrir qiladi)</div>
      <div className="card card-pad grid grid-2" style={{ gap: 12 }}>
        {coinRules.map((c, i) => (
          <div key={c.key} className="row between" style={{ padding: '8px 0' }}>
            <span>{c.label}</span>
            <div className="row gap-8">
              <span className="dim">+</span>
              <input
                className="input" type="number" value={c.value} style={{ width: 90, padding: '7px 10px' }}
                onChange={(e) => setCoinRules((r) => r.map((x, j) => j === i ? { ...x, value: Number(e.target.value) } : x))}
              />
            </div>
          </div>
        ))}
      </div>

      {showNew && (
        <div className="modal-overlay" onClick={() => setShowNew(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="row between" style={{ marginBottom: 16 }}>
              <h3 style={{ fontWeight: 800 }}><ShieldCheck size={18} style={{ verticalAlign: -3 }} /> Yangi rol yaratish</h3>
              <button className="ic-btn" onClick={() => setShowNew(false)}><X size={18} /></button>
            </div>
            <div className="field" style={{ marginBottom: 14 }}>
              <label>Rol nomi</label>
              <input className="input" placeholder="masalan: Mentor" autoFocus value={newRole.name} onChange={(e) => setNewRole({ ...newRole, name: e.target.value })} />
            </div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)' }}>Ruxsatlar ({newRole.perms.length} tanlandi)</label>
            <div className="grid" style={{ gap: 4, marginTop: 8, maxHeight: 260, overflowY: 'auto' }}>
              {PERM_KEYS.map((p) => (
                <label key={p} className="row gap-8" style={{ cursor: 'pointer', padding: '7px 8px', borderRadius: 8 }}>
                  <input type="checkbox" checked={newRole.perms.includes(p)} onChange={() => toggleNewPerm(p)} />
                  <span style={{ fontSize: 14 }}>{PERMISSIONS[p]}</span>
                </label>
              ))}
            </div>
            <button className="btn btn-primary btn-block" style={{ marginTop: 16 }} onClick={saveRole}>Rolni saqlash</button>
          </div>
        </div>
      )}
    </div>
  );
}
