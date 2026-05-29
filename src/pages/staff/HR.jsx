import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BarChart3, Briefcase, TrendingUp, Users, UserCheck, Award, Building2,
  Send, Plus, X, Search,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line,
} from 'recharts';
import { KPI, Avatar } from '../../components/ui';
import { candidates, vacancies } from '../../data/mock';
import { CATEGORIES } from '../../data/ball';

const TABS = [
  { key: 'kadrlar', label: 'Kadrlar', icon: BarChart3, path: '/staff/hr' },
  { key: 'ish', label: 'Ish (joylashish)', icon: Briefcase, path: '/staff/hr/ish' },
  { key: 'underutilized', label: 'Underutilized', icon: TrendingUp, path: '/staff/hr/underutilized' },
  { key: 'candidates', label: 'Kadrlar bazasi', icon: Users, path: '/staff/hr/candidates' },
  { key: 'vacancy', label: 'Vakansiyalar', icon: UserCheck, path: '/staff/hr/vacancy' },
];

export default function HR() {
  const navigate = useNavigate();
  const loc = useLocation();
  const sub = loc.pathname.split('/staff/hr/')[1] || 'kadrlar';

  return (
    <div className="fade-up">
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>HR & Recruiting</h2>
      <p className="muted" style={{ marginBottom: 16 }}>Kadrlar bazasi (4013 kadr), ball tizimi, dashboardlar, vakansiya.</p>

      <div className="subtabs">
        {TABS.map((t) => (
          <span key={t.key} className={`chip ${sub === t.key ? 'active' : ''}`} onClick={() => navigate(t.path)}>
            <t.icon size={14} style={{ verticalAlign: -2, marginRight: 4 }} />{t.label}
          </span>
        ))}
      </div>

      {sub === 'kadrlar' && <DashKadrlar />}
      {sub === 'ish' && <DashIsh />}
      {sub === 'underutilized' && <Underutilized />}
      {sub === 'candidates' && <Candidates />}
      {sub === 'vacancy' && <Vacancy />}
    </div>
  );
}

