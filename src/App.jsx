import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// ─── BADGE SVG COMPONENTS ────────────────────────────────────────────────────

const BadgeWood = ({ size = 48, locked = false }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" style={{ filter: locked ? "grayscale(1) opacity(0.35)" : "drop-shadow(0 2px 6px rgba(139,90,43,0.5))" }}>
    <defs>
      <radialGradient id="wood-bg" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#c68642" />
        <stop offset="100%" stopColor="#8b5e2a" />
      </radialGradient>
      <radialGradient id="wood-rim" cx="50%" cy="30%">
        <stop offset="0%" stopColor="#e8a84c" />
        <stop offset="100%" stopColor="#a0622e" />
      </radialGradient>
    </defs>
    <path d="M24 3 L41 13 L41 35 L24 45 L7 35 L7 13 Z" fill="url(#wood-rim)" />
    <path d="M24 6 L38 15 L38 33 L24 42 L10 33 L10 15 Z" fill="url(#wood-bg)" />
    {/* Tree */}
    <polygon points="24,10 30,20 18,20" fill="#2d7a3a" />
    <polygon points="24,15 31,26 17,26" fill="#3a9c48" />
    <polygon points="24,20 32,32 16,32" fill="#2d7a3a" />
    <rect x="21.5" y="32" width="5" height="5" fill="#8b5e2a" />
    {/* Rim shine */}
    <path d="M24 5 L39 14" stroke="rgba(255,220,120,0.4)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BadgeStone = ({ size = 48, locked = false }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" style={{ filter: locked ? "grayscale(1) opacity(0.35)" : "drop-shadow(0 2px 6px rgba(90,90,110,0.5))" }}>
    <defs>
      <radialGradient id="stone-bg" cx="40%" cy="35%">
        <stop offset="0%" stopColor="#9aa3b0" />
        <stop offset="60%" stopColor="#6b7280" />
        <stop offset="100%" stopColor="#4a5060" />
      </radialGradient>
    </defs>
    <path d="M14 8 C10 8 6 12 7 18 L5 26 C4 32 8 38 14 40 L24 44 L34 40 C40 38 44 32 43 26 L41 18 C42 12 38 8 34 8 Z" fill="url(#stone-bg)" />
    <path d="M14 8 C10 8 6 12 7 18 L5 26" stroke="rgba(180,190,210,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M20 10 L28 9 L35 14 L38 22 L35 30 L28 36 L20 37 L13 32 L10 22 L13 14 Z" fill="rgba(255,255,255,0.06)" />
    <path d="M18 14 L26 11" stroke="rgba(200,210,230,0.5)" strokeWidth="1" strokeLinecap="round" />
    <path d="M12 22 L16 18 L22 17 L29 20 L33 26" stroke="rgba(160,170,190,0.4)" strokeWidth="1" fill="none" strokeLinecap="round" />
  </svg>
);

const BadgeCopper = ({ size = 48, locked = false }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" style={{ filter: locked ? "grayscale(1) opacity(0.35)" : "drop-shadow(0 2px 8px rgba(180,80,20,0.5))" }}>
    <defs>
      <radialGradient id="copper-center" cx="40%" cy="35%">
        <stop offset="0%" stopColor="#d4813a" />
        <stop offset="100%" stopColor="#a04e1a" />
      </radialGradient>
      <radialGradient id="copper-rim" cx="50%" cy="30%">
        <stop offset="0%" stopColor="#e8a050" />
        <stop offset="100%" stopColor="#b85c20" />
      </radialGradient>
    </defs>
    <circle cx="24" cy="24" r="21" fill="url(#copper-rim)" />
    <circle cx="24" cy="24" r="17" fill="url(#copper-center)" />
    {/* Laurel leaves simplified */}
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30) * Math.PI / 180;
      const r1 = 18, r2 = 20;
      const x1 = 24 + r1 * Math.cos(angle - 0.15);
      const y1 = 24 + r1 * Math.sin(angle - 0.15);
      const x2 = 24 + r2 * Math.cos(angle);
      const y2 = 24 + r2 * Math.sin(angle);
      const x3 = 24 + r1 * Math.cos(angle + 0.15);
      const y3 = 24 + r1 * Math.sin(angle + 0.15);
      return <path key={i} d={`M${x1},${y1} L${x2},${y2} L${x3},${y3} Z`} fill="#e8a050" opacity="0.8" />;
    })}
    <circle cx="24" cy="24" r="14" fill="url(#copper-center)" />
    <circle cx="20" cy="20" r="3" fill="rgba(255,180,80,0.3)" />
  </svg>
);

const BadgeSilver = ({ size = 48, locked = false }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" style={{ filter: locked ? "grayscale(1) opacity(0.35)" : "drop-shadow(0 2px 8px rgba(120,140,160,0.6))" }}>
    <defs>
      <radialGradient id="silver-center" cx="40%" cy="35%">
        <stop offset="0%" stopColor="#d8dfe8" />
        <stop offset="100%" stopColor="#8a9aaa" />
      </radialGradient>
      <radialGradient id="silver-rim" cx="50%" cy="30%">
        <stop offset="0%" stopColor="#e8eef5" />
        <stop offset="100%" stopColor="#9ab0c0" />
      </radialGradient>
    </defs>
    <circle cx="24" cy="24" r="21" fill="url(#silver-rim)" />
    <circle cx="24" cy="24" r="17" fill="url(#silver-center)" />
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30) * Math.PI / 180;
      const r1 = 18, r2 = 20;
      const x1 = 24 + r1 * Math.cos(angle - 0.15);
      const y1 = 24 + r1 * Math.sin(angle - 0.15);
      const x2 = 24 + r2 * Math.cos(angle);
      const y2 = 24 + r2 * Math.sin(angle);
      const x3 = 24 + r1 * Math.cos(angle + 0.15);
      const y3 = 24 + r1 * Math.sin(angle + 0.15);
      return <path key={i} d={`M${x1},${y1} L${x2},${y2} L${x3},${y3} Z`} fill="#c8d8e8" opacity="0.8" />;
    })}
    <circle cx="24" cy="24" r="14" fill="url(#silver-center)" />
    <circle cx="20" cy="20" r="3" fill="rgba(255,255,255,0.4)" />
  </svg>
);

const BadgeGold = ({ size = 48, locked = false }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" style={{ filter: locked ? "grayscale(1) opacity(0.35)" : "drop-shadow(0 2px 10px rgba(218,165,32,0.7))" }}>
    <defs>
      <radialGradient id="gold-center" cx="40%" cy="35%">
        <stop offset="0%" stopColor="#ffd060" />
        <stop offset="100%" stopColor="#c8900a" />
      </radialGradient>
      <radialGradient id="gold-rim" cx="50%" cy="30%">
        <stop offset="0%" stopColor="#ffe080" />
        <stop offset="100%" stopColor="#d4a010" />
      </radialGradient>
    </defs>
    <circle cx="24" cy="24" r="21" fill="url(#gold-rim)" />
    <circle cx="24" cy="24" r="17" fill="url(#gold-center)" />
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30) * Math.PI / 180;
      const r1 = 18, r2 = 20;
      const x1 = 24 + r1 * Math.cos(angle - 0.15);
      const y1 = 24 + r1 * Math.sin(angle - 0.15);
      const x2 = 24 + r2 * Math.cos(angle);
      const y2 = 24 + r2 * Math.sin(angle);
      const x3 = 24 + r1 * Math.cos(angle + 0.15);
      const y3 = 24 + r1 * Math.sin(angle + 0.15);
      return <path key={i} d={`M${x1},${y1} L${x2},${y2} L${x3},${y3} Z`} fill="#ffe090" opacity="0.8" />;
    })}
    <circle cx="24" cy="24" r="14" fill="url(#gold-center)" />
    <path d="M18 18 L20 16 L22 18 L24 14 L26 18 L28 16 L30 18" stroke="rgba(255,240,120,0.6)" strokeWidth="1" fill="none" strokeLinecap="round" />
  </svg>
);

