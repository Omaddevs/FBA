import { useState } from 'react';
import { Search, Phone, Send, UserPlus, X } from 'lucide-react';
import { Avatar, KPI } from '../../components/ui';
import { reEnrollment } from '../../data/mock';

const STATUS = [['all', 'Barchasi'], ['Stopped', 'Stopped'], ['Failed', 'Failed'], ['No Exam', 'No Exam'], ['Passed', 'Passed']];
const STATUS_COLOR = { Stopped: 'red', Failed: 'amber', 'No Exam': 'blue', Passed: 'green' };

export default function Sales() {
  const [status, setStatus] = useState('all');
  const [q, setQ] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const list = reEnrollment.filter((s) =>
    (status === 'all' || s.status === status) &&
    (s.name.toLowerCase().includes(q.toLowerCase()) || s.phone.includes(q))
  );

  return (
    <div className="fade-up">
      <div className="row between wrap gap-12" style={{ marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>Sales — Re-enrollment</h2>
          <p className="muted">4 status bo'yicha qayta jalb qilish.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}><UserPlus size={16} /> Yangi o'quvchi</button>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 4 }}>
        {['Stopped', 'Failed', 'No Exam', 'Passed'].map((st) => (
          <KPI key={st} label={st} value={reEnrollment.filter(r => r.status === st).length} color={`var(--${STATUS_COLOR[st] === 'red' ? 'red' : STATUS_COLOR[st] === 'amber' ? 'amber' : STATUS_COLOR[st] === 'blue' ? 'blue' : 'green'})`} />
        ))}
      </div>

      <div className="row between wrap gap-12" style={{ margin: '18px 0' }}>
        <div className="row gap-8 wrap">
          {STATUS.map(([k, l]) => (
            <span key={k} className={`chip ${status === k ? 'active' : ''}`} onClick={() => setStatus(k)}>{l}</span>
          ))}
        </div>
        <div className="row gap-8 card" style={{ padding: '8px 12px', flex: '1 1 220px', maxWidth: 320 }}>
          <Search size={16} color="var(--text-3)" />
          <input className="grow" style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 14 }} placeholder="Ism yoki telefon..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <div className="card table-wrap">
        <table className="tbl">
          <thead><tr><th>O'quvchi</th><th>Telefon</th><th>Kurs</th><th>Status</th><th>Sana</th><th></th></tr></thead>
          <tbody>
            {list.map((s) => (
              <tr key={s.id}>
                <td><div className="row gap-12"><Avatar name={s.name} size={36} /><b>{s.name}</b></div></td>
                <td className="muted">{s.phone}</td>
                <td>{s.course}</td>
                <td><span className={`badge ${STATUS_COLOR[s.status]}`}>{s.status}</span></td>
                <td className="muted">{s.date}</td>
                <td>
                  <div className="row gap-8">
                    <button className="btn btn-sm btn-ghost"><Phone size={15} /></button>
                    <button className="btn btn-sm"><Send size={14} /> Taklif</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="row between" style={{ marginBottom: 16 }}>
              <h3 style={{ fontWeight: 800 }}>Yangi o'quvchi qo'shish</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowAdd(false)}><X size={18} /></button>
            </div>
            <div className="grid" style={{ gap: 12 }}>
              <div className="field"><label>Ism familiya</label><input className="input" placeholder="Ism Familiya" /></div>
              <div className="field"><label>Telefon</label><input className="input" placeholder="+998 90 000 00 00" /></div>
              <div className="grid grid-2">
                <div className="field"><label>Kurs</label><select className="select"><option>FA</option><option>FM</option><option>SBR</option></select></div>
                <div className="field"><label>Guruh</label><select className="select"><option>FA 320</option><option>FA 321</option></select></div>
              </div>
              <button className="btn btn-primary btn-block">Qo'shish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
