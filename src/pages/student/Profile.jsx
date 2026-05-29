import { useState, useMemo } from 'react';
import {
  Coins, Store, FileText, MessageCircle, Phone, Mail, Linkedin, MapPin,
  Briefcase, GraduationCap, ShieldCheck, ShieldAlert, TrendingUp, Award, Rocket,
} from 'lucide-react';
import { Avatar, Ring } from '../../components/ui';
import { me } from '../../data/mock';
import {
  computeScore, categoryForScore, developmentTips, COMPONENT_META,
  ACCA_OPTIONS, CERT_OPTIONS, LEVEL_BASIC, EXCEL_OPTIONS, ENGLISH_OPTIONS, ERP_OPTIONS, TRAINING_OPTIONS,
} from '../../data/ball';

const TABS = ['Asosiy', 'Ish va ta\'lim', 'Skills'];

function MultiSelect({ options, value, onChange }) {
  function toggle(opt) {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  }
  return (
    <div className="opt-grid">
      {options.map((o) => (
        <span key={o} className={`chip ${value.includes(o) ? 'sel' : ''}`} onClick={() => toggle(o)}>{o}</span>
      ))}
    </div>
  );
}

function SingleSelect({ options, value, onChange }) {
  return (
    <div className="opt-grid">
      {options.map((o) => (
        <span key={o} className={`chip ${value === o ? 'sel' : ''}`} onClick={() => onChange(value === o ? null : o)}>{o}</span>
      ))}
    </div>
  );
}