const BadgeMision = ({ size = 48, locked = false }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" style={{ filter: locked ? "grayscale(1) opacity(0.35)" : "drop-shadow(0 3px 12px rgba(218,165,32,0.8))" }}>
    <defs>
      <radialGradient id="mv-gold" cx="40%" cy="35%">
        <stop offset="0%" stopColor="#ffd060" />
        <stop offset="100%" stopColor="#c8900a" />
      </radialGradient>
      <linearGradient id="mv-ribbon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f5a623" />
        <stop offset="50%" stopColor="#1e3a8a" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
    </defs>
    {/* Ribbon top */}
    <rect x="18" y="0" width="12" height="8" rx="2" fill="url(#mv-ribbon)" />
    {/* Medal circle */}
    <circle cx="24" cy="30" r="17" fill="url(#mv-gold)" />
    {[...Array(14)].map((_, i) => {
      const angle = (i * 360 / 14) * Math.PI / 180;
      const r1 = 17, r2 = 19;
      const x1 = 24 + r1 * Math.cos(angle - 0.1);
      const y1 = 30 + r1 * Math.sin(angle - 0.1);
      const x2 = 24 + r2 * Math.cos(angle);
      const y2 = 30 + r2 * Math.sin(angle);
      const x3 = 24 + r1 * Math.cos(angle + 0.1);
      const y3 = 30 + r1 * Math.sin(angle + 0.1);
      return <path key={i} d={`M${x1},${y1} L${x2},${y2} L${x3},${y3} Z`} fill="#ffe090" opacity="0.9" />;
    })}
    <circle cx="24" cy="30" r="14" fill="url(#mv-gold)" />
    {/* Cross */}
    <rect x="22" y="21" width="4" height="18" rx="1" fill="white" opacity="0.9" />
    <rect x="17" y="27" width="14" height="4" rx="1" fill="white" opacity="0.9" />
    {/* Stars */}
    <circle cx="18" cy="25" r="1.5" fill="rgba(255,250,200,0.8)" />
    <circle cx="30" cy="25" r="1.5" fill="rgba(255,250,200,0.8)" />
    <circle cx="18" cy="35" r="1.5" fill="rgba(255,250,200,0.8)" />
    <circle cx="30" cy="35" r="1.5" fill="rgba(255,250,200,0.8)" />
  </svg>
);

const BADGES = [
  { id: "wood",   name: "Insignia de Madera",  req: 10, component: BadgeWood,   color: "#c68642", emoji: "🌲" },
  { id: "stone",  name: "Insignia de Piedra",   req: 20, component: BadgeStone,  color: "#6b7280", emoji: "🪨" },
  { id: "copper", name: "Insignia de Cobre",    req: 30, component: BadgeCopper, color: "#b05a1e", emoji: "🥉" },
  { id: "silver", name: "Insignia de Plata",    req: 40, component: BadgeSilver, color: "#8a9aaa", emoji: "🥈" },
  { id: "mission",name: "Insignia Misión de Vida", req: 50, component: BadgeMision, color: "#d4a010", emoji: "⭐" },
];

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────

const initialVolunteers = [
  { id: 1, name: "Sofía Martínez", role: "Jefe de Zona", rifas: 52, streak: 5, avatar: null, color: "#f43f5e" },
  { id: 2, name: "Matías González", role: "Jefe de Finanzas", rifas: 43, streak: 3, avatar: null, color: "#f97316" },
  { id: 3, name: "Valentina Rojas", role: "Jefe de Servicio", rifas: 38, streak: 4, avatar: null, color: "#eab308" },
  { id: 4, name: "Diego Fuentes", role: "Voluntario", rifas: 33, streak: 2, avatar: null, color: "#22c55e" },
  { id: 5, name: "Camila Torres", role: "Jefe de Oración", rifas: 29, streak: 3, avatar: null, color: "#06b6d4" },
  { id: 6, name: "Nicolás Vargas", role: "Voluntario", rifas: 25, streak: 1, avatar: null, color: "#3b82f6" },
  { id: 7, name: "Isidora Pinto", role: "Voluntario", rifas: 22, streak: 2, avatar: null, color: "#8b5cf6" },
  { id: 8, name: "Tomás Reyes", role: "Voluntario", rifas: 18, streak: 0, avatar: null, color: "#ec4899" },
  { id: 9, name: "Antonia Soto", role: "Voluntario", rifas: 15, streak: 1, avatar: null, color: "#14b8a6" },
  { id: 10, name: "Benjamín Castro", role: "Voluntario", rifas: 12, streak: 0, avatar: null, color: "#f59e0b" },
  { id: 11, name: "Catalina López", role: "Voluntario", rifas: 8, streak: 0, avatar: null, color: "#84cc16" },
  { id: 12, name: "Sebastián Muñoz", role: "Voluntario", rifas: 5, streak: 0, avatar: null, color: "#a78bfa" },
];

const initialTransactions = [
  { id: 1, date: "2025-05-10", type: "Ingreso", category: "Rifas", description: "Venta rifas primera semana", amount: 240000 },
  { id: 2, date: "2025-05-14", type: "Gasto",   category: "Transporte", description: "Micro sector norte", amount: 25000 },
  { id: 3, date: "2025-05-18", type: "Ingreso", category: "Donación", description: "Donación anónima", amount: 80000 },
  { id: 4, date: "2025-05-22", type: "Gasto",   category: "Materiales", description: "Impresión folletos", amount: 18000 },
  { id: 5, date: "2025-05-26", type: "Ingreso", category: "Rifas", description: "Venta rifas segunda semana", amount: 380000 },
  { id: 6, date: "2025-05-30", type: "Gasto",   category: "Alimentación", description: "Almuerzo reunión", amount: 32000 },
  { id: 7, date: "2025-06-02", type: "Ingreso", category: "Actividad", description: "Bingo solidario", amount: 120000 },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const fmtCLP = (n) => n.toLocaleString("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 });

const getUnlockedBadges = (rifas) => BADGES.filter(b => rifas >= b.req);
const getHighestBadge = (rifas) => {
  const unlocked = getUnlockedBadges(rifas);
  return unlocked[unlocked.length - 1] || null;
};
const getNextBadge = (rifas) => BADGES.find(b => rifas < b.req) || null;

const getInitials = (name) => name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();

const ROLE_COLORS = {
  "Voluntario": "#3b82f6",
  "Jefe de Finanzas": "#f59e0b",
  "Jefe de Servicio": "#22c55e",
  "Jefe de Oración": "#8b5cf6",
  "Jefe de Zona": "#ef4444",
};

// ─── AVATAR COMPONENT ─────────────────────────────────────────────────────────

const Avatar = ({ volunteer, size = 48 }) => {
  const initials = getInitials(volunteer.name);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${volunteer.color}cc, ${volunteer.color})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, fontWeight: 800, color: "white",
      fontFamily: "'Nunito', sans-serif",
      boxShadow: `0 2px 12px ${volunteer.color}55`,
      flexShrink: 0,
      border: `2px solid ${volunteer.color}88`,
    }}>
      {initials}
    </div>
  );
};

// ─── BADGE TOOLTIP ────────────────────────────────────────────────────────────

