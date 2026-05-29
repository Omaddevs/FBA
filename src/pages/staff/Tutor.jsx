import { useState } from 'react';
import { Check, X, Users } from 'lucide-react';
import { KPI, Avatar } from '../../components/ui';
import { ranking } from '../../data/mock';

const initial = ranking.map((s, i) => ({
  ...s,
  attendance: [92, 88, 75, 81, 64, 70, 95, 58][i] ?? 80,
  task: [90, 85, 72, 88, 55, 68, 93, 49][i] ?? 75,
  present: true,
}));

export default function Tutor() {
  const [students, setStudents] = useState(initial);
  const [marking, setMarking] = useState(false);

  const avgAtt = Math.round(students.reduce((a, s) => a + s.attendance, 0) / students.length);
  const avgTask = Math.round(students.reduce((a, s) => a + s.task, 0) / students.length);
  const low = students.filter((s) => s.attendance < 75 || s.task < 60);

  function toggle(id) {
    setStudents((arr) => arr.map((s) => s.id === id ? { ...s, present: !s.present } : s));
  }

  return (
    <div className="fade-up">
      <div className="row between wrap gap-12" style={{ marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>O'qituvchi — FA 320</h2>
          <p className="muted">Guruh natijalari va davomat (faqat dars kuni).</p>
        </div>
        <button className={`btn ${marking ? 'btn-primary' : ''}`} onClick={() => setMarking((m) => !m)}>
          {marking ? <><Check size={16} /> Yo'qlamani saqlash</> : 'Yo\'qlama olish'}
        </button>
      </div>

      <div className="grid grid-3" style={{ marginBottom: 4 }}>
        <KPI label="O'rtacha davomat" value={avgAtt + '%'} icon={Users} color="#6d5dfc" />
        <KPI label="O'rtacha vazifa" value={avgTask + '%'} color="#19b36b" />
        <KPI label="Past natijalilar" value={low.length} sub="Diqqat talab" color="#ef4444" />
      </div>

      <div className="section-title">O'quvchilar ({students.length})</div>
      <div className="card table-wrap">
        <table className="tbl">
          <thead><tr><th>O'quvchi</th><th>Davomat</th><th>Vazifa</th><th>Holat</th>{marking && <th>Bugun</th>}</tr></thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td><div className="row gap-12"><Avatar name={s.name} size={36} /><b>{s.name}</b></div></td>
                <td>
                  <div className="row gap-8">
                    <span style={{ width: 60 }} className="bar"><span style={{ width: `${s.attendance}%`, background: s.attendance < 75 ? 'var(--red)' : 'var(--green)' }} /></span>
                    {s.attendance}%
                  </div>
                </td>
                <td><span className={`badge ${s.task >= 60 ? 'green' : 'red'}`}>{s.task}%</span></td>
                <td>{(s.attendance < 75 || s.task < 60) ? <span className="badge amber">Past</span> : <span className="badge green">Yaxshi</span>}</td>
                {marking && (
                  <td>
                    <button className={`btn btn-sm ${s.present ? 'btn-primary' : ''}`} onClick={() => toggle(s.id)}>
                      {s.present ? <Check size={15} /> : <X size={15} />}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
