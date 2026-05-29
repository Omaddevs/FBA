import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Briefcase, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../data/roles';
import { authenticate } from '../data/staffStore';
import './Login.css';

const STAFF_ROLES = ['super_admin', 'admin', 'ssm', 'main_tutor', 'support_tutor', 'sales', 'smm', 'hr'];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  function submit(e) {
    e.preventDefault();
    setError('');
    // 1) Haqiqiy login: admin yaratgan username/parol bilan
    if (phone.trim() && password.trim()) {
      const user = authenticate(phone, password);
      if (user) {
        login(user.role, user.name);
        navigate('/staff');
        return;
      }
      setError('Login yoki parol noto\'g\'ri. Yoki creds\'siz demo rolni tanlang.');
      return;
    }
    // 2) Demo rejim: rol tanlash orqali (parolsiz)
    login(role);
    navigate(role === 'student' ? '/app' : '/staff');
  }

  return (
    <div className="login">
      <div className="login-art">
        <div className="login-art-inner">
          <div className="brand-logo" style={{ width: 56, height: 56, fontSize: 18 }}>FBA</div>
          <h1>FBA Connect</h1>
          <p className="login-tagline">O'qishdan ishga, ishdan karyeraga — bitta super-app.</p>
          <div className="login-pillars">
            <div className="pillar"><GraduationCap size={20} /><span>Education</span></div>
            <div className="pillar"><Briefcase size={20} /><span>Recruiting</span></div>
            <div className="pillar"><ShieldCheck size={20} /><span>Consulting</span></div>
          </div>
        </div>
      </div>

      <div className="login-form-wrap">
        <form className="login-form" onSubmit={submit}>
          <h2>Kirish</h2>
          <p className="muted" style={{ marginBottom: 22 }}>Telefon yoki username va parol bilan kiring.</p>

          <div className="field" style={{ marginBottom: 14 }}>
            <label>Telefon yoki username</label>
            <input className="input" placeholder="+998 90 123 45 67" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="field" style={{ marginBottom: 18 }}>
            <label>Parol</label>
            <input className="input" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {error && (
            <div className="card" style={{ background: 'var(--red-bg)', borderColor: 'transparent', color: 'var(--red)', padding: '10px 14px', fontSize: 13, marginBottom: 14 }}>
              {error}
            </div>
          )}

          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)' }}>Demo rejim — rolni tanlang</label>
          <div className="role-grid">
            <button type="button" className={`role-pill ${role === 'student' ? 'active' : ''}`} onClick={() => setRole('student')}>
              O'quvchi
            </button>
            {STAFF_ROLES.map((r) => (
              <button type="button" key={r} className={`role-pill ${role === r ? 'active' : ''}`} onClick={() => setRole(r)}>
                {ROLES[r].label}
              </button>
            ))}
          </div>

          <button className="btn btn-primary btn-block" style={{ marginTop: 8 }} type="submit">
            Kirish <ArrowRight size={18} />
          </button>
          <p className="dim center" style={{ fontSize: 12, marginTop: 14 }}>
            Telegram Mini App rejimida login avtomatik (initData orqali).
          </p>
        </form>
      </div>
    </div>
  );
}