const BadgeWithTooltip = ({ badge, rifas, size = 44 }) => {
  const [hover, setHover] = useState(false);
  const locked = rifas < badge.req;
  const Comp = badge.component;
  return (
    <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 4 }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{ cursor: "pointer", transition: "transform 0.2s", transform: hover ? "scale(1.12)" : "scale(1)" }}>
        <Comp size={size} locked={locked} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: locked ? "#888" : badge.color, fontFamily: "'Nunito', sans-serif" }}>
        {rifas >= badge.req ? `${badge.req}/${badge.req}` : `${rifas}/${badge.req}`}
      </span>
      {hover && (
        <div style={{
          position: "absolute", bottom: "110%", left: "50%", transform: "translateX(-50%)",
          background: "rgba(15,20,35,0.95)", border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 10, padding: "8px 12px", minWidth: 160, zIndex: 100,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)", textAlign: "center",
          backdropFilter: "blur(12px)",
        }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: locked ? "#aaa" : badge.color, fontFamily: "'Nunito', sans-serif" }}>{badge.name}</div>
          <div style={{ fontSize: 11, color: "#bbb", marginTop: 2, fontFamily: "'Nunito', sans-serif" }}>Requiere {badge.req} rifas</div>
          <div style={{
            marginTop: 4, fontSize: 11, fontWeight: 700, fontFamily: "'Nunito', sans-serif",
            color: locked ? "#ef4444" : "#22c55e",
            background: locked ? "rgba(239,68,68,0.12)" : "rgba(34,197,94,0.12)",
            borderRadius: 6, padding: "2px 8px", display: "inline-block"
          }}>
            {locked ? "🔒 Pendiente" : "✅ Obtenida"}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── ROADMAP VAN ──────────────────────────────────────────────────────────────

const RoadmapVan = ({ progress }) => {
  const totalKm = 142;
  const kmDone = Math.round((progress / 100) * totalKm);
  const vanLeft = `${Math.min(progress, 92)}%`;

  return (
    <div style={{
      background: "linear-gradient(135deg, #1a2744 0%, #0f172a 100%)",
      borderRadius: 20, padding: "28px 24px 20px",
      border: "1px solid rgba(255,210,60,0.15)",
      boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Stars bg */}
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          top: `${Math.random() * 60}%`, left: `${(i / 20) * 100}%`,
          width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2,
          borderRadius: "50%", background: "rgba(255,255,255,0.6)",
          animation: "twinkle 2s infinite", animationDelay: `${i * 0.1}s`,
        }} />
      ))}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#f5a623", letterSpacing: 2, fontFamily: "'Nunito', sans-serif", textTransform: "uppercase" }}>
            🚐 Ruta Misión
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "white", fontFamily: "'Nunito', sans-serif", marginTop: 2 }}>
            Camino a Villa La Cruz
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#f5a623", fontFamily: "'Nunito', sans-serif" }}>{kmDone} km</div>
          <div style={{ fontSize: 11, color: "#888", fontFamily: "'Nunito', sans-serif" }}>de {totalKm} km</div>
        </div>
      </div>

      {/* Road SVG */}
      <div style={{ position: "relative", height: 110, marginBottom: 8 }}>
        <svg viewBox="0 0 700 110" style={{ width: "100%", height: "100%" }} preserveAspectRatio="none">
          {/* Sky gradient */}
          <defs>
            <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e3a5f" />
            </linearGradient>
            <linearGradient id="road" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f5a623" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
          <rect width="700" height="110" fill="url(#sky)" />

          {/* Mountains */}
          <path d="M0 85 L80 30 L160 70 L240 20 L320 60 L400 15 L480 55 L560 25 L640 65 L700 40 L700 110 L0 110 Z"
            fill="#1e3a5f" opacity="0.5" />
          <path d="M0 95 L60 55 L130 80 L200 45 L280 78 L360 38 L440 72 L530 42 L620 78 L700 55 L700 110 L0 110 Z"
            fill="#162d48" opacity="0.7" />

          {/* Road - winding path */}
          <path d="M30 108 C100 100 200 90 300 85 C400 80 500 82 600 78 C640 76 670 74 690 72"
            stroke="#555" strokeWidth="18" fill="none" strokeLinecap="round" />
          <path d="M30 108 C100 100 200 90 300 85 C400 80 500 82 600 78 C640 76 670 74 690 72"
            stroke="url(#road)" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.9" />

          {/* Road dashes */}
          <path d="M30 108 C100 100 200 90 300 85 C400 80 500 82 600 78 C640 76 670 74 690 72"
            stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round"
            strokeDasharray="20,15" />

          {/* Destination flag */}
          <line x1="688" y1="72" x2="688" y2="40" stroke="#ef4444" strokeWidth="2" />
          <polygon points="688,40 705,48 688,56" fill="#ef4444" />
          <text x="672" y="32" fill="white" fontSize="8" fontFamily="Nunito" textAnchor="middle">Villa</text>
          <text x="672" y="22" fill="white" fontSize="8" fontFamily="Nunito" textAnchor="middle">La Cruz</text>

          {/* Start marker */}
          <circle cx="30" cy="108" r="5" fill="#f5a623" />
        </svg>

        {/* Van animated */}
        <div style={{
          position: "absolute",
          bottom: 8,
          left: vanLeft,
          transform: "translateX(-50%)",
          transition: "left 1.5s cubic-bezier(.4,0,.2,1)",
          zIndex: 10,
        }}>
          <svg width="46" height="32" viewBox="0 0 46 32">
            {/* Body */}
            <rect x="2" y="8" width="38" height="18" rx="4" fill="#f5a623" />
            <rect x="2" y="8" width="14" height="18" rx="3" fill="#fffbe8" />
            {/* Windows */}
            <rect x="5" y="10" width="10" height="8" rx="2" fill="#93c5fd" opacity="0.8" />
            <rect x="20" y="10" width="8" height="8" rx="2" fill="#93c5fd" opacity="0.8" />
            <rect x="30" y="10" width="7" height="8" rx="2" fill="#93c5fd" opacity="0.8" />
            {/* Cross on body */}
            <rect x="23" y="20" width="2" height="5" rx="0.5" fill="white" opacity="0.7" />
            <rect x="21" y="22" width="6" height="2" rx="0.5" fill="white" opacity="0.7" />
            {/* Wheels */}
            <circle cx="10" cy="27" r="5" fill="#1e293b" />
            <circle cx="10" cy="27" r="2.5" fill="#64748b" />
            <circle cx="32" cy="27" r="5" fill="#1e293b" />
            <circle cx="32" cy="27" r="2.5" fill="#64748b" />
            {/* Bumper */}
            <rect x="38" y="16" width="6" height="8" rx="2" fill="#e8941a" />
            {/* Headlight */}
            <circle cx="40" cy="15" r="2" fill="#fef9c3" opacity="0.9" />
          </svg>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 11, color: "#64748b", fontFamily: "'Nunito', sans-serif" }}>🏁 Inicio</div>
        <div style={{
          fontSize: 12, fontWeight: 700, color: "#f5a623",
          background: "rgba(245,166,35,0.12)", borderRadius: 8, padding: "3px 10px",
          fontFamily: "'Nunito', sans-serif",
        }}>
          {progress.toFixed(1)}% completado — {kmDone}/{totalKm} km
        </div>
        <div style={{ fontSize: 11, color: "#64748b", fontFamily: "'Nunito', sans-serif" }}>🏘️ Villa La Cruz</div>
      </div>
    </div>
  );
};

// ─── RECENT BADGES ─────────────────────────────────────────────────────────────

