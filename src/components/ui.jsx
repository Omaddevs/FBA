// Kichik qayta ishlatiladigan UI komponentlar
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function Avatar({ name, size = 40, color }) {
  const initials = name?.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.38, background: color }}>
      {initials}
    </span>
  );
}

export function KPI({ label, value, sub, icon: Icon, color = 'var(--brand)', trend, trendUp = true }) {
  return (
    <div className="card card-pad fade-up">
      <div className="row between" style={{ marginBottom: 10 }}>
        <span className="dim" style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
        {Icon && (
          <span style={{ width: 34, height: 34, borderRadius: 10, display: 'grid', placeItems: 'center', background: color + '1a', color }}>
            <Icon size={18} />
          </span>
        )}
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.1 }}>{value}</div>
      {sub && !trend && <div className="dim" style={{ fontSize: 12, marginTop: 4 }}>{sub}</div>}
      {trend && (
        <div className="row gap-8" style={{ marginTop: 8, fontSize: 12 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontWeight: 700, color: trendUp ? 'var(--green)' : 'var(--red)' }}>
            {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{trend}
          </span>
          {sub && <span className="dim">{sub}</span>}
        </div>
      )}
    </div>
  );
}

export function Ring({ value, max = 100, size = 120, label, sublabel, color = 'var(--brand)' }) {
  const r = (size - 14) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-2)" strokeWidth="11" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="11"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset .6s ease' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: size * 0.24, fontWeight: 800 }}>{label ?? value}</div>
          {sublabel && <div className="dim" style={{ fontSize: 11 }}>{sublabel}</div>}
        </div>
      </div>
    </div>
  );
}

export function Stat({ label, value, color }) {
  return (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <div style={{ fontSize: 22, fontWeight: 800, color }}>{value}</div>
      <div className="dim" style={{ fontSize: 12 }}>{label}</div>
    </div>
  );
}

export function Empty({ icon: Icon, title, text }) {
  return (
    <div className="card card-pad center" style={{ padding: 40 }}>
      {Icon && <Icon size={40} style={{ color: 'var(--text-3)', marginBottom: 12 }} />}
      <div style={{ fontWeight: 700 }}>{title}</div>
      {text && <div className="dim" style={{ fontSize: 13, marginTop: 4 }}>{text}</div>}
    </div>
  );
}
