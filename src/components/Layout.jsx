import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LogOut, Search, Bell, Moon, Sun, Globe, ChevronDown, User, Settings,
  Check, BellOff, ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../data/roles';
import { useNotifications, markRead, markAllRead } from '../data/notificationsStore';
import { NOTIF_STYLE } from '../pages/Notifications';
import './Layout.css';

function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem('fba_theme') === 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('fba_theme', dark ? 'dark' : 'light');
  }, [dark]);
  return [dark, () => setDark((d) => !d)];
}

export default function Layout({ navItems, title, children, accent }) {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const role = ROLES[session?.role];
  const location = useLocation();
  const base = location.pathname.startsWith('/staff') ? '/staff' : '/app';
  const [dark, toggleTheme] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifTab, setNotifTab] = useState('all');
  const menuRef = useRef(null);
  const notifRef = useRef(null);
  const notifications = useNotifications();
  const unread = notifications.filter((n) => !n.read).length;
  const shownNotifs = (notifTab === 'unread' ? notifications.filter((n) => !n.read) : notifications).slice(0, 5);

  useEffect(() => {
    function onClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  function openNotif(n) {
    markRead(n.id);
    setNotifOpen(false);
    navigate(`${base}/notifications/${n.id}`);
  }

  return (
    <div className="layout">
      {/* Desktop sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">FBA</div>
          <div>
            <div className="brand-name">FBA Connect</div>
            <div className="brand-sub">{title}</div>
          </div>
        </div>

        <nav className="side-nav">
          {navItems.map((it) => (
            <NavLink key={it.to} to={it.to} end={it.end} className="side-link">
              <it.icon size={20} />
              <span>{it.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="side-foot">
          <div className="side-user">
            <div className="avatar" style={{ width: 38, height: 38, background: role?.color }}>
              {role?.label?.[0]}
            </div>
            <div className="grow" style={{ overflow: 'hidden' }}>
              <div className="side-user-name">{session?.name}</div>
              <div className="side-user-role">{role?.label}</div>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
            <LogOut size={16} /> Chiqish
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="main">
        <header className="topbar">
          <div className="topbar-brand hide-desktop">
            <div className="brand-logo" style={{ width: 34, height: 34, fontSize: 12 }}>FBA</div>
            <span style={{ fontWeight: 800 }}>{title}</span>
          </div>

          <label className="topbar-search">
            <Search size={17} />
            <input placeholder="Qidirish..." />
          </label>

          <div className="topbar-actions">
            <div className="topbar-user-wrap" ref={notifRef}>
              <button className="ic-btn" title="Bildirishnomalar" onClick={() => setNotifOpen((o) => !o)}>
                <Bell size={19} />
                {unread > 0 && <span className="ic-badge">{unread}</span>}
              </button>
              {notifOpen && (
                <div className="notif-panel fade-up">
                  <div className="notif-head">
                    <div className="row gap-8">
                      <span style={{ fontWeight: 800 }}>Bildirishnomalar</span>
                      {unread > 0 && <span className="badge red" style={{ fontSize: 11 }}>{unread} yangi</span>}
                    </div>
                    {unread > 0 && (
                      <button className="notif-mark" onClick={markAllRead}><Check size={14} /> O'qildi</button>
                    )}
                  </div>
                  <div className="notif-tabs">
                    <button className={`notif-tab ${notifTab === 'all' ? 'active' : ''}`} onClick={() => setNotifTab('all')}>Hammasi</button>
                    <button className={`notif-tab ${notifTab === 'unread' ? 'active' : ''}`} onClick={() => setNotifTab('unread')}>
                      O'qilmagan {unread > 0 && `(${unread})`}
                    </button>
                  </div>
                  <div className="notif-list">
                    {shownNotifs.length === 0 && (
                      <div className="notif-empty">
                        <BellOff size={30} style={{ color: 'var(--text-3)', marginBottom: 8 }} />
                        <div className="dim" style={{ fontSize: 13 }}>{notifTab === 'unread' ? 'O\'qilmagan xabar yo\'q' : 'Bildirishnoma yo\'q'}</div>
                      </div>
                    )}
                    {shownNotifs.map((n) => {
                      const st = NOTIF_STYLE[n.type] || NOTIF_STYLE.info;
                      return (
                        <div key={n.id} className={`notif-item ${n.read ? '' : 'unread'}`} onClick={() => openNotif(n)}>
                          <span className="notif-ico" style={{ background: st.color + '1f', color: st.color }}>
                            <st.icon size={16} />
                          </span>
                          <div className="grow">
                            <div style={{ fontSize: 13.5, fontWeight: n.read ? 600 : 800 }}>{n.title}</div>
                            <div className="dim" style={{ fontSize: 12.5, marginTop: 1 }}>{n.text}</div>
                            <div className="dim" style={{ fontSize: 11, marginTop: 3 }}>{n.time}</div>
                          </div>
                          {!n.read && <span className="notif-dot" />}
                        </div>
                      );
                    })}
                  </div>
                  <button className="notif-foot" onClick={() => { setNotifOpen(false); navigate(`${base}/notifications`); }}>
                    Barchasini ko'rish <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>
            <button className="ic-btn" onClick={toggleTheme} title="Mavzu">
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button className="ic-btn hide-mobile" title="Til">
              <Globe size={19} />
            </button>

            <div className="topbar-user-wrap" ref={menuRef}>
              <button className="topbar-user-btn" onClick={() => setMenuOpen((o) => !o)}>
                <div className="avatar" style={{ width: 36, height: 36, background: role?.color }}>{role?.label?.[0]}</div>
                <ChevronDown size={16} className="hide-mobile" />
              </button>
              {menuOpen && (
                <div className="user-menu fade-up">
                  <div className="user-menu-head">
                    <div className="avatar" style={{ width: 40, height: 40, background: role?.color }}>{role?.label?.[0]}</div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{session?.name}</div>
                      <div className="dim" style={{ fontSize: 12 }}>{role?.label}</div>
                    </div>
                  </div>
                  <button className="user-menu-item"><User size={16} /> Profil</button>
                  <button className="user-menu-item"><Settings size={16} /> Sozlamalar</button>
                  <button className="user-menu-item danger" onClick={handleLogout}><LogOut size={16} /> Chiqish</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="content" style={accent ? { '--brand': accent } : undefined}>
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="bottom-nav">
        {navItems.slice(0, 5).map((it) => (
          <NavLink key={it.to} to={it.to} end={it.end} className="bottom-link">
            <it.icon size={22} />
            <span>{it.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