const RecentBadges = ({ volunteers }) => {
  const recentAchievements = [];
  const sorted = [...volunteers].sort((a, b) => b.rifas - a.rifas);
  sorted.forEach(v => {
    const badges = getUnlockedBadges(v.rifas);
    if (badges.length > 0) {
      const latest = badges[badges.length - 1];
      recentAchievements.push({ volunteer: v, badge: latest });
    }
  });
  const recent = recentAchievements.slice(0, 6);

  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", borderRadius: 20,
      border: "1px solid rgba(255,255,255,0.08)", padding: "20px 24px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 18 }}>🏆</span>
        <span style={{ fontSize: 16, fontWeight: 800, color: "white", fontFamily: "'Nunito', sans-serif" }}>
          Últimos Logros
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {recent.map(({ volunteer, badge }, i) => {
          const BadgeComp = badge.component;
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "rgba(255,255,255,0.05)", borderRadius: 12,
              padding: "8px 12px", border: `1px solid ${badge.color}33`,
              minWidth: 200, flex: "1 1 200px",
            }}>
              <BadgeComp size={32} locked={false} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "white", fontFamily: "'Nunito', sans-serif" }}>
                  {volunteer.name.split(" ")[0]}
                </div>
                <div style={{ fontSize: 11, color: badge.color, fontFamily: "'Nunito', sans-serif" }}>
                  {badge.name}
                </div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <span style={{ fontSize: 10, color: "#888", fontFamily: "'Nunito', sans-serif" }}>
                  {volunteer.rifas} rifas
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── VOLUNTEER CARD ───────────────────────────────────────────────────────────

