import { useState } from 'react';
import {
  UserPlus, X, Search, KeyRound, Copy, Check, RefreshCw, Power, Trash2, ShieldCheck, Eye, EyeOff,
} from 'lucide-react';
import { Avatar, KPI } from '../../components/ui';
import { ROLES } from '../../data/roles';
import {
  useStaff, addStaff, resetPassword, toggleActive, removeStaff, genPassword, usernameFrom,
} from '../../data/staffStore';

const TEACHER_ROLES = ['main_tutor', 'support_tutor'];
const ALL_ROLES = ['main_tutor', 'support_tutor', 'ssm', 'sales', 'smm', 'hr', 'admin'];

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <div className="cred-field">
      <div>
        <div className="dim" style={{ fontSize: 12 }}>{label}</div>
        <div style={{ fontWeight: 700, fontFamily: 'monospace', fontSize: 15 }}>{value}</div>
      </div>
      <button className="btn btn-sm" onClick={copy}>{copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Nusxa olindi' : 'Nusxa'}</button>
    </div>
  );
}

export default function Teachers() {
  const staff = useStaff();
  const [q, setQ] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [created, setCreated] = useState(null); // yangi yaratilgan login ma'lumotlari
  const [resetInfo, setResetInfo] = useState(null);
  const [showPwd, setShowPwd] = useState({});

  const list = staff.filter((s) =>
    (roleFilter === 'all' || s.role === roleFilter) &&
    (s.name.toLowerCase().includes(q.toLowerCase()) || s.username.includes(q.toLowerCase()) || s.phone.includes(q))
  );

  const teachers = staff.filter((s) => TEACHER_ROLES.includes(s.role));

  return (
    <div className="fade-up">
      <div className="row between wrap gap-12" style={{ marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>O'qituvchilar boshqaruvi</h2>
          <p className="muted">Yangi o'qituvchi qo'shing va unga login ma'lumotlarini bering.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}><UserPlus size={16} /> Yangi o'qituvchi</button>
      </div>

      <div className="grid grid-3" style={{ marginBottom: 4 }}>
        <KPI label="Jami o'qituvchilar" value={teachers.length} icon={ShieldCheck} color="#6d5dfc" />
        <KPI label="Faol" value={staff.filter((s) => s.active).length} icon={Power} color="#19b36b" />
        <KPI label="Bloklangan" value={staff.filter((s) => !s.active).length} icon={Power} color="#ef4444" />
      </div>

      <div className="row between wrap gap-12" style={{ margin: '18px 0' }}>
        <div className="row gap-8 wrap">
          {[['all', 'Barchasi'], ['main_tutor', 'Main Tutor'], ['support_tutor', 'Support Tutor']].map(([k, l]) => (
            <span key={k} className={`chip ${roleFilter === k ? 'active' : ''}`} onClick={() => setRoleFilter(k)}>{l}</span>
          ))}
        </div>
        <div className="row gap-8 card" style={{ padding: '8px 12px', flex: '1 1 220px', maxWidth: 320 }}>
          <Search size={16} color="var(--text-3)" />
          <input className="grow" style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 14 }} placeholder="Ism, username, telefon..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <div className="card table-wrap">
        <table className="tbl">
          <thead>
            <tr><th>O'qituvchi</th><th>Rol</th><th>Login (username)</th><th>Parol</th><th>Holat</th><th></th></tr>
          </thead>
          <tbody>
            {list.map((s) => (
              <tr key={s.id}>
                <td>
                  <div className="row gap-12">
                    <Avatar name={s.name} size={38} color={ROLES[s.role]?.color} />
                    <div><b>{s.name}</b><div className="dim" style={{ fontSize: 12 }}>{s.phone}{s.group && ` • ${s.group}`}</div></div>
                  </div>
                </td>
                <td><span className="badge" style={{ background: (ROLES[s.role]?.color || '#888') + '1a', color: ROLES[s.role]?.color }}>{ROLES[s.role]?.label}</span></td>
                <td style={{ fontFamily: 'monospace' }}>{s.username}</td>
                <td>
                  <div className="row gap-8" style={{ fontFamily: 'monospace' }}>
                    {showPwd[s.id] ? s.password : '••••••••'}
                    <button className="ic-btn" style={{ width: 28, height: 28 }} onClick={() => setShowPwd((p) => ({ ...p, [s.id]: !p[s.id] }))}>
                      {showPwd[s.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </td>
                <td><span className={`badge ${s.active ? 'green' : 'red'}`}>{s.active ? 'Faol' : 'Bloklangan'}</span></td>
                <td>
                  <div className="row gap-8">
                    <button className="btn btn-sm" title="Parolni tiklash" onClick={() => setResetInfo({ ...s, password: resetPassword(s.id) })}><RefreshCw size={14} /></button>
                    <button className="btn btn-sm" title={s.active ? 'Bloklash' : 'Faollashtirish'} onClick={() => toggleActive(s.id)}><Power size={14} /></button>
                    <button className="btn btn-sm" title="O'chirish" style={{ color: 'var(--red)' }} onClick={() => removeStaff(s.id)}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan={6} className="center dim" style={{ padding: 30 }}>O'qituvchi topilmadi</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showAdd && <AddModal onClose={() => setShowAdd(false)} onCreated={(c) => { setShowAdd(false); setCreated(c); }} />}

      {/* Yaratilgan login ma'lumotlari */}
      {created && (
        <div className="modal-overlay" onClick={() => setCreated(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="center" style={{ marginBottom: 16 }}>
              <span className="lesson-ico" style={{ background: 'var(--green-bg)', color: 'var(--green)', width: 56, height: 56, margin: '0 auto 12px' }}><Check size={28} /></span>
              <h3 style={{ fontWeight: 800 }}>O'qituvchi qo'shildi!</h3>
              <p className="muted" style={{ fontSize: 13 }}>{created.name} uchun login ma'lumotlari. Bularni o'qituvchiga bering.</p>
            </div>
            <div className="grid" style={{ gap: 10 }}>
              <CopyField label="Login (username)" value={created.username} />
              <CopyField label="Parol" value={created.password} />
              <CopyField label="Telefon" value={created.phone} />
            </div>
            <button className="btn btn-primary btn-block" style={{ marginTop: 16 }} onClick={() => setCreated(null)}>Tushunarli</button>
          </div>
        </div>
      )}

      {/* Parol tiklandi */}
      {resetInfo && (
        <div className="modal-overlay" onClick={() => setResetInfo(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="center" style={{ marginBottom: 16 }}>
              <span className="lesson-ico" style={{ background: 'rgba(109,93,252,.12)', color: 'var(--brand)', width: 56, height: 56, margin: '0 auto 12px' }}><KeyRound size={26} /></span>
              <h3 style={{ fontWeight: 800 }}>Parol tiklandi</h3>
              <p className="muted" style={{ fontSize: 13 }}>{resetInfo.name} uchun yangi parol</p>
            </div>
            <CopyField label="Yangi parol" value={resetInfo.password} />
            <button className="btn btn-primary btn-block" style={{ marginTop: 16 }} onClick={() => setResetInfo(null)}>Yopish</button>
          </div>
        </div>
      )}
    </div>
  );
}

function AddModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ name: '', phone: '', username: '', password: genPassword(), role: 'main_tutor', group: '' });
  const [autoUser, setAutoUser] = useState(true);

  function setName(v) {
    setForm((f) => ({ ...f, name: v, username: autoUser ? usernameFrom(v) : f.username }));
  }

  function submit() {
    if (!form.name.trim() || !form.phone.trim()) return;
    const created = addStaff(form);
    onCreated(created);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="row between" style={{ marginBottom: 16 }}>
          <h3 style={{ fontWeight: 800 }}><UserPlus size={18} style={{ verticalAlign: -3 }} /> Yangi o'qituvchi</h3>
          <button className="ic-btn" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="grid" style={{ gap: 12 }}>
          <div className="field"><label>Ism familiya</label><input className="input" autoFocus value={form.name} onChange={(e) => setName(e.target.value)} placeholder="Ism Familiya" /></div>
          <div className="grid grid-2">
            <div className="field"><label>Telefon</label><input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+998 90 000 00 00" /></div>
            <div className="field"><label>Guruh (ixtiyoriy)</label><input className="input" value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })} placeholder="FA 320" /></div>
          </div>
          <div className="field">
            <label>Rol</label>
            <select className="select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {ALL_ROLES.map((r) => <option key={r} value={r}>{ROLES[r].label}</option>)}
            </select>
          </div>

          <div className="cred-box">
            <div className="row gap-8" style={{ marginBottom: 10, fontWeight: 700, fontSize: 13 }}><KeyRound size={15} /> Login ma'lumotlari</div>
            <div className="field" style={{ marginBottom: 10 }}>
              <label className="row between"><span>Username</span>
                <label className="row gap-8" style={{ fontWeight: 500, cursor: 'pointer' }}>
                  <input type="checkbox" checked={autoUser} onChange={(e) => setAutoUser(e.target.checked)} /> Avtomatik
                </label>
              </label>
              <input className="input" value={form.username} disabled={autoUser} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="ism.familiya" style={{ fontFamily: 'monospace' }} />
            </div>
            <div className="field">
              <label>Parol</label>
              <div className="row gap-8">
                <input className="input grow" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ fontFamily: 'monospace' }} />
                <button className="btn" onClick={() => setForm({ ...form, password: genPassword() })}><RefreshCw size={15} /></button>
              </div>
            </div>
          </div>

          <button className="btn btn-primary btn-block" onClick={submit}><UserPlus size={16} /> Qo'shish va login yaratish</button>
        </div>
      </div>
    </div>
  );
}