/* ---------- Dashboard 1: Kadrlar (skill/potensial) ---------- */
function DashKadrlar() {
  const total = candidates.length;
  const ready = candidates.filter((c) => c.gap >= 2).length;
  const acca = candidates.filter((c) => (c.skills.acca?.length || 0) >= 3).length;
  const avgScore = Math.round(candidates.reduce((a, c) => a + c.score, 0) / total);

  const scoreDist = CATEGORIES.map((cat) => ({
    name: `${cat.level}`,
    label: cat.name,
    ball: candidates.filter((c) => c.scoreLevel === cat.level).length,
    lavozim: candidates.filter((c) => c.positionLevel === cat.level).length,
  }));

  return (
    <div>
      <div className="grid grid-4">
        <KPI label="Tanlovga mos" value={ready} sub="Farq +2 signal" icon={TrendingUp} color="#19b36b" />
        <KPI label="ACCA (3+ fan)" value={acca} sub="Faol o'quvchilar" icon={Award} color="#6d5dfc" />
        <KPI label="O'rtacha ball" value={avgScore} sub="/ 100" icon={BarChart3} color="#3b82f6" />
        <KPI label="Jami kadr" value={total} sub="bazada (namuna)" icon={Users} color="#0ea5e9" />
      </div>

      <div className="section-title">Kategoriya taqsimoti — Ball (potensial) vs Lavozim (amaldagi)</div>
      <div className="card card-pad">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={scoreDist} margin={{ top: 6, right: 6, left: -22, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef0f7" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9aa0b4' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9aa0b4' }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e7e9f2' }} />
            <Bar dataKey="ball" name="Ball kategoriyasi" fill="#6d5dfc" radius={[6, 6, 0, 0]} />
            <Bar dataKey="lavozim" name="Lavozim kategoriyasi" fill="#cdd2e6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="row gap-16 wrap" style={{ fontSize: 12, marginTop: 8, justifyContent: 'center' }}>
          {CATEGORIES.map((c) => <span key={c.level} className="dim">{c.level} — {c.name}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ---------- Dashboard 2: Ish (joylashish) ---------- */
function DashIsh() {
  const placed = candidates.filter((c) => c.fba);
  const companies = [...new Set(candidates.filter((c) => c.company !== '—').map((c) => c.company))];
  const thisYear = placed.filter((c) => c.placedYear === 2024 || c.placedYear === 2025).length;
  const avgSalary = (placed.reduce((a, c) => a + c.salary, 0) / (placed.length || 1)).toFixed(1);

  const byYear = [2021, 2022, 2023, 2024, 2025].map((y) => ({
    year: `${y}`,
    placed: candidates.filter((c) => c.placedYear === y).length,
  }));

  const byCompany = companies.map((co) => ({
    name: co,
    n: candidates.filter((c) => c.company === co).length,
  })).sort((a, b) => b.n - a.n);
  const maxCo = Math.max(...byCompany.map((c) => c.n), 1);

  return (
    <div>
      <div className="grid grid-4">
        <KPI label="Joylashtirilgan" value={placed.length} sub="FBA orqali" icon={UserCheck} color="#19b36b" />
        <KPI label="Hamkor kompaniya" value={companies.length} icon={Building2} color="#6d5dfc" />
        <KPI label="Bu yil joylashgan" value={thisYear} sub="2024–2025" icon={TrendingUp} color="#3b82f6" />
        <KPI label="O'rtacha oylik" value={avgSalary + ' mln'} icon={BarChart3} color="#f59e0b" />
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.2fr 1fr', gap: 14, marginTop: 14, alignItems: 'start' }}>
        <div className="card card-pad">
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Joylashish dinamikasi (yillik)</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={byYear} margin={{ top: 6, right: 6, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef0f7" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#9aa0b4' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9aa0b4' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e7e9f2' }} />
              <Line type="monotone" dataKey="placed" name="Joylashgan" stroke="#19b36b" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card card-pad">
          <div style={{ fontWeight: 700, marginBottom: 14 }}>Kompaniya bo'yicha</div>
          {byCompany.map((c) => (
            <div key={c.name} className="dist-row">
              <span className="dist-label" style={{ width: 110 }}>{c.name}</span>
              <div className="dist-bar"><span style={{ width: `${(c.n / maxCo) * 100}%`, background: 'var(--brand-grad)' }}>{c.n}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Underutilized (recruiting signali) ---------- */
function Underutilized() {
  const list = [...candidates].filter((c) => c.gap >= 1).sort((a, b) => b.gap - a.gap);
  return (
    <div>
      <div className="card card-pad" style={{ background: 'var(--green-bg)', border: 'none', marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
        <TrendingUp color="var(--green)" />
        <div><b>Underutilized = Ball kategoriyasi − Lavozim kategoriyasi.</b> Farq +2 yoki ko'p → yangi imkoniyatga TAYYOR (recruiting signali). Faqat tasdiqlangan ball'dan ishlaydi.</div>
      </div>
      <div className="card table-wrap">
        <table className="tbl">
          <thead><tr><th>Kadr</th><th>Hozirgi lavozim</th><th>Ball</th><th>Potensial</th><th>Farq</th><th></th></tr></thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id}>
                <td><div className="row gap-12"><Avatar name={c.name} size={36} /><div><b>{c.name}</b><div className="dim" style={{ fontSize: 12 }}>{c.company}</div></div></div></td>
                <td>{c.position} <span className="dim">(L{c.positionLevel})</span></td>
                <td><span className="badge brand">{c.score}</span></td>
                <td>{c.scoreCategory} <span className="dim">(L{c.scoreLevel})</span></td>
                <td><span className={`gap-pill ${c.gap >= 2 ? 'gap-pos' : 'gap-neutral'}`}>{c.gap >= 2 && <TrendingUp size={13} />}+{c.gap}</span></td>
                <td>{c.gap >= 2 && <span className="badge green">Tayyor</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Kadrlar bazasi ---------- */
function Candidates() {
  const [q, setQ] = useState('');
  const [jobFilter, setJobFilter] = useState('all');
  const list = candidates.filter((c) =>
    c.name.toLowerCase().includes(q.toLowerCase()) &&
    (jobFilter === 'all' || c.jobStatus === jobFilter)
  ).sort((a, b) => b.score - a.score);

  return (
    <div>
      <div className="row between wrap gap-12" style={{ marginBottom: 16 }}>
        <div className="row gap-8">
          {[['all', 'Barchasi'], ['working', 'Ishlayapti'], ['searching', 'Qidirayapti']].map(([k, l]) => (
            <span key={k} className={`chip ${jobFilter === k ? 'active' : ''}`} onClick={() => setJobFilter(k)}>{l}</span>
          ))}
        </div>
        <div className="row gap-8 card" style={{ padding: '8px 12px', flex: '1 1 220px', maxWidth: 320 }}>
          <Search size={16} color="var(--text-3)" />
          <input className="grow" style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 14 }} placeholder="Kadr qidirish..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-2">
        {list.map((c) => (
          <div key={c.id} className="card cand-card fade-up">
            <Avatar name={c.name} size={48} />
            <div className="grow">
              <div className="row between"><b>{c.name}</b><span className="badge brand">{c.score} ball</span></div>
              <div className="dim" style={{ fontSize: 13 }}>{c.position} • {c.company}</div>
              <div className="row gap-8" style={{ marginTop: 6 }}>
                <span className="badge">{c.scoreCategory}</span>
                <span className={`badge ${c.jobStatus === 'searching' ? 'amber' : 'green'}`}>{c.jobStatus === 'searching' ? 'Qidirayapti' : 'Ishlayapti'}</span>
                {c.fba && <span className="badge blue">FBA</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Vakansiya tizimi ---------- */
function Vacancy() {
  const [list, setList] = useState(vacancies);
  const [matchFor, setMatchFor] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: '', company: '', minScore: 31 });

  function create() {
    if (!form.title.trim()) return;
    setList([{ id: Date.now(), ...form, minScore: Number(form.minScore), category: 0, sent: 0, interested: 0, status: 'active' }, ...list]);
    setShowCreate(false); setForm({ title: '', company: '', minScore: 31 });
  }

  const matched = matchFor
    ? candidates.filter((c) => c.score >= matchFor.minScore).sort((a, b) => b.score - a.score)
    : [];

  return (
    <div>
      <div className="row between" style={{ marginBottom: 16 }}>
        <div className="muted">Vakansiya yarating → tizim mos kadrlarni topadi → broadcast.</div>
        <button className="btn btn-primary" onClick={() => setShowCreate(true)}><Plus size={16} /> Vakansiya</button>
      </div>

      <div className="grid grid-2">
        {list.map((v) => (
          <div key={v.id} className="card card-pad fade-up">
            <div className="row between">
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{v.title}</div>
                <div className="dim" style={{ fontSize: 13 }}><Building2 size={13} style={{ verticalAlign: -2 }} /> {v.company}</div>
              </div>
              <span className={`badge ${v.status === 'active' ? 'green' : ''}`}>{v.status === 'active' ? 'Faol' : 'Yopiq'}</span>
            </div>
            <div className="row gap-16" style={{ marginTop: 12, fontSize: 13 }}>
              <span className="badge brand">Min {v.minScore} ball</span>
              <span className="dim"><Send size={13} style={{ verticalAlign: -2 }} /> {v.sent} yuborildi</span>
              <span className="dim">{v.interested} qiziqdi</span>
            </div>
            <div className="row gap-8" style={{ marginTop: 14 }}>
              <button className="btn btn-sm grow" onClick={() => setMatchFor(v)}><Users size={14} /> Mos kadrlar</button>
              <button className="btn btn-sm btn-primary grow"><Send size={14} /> Broadcast</button>
            </div>
          </div>
        ))}
      </div>

      {/* Mos kadrlar modal */}
      {matchFor && (
        <div className="modal-overlay" onClick={() => setMatchFor(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="row between" style={{ marginBottom: 6 }}>
              <h3 style={{ fontWeight: 800 }}>Mos kadrlar — {matchFor.title}</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setMatchFor(null)}><X size={18} /></button>
            </div>
            <p className="muted" style={{ fontSize: 13, marginBottom: 14 }}>Min {matchFor.minScore} ball • {matched.length} ta mos kadr topildi</p>
            {matched.map((c) => (
              <div key={c.id} className="row gap-12" style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <Avatar name={c.name} size={38} />
                <div className="grow"><b>{c.name}</b><div className="dim" style={{ fontSize: 12 }}>{c.position} • {c.company}</div></div>
                <span className="badge brand">{c.score}</span>
                <input type="checkbox" defaultChecked />
              </div>
            ))}
            <button className="btn btn-primary btn-block" style={{ marginTop: 16 }}><Send size={16} /> Tanlanganlarga yuborish</button>
          </div>
        </div>
      )}

      {/* Yaratish modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="row between" style={{ marginBottom: 16 }}>
              <h3 style={{ fontWeight: 800 }}>Yangi vakansiya</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowCreate(false)}><X size={18} /></button>
            </div>
            <div className="grid" style={{ gap: 12 }}>
              <div className="field"><label>Lavozim</label><input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Financial Analyst" /></div>
              <div className="field"><label>Kompaniya</label><input className="input" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Kompaniya nomi" /></div>
              <div className="field"><label>Talab qilingan minimal ball: {form.minScore}</label>
                <input type="range" min="0" max="100" value={form.minScore} onChange={(e) => setForm({ ...form, minScore: e.target.value })} />
              </div>
              <button className="btn btn-primary btn-block" onClick={create}>Yaratish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