const VolunteerCard = ({ volunteer, rank, onClick }) => {
  const highBadge = getHighestBadge(volunteer.rifas);
  const nextBadge = getNextBadge(volunteer.rifas);
  const HighComp = highBadge?.component;

  return (
    <div onClick={() => onClick(volunteer)} style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20, padding: 20, cursor: "pointer",
      transition: "all 0.25s",
      position: "relative", overflow: "hidden",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.border = `1px solid ${volunteer.color}55`;
        e.currentTarget.style.background = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = `0 12px 40px ${volunteer.color}25`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Rank badge */}
      <div style={{
        position: "absolute", top: 12, left: 12,
        width: 28, height: 28, borderRadius: "50%",
        background: rank <= 3 ? ["#ffd700","#c0c0c0","#cd7f32"][rank-1] + "33" : "rgba(255,255,255,0.1)",
        border: `1.5px solid ${rank <= 3 ? ["#ffd700","#c0c0c0","#cd7f32"][rank-1] : "rgba(255,255,255,0.2)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, fontWeight: 900, color: rank <= 3 ? ["#ffd700","#c0c0c0","#cd7f32"][rank-1] : "#888",
        fontFamily: "'Nunito', sans-serif",
      }}>
        {rank <= 3 ? ["🥇","🥈","🥉"][rank-1] : `#${rank}`}
      </div>

      {/* Streak */}
      {volunteer.streak > 0 && (
        <div style={{
          position: "absolute", top: 12, right: 12,
          background: "rgba(251,146,60,0.15)", border: "1px solid rgba(251,146,60,0.3)",
          borderRadius: 8, padding: "2px 8px", display: "flex", alignItems: "center", gap: 4,
        }}>
          <span style={{ fontSize: 13 }}>🔥</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#fb923c", fontFamily: "'Nunito', sans-serif" }}>
            {volunteer.streak}
          </span>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginTop: 16 }}>
        <Avatar volunteer={volunteer} size={72} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: "white", fontFamily: "'Nunito', sans-serif" }}>
            {volunteer.name}
          </div>
          <div style={{
            fontSize: 11, fontWeight: 700, color: ROLE_COLORS[volunteer.role] || "#888",
            background: `${ROLE_COLORS[volunteer.role]}18`, borderRadius: 6,
            padding: "2px 10px", marginTop: 4, display: "inline-block",
            fontFamily: "'Nunito', sans-serif",
          }}>
            {volunteer.role}
          </div>
        </div>
        <div style={{ fontSize: 28, fontWeight: 900, color: volunteer.color, fontFamily: "'Nunito', sans-serif" }}>
          {volunteer.rifas}
        </div>
        <div style={{ fontSize: 11, color: "#888", fontFamily: "'Nunito', sans-serif", marginTop: -8 }}>
          rifas vendidas
        </div>

        {/* Badges row */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4 }}>
          {BADGES.map(badge => {
            const locked = volunteer.rifas < badge.req;
            const Comp = badge.component;
            return <Comp key={badge.id} size={28} locked={locked} />;
          })}
        </div>

        {/* Next badge progress */}
        {nextBadge && (
          <div style={{ width: "100%", marginTop: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 10, color: "#888", fontFamily: "'Nunito', sans-serif" }}>
                Próximo: {nextBadge.name}
              </span>
              <span style={{ fontSize: 10, color: nextBadge.color, fontFamily: "'Nunito', sans-serif" }}>
                {volunteer.rifas}/{nextBadge.req}
              </span>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 4 }}>
              <div style={{
                height: "100%", borderRadius: 4,
                width: `${(volunteer.rifas / nextBadge.req) * 100}%`,
                background: `linear-gradient(90deg, ${nextBadge.color}, ${nextBadge.color}aa)`,
                transition: "width 1s",
              }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── VOLUNTEER MODAL ──────────────────────────────────────────────────────────

const VolunteerModal = ({ volunteer, rank, onClose }) => {
  if (!volunteer) return null;
  const nextBadge = getNextBadge(volunteer.rifas);
  const prevBadge = getHighestBadge(volunteer.rifas);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: 20, backdropFilter: "blur(8px)",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "linear-gradient(145deg, #1a2744, #0f172a)",
        borderRadius: 24, padding: "32px 28px", maxWidth: 480, width: "100%",
        border: `1px solid ${volunteer.color}44`,
        boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 60px ${volunteer.color}15`,
        maxHeight: "90vh", overflowY: "auto",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Avatar volunteer={volunteer} size={72} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "white", fontFamily: "'Nunito', sans-serif" }}>
                {volunteer.name}
              </div>
              <div style={{
                fontSize: 12, fontWeight: 700, color: ROLE_COLORS[volunteer.role],
                background: `${ROLE_COLORS[volunteer.role]}18`, borderRadius: 8,
                padding: "3px 12px", marginTop: 4, display: "inline-block",
                fontFamily: "'Nunito', sans-serif",
              }}>
                {volunteer.role}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.08)", border: "none", color: "#888",
            borderRadius: 10, width: 36, height: 36, cursor: "pointer", fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>×</button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Rifas", value: volunteer.rifas, color: volunteer.color },
            { label: "Ranking", value: `#${rank}`, color: rank <= 3 ? ["#ffd700","#c0c0c0","#cd7f32"][rank-1] : "#888" },
            { label: "Racha", value: `${volunteer.streak}🔥`, color: "#fb923c" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "14px 0",
              textAlign: "center", border: `1px solid ${s.color}22`,
            }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: s.color, fontFamily: "'Nunito', sans-serif" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: "#888", fontFamily: "'Nunito', sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#888", marginBottom: 12, fontFamily: "'Nunito', sans-serif", letterSpacing: 1, textTransform: "uppercase" }}>
            🏅 Logros
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
            {BADGES.map(badge => (
              <BadgeWithTooltip key={badge.id} badge={badge} rifas={volunteer.rifas} size={44} />
            ))}
          </div>
        </div>

        {/* Next badge progress */}
        {nextBadge && (
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "white", fontFamily: "'Nunito', sans-serif" }}>
                Próxima: {nextBadge.name}
              </span>
              <span style={{ fontSize: 13, color: nextBadge.color, fontFamily: "'Nunito', sans-serif" }}>
                {volunteer.rifas}/{nextBadge.req}
              </span>
            </div>
            <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 8 }}>
              <div style={{
                height: "100%", borderRadius: 8,
                width: `${(volunteer.rifas / nextBadge.req) * 100}%`,
                background: `linear-gradient(90deg, ${nextBadge.color}aa, ${nextBadge.color})`,
                transition: "width 1s", boxShadow: `0 0 12px ${nextBadge.color}66`,
              }} />
            </div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 6, fontFamily: "'Nunito', sans-serif", textAlign: "right" }}>
              Faltan {nextBadge.req - volunteer.rifas} rifas para {nextBadge.name}
            </div>
          </div>
        )}
        {!nextBadge && (
          <div style={{
            background: "linear-gradient(135deg, rgba(245,166,35,0.15), rgba(218,165,32,0.08))",
            borderRadius: 14, padding: 16, textAlign: "center",
            border: "1px solid rgba(245,166,35,0.3)",
          }}>
            <div style={{ fontSize: 28 }}>⭐</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#ffd700", fontFamily: "'Nunito', sans-serif" }}>
              ¡Todas las insignias desbloqueadas!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── ADMIN LOGIN ───────────────────────────────────────────────────────────────

const AdminLogin = ({ onLogin, onClose }) => {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const handle = () => {
    if (pw === "mision2025") { onLogin(); }
    else { setErr(true); setTimeout(() => setErr(false), 2000); }
  };
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 2000, backdropFilter: "blur(12px)",
    }}>
      <div style={{
        background: "linear-gradient(145deg, #1a2744, #0f172a)",
        borderRadius: 24, padding: 40, width: 360,
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔐</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "white", fontFamily: "'Nunito', sans-serif" }}>
            Panel Admin
          </div>
          <div style={{ fontSize: 13, color: "#888", fontFamily: "'Nunito', sans-serif" }}>
            Misión de Vida · San Alberto Hurtado
          </div>
        </div>
        <input
          type="password"
          placeholder="Contraseña"
          value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handle()}
          style={{
            width: "100%", padding: "12px 16px", borderRadius: 12,
            background: err ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.07)",
            border: `1.5px solid ${err ? "#ef4444" : "rgba(255,255,255,0.15)"}`,
            color: "white", fontSize: 15, outline: "none",
            fontFamily: "'Nunito', sans-serif", boxSizing: "border-box",
            transition: "border-color 0.2s",
          }}
        />
        {err && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 6, fontFamily: "'Nunito', sans-serif" }}>
          Contraseña incorrecta
        </div>}
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "12px 0", borderRadius: 12,
            background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#aaa", fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito', sans-serif",
            fontSize: 14,
          }}>Cancelar</button>
          <button onClick={handle} style={{
            flex: 1, padding: "12px 0", borderRadius: 12,
            background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
            border: "none", color: "white", fontWeight: 800, cursor: "pointer",
            fontFamily: "'Nunito', sans-serif", fontSize: 14,
            boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
          }}>Ingresar</button>
        </div>
        <div style={{ marginTop: 16, textAlign: "center", fontSize: 11, color: "#555", fontFamily: "'Nunito', sans-serif" }}>
          PAGINA SOLO PARA LOS ADMINISTRADORES
        </div>
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("inicio");
  const [darkMode] = useState(true);
  const [volunteers, setVolunteers] = useState(initialVolunteers);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [meta, setMeta] = useState(1200000);
  const [selectedVol, setSelectedVol] = useState(null);
  const [selectedVolRank, setSelectedVolRank] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [editingVol, setEditingVol] = useState(null);
  const [editingTx, setEditingTx] = useState(null);
  const [showAddVol, setShowAddVol] = useState(false);
  const [showAddTx, setShowAddTx] = useState(false);

  // Calculate financials from transactions
  const totalIngresos = transactions.filter(t => t.type === "Ingreso").reduce((s, t) => s + t.amount, 0);
  const totalGastos = transactions.filter(t => t.type === "Gasto").reduce((s, t) => s + t.amount, 0);
  const balance = totalIngresos - totalGastos;
  const progress = Math.min((balance / meta) * 100, 100);

  const sortedVols = [...volunteers].sort((a, b) => b.rifas - a.rifas);
  const totalRifas = volunteers.reduce((s, v) => s + v.rifas, 0);

  const openVolunteer = (v) => {
    const rank = sortedVols.findIndex(sv => sv.id === v.id) + 1;
    setSelectedVol(v);
    setSelectedVolRank(rank);
  };

  // ── STYLES ────────────────────────────────────────────────────────────────

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
    background: "rgba(10,15,28,0.92)", backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 24px", height: 60,
  };

  const navBtn = (p) => ({
    padding: "6px 16px", borderRadius: 10, border: "none", cursor: "pointer",
    fontSize: 13, fontWeight: 700, fontFamily: "'Nunito', sans-serif",
    background: page === p ? "rgba(37,99,235,0.25)" : "transparent",
    color: page === p ? "#60a5fa" : "#888",
    border: page === p ? "1px solid rgba(37,99,235,0.4)" : "1px solid transparent",
    transition: "all 0.2s",
  });

  const cardStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20, padding: "20px 24px",
  };

  const sectionTitle = {
    fontSize: 22, fontWeight: 900, color: "white",
    fontFamily: "'Nunito', sans-serif", marginBottom: 20,
  };

  // ── FORM STATES ───────────────────────────────────────────────────────────

  const [volForm, setVolForm] = useState({ name: "", role: "Voluntario", rifas: 0, streak: 0 });
  const [txForm, setTxForm] = useState({ date: "", type: "Ingreso", category: "Rifas", description: "", amount: 0 });

  const saveVol = () => {
    if (editingVol) {
      setVolunteers(vs => vs.map(v => v.id === editingVol.id ? { ...v, ...volForm, rifas: Number(volForm.rifas), streak: Number(volForm.streak) } : v));
    } else {
      const colors = ["#f43f5e","#f97316","#eab308","#22c55e","#06b6d4","#3b82f6","#8b5cf6","#ec4899"];
      setVolunteers(vs => [...vs, { ...volForm, id: Date.now(), rifas: Number(volForm.rifas), streak: Number(volForm.streak), avatar: null, color: colors[Math.floor(Math.random() * colors.length)] }]);
    }
    setEditingVol(null); setShowAddVol(false);
    setVolForm({ name: "", role: "Voluntario", rifas: 0, streak: 0 });
  };

  const saveTx = () => {
    if (editingTx) {
      setTransactions(ts => ts.map(t => t.id === editingTx.id ? { ...t, ...txForm, amount: Number(txForm.amount) } : t));
    } else {
      setTransactions(ts => [...ts, { ...txForm, id: Date.now(), amount: Number(txForm.amount) }]);
    }
    setEditingTx(null); setShowAddTx(false);
    setTxForm({ date: "", type: "Ingreso", category: "Rifas", description: "", amount: 0 });
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 10,
    background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.12)",
    color: "white", fontSize: 14, outline: "none", fontFamily: "'Nunito', sans-serif",
    boxSizing: "border-box",
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #050d1f 0%, #0a1628 50%, #060e20 100%)",
      color: "white", fontFamily: "'Nunito', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a1628; }
        ::-webkit-scrollbar-thumb { background: #1e3a8a; border-radius: 4px; }
        @keyframes twinkle { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes progressFill { from { width: 0%; } to { width: var(--target-width); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
        .page-anim { animation: fadeIn 0.4s ease; }
        .hover-row:hover { background: rgba(255,255,255,0.06) !important; }
      `}</style>

      {/* NAV */}
      <nav style={navStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: "linear-gradient(135deg, #1e3a8a, #f5a623)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>✝</div>
          <span style={{ fontSize: 14, fontWeight: 900, color: "white" }}>Misión de Vida</span>
          <span style={{ fontSize: 11, color: "#555", display: window.innerWidth < 640 ? "none" : "inline" }}>
            · San Alberto Hurtado
          </span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {["inicio","leaderboard","voluntarios","finanzas"].map(p => (
            <button key={p} style={navBtn(p)} onClick={() => setPage(p)}>
              {{"inicio":"🏠 Inicio","leaderboard":"🏆 Ranking","voluntarios":"👥 Voluntarios","finanzas":"💰 Finanzas"}[p]}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {isAdmin && (
            <button onClick={() => setShowAdminPanel(true)} style={{
              padding: "6px 14px", borderRadius: 10, background: "rgba(37,99,235,0.2)",
              border: "1px solid rgba(37,99,235,0.4)", color: "#60a5fa",
              fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}>⚙️ Admin</button>
          )}
          <button onClick={() => isAdmin ? setIsAdmin(false) : setShowLogin(true)} style={{
            padding: "6px 14px", borderRadius: 10,
            background: isAdmin ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.07)",
            border: `1px solid ${isAdmin ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.12)"}`,
            color: isAdmin ? "#f87171" : "#888",
            fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}>
            {isAdmin ? "🔓 Salir" : "🔑 Admin"}
          </button>
        </div>
      </nav>

      {/* LOGIN MODAL */}
      {showLogin && <AdminLogin onLogin={() => { setIsAdmin(true); setShowLogin(false); }} onClose={() => setShowLogin(false)} />}

      {/* VOLUNTEER MODAL */}
      {selectedVol && <VolunteerModal volunteer={selectedVol} rank={selectedVolRank} onClose={() => setSelectedVol(null)} />}

      {/* ADMIN PANEL MODAL */}
      {showAdminPanel && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(12px)", zIndex: 1500,
          display: "flex", flexDirection: "column",
        }}>
          <div style={{
            background: "linear-gradient(145deg, #1a2744, #0f172a)",
            height: "100%", overflowY: "auto", padding: 32,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
              <h2 style={{ margin: 0, color: "white", fontFamily: "'Nunito', sans-serif", fontSize: 24 }}>
                ⚙️ Panel de Administración
              </h2>
              <button onClick={() => setShowAdminPanel(false)} style={{
                background: "rgba(255,255,255,0.08)", border: "none", color: "#aaa",
                borderRadius: 12, padding: "8px 20px", cursor: "pointer",
                fontWeight: 700, fontFamily: "'Nunito', sans-serif",
              }}>✕ Cerrar</button>
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 16, marginBottom: 32 }}>
              {[
                { label: "Total Ingresos", value: fmtCLP(totalIngresos), color: "#22c55e" },
                { label: "Total Gastos", value: fmtCLP(totalGastos), color: "#ef4444" },
                { label: "Balance", value: fmtCLP(balance), color: balance >= 0 ? "#22c55e" : "#ef4444" },
                { label: "Rifas Totales", value: totalRifas, color: "#f5a623" },
                { label: "Promedio Rifas", value: (totalRifas / volunteers.length).toFixed(1), color: "#8b5cf6" },
              ].map((s, i) => (
                <div key={i} style={{ ...cardStyle, textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: s.color, fontFamily: "'Nunito', sans-serif" }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#888", fontFamily: "'Nunito', sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Meta setting */}
            <div style={{ ...cardStyle, marginBottom: 28 }}>
              <div style={{ fontWeight: 700, color: "#888", marginBottom: 8, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>
                Meta Económica
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <input type="number" value={meta} onChange={e => setMeta(Number(e.target.value))}
                  style={{ ...inputStyle, width: 200 }} />
                <span style={{ color: "#888", fontSize: 13 }}>CLP · Actualmente: {fmtCLP(meta)}</span>
              </div>
            </div>

            {/* Volunteer Management */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ margin: 0, color: "white", fontFamily: "'Nunito', sans-serif" }}>👥 Gestión de Voluntarios</h3>
                <button onClick={() => { setVolForm({ name: "", role: "Voluntario", rifas: 0, streak: 0 }); setEditingVol(null); setShowAddVol(true); }} style={{
                  padding: "8px 18px", borderRadius: 10, background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                  border: "none", color: "white", fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito', sans-serif",
                }}>+ Agregar Voluntario</button>
              </div>

              {(showAddVol || editingVol) && (
                <div style={{ ...cardStyle, marginBottom: 16, border: "1px solid rgba(37,99,235,0.3)" }}>
                  <h4 style={{ margin: "0 0 16px", color: "white", fontFamily: "'Nunito', sans-serif" }}>
                    {editingVol ? "✏️ Editar Voluntario" : "➕ Nuevo Voluntario"}
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <input placeholder="Nombre completo" value={volForm.name} onChange={e => setVolForm({...volForm, name: e.target.value})} style={inputStyle} />
                    <select value={volForm.role} onChange={e => setVolForm({...volForm, role: e.target.value})} style={{...inputStyle, appearance: "none"}}>
                      {["Voluntario","Jefe de Finanzas","Jefe de Servicio","Jefe de Oración","Jefe de Zona"].map(r => (
                        <option key={r} value={r} style={{ background: "#0f172a" }}>{r}</option>
                      ))}
                    </select>
                    <input type="number" placeholder="Rifas vendidas" value={volForm.rifas} onChange={e => setVolForm({...volForm, rifas: e.target.value})} style={inputStyle} />
                    <input type="number" placeholder="Racha (semanas)" value={volForm.streak} onChange={e => setVolForm({...volForm, streak: e.target.value})} style={inputStyle} />
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={saveVol} style={{ padding: "10px 24px", borderRadius: 10, background: "#22c55e22", border: "1px solid #22c55e55", color: "#22c55e", fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
                      💾 Guardar
                    </button>
                    <button onClick={() => { setEditingVol(null); setShowAddVol(false); }} style={{ padding: "10px 24px", borderRadius: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#aaa", fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                      {["#","Nombre","Cargo","Rifas","Racha","Acciones"].map(h => (
                        <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: "#888", fontFamily: "'Nunito', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedVols.map((v, i) => (
                      <tr key={v.id} className="hover-row" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "10px 14px", color: "#888", fontSize: 13, fontFamily: "'Nunito', sans-serif" }}>#{i+1}</td>
                        <td style={{ padding: "10px 14px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <Avatar volunteer={v} size={32} />
                            <span style={{ color: "white", fontSize: 14, fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>{v.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: "10px 14px" }}>
                          <span style={{ fontSize: 11, color: ROLE_COLORS[v.role], background: `${ROLE_COLORS[v.role]}18`, borderRadius: 6, padding: "2px 10px", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                            {v.role}
                          </span>
                        </td>
                        <td style={{ padding: "10px 14px", color: "#f5a623", fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>{v.rifas}</td>
                        <td style={{ padding: "10px 14px", color: "#fb923c", fontFamily: "'Nunito', sans-serif" }}>{v.streak > 0 ? `🔥 ${v.streak}` : "-"}</td>
                        <td style={{ padding: "10px 14px" }}>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={() => { setVolForm({ name: v.name, role: v.role, rifas: v.rifas, streak: v.streak }); setEditingVol(v); setShowAddVol(false); }} style={{ padding: "4px 12px", borderRadius: 8, background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", color: "#60a5fa", fontSize: 12, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
                              ✏️ Editar
                            </button>
                            <button onClick={() => setVolunteers(vs => vs.filter(x => x.id !== v.id))} style={{ padding: "4px 12px", borderRadius: 8, background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171", fontSize: 12, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Finance Management */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ margin: 0, color: "white", fontFamily: "'Nunito', sans-serif" }}>💰 Gestión Financiera</h3>
                <button onClick={() => { setTxForm({ date: new Date().toISOString().slice(0,10), type: "Ingreso", category: "Rifas", description: "", amount: 0 }); setEditingTx(null); setShowAddTx(true); }} style={{
                  padding: "8px 18px", borderRadius: 10, background: "linear-gradient(135deg, #065f46, #059669)",
                  border: "none", color: "white", fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito', sans-serif",
                }}>+ Agregar Movimiento</button>
              </div>

              {(showAddTx || editingTx) && (
                <div style={{ ...cardStyle, marginBottom: 16, border: "1px solid rgba(34,197,94,0.2)" }}>
                  <h4 style={{ margin: "0 0 16px", color: "white", fontFamily: "'Nunito', sans-serif" }}>
                    {editingTx ? "✏️ Editar Movimiento" : "➕ Nuevo Movimiento"}
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 12, marginBottom: 12 }}>
                    <input type="date" value={txForm.date} onChange={e => setTxForm({...txForm, date: e.target.value})} style={inputStyle} />
                    <select value={txForm.type} onChange={e => setTxForm({...txForm, type: e.target.value})} style={{...inputStyle, appearance: "none"}}>
                      <option value="Ingreso" style={{ background: "#0f172a" }}>Ingreso</option>
                      <option value="Gasto" style={{ background: "#0f172a" }}>Gasto</option>
                    </select>
                    <select value={txForm.category} onChange={e => setTxForm({...txForm, category: e.target.value})} style={{...inputStyle, appearance: "none"}}>
                      {(txForm.type === "Ingreso" ? ["Rifas","Donación","Actividad"] : ["Transporte","Materiales","Alimentación","Otros"]).map(c => (
                        <option key={c} value={c} style={{ background: "#0f172a" }}>{c}</option>
                      ))}
                    </select>
                    <input placeholder="Descripción" value={txForm.description} onChange={e => setTxForm({...txForm, description: e.target.value})} style={inputStyle} />
                    <input type="number" placeholder="Monto (CLP)" value={txForm.amount} onChange={e => setTxForm({...txForm, amount: e.target.value})} style={inputStyle} />
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={saveTx} style={{ padding: "10px 24px", borderRadius: 10, background: "#22c55e22", border: "1px solid #22c55e55", color: "#22c55e", fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
                      💾 Guardar
                    </button>
                    <button onClick={() => { setEditingTx(null); setShowAddTx(false); }} style={{ padding: "10px 24px", borderRadius: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#aaa", fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                      {["Fecha","Tipo","Categoría","Descripción","Monto","Acciones"].map(h => (
                        <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: "#888", fontFamily: "'Nunito', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...transactions].sort((a,b) => new Date(b.date) - new Date(a.date)).map(t => (
                      <tr key={t.id} className="hover-row" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "10px 14px", color: "#888", fontSize: 13, fontFamily: "'Nunito', sans-serif" }}>{t.date}</td>
                        <td style={{ padding: "10px 14px" }}>
                          <span style={{
                            fontSize: 12, fontWeight: 700, borderRadius: 6, padding: "2px 10px",
                            color: t.type === "Ingreso" ? "#22c55e" : "#ef4444",
                            background: t.type === "Ingreso" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                            fontFamily: "'Nunito', sans-serif",
                          }}>{t.type}</span>
                        </td>
                        <td style={{ padding: "10px 14px", color: "#aaa", fontSize: 13, fontFamily: "'Nunito', sans-serif" }}>{t.category}</td>
                        <td style={{ padding: "10px 14px", color: "white", fontSize: 13, fontFamily: "'Nunito', sans-serif" }}>{t.description}</td>
                        <td style={{ padding: "10px 14px", fontWeight: 800, fontFamily: "'Nunito', sans-serif", color: t.type === "Ingreso" ? "#22c55e" : "#ef4444" }}>
                          {t.type === "Gasto" ? "-" : "+"}{fmtCLP(t.amount)}
                        </td>
                        <td style={{ padding: "10px 14px" }}>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={() => { setTxForm({ date: t.date, type: t.type, category: t.category, description: t.description, amount: t.amount }); setEditingTx(t); setShowAddTx(false); }} style={{ padding: "4px 12px", borderRadius: 8, background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", color: "#60a5fa", fontSize: 12, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
                              ✏️
                            </button>
                            <button onClick={() => setTransactions(ts => ts.filter(x => x.id !== t.id))} style={{ padding: "4px 12px", borderRadius: 8, background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171", fontSize: 12, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── PAGE CONTENT ── */}
      <div style={{ paddingTop: 80, maxWidth: 1200, margin: "0 auto", padding: "80px 20px 40px" }}>

        {/* ── INICIO ── */}
        {page === "inicio" && (
          <div className="page-anim" style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Hero Banner */}
            <div style={{
              background: "linear-gradient(135deg, #1a2744 0%, #0f2060 50%, #1a1040 100%)",
              borderRadius: 28, padding: "40px 40px 32px",
              border: "1px solid rgba(37,99,235,0.2)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: 0, opacity: 0.06,
                backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }} />
              <div style={{ position: "relative" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#f5a623", letterSpacing: 3, marginBottom: 6, textTransform: "uppercase" }}>
                  ✝ Misión de Vida · Zona San Alberto Hurtado · Villa La Cruz
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-end", marginBottom: 28 }}>
                  <div>
                    <div style={{ fontSize: 48, fontWeight: 900, color: "white", lineHeight: 1, fontFamily: "'Nunito', sans-serif" }}>
                      {balance >= meta
                        ? `¡Superamos la meta!`
                        : `Vamos en ${fmtCLP(balance)}`}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 700, marginTop: 6, fontFamily: "'Nunito', sans-serif",
                      color: balance >= meta ? "#22c55e" : "#f5a623" }}>
                      {balance >= meta
                        ? `Superamos por ${fmtCLP(balance - meta)} 🎉`
                        : `Faltan ${fmtCLP(meta - balance)}`}
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <div style={{ fontSize: 13, color: "#888", fontFamily: "'Nunito', sans-serif" }}>Meta total</div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: "#60a5fa", fontFamily: "'Nunito', sans-serif" }}>
                      {fmtCLP(meta)}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: "#888", fontFamily: "'Nunito', sans-serif" }}>Progreso hacia la meta</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#60a5fa", fontFamily: "'Nunito', sans-serif" }}>
                      {progress.toFixed(1)}%
                    </span>
                  </div>
                  <div style={{ height: 16, background: "rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 12,
                      width: `${progress}%`,
                      background: progress >= 100
                        ? "linear-gradient(90deg, #22c55e, #16a34a)"
                        : "linear-gradient(90deg, #1e3a8a, #3b82f6, #60a5fa)",
                      transition: "width 1.5s cubic-bezier(.4,0,.2,1)",
                      boxShadow: "0 0 20px rgba(96,165,250,0.4)",
                      position: "relative",
                    }}>
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        animation: "shimmer 2s infinite",
                      }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontSize: 11, color: "#555", fontFamily: "'Nunito', sans-serif" }}>$0</span>
                    <span style={{ fontSize: 11, color: "#555", fontFamily: "'Nunito', sans-serif" }}>{fmtCLP(meta)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 16 }}>
              {[
                { label: "Total Ingresos", value: fmtCLP(totalIngresos), icon: "📈", color: "#22c55e" },
                { label: "Total Gastos", value: fmtCLP(totalGastos), icon: "📉", color: "#ef4444" },
                { label: "Rifas Totales", value: totalRifas, icon: "🎟️", color: "#f5a623" },
                { label: "Voluntarios", value: volunteers.length, icon: "👥", color: "#8b5cf6" },
                { label: "En Racha 🔥", value: volunteers.filter(v => v.streak > 0).length, icon: "🔥", color: "#fb923c" },
              ].map((s, i) => (
                <div key={i} style={{
                  ...cardStyle, textAlign: "center",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = `${s.color}44`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <div style={{ fontSize: 26, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: s.color, fontFamily: "'Nunito', sans-serif" }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#888", fontFamily: "'Nunito', sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Roadmap */}
            <RoadmapVan progress={progress} />

            {/* Recent badges */}
            <RecentBadges volunteers={volunteers} />

            {/* Top 3 preview */}
            <div style={cardStyle}>
              <div style={{ ...sectionTitle, fontSize: 18 }}>🥇 Top Vendedores</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {sortedVols.slice(0, 5).map((v, i) => {
                  const pct = (v.rifas / (sortedVols[0]?.rifas || 1)) * 100;
                  const medals = ["🥇","🥈","🥉"];
                  return (
                    <div key={v.id} onClick={() => openVolunteer(v)} style={{
                      display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
                      padding: "8px 12px", borderRadius: 12, transition: "background 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <div style={{ fontSize: 22, width: 28, textAlign: "center" }}>{medals[i] || `#${i+1}`}</div>
                      <Avatar volunteer={v} size={40} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "white", fontFamily: "'Nunito', sans-serif" }}>{v.name}</div>
                        <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 4, marginTop: 4, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${v.color}aa, ${v.color})`, borderRadius: 4 }} />
                        </div>
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: v.color, fontFamily: "'Nunito', sans-serif" }}>{v.rifas}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── LEADERBOARD ── */}
        {page === "leaderboard" && (
          <div className="page-anim">
            <h1 style={{ ...sectionTitle, fontSize: 28 }}>🏆 Leaderboard de Rifas</h1>

            {/* Bar chart */}
            <div style={{ ...cardStyle, marginBottom: 24 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#888", marginBottom: 16, fontFamily: "'Nunito', sans-serif" }}>
                Rifas vendidas por voluntario
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={sortedVols} margin={{ top: 0, right: 10, bottom: 40, left: 0 }}>
                  <XAxis dataKey="name" tick={{ fill: "#888", fontSize: 11, fontFamily: "Nunito" }}
                    angle={-35} textAnchor="end" interval={0} />
                  <YAxis tick={{ fill: "#888", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontFamily: "Nunito" }}
                    labelStyle={{ color: "white", fontWeight: 700 }}
                    itemStyle={{ color: "#60a5fa" }}
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  />
                  <Bar dataKey="rifas" radius={[6, 6, 0, 0]} onClick={v => openVolunteer(v)}>
                    {sortedVols.map((v, i) => (
                      <Cell key={i} fill={v.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Leaderboard table */}
            <div style={cardStyle}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                      {["Pos","Perfil","Nombre","Cargo","Rifas","Racha","Mejor Insignia"].map(h => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, color: "#888", fontFamily: "'Nunito', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedVols.map((v, i) => {
                      const highBadge = getHighestBadge(v.rifas);
                      const HighComp = highBadge?.component;
                      const topColors = { 0: "rgba(255,215,0,0.06)", 1: "rgba(192,192,192,0.06)", 2: "rgba(205,127,50,0.06)" };
                      return (
                        <tr key={v.id} className="hover-row" onClick={() => openVolunteer(v)}
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                            background: topColors[i] || "transparent",
                            cursor: "pointer", transition: "background 0.2s",
                          }}>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ fontSize: 20 }}>{["🥇","🥈","🥉"][i] || ""}</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "#888", marginLeft: 4, fontFamily: "'Nunito', sans-serif" }}>
                              #{i+1}
                            </span>
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            <Avatar volunteer={v} size={40} />
                          </td>
                          <td style={{ padding: "12px 16px", color: "white", fontWeight: 700, fontSize: 14, fontFamily: "'Nunito', sans-serif" }}>{v.name}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ fontSize: 11, color: ROLE_COLORS[v.role], background: `${ROLE_COLORS[v.role]}18`, borderRadius: 6, padding: "2px 10px", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                              {v.role}
                            </span>
                          </td>
                          <td style={{ padding: "12px 16px", fontWeight: 900, fontSize: 18, color: v.color, fontFamily: "'Nunito', sans-serif" }}>{v.rifas}</td>
                          <td style={{ padding: "12px 16px", color: "#fb923c", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                            {v.streak > 0 ? `🔥 ${v.streak}` : <span style={{ color: "#555" }}>—</span>}
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            {highBadge ? <HighComp size={36} locked={false} /> : <span style={{ color: "#555", fontSize: 12, fontFamily: "'Nunito', sans-serif" }}>Sin insignia</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── VOLUNTARIOS ── */}
        {page === "voluntarios" && (
          <div className="page-anim">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h1 style={{ ...sectionTitle, margin: 0 }}>👥 Voluntarios</h1>
              <div style={{ fontSize: 13, color: "#888", fontFamily: "'Nunito', sans-serif" }}>
                {volunteers.length} voluntarios · {totalRifas} rifas totales
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 20 }}>
              {sortedVols.map((v, i) => (
                <VolunteerCard key={v.id} volunteer={v} rank={i + 1} onClick={openVolunteer} />
              ))}
            </div>
          </div>
        )}

        {/* ── FINANZAS ── */}
        {page === "finanzas" && (
          <div className="page-anim">
            <h1 style={{ ...sectionTitle, fontSize: 28 }}>💰 Finanzas</h1>

            {/* Summary cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 16, marginBottom: 24 }}>
              {[
                { label: "Total Ingresos", value: fmtCLP(totalIngresos), color: "#22c55e", icon: "📈", bg: "rgba(34,197,94,0.08)" },
                { label: "Total Gastos", value: fmtCLP(totalGastos), color: "#ef4444", icon: "📉", bg: "rgba(239,68,68,0.08)" },
                { label: "Balance", value: fmtCLP(balance), color: balance >= 0 ? "#22c55e" : "#ef4444", icon: "⚖️", bg: "rgba(255,255,255,0.04)" },
                { label: "Meta", value: fmtCLP(meta), color: "#60a5fa", icon: "🎯", bg: "rgba(37,99,235,0.08)" },
              ].map((s, i) => (
                <div key={i} style={{
                  ...cardStyle, background: s.bg,
                  border: `1px solid ${s.color}22`,
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: s.color, fontFamily: "'Nunito', sans-serif" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#888", fontFamily: "'Nunito', sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Progress toward meta */}
            <div style={{ ...cardStyle, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontWeight: 700, color: "white", fontFamily: "'Nunito', sans-serif" }}>Progreso hacia la meta</span>
                <span style={{ color: "#60a5fa", fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>{progress.toFixed(1)}%</span>
              </div>
              <div style={{ height: 12, background: "rgba(255,255,255,0.07)", borderRadius: 8, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 8, width: `${progress}%`,
                  background: "linear-gradient(90deg, #1e3a8a, #3b82f6)",
                  boxShadow: "0 0 16px rgba(96,165,250,0.4)",
                  transition: "width 1s",
                }} />
              </div>
            </div>

            {/* Transactions table */}
            <div style={cardStyle}>
              <div style={{ fontWeight: 700, color: "#888", marginBottom: 16, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Nunito', sans-serif" }}>
                Movimientos Financieros
              </div>
              {!isAdmin && (
                <div style={{ marginBottom: 12, fontSize: 12, color: "#555", fontFamily: "'Nunito', sans-serif" }}>
                  🔒 Solo el administrador puede agregar o editar movimientos
                </div>
              )}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                      {["Fecha","Tipo","Categoría","Descripción","Monto"].map(h => (
                        <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: "#888", fontFamily: "'Nunito', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...transactions].sort((a,b) => new Date(b.date) - new Date(a.date)).map(t => (
                      <tr key={t.id} className="hover-row" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "10px 14px", color: "#888", fontSize: 13, fontFamily: "'Nunito', sans-serif" }}>{t.date}</td>
                        <td style={{ padding: "10px 14px" }}>
                          <span style={{
                            fontSize: 12, fontWeight: 700, borderRadius: 6, padding: "2px 10px",
                            color: t.type === "Ingreso" ? "#22c55e" : "#ef4444",
                            background: t.type === "Ingreso" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                            fontFamily: "'Nunito', sans-serif",
                          }}>{t.type}</span>
                        </td>
                        <td style={{ padding: "10px 14px", color: "#aaa", fontSize: 13, fontFamily: "'Nunito', sans-serif" }}>{t.category}</td>
                        <td style={{ padding: "10px 14px", color: "white", fontSize: 13, fontFamily: "'Nunito', sans-serif" }}>{t.description}</td>
                        <td style={{ padding: "10px 14px", fontWeight: 800, fontFamily: "'Nunito', sans-serif",
                          color: t.type === "Ingreso" ? "#22c55e" : "#ef4444",
                          fontSize: 15,
                        }}>
                          {t.type === "Gasto" ? "−" : "+"}{fmtCLP(t.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
