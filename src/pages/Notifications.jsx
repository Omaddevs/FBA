import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  AlertTriangle, TrendingUp, Info, CheckCircle2, ArrowLeft, Check, Trash2,
  ArrowRight, BellOff, Clock,
} from 'lucide-react';
import {
  useNotifications, getNotification, markRead, markAllRead, removeNotification,
} from '../data/notificationsStore';

export const NOTIF_STYLE = {
  danger: { icon: AlertTriangle, color: 'var(--red)', label: 'Xavf' },
  warning: { icon: TrendingUp, color: 'var(--amber)', label: 'Signal' },
  info: { icon: Info, color: 'var(--blue)', label: 'Ma\'lumot' },
  success: { icon: CheckCircle2, color: 'var(--green)', label: 'Muvaffaqiyat' },
};

function useBasePath() {
  const { pathname } = useLocation();
  return pathname.startsWith('/staff') ? '/staff' : '/app';
}

export function NotificationsList() {
  const navigate = useNavigate();
  const base = useBasePath();
  const notifications = useNotifications();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="fade-up" style={{ maxWidth: 760, margin: '0 auto' }}>
      <div className="row between wrap gap-12" style={{ marginBottom: 18 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>Bildirishnomalar</h2>
          <p className="muted">{unread > 0 ? `${unread} ta o'qilmagan xabar` : 'Hammasi o\'qilgan'}</p>
        </div>
        {unread > 0 && <button className="btn btn-sm" onClick={markAllRead}><Check size={15} /> Hammasi o'qildi</button>}
      </div>

      {notifications.length === 0 && (
        <div className="card card-pad center" style={{ padding: 48 }}>
          <BellOff size={40} style={{ color: 'var(--text-3)', marginBottom: 10 }} />
          <div style={{ fontWeight: 700 }}>Bildirishnoma yo'q</div>
        </div>
      )}

      <div className="grid" style={{ gap: 10 }}>
        {notifications.map((n) => {
          const st = NOTIF_STYLE[n.type] || NOTIF_STYLE.info;
          return (
            <div
              key={n.id}
              className="card notif-card"
              style={{ borderLeft: `3px solid ${n.read ? 'transparent' : st.color}` }}
              onClick={() => { markRead(n.id); navigate(`${base}/notifications/${n.id}`); }}
            >
              <span className="notif-ico" style={{ background: st.color + '1f', color: st.color, width: 42, height: 42 }}>
                <st.icon size={19} />
              </span>
              <div className="grow">
                <div className="row gap-8" style={{ alignItems: 'center' }}>
                  <span style={{ fontWeight: n.read ? 600 : 800, fontSize: 15 }}>{n.title}</span>
                  {!n.read && <span className="notif-dot" style={{ marginTop: 0 }} />}
                </div>
                <div className="muted" style={{ fontSize: 13.5, marginTop: 2 }}>{n.text}</div>
                <div className="dim" style={{ fontSize: 12, marginTop: 6 }}><Clock size={12} style={{ verticalAlign: -2 }} /> {n.time}</div>
              </div>
              <button className="notif-x" style={{ opacity: 1 }} onClick={(e) => { e.stopPropagation(); removeNotification(n.id); }}><Trash2 size={15} /></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function NotificationDetail() {
  const navigate = useNavigate();
  const base = useBasePath();
  const { id } = useParams();
  useNotifications();
  const n = getNotification(id);

  useEffect(() => { if (n && !n.read) markRead(n.id); }, [id]); // eslint-disable-line

  if (!n) {
    return (
      <div className="fade-up center" style={{ padding: 48 }}>
        <BellOff size={40} style={{ color: 'var(--text-3)', marginBottom: 10 }} />
        <div style={{ fontWeight: 700 }}>Bildirishnoma topilmadi</div>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate(`${base}/notifications`)}>
          <ArrowLeft size={16} /> Ro'yxatga qaytish
        </button>
      </div>
    );
  }

  const st = NOTIF_STYLE[n.type] || NOTIF_STYLE.info;

  return (
    <div className="fade-up" style={{ maxWidth: 680, margin: '0 auto' }}>
      <div className="row between" style={{ marginBottom: 14 }}>
        <button className="btn btn-ghost btn-sm" style={{ paddingLeft: 0 }} onClick={() => navigate(`${base}/notifications`)}>
          <ArrowLeft size={16} /> Orqaga
        </button>
        <button className="btn btn-sm" style={{ color: 'var(--red)' }} onClick={() => { removeNotification(n.id); navigate(`${base}/notifications`); }}>
          <Trash2 size={15} /> O'chirish
        </button>
      </div>

      <div className="card card-pad">
        <div className="row gap-16" style={{ alignItems: 'flex-start' }}>
          <span className="notif-ico" style={{ background: st.color + '1f', color: st.color, width: 56, height: 56, borderRadius: 16 }}>
            <st.icon size={26} />
          </span>
          <div className="grow">
            <span className="badge" style={{ background: st.color + '1f', color: st.color }}>{st.label}</span>
            <h2 style={{ fontSize: 21, fontWeight: 800, margin: '8px 0 4px' }}>{n.title}</h2>
            <div className="dim" style={{ fontSize: 12.5 }}><Clock size={12} style={{ verticalAlign: -2 }} /> {n.date || n.time}</div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', margin: '18px 0', paddingTop: 18 }}>
          <p style={{ lineHeight: 1.75, color: 'var(--text-2)', fontSize: 15 }}>{n.detail || n.text}</p>
        </div>

        {n.to && (
          <button className="btn btn-primary btn-block" onClick={() => navigate(n.to)}>
            {n.actionLabel || 'Batafsil ko\'rish'} <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
