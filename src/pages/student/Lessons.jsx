import { useState } from 'react';
import { PlayCircle, Lock, CheckCircle2, FileText, Coins, X } from 'lucide-react';
import { modules } from '../../data/mock';

export default function Lessons() {
  const [active, setActive] = useState(null);

  return (
    <div className="fade-up">
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Darslar</h2>
      <p className="muted" style={{ marginBottom: 18 }}>Kurs xaritasi — modullar va darslar.</p>

      {modules.map((m) => {
        const done = m.lessons.filter((l) => l.done).length;
        return (
          <div key={m.id} className="module">
            <div className="module-head">
              <span className="badge brand">{done}/{m.lessons.length}</span>
              {m.title}
            </div>
            <div className="card">
              {m.lessons.map((l) => (
                <div
                  key={l.id}
                  className="lesson-row"
                  style={{ cursor: l.locked ? 'default' : 'pointer', opacity: l.locked ? 0.6 : 1 }}
                  onClick={() => !l.locked && setActive(l)}
                >
                  <span className="lesson-ico" style={{
                    background: l.locked ? 'var(--surface-2)' : l.done ? 'var(--green-bg)' : 'rgba(109,93,252,.12)',
                    color: l.locked ? 'var(--text-3)' : l.done ? 'var(--green)' : 'var(--brand)',
                  }}>
                    {l.locked ? <Lock size={18} /> : l.done ? <CheckCircle2 size={18} /> : <PlayCircle size={18} />}
                  </span>
                  <div className="grow">
                    <div style={{ fontWeight: 600 }}>{l.title}</div>
                    <div className="row gap-8" style={{ marginTop: 3 }}>
                      {l.video && <span className="dim" style={{ fontSize: 12 }}>📹 Video</span>}
                      {l.task && <span className="dim" style={{ fontSize: 12 }}>📝 Vazifa</span>}
                      {l.current && <span className="badge amber" style={{ fontSize: 11 }}>Joriy</span>}
                    </div>
                  </div>
                  {l.task && l.taskScore != null && (
                    <span className={`badge ${l.taskScore >= 80 ? 'green' : 'amber'}`}>{l.taskScore}%</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {active && (
        <div className="modal-overlay" onClick={() => setActive(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="row between" style={{ marginBottom: 14 }}>
              <h3 style={{ fontWeight: 800 }}>{active.title}</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setActive(null)}><X size={18} /></button>
            </div>
            <div className="video-frame">
              <PlayCircle size={48} color="#fff" />
              <span style={{ color: '#fff', fontSize: 13, marginTop: 8 }}>YouTube / Bunny Stream video</span>
            </div>
            {active.task && (
              <div className="card card-pad" style={{ marginTop: 16 }}>
                <div className="row between">
                  <div className="row gap-12">
                    <span className="lesson-ico" style={{ background: 'var(--blue-bg)', color: 'var(--blue)' }}><FileText size={18} /></span>
                    <div>
                      <div style={{ fontWeight: 700 }}>Vazifa (FlexiQuiz)</div>
                      <div className="dim" style={{ fontSize: 12 }}>O'z vaqtida topshiring +15 coin</div>
                    </div>
                  </div>
                  {active.taskScore != null
                    ? <span className="badge green">Bajarildi {active.taskScore}%</span>
                    : <button className="btn btn-primary btn-sm">Boshlash</button>}
                </div>
              </div>
            )}
            <div className="row gap-8" style={{ marginTop: 14, color: 'var(--amber)', fontWeight: 600, fontSize: 13 }}>
              <Coins size={16} /> Darsni tugatib coin yig'ing
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
