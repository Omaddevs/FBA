import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AlertTriangle, CheckCircle2, FileText, Target } from 'lucide-react';
import { Ring } from '../../components/ui';
import { attendanceDays, attendancePct, attendanceTrend, modules } from '../../data/mock';

export default function Marks() {
  const lowAttendance = attendancePct < 75;
  const tasks = modules.flatMap((m) => m.lessons).filter((l) => l.task);
  const avgTask = Math.round(tasks.reduce((a, l) => a + l.taskScore, 0) / tasks.length);

  return (
    <div className="fade-up">
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Natijalar</h2>

      {lowAttendance && (
        <div className="card card-pad" style={{ background: 'var(--red-bg)', borderColor: 'transparent', display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <AlertTriangle color="var(--red)" />
          <div><b>Ogohlantirish:</b> davomatingiz 75% dan past. Darslarni o'tkazib yubormang!</div>
        </div>
      )}

      <div className="grid grid-2" style={{ marginBottom: 4 }}>
        <div className="card card-pad row gap-16" style={{ justifyContent: 'center' }}>
          <Ring value={attendancePct} label={`${attendancePct}%`} sublabel="Davomat" color={lowAttendance ? 'var(--red)' : 'var(--green)'} />
          <div>
            <div style={{ fontWeight: 700 }}>Davomat foizi</div>
            <div className="dim" style={{ fontSize: 13 }}>{attendanceDays.filter(d=>d.present).length}/{attendanceDays.length} dars</div>
          </div>
        </div>
        <div className="card card-pad row gap-16" style={{ justifyContent: 'center' }}>
          <Ring value={avgTask} label={`${avgTask}%`} sublabel="Vazifa" color="var(--brand)" />
          <div>
            <div style={{ fontWeight: 700 }}>O'rtacha vazifa</div>
            <div className="dim" style={{ fontSize: 13 }}>{tasks.length} ta topshirildi</div>
          </div>
        </div>
      </div>

      {/* Rivojlanish grafigi */}
      <div className="section-title">Rivojlanish grafigi</div>
      <div className="card card-pad">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={attendanceTrend} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="att" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6d5dfc" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#6d5dfc" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef0f7" vertical={false} />
            <XAxis dataKey="lesson" tick={{ fontSize: 11, fill: '#9aa0b4' }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#9aa0b4' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e7e9f2' }} formatter={(v) => [`${v}%`, 'Davomat']} />
            <Area type="monotone" dataKey="pct" stroke="#6d5dfc" strokeWidth={2.5} fill="url(#att)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Davomat kalendari */}
      <div className="section-title">Davomat kalendari (May)</div>
      <div className="card card-pad">
        <div className="cal">
          {['Du','Se','Ch','Pa','Ju','Sh','Ya'].map((d) => (
            <div key={d} className="dim center" style={{ fontSize: 11, fontWeight: 700 }}>{d}</div>
          ))}
          {attendanceDays.map((d) => (
            <div key={d.day} className={`cal-cell ${d.present ? 'present' : 'absent'}`} title={d.date}>
              {d.day}
            </div>
          ))}
        </div>
        <div className="row gap-16" style={{ marginTop: 14, fontSize: 12 }}>
          <span className="row gap-8"><span style={{ width: 12, height: 12, borderRadius: 4, background: 'var(--green)' }} /> Keldi</span>
          <span className="row gap-8"><span style={{ width: 12, height: 12, borderRadius: 4, background: 'var(--red)' }} /> Kelmadi</span>
        </div>
      </div>

      {/* Vazifa va Mock */}
      <div className="section-title">Vazifa va Mock ko'rsatkichlari</div>
      <div className="card">
        {tasks.map((t) => (
          <div key={t.id} className="lesson-row">
            <span className="lesson-ico" style={{ background: 'var(--blue-bg)', color: 'var(--blue)' }}>
              <FileText size={18} />
            </span>
            <div className="grow">
              <div style={{ fontWeight: 600 }}>{t.title}</div>
              <div className="bar" style={{ marginTop: 6, maxWidth: 220 }}>
                <span style={{ width: `${t.taskScore}%`, background: t.taskScore >= 80 ? 'var(--green)' : 'var(--amber)' }} />
              </div>
            </div>
            <span className={`badge ${t.taskScore >= 80 ? 'green' : 'amber'}`}>
              {t.taskScore >= 80 ? <CheckCircle2 size={13} /> : <Target size={13} />} {t.taskScore}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
