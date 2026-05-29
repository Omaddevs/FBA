import { useState } from 'react';
import { AlertTriangle, Search, Phone, MessageCircle } from 'lucide-react';
import { Avatar, KPI } from '../../components/ui';
import { dropoutStudents } from '../../data/mock';

const FILTERS = [['all', 'Barchasi'], ['high', 'Yuqori xavf'], ['mid', 'O\'rta xavf']];

export default function SSM() {
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');

  const list = dropoutStudents.filter((s) =>
    (filter === 'all' || s.risk === filter) &&
    s.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="fade-up">
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>SSM — Drop-out</h2>
      <p className="muted" style={{ marginBottom: 16 }}>Xavfli o'quvchilarni aniqlash va drop-out kamaytirish.</p>

      <div className="grid grid-3" style={{ marginBottom: 4 }}>
        <KPI label="Jami xavfli" value={dropoutStudents.length} icon={AlertTriangle} color="#ef4444" />
        <KPI label="Yuqori xavf" value={dropoutStudents.filter(s=>s.risk==='high').length} icon={AlertTriangle} color="#f59e0b" />
        <KPI label="O'rtacha davomat" value={Math.round(dropoutStudents.reduce((a,s)=>a+s.attendance,0)/dropoutStudents.length)+'%'} color="#6d5dfc" />
      </div>

      <div className="row between wrap gap-12" style={{ margin: '18px 0' }}>
        <div className="row gap-8 wrap">
          {FILTERS.map(([k, l]) => (
            <span key={k} className={`chip ${filter === k ? 'active' : ''}`} onClick={() => setFilter(k)}>{l}</span>
          ))}
        </div>
        <div className="row gap-8 card" style={{ padding: '8px 12px', flex: '1 1 220px', maxWidth: 320 }}>
          <Search size={16} color="var(--text-3)" />
          <input className="grow" style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 14 }} placeholder="Qidirish..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <div className="card table-wrap">
        <table className="tbl">
          <thead>
            <tr><th>O'quvchi</th><th>Guruh</th><th>Davomat</th><th>Sabab</th><th>Xavf</th><th></th></tr>
          </thead>
          <tbody>
            {list.map((s) => (
              <tr key={s.id}>
                <td><div className="row gap-12"><Avatar name={s.name} size={36} /><b>{s.name}</b></div></td>
                <td>{s.group}</td>
                <td>
                  <div className="row gap-8">
                    <span style={{ width: 60 }} className="bar"><span style={{ width: `${s.attendance}%`, background: s.attendance < 50 ? 'var(--red)' : 'var(--amber)' }} /></span>
                    {s.attendance}%
                  </div>
                </td>
                <td className="muted">{s.reason}</td>
                <td><span className={`badge ${s.risk === 'high' ? 'red' : 'amber'}`}>{s.risk === 'high' ? 'Yuqori' : 'O\'rta'}</span></td>
                <td>
                  <div className="row gap-8">
                    <button className="btn btn-sm btn-ghost" title="Qo'ng'iroq"><Phone size={15} /></button>
                    <button className="btn btn-sm btn-ghost" title="Xabar"><MessageCircle size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