export default function Profile() {
  const [tab, setTab] = useState(0);
  const [skills, setSkills] = useState(me.skills);
  const [info, setInfo] = useState({
    email: me.email, linkedin: me.linkedin, city: me.city,
    position: me.position, company: me.company, jobStatus: me.jobStatus,
    university: me.university, salaryExpect: me.salaryExpect, lookingForJob: me.lookingForJob,
  });

  const { total, breakdown } = useMemo(() => computeScore(skills), [skills]);
  const cat = categoryForScore(total);
  const tips = useMemo(() => developmentTips(skills), [skills]);
  const nextCat = cat.level < 6 ? { name: ['', 'Intern','Finance Assistant','Financial Analyst','Senior Financist','Finance Manager','CFO'][cat.level + 1] || 'Max', need: Math.max(0, cat.max + 1 - total) } : null;

  function set(key, val) { setSkills((s) => ({ ...s, [key]: val })); }

  return (
    <div className="fade-up">
      {/* Header */}
      <div className="card card-pad">
        <div className="prof-header">
          <Avatar name={me.name} size={64} />
          <div className="grow">
            <h2 style={{ fontSize: 20, fontWeight: 800 }}>{me.name}</h2>
            <div className="dim" style={{ fontSize: 13 }}>{me.group} • {me.course}</div>
            <div className="row gap-8" style={{ marginTop: 6 }}>
              <span className="badge brand">{cat.name}</span>
              <span className="badge amber"><Coins size={12} /> {me.coins.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-4" style={{ marginTop: 16, gap: 10 }}>
          <button className="btn btn-sm"><Coins size={15} /> Coin</button>
          <button className="btn btn-sm"><Store size={15} /> Do'kon</button>
          <button className="btn btn-sm"><FileText size={15} /> CV</button>
          <button className="btn btn-sm"><MessageCircle size={15} /> Chat</button>
        </div>
      </div>

      {/* Ball kartasi */}
      <div className="card card-pad" style={{ marginTop: 14, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <Ring value={total} max={100} size={130} label={total} sublabel="ball / 100" color="var(--brand)" />
        <div className="grow" style={{ minWidth: 200 }}>
          <div className="row between" style={{ marginBottom: 4 }}>
            <span className="dim" style={{ fontSize: 13 }}>Ball kategoriyasi (potensial)</span>
            <span className="badge brand">{cat.level}-daraja</span>
          </div>
          <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>{cat.name}</div>
          {nextCat && (
            <div className="muted" style={{ fontSize: 13 }}>
              <TrendingUp size={14} style={{ verticalAlign: -2 }} /> Keyingi daraja (<b>{nextCat.name}</b>) uchun yana <b>{nextCat.need.toFixed(1)} ball</b> kerak
            </div>
          )}
          <div className="dim" style={{ fontSize: 12, marginTop: 8 }}>
            Ball ma'lumot o'zgarganda DARROV yangilanadi (motivatsiya uchun).
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {TABS.map((t, i) => (
          <button key={t} className={`tab ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>

      {/* Tab 1: Asosiy */}
      {tab === 0 && (
        <div className="card card-pad grid" style={{ gap: 14 }}>
          <InfoField icon={Phone} label="Telefon" value={me.phone} />
          <div className="field"><label><Mail size={14} style={{ verticalAlign: -2 }} /> Email</label><input className="input" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} /></div>
          <div className="field"><label><Linkedin size={14} style={{ verticalAlign: -2 }} /> LinkedIn</label><input className="input" value={info.linkedin} onChange={(e) => setInfo({ ...info, linkedin: e.target.value })} /></div>
          <div className="grid grid-2">
            <div className="field"><label><MapPin size={14} style={{ verticalAlign: -2 }} /> Shahar</label><input className="input" value={info.city} onChange={(e) => setInfo({ ...info, city: e.target.value })} /></div>
            <InfoField label="Tug'ilgan yili" value={me.birthYear} />
          </div>
          <button className="btn btn-primary">Saqlash</button>
        </div>
      )}

      {/* Tab 2: Ish va ta'lim */}
      {tab === 1 && (
        <div className="card card-pad grid" style={{ gap: 14 }}>
          <div className="grid grid-2">
            <div className="field"><label><Briefcase size={14} style={{ verticalAlign: -2 }} /> Hozirgi lavozim</label><input className="input" value={info.position} onChange={(e) => setInfo({ ...info, position: e.target.value })} /></div>
            <div className="field"><label>Kompaniya</label><input className="input" value={info.company} onChange={(e) => setInfo({ ...info, company: e.target.value })} /></div>
          </div>
          <div className="field">
            <label>Ish holati</label>
            <div className="opt-grid">
              <span className={`chip ${info.jobStatus === 'working' ? 'sel' : ''}`} onClick={() => setInfo({ ...info, jobStatus: 'working' })}>Ishlayapti</span>
              <span className={`chip ${info.jobStatus === 'searching' ? 'sel' : ''}`} onClick={() => setInfo({ ...info, jobStatus: 'searching' })}>Qidirayapti</span>
            </div>
          </div>
          <div className="grid grid-2">
            <div className="field"><label><GraduationCap size={14} style={{ verticalAlign: -2 }} /> Universitet</label><input className="input" value={info.university} onChange={(e) => setInfo({ ...info, university: e.target.value })} /></div>
            <div className="field"><label>Oylik kutilma (mln)</label><input className="input" type="number" value={info.salaryExpect} onChange={(e) => setInfo({ ...info, salaryExpect: e.target.value })} /></div>
          </div>
          <label className="row gap-8" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={info.lookingForJob} onChange={(e) => setInfo({ ...info, lookingForJob: e.target.checked })} />
            <span>Yangi ish qidiryapman</span>
          </label>
          <div className="card card-pad" style={{ background: 'var(--surface-2)', fontSize: 13 }} >
            <span className="dim">FBA orqali ish topdi — faqat HR belgilaydi:</span>{' '}
            <span className={`badge ${me.fbaPlaced ? 'green' : ''}`}>{me.fbaPlaced ? 'Ha' : 'Yo\'q'}</span>
          </div>
          <button className="btn btn-primary">Saqlash</button>
        </div>
      )}

      {/* Tab 3: Skills (avtomatik ball) */}
      {tab === 2 && (
        <div className="card card-pad">
          <SkillGroup label="ACCA fanlari" max={breakdown.acca + '/35'} verified={me.verified.acca}>
            <MultiSelect options={ACCA_OPTIONS} value={skills.acca} onChange={(v) => set('acca', v)} />
            <label className="row gap-8" style={{ cursor: 'pointer', marginTop: 10 }}>
              <input type="checkbox" checked={skills.dipifr} onChange={(e) => set('dipifr', e.target.checked)} />
              <span>DipIFR (+8 ball)</span>
            </label>
          </SkillGroup>

          <SkillGroup label="Sertifikatlar" max={breakdown.certificates + '/10'} verified={me.verified.certificates}>
            <MultiSelect options={CERT_OPTIONS} value={skills.certificates} onChange={(v) => set('certificates', v)} />
          </SkillGroup>

          <div className="grid grid-2">
            <SkillGroup label="Financial Modeling" max={breakdown.finModeling + '/8'}>
              <SingleSelect options={LEVEL_BASIC} value={skills.finModeling} onChange={(v) => set('finModeling', v)} />
            </SkillGroup>
            <SkillGroup label="Power BI" max={breakdown.powerBI + '/6'}>
              <SingleSelect options={LEVEL_BASIC} value={skills.powerBI} onChange={(v) => set('powerBI', v)} />
            </SkillGroup>
          </div>

          <SkillGroup label="ERP dasturlari" max={breakdown.erp + '/7'} verified={me.verified.erp}>
            <MultiSelect options={ERP_OPTIONS} value={skills.erp} onChange={(v) => set('erp', v)} />
          </SkillGroup>

          <div className="grid grid-2">
            <SkillGroup label="Excel" max={breakdown.excel + '/5'}>
              <SingleSelect options={EXCEL_OPTIONS} value={skills.excel} onChange={(v) => set('excel', v)} />
            </SkillGroup>
            <SkillGroup label="Ingliz tili" max={breakdown.english + '/4'}>
              <SingleSelect options={ENGLISH_OPTIONS} value={skills.english} onChange={(v) => set('english', v)} />
            </SkillGroup>
          </div>

          <SkillGroup label="Boshqa treninglar" max={breakdown.trainings + '/5'}>
            <MultiSelect options={TRAINING_OPTIONS} value={skills.trainings} onChange={(v) => set('trainings', v)} />
          </SkillGroup>

          <div className="field" style={{ marginTop: 6 }}>
            <label>Tajriba (yil)</label>
            <input className="input" type="number" min="0" value={skills.experienceYears} onChange={(e) => set('experienceYears', Number(e.target.value))} style={{ maxWidth: 140 }} />
          </div>
        </div>
      )}

      {/* Rivojlanish yo'li */}
      <div className="section-title">Rivojlanish yo'li</div>
      <div className="card card-pad">
        <div className="row gap-12" style={{ marginBottom: 6 }}>
          <span style={{ width: 38, height: 38, borderRadius: 11, display: 'grid', placeItems: 'center', background: 'rgba(109,93,252,.12)', color: 'var(--brand)' }}>
            <Rocket size={20} />
          </span>
          <div>
            <div style={{ fontWeight: 700 }}>Qaysi skill ball'ni oshiradi?</div>
            <div className="dim" style={{ fontSize: 12 }}>Formula asosida hisoblangan tavsiyalar</div>
          </div>
        </div>
        {tips.map((t, i) => (
          <div key={i} className="tip-row">
            <Award size={18} color="var(--brand)" />
            <span className="grow">{t.text}</span>
            <span className="tip-delta">+{t.delta} ball</span>
          </div>
        ))}
        {tips.length === 0 && <div className="dim center" style={{ padding: 12 }}>Barakalla! Maksimal darajaga yetdingiz.</div>}
      </div>

      {/* Ball komponentlari */}
      <div className="section-title">Ball tarkibi (9 komponent)</div>
      <div className="card card-pad grid" style={{ gap: 12 }}>
        {COMPONENT_META.map((c) => (
          <div key={c.key}>
            <div className="row between" style={{ fontSize: 13, marginBottom: 4 }}>
              <span>{c.label}</span>
              <span className="dim">{breakdown[c.key]}/{c.max}</span>
            </div>
            <div className="bar"><span style={{ width: `${(breakdown[c.key] / c.max) * 100}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoField({ icon: Icon, label, value }) {
  return (
    <div className="field">
      <label>{Icon && <Icon size={14} style={{ verticalAlign: -2 }} />} {label}</label>
      <div className="input" style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}>{value}</div>
    </div>
  );
}

function SkillGroup({ label, max, verified, children }) {
  return (
    <div className="skill-group">
      <div className="skill-group-label">
        {label}
        <span className="badge brand" style={{ fontSize: 11 }}>{max}</span>
        {verified === true && <span className="badge green" style={{ fontSize: 11 }}><ShieldCheck size={12} /> Tasdiqlangan</span>}
        {verified === false && <span className="badge amber" style={{ fontSize: 11 }}><ShieldAlert size={12} /> Tekshirilmoqda</span>}
      </div>
      {children}
    </div>
  );
}
