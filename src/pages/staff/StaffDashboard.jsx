import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, GraduationCap, Briefcase, Megaphone, ShieldCheck, AlertTriangle,
  TrendingUp, UserCheck, BookOpen, BarChart3, Coins, ChevronRight,
  UserPlus, FileText, Send, UserCog,
} from 'lucide-react';
import { KPI } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../data/roles';
import { canRole, usePerms } from '../../data/rolesStore';
import { dropoutStudents, candidates } from '../../data/mock';

const GROUPS = [
  {
    title: 'O\'quv jarayoni',
    items: [
      { perm: 'attendance.view_all', label: 'Drop-out (SSM)', desc: 'Xavfli o\'quvchilar', icon: AlertTriangle, to: '/staff/ssm', color: '#ef4444' },
      { perm: 'attendance.mark', label: 'Guruh natijalari', desc: 'Davomat, vazifa', icon: GraduationCap, to: '/staff/tutor', color: '#f59e0b' },
      { perm: 'students.add', label: 'Re-enrollment', desc: 'Sales paneli', icon: Briefcase, to: '/staff/sales', color: '#3b82f6' },
    ],
  },
  {
    title: 'Marketing',
    items: [
      { perm: 'news.publish', label: 'Yangiliklar', desc: 'SMM yuklash', icon: Megaphone, to: '/staff/smm', color: '#ec4899' },
      { perm: 'courses.manage', label: 'Kurslar', desc: 'Marketing', icon: BookOpen, to: '/staff/smm', color: '#6d5dfc' },
    ],
  },
  {
    title: 'HR & Recruiting',
    items: [
      { perm: 'hr.dashboard', label: 'HR Dashboard', desc: 'Kadrlar va ish', icon: BarChart3, to: '/staff/hr', color: '#0ea5e9' },
      { perm: 'hr.underutilized', label: 'Underutilized', desc: 'Recruiting signali', icon: TrendingUp, to: '/staff/hr/underutilized', color: '#19b36b' },
      { perm: 'vacancy.create', label: 'Vakansiyalar', desc: 'Yaratish, broadcast', icon: UserCheck, to: '/staff/hr/vacancy', color: '#3b82f6' },
    ],
  },
  {
    title: 'Sozlamalar',
    items: [
      { perm: 'staff.manage', label: 'O\'qituvchilar', desc: 'Qo\'shish, login berish', icon: UserCog, to: '/staff/teachers', color: '#0ea5e9' },
      { perm: 'roles.create', label: 'Ruxsatlar', desc: 'Rol va permissions', icon: ShieldCheck, to: '/staff/permissions', color: '#6d5dfc' },
      { perm: 'coin.config', label: 'Coin sozlamalari', desc: 'Gamification', icon: Coins, to: '/staff/permissions', color: '#f7b733' },
    ],
  },
];

const QUICK_STATS = [
  { label: 'Yangi o\'quvchilar', value: '+320', trend: '15.2%', up: true, icon: UserPlus, color: '#6d5dfc' },
  { label: 'Faol kurslar', value: '24', trend: '8.1%', up: true, icon: BookOpen, color: '#19b36b' },
  { label: 'Topshiriqlar', value: '1 248', trend: '11.4%', up: true, icon: FileText, color: '#0ea5e9' },
  { label: 'Rekrut signal', value: '18', trend: '6.3%', up: true, icon: Send, color: '#f59e0b' },
];

const REMINDERS = [
  { color: 'var(--red)', text: '3 ta drop-out xavfli o\'quvchi', time: '10 daqiqa oldin' },
  { color: 'var(--amber)', text: '2 ta yangi rekrut signali', time: '1 soat oldin' },
  { color: 'var(--blue)', text: 'Kurs yangilanishi mavjud', time: '3 soat oldin' },
  { color: 'var(--green)', text: '5 ta yangi CV qabul qilindi', time: '5 soat oldin' },
];

export default function StaffDashboard() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const role = session.role;
  const roleMeta = ROLES[role];
  const [period, setPeriod] = useState('month');
  usePerms(); // ruxsat o'zgarsa kartochkalar yangilansin

  const highRisk = dropoutStudents.filter((s) => s.risk === 'high').length;
  const ready = candidates.filter((c) => c.gap >= 2).length;
  const placed = candidates.filter((c) => c.fba).length;

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800 }}>Boshqaruv paneli</h2>
        <p className="muted">
          Xush kelibsiz, <b style={{ color: roleMeta.color }}>{roleMeta.label}</b>! Bugun qanday yordam bera olamiz?
        </p>
      </div>

      <div className="grid grid-4">
        <KPI label="Faol o'quvchilar" value="6 679" trend="12.5%" sub="bu oy" icon={Users} color="#6d5dfc" />
        <KPI label="Drop-out xavfi" value={highRisk} trend="1 yangi" trendUp={false} sub="" icon={AlertTriangle} color="#ef4444" />
        <KPI label="Tanlovga tayyor" value={ready} trend="2.3%" sub="bu oy" icon={TrendingUp} color="#19b36b" />
        <KPI label="FBA orqali joylashgan" value={placed} trend="8.6%" sub="bu oy" icon={UserCheck} color="#0ea5e9" />
      </div>

      {GROUPS.map((g) => {
        const visible = g.items.filter((it) => canRole(role, it.perm));
        if (!visible.length) return null;
        return (
          <div key={g.title}>
            <div className="section-title">{g.title}</div>
            <div className="grid grid-3">
              {visible.map((it) => (
                <button key={it.label} className="card card-pad action-card fade-up" onClick={() => navigate(it.to)}>
                  <span className="lesson-ico" style={{ background: it.color + '1a', color: it.color, width: 44, height: 44 }}>
                    <it.icon size={20} />
                  </span>
                  <div className="grow" style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700 }}>{it.label}</div>
                    <div className="dim" style={{ fontSize: 12 }}>{it.desc}</div>
                  </div>
                  <ChevronRight size={18} color="var(--text-3)" />
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {/* Tezkor statistika + Eslatmalar */}
      <div className="dash-bottom">
        <div className="card card-pad">
          <div className="row between" style={{ marginBottom: 18 }}>
            <h3 style={{ fontWeight: 800, fontSize: 16 }}>Tezkor statistika</h3>
            <select className="select" style={{ width: 'auto', padding: '7px 12px', fontSize: 13 }} value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option value="week">Bu hafta</option>
              <option value="month">Bu oy</option>
              <option value="year">Bu yil</option>
            </select>
          </div>
          <div className="quick-grid">
            {QUICK_STATS.map((s) => (
              <div key={s.label} className="quick-stat">
                <span className="lesson-ico" style={{ background: s.color + '1a', color: s.color, width: 40, height: 40 }}>
                  <s.icon size={18} />
                </span>
                <div className="dim" style={{ fontSize: 12, marginTop: 10 }}>{s.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.2 }}>{s.value}</div>
                <div className="row gap-8" style={{ fontSize: 12, fontWeight: 700, color: s.up ? 'var(--green)' : 'var(--red)' }}>
                  <TrendingUp size={13} /> {s.trend}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-pad">
          <div className="row between" style={{ marginBottom: 14 }}>
            <h3 style={{ fontWeight: 800, fontSize: 16 }}>Eslatmalar</h3>
            <span className="badge red">{REMINDERS.length}</span>
          </div>
          <div>
            {REMINDERS.map((r, i) => (
              <div key={i} className="reminder-row">
                <span className="reminder-dot" style={{ background: r.color }} />
                <div className="grow">
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{r.text}</div>
                  <div className="dim" style={{ fontSize: 12 }}>{r.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
