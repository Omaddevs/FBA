import { Coins, Store, Sparkles, ChevronRight, TrendingUp } from 'lucide-react';
import { me, news, courses } from '../../data/mock';

export default function StudentHome() {
  const myCourse = courses.find((c) => c.mine);
  const others = courses.filter((c) => !c.mine);

  return (
    <div className="fade-up">
      <div className="row between" style={{ marginBottom: 18 }}>
        <div>
          <div className="dim" style={{ fontSize: 13 }}>Assalomu alaykum,</div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>{me.name} 👋</h2>
        </div>
        <span className="badge brand">{me.group}</span>
      </div>

      {/* Coin balans — oltin karta */}
      <div className="coin-card">
        <div className="row between">
          <div>
            <div style={{ fontSize: 13, opacity: .9, fontWeight: 600 }}>Coin balans</div>
            <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.1, marginTop: 4 }}>
              {me.coins.toLocaleString()}
            </div>
            <div style={{ fontSize: 12, opacity: .85, marginTop: 4 }}>
              <TrendingUp size={13} style={{ verticalAlign: -2 }} /> Bu hafta +205 coin
            </div>
          </div>
          <Coins size={56} style={{ opacity: .85 }} />
        </div>
        <div className="coin-actions">
          <button className="coin-btn"><Coins size={16} /> Coin</button>
          <button className="coin-btn"><Store size={16} /> Do'kon</button>
        </div>
      </div>

      {/* Yangiliklar */}
      <div className="row between" style={{ marginTop: 8 }}>
        <div className="section-title" style={{ margin: '22px 0 12px' }}>Yangiliklar</div>
      </div>
      <div className="grid" style={{ gap: 12 }}>
        {news.map((n) => (
          <div key={n.id} className="card news-card fade-up">
            <div className="news-thumb" style={{ background: `linear-gradient(135deg, ${n.cover[0]}, ${n.cover[1]})` }}>
              <Sparkles size={22} color="#fff" />
            </div>
            <div className="grow">
              <div className="row between">
                <span className="badge" style={{ fontSize: 11 }}>{n.tag}</span>
                <span className="dim" style={{ fontSize: 12 }}>{n.date}</span>
              </div>
              <div style={{ fontWeight: 700, margin: '6px 0 2px' }}>{n.title}</div>
              <div className="muted" style={{ fontSize: 13 }}>{n.excerpt}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Mening kursim */}
      <div className="section-title">Mening kursim</div>
      <div className="card card-pad fade-up" style={{ borderLeft: `4px solid ${myCourse.color}` }}>
        <div className="row between">
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{myCourse.title}</div>
            <div className="dim" style={{ fontSize: 13 }}>{me.group} • {myCourse.students} o'quvchi</div>
          </div>
          <div style={{ fontWeight: 800, color: myCourse.color }}>{myCourse.progress}%</div>
        </div>
        <div className="bar" style={{ marginTop: 12 }}>
          <span style={{ width: `${myCourse.progress}%`, background: myCourse.color }} />
        </div>
      </div>

      {/* Boshqa kurslar (marketing) */}
      <div className="section-title">Boshqa kurslar</div>
      <div className="grid grid-2">
        {others.map((c) => (
          <div key={c.id} className="card card-pad course-card fade-up">
            <div className="course-badge" style={{ background: c.color }}>{c.code}</div>
            <div style={{ fontWeight: 700, marginTop: 10 }}>{c.title}</div>
            <div className="dim" style={{ fontSize: 12, marginTop: 2 }}>{c.students} o'quvchi</div>
            <button className="btn btn-sm" style={{ marginTop: 12 }}>
              Batafsil <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
