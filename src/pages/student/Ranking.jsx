import { useState } from 'react';
import { Trophy, Coins } from 'lucide-react';
import { Avatar } from '../../components/ui';
import { ranking, me } from '../../data/mock';

const PERIODS = [['week', 'Haftalik'], ['month', 'Oylik'], ['all', 'Umumiy']];
const SCOPES = [['group', 'Guruh'], ['center', 'Markaz']];

export default function Ranking() {
  const [period, setPeriod] = useState('all');
  const [scope, setScope] = useState('center');

  const list = scope === 'group'
    ? ranking.filter((r) => r.group === me.group)
    : ranking;
  const sorted = [...list].sort((a, b) => b.coins - a.coins);
  const top3 = sorted.slice(0, 3);
  const myEntry = sorted.find((r) => r.me);
  const myPlace = sorted.findIndex((r) => r.me) + 1;

  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);
  const heights = { 0: 90, 1: 120, 2: 70 };
  const medalColors = ['#c0c5d6', '#f7b733', '#e0916b'];

  return (
    <div className="fade-up">
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Ranking</h2>
      <p className="muted" style={{ marginBottom: 16 }}>Ball = jami olingan coin (Duolingo XP modeli).</p>

      <div className="row gap-8 wrap" style={{ marginBottom: 16 }}>
        {SCOPES.map(([k, l]) => (
          <span key={k} className={`chip ${scope === k ? 'active' : ''}`} onClick={() => setScope(k)}>{l}</span>
        ))}
        <span style={{ width: 1, height: 22, background: 'var(--border)' }} />
        {PERIODS.map(([k, l]) => (
          <span key={k} className={`chip ${period === k ? 'active' : ''}`} onClick={() => setPeriod(k)}>{l}</span>
        ))}
      </div>

      {/* Mening o'rnim */}
      <div className="card card-pad" style={{ background: 'var(--brand-grad)', color: '#fff', border: 'none', marginBottom: 18 }}>
        <div className="row between">
          <div className="row gap-12">
            <div style={{ fontSize: 30, fontWeight: 800 }}>#{myPlace}</div>
            <div>
              <div style={{ fontWeight: 700 }}>Mening o'rnim</div>
              <div style={{ opacity: .85, fontSize: 13 }}>{scope === 'group' ? me.group : 'Markaz bo\'yicha'}</div>
            </div>
          </div>
          <div className="row gap-8" style={{ fontWeight: 800, fontSize: 18 }}>
            <Coins size={20} /> {myEntry?.coins.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Podium */}
      <div className="card" style={{ paddingTop: 16 }}>
        <div className="podium">
          {podiumOrder.map((p, i) => {
            const realRank = sorted.indexOf(p);
            return (
              <div key={p.id} className="podium-item">
                <Avatar name={p.name} size={realRank === 0 ? 56 : 46} color={medalColors[realRank]} />
                <div style={{ fontWeight: 700, fontSize: 12, textAlign: 'center', maxWidth: 80 }}>{p.name.split(' ')[0]}</div>
                <div className="podium-bar" style={{ height: heights[i], background: medalColors[realRank] }}>
                  {realRank + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Top 50 ro'yxat */}
        {sorted.map((r, i) => (
          <div key={r.id} className={`rank-row ${r.me ? 'me' : ''}`}>
            <span className={`rank-num ${i < 3 ? 'top' : ''}`}>{i < 3 ? <Trophy size={16} /> : i + 1}</span>
            <Avatar name={r.name} size={38} />
            <div className="grow">
              <div style={{ fontWeight: 600 }}>{r.name}{r.me && <span className="badge brand" style={{ marginLeft: 8, fontSize: 11 }}>Siz</span>}</div>
              <div className="dim" style={{ fontSize: 12 }}>{r.group}</div>
            </div>
            <span className="row gap-8" style={{ fontWeight: 700, color: 'var(--amber)' }}>
              <Coins size={15} /> {r.coins.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
