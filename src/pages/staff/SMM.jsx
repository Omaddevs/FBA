import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import {
  Plus, Image as ImageIcon, Trash2, Eye, Clock, Calendar, Pencil, Newspaper, Users, ArrowLeft,
} from 'lucide-react';
import { courses } from '../../data/mock';
import { useNews, addNews, removeNews, getNews, incrementViews } from '../../data/newsStore';

const CATEGORIES = ['Barchasi', 'Kurs', 'Tadbir', 'Do\'kon'];
const COVER_PRESETS = {
  Kurs: ['#6d5dfc', '#3b82f6'],
  Tadbir: ['#19b36b', '#10b981'],
  'Do\'kon': ['#f7b733', '#fc9842'],
};

export default function SMM() {
  return (
    <Routes>
      <Route index element={<NewsFeed />} />
      <Route path="new" element={<NewsCreate />} />
      <Route path=":id" element={<NewsDetail />} />
    </Routes>
  );
}

/* ---------- Yangiliklar lentasi ---------- */
function NewsFeed() {
  const navigate = useNavigate();
  const news = useNews();
  const [filter, setFilter] = useState('Barchasi');

  const list = news.filter((n) => filter === 'Barchasi' || n.tag === filter);

  return (
    <div className="fade-up">
      <div className="row between wrap gap-12" style={{ marginBottom: 6 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>SMM — Yangiliklar</h2>
          <p className="muted">FBA Connect yangiliklar lentasi.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/staff/smm/new')}><Plus size={16} /> Yangilik qo'shish</button>
      </div>

      <div className="subtabs" style={{ marginTop: 16 }}>
        {CATEGORIES.map((c) => (
          <span key={c} className={`chip ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>{c}</span>
        ))}
      </div>

      {list.length === 0 && (
        <div className="card card-pad center" style={{ padding: 40 }}>
          <Newspaper size={40} style={{ color: 'var(--text-3)', marginBottom: 10 }} />
          <div style={{ fontWeight: 700 }}>Bu kategoriyada yangilik yo'q</div>
        </div>
      )}

      {list.length > 0 && (
        <div className="news-grid">
          {list.map((n) => (
            <article key={n.id} className="news-item card fade-up" onClick={() => navigate(`/staff/smm/${n.id}`)}>
              <div className="news-item-cover" style={{ background: `linear-gradient(135deg, ${n.cover[0]}, ${n.cover[1]})` }}>
                <span className="badge" style={{ background: 'rgba(255,255,255,.9)', color: '#222', fontSize: 11 }}>{n.tag}</span>
                <Newspaper size={40} color="rgba(255,255,255,.4)" className="news-item-ico" />
              </div>
              <div className="news-item-body">
                <h4 className="news-item-title news-clamp-2">{n.title}</h4>
                <p className="muted news-clamp-2" style={{ fontSize: 13 }}>{n.excerpt}</p>
                <div className="news-meta" style={{ marginTop: 'auto' }}>
                  <span><Calendar size={12} /> {n.date}</span>
                  <span><Eye size={12} /> {n.views.toLocaleString()}</span>
                  <span className="grow" />
                  <button className="icon-btn" onClick={(e) => { e.stopPropagation(); removeNews(n.id); }}><Trash2 size={14} /></button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Kurslar marketing */}
      <div className="section-title">Kurslar marketing</div>
      <div className="grid" style={{ gap: 12 }}>
        {courses.map((c) => (
          <div key={c.id} className="card course-mk">
            <span className="course-mk-badge" style={{ background: c.color }}>{c.code}</span>
            <div className="course-mk-info">
              <div className="row gap-8" style={{ flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{c.title}</span>
                {c.mine && <span className="badge brand" style={{ fontSize: 11 }}>Mening kursim</span>}
              </div>
              <div className="dim" style={{ fontSize: 12.5, marginTop: 2 }}>
                <Users size={12} style={{ verticalAlign: -2 }} /> {c.students} o'quvchi
                {c.progress != null && <> · {c.progress}% progress</>}
              </div>
            </div>
            <button className="btn btn-sm course-mk-btn"><Pencil size={13} /> Tahrir</button>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ---------- Yangilik detail sahifasi ---------- */
function NewsDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  useNews(); // store o'zgarishlariga obuna
  const item = getNews(id);

  useEffect(() => { if (item) incrementViews(id); }, [id]); // eslint-disable-line

  if (!item) {
    return (
      <div className="fade-up center" style={{ padding: 40 }}>
        <Newspaper size={40} style={{ color: 'var(--text-3)', marginBottom: 10 }} />
        <div style={{ fontWeight: 700 }}>Yangilik topilmadi</div>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/staff/smm')}><ArrowLeft size={16} /> Lentaga qaytish</button>
      </div>
    );
  }

  function handleRemove() {
    removeNews(item.id);
    navigate('/staff/smm');
  }

  return (
    <div className="fade-up" style={{ maxWidth: 760, margin: '0 auto' }}>
      <div className="row between" style={{ marginBottom: 14 }}>
        <button className="btn btn-ghost btn-sm" style={{ paddingLeft: 0 }} onClick={() => navigate('/staff/smm')}>
          <ArrowLeft size={16} /> Orqaga
        </button>
        <button className="btn btn-sm" onClick={handleRemove} style={{ color: 'var(--red)' }}><Trash2 size={15} /> O'chirish</button>
      </div>

      <article className="card" style={{ overflow: 'hidden' }}>
        <div className="news-detail-cover" style={{ background: `linear-gradient(135deg, ${item.cover[0]}, ${item.cover[1]})` }}>
          <span className="badge" style={{ background: 'rgba(255,255,255,.9)', color: '#222' }}>{item.tag}</span>
          <Newspaper size={80} color="rgba(255,255,255,.35)" className="news-detail-ico" />
        </div>
        <div style={{ padding: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.25, marginBottom: 12 }}>{item.title}</h1>
          <div className="news-meta" style={{ marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid var(--border)' }}>
            <span><Users size={13} /> {item.author}</span>
            <span><Calendar size={13} /> {item.date}</span>
            <span><Eye size={13} /> {item.views.toLocaleString()} ko'rildi</span>
            <span><Clock size={13} /> {item.readTime} daq o'qish</span>
          </div>
          {item.excerpt && <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 14 }}>{item.excerpt}</p>}
          <p style={{ lineHeight: 1.8, color: 'var(--text-2)', fontSize: 15 }}>{item.body}</p>
        </div>
      </article>
    </div>
  );
}

/* ---------- Yangilik yaratish sahifasi ---------- */
function NewsCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', excerpt: '', body: '', tag: 'Kurs' });

  function publish() {
    if (!form.title.trim()) return;
    addNews({
      title: form.title,
      excerpt: form.excerpt || form.body.slice(0, 90),
      body: form.body,
      tag: form.tag,
      cover: COVER_PRESETS[form.tag] || ['#6d5dfc', '#3b82f6'],
    });
    navigate('/staff/smm');
  }

  const cover = COVER_PRESETS[form.tag] || ['#6d5dfc', '#3b82f6'];

  return (
    <div className="fade-up" style={{ maxWidth: 820, margin: '0 auto' }}>
      <button className="btn btn-ghost btn-sm" style={{ marginBottom: 12, paddingLeft: 0 }} onClick={() => navigate('/staff/smm')}>
        <ArrowLeft size={16} /> Orqaga
      </button>
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Yangi yangilik</h2>
      <p className="muted" style={{ marginBottom: 18 }}>Yangilik ma'lumotlarini to'ldiring va e'lon qiling.</p>

      <div className="create-grid">
        {/* Forma */}
        <div className="card card-pad grid" style={{ gap: 14 }}>
          <div className="field"><label>Sarlavha</label><input className="input" autoFocus value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Yangilik sarlavhasi" /></div>
          <div className="field"><label>Qisqacha (lentada ko'rinadi)</label><input className="input" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="1-2 jumla" /></div>
          <div className="field"><label>To'liq matn</label><textarea className="input" rows={6} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="To'liq yangilik matni..." /></div>
          <div className="field">
            <label>Kategoriya</label>
            <div className="opt-grid">
              {['Kurs', 'Tadbir', 'Do\'kon'].map((t) => (
                <span key={t} className={`chip ${form.tag === t ? 'sel' : ''}`} onClick={() => setForm({ ...form, tag: t })}>{t}</span>
              ))}
            </div>
          </div>
          <button className="btn"><ImageIcon size={16} /> Cover rasm yuklash</button>
          <div className="row gap-8">
            <button className="btn grow" onClick={() => navigate('/staff/smm')}>Bekor qilish</button>
            <button className="btn btn-primary grow" onClick={publish}><Plus size={16} /> E'lon qilish</button>
          </div>
        </div>

        {/* Jonli ko'rinish (preview) */}
        <div>
          <div className="dim" style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 10 }}>Ko'rinishi</div>
          <article className="news-item card">
            <div className="news-item-cover" style={{ background: `linear-gradient(135deg, ${cover[0]}, ${cover[1]})` }}>
              <span className="badge" style={{ background: 'rgba(255,255,255,.9)', color: '#222', fontSize: 11 }}>{form.tag}</span>
              <Newspaper size={40} color="rgba(255,255,255,.4)" className="news-item-ico" />
            </div>
            <div className="news-item-body">
              <h4 className="news-item-title news-clamp-2">{form.title || 'Sarlavha shu yerda'}</h4>
              <p className="muted news-clamp-2" style={{ fontSize: 13 }}>{form.excerpt || form.body || 'Qisqacha matn lentada shunday ko\'rinadi.'}</p>
              <div className="news-meta" style={{ marginTop: 'auto' }}>
                <span><Calendar size={12} /> Hozir</span>
                <span><Eye size={12} /> 0</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
