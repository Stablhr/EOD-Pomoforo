const NoReports = ({ className }) => (
  <svg className={className} viewBox="0 0 240 180" fill="none">
    <rect x="30" y="128" width="180" height="6" rx="3" className="text-stone-200" fill="#E7E5E4" />
    <rect x="60" y="55" width="120" height="80" rx="6" className="text-stone-50" fill="#FAFAF9" stroke="#D6D3D1" strokeWidth="1.5" />
    <rect x="72" y="66" width="96" height="3" rx="1.5" className="text-stone-300" fill="#D6D3D1" />
    <rect x="72" y="76" width="80" height="2" rx="1" className="text-stone-200" fill="#E7E5E4" />
    <rect x="72" y="84" width="88" height="2" rx="1" className="text-stone-200" fill="#E7E5E4" />
    <rect x="72" y="92" width="64" height="2" rx="1" className="text-stone-200" fill="#E7E5E4" />
    <rect x="72" y="102" width="72" height="2" rx="1" className="text-stone-200" fill="#E7E5E4" />
    <rect x="72" y="110" width="56" height="2" rx="1" className="text-stone-200" fill="#E7E5E4" />
    <circle cx="168" cy="115" r="10" fill="#EEF2FF" stroke="#6366F1" strokeWidth="1.5" />
    <circle cx="168" cy="115" r="6" fill="none" stroke="#6366F1" strokeWidth="1" strokeDasharray="2 2" />
    <line x1="168" y1="115" x2="168" y2="110" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="168" y1="115" x2="171" y2="117" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="168" cy="115" r="1.5" fill="#6366F1" />
    <path d="M50 128 Q55 100 60 95 H68 Q73 100 78 128" fill="#A8A29E" stroke="#A8A29E" strokeWidth="1" />
    <ellipse cx="64" cy="90" rx="10" ry="8" fill="#D1FAE5" opacity="0.7" />
    <ellipse cx="60" cy="87" rx="7" ry="6" fill="#D1FAE5" opacity="0.6" />
    <ellipse cx="68" cy="86" rx="6" ry="5" fill="#D1FAE5" opacity="0.5" />
    <circle cx="64" cy="88" r="2" fill="#A7F3D0" opacity="0.8" />
    <path d="M182 128 Q186 108 192 104 Q198 108 202 128" fill="#FED7AA" stroke="#FED7AA" strokeWidth="1" opacity="0.7" />
    <rect x="188" y="104" width="8" height="4" rx="1" fill="#FED7AA" opacity="0.5" />
    <path d="M212 128 L214 118 H218 L220 128" fill="#E7E5E4" stroke="#D6D3D1" strokeWidth="1" />
    <rect x="213" y="112" width="6" height="6" rx="2" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="0.5" />
    <circle cx="210" cy="108" r="4" fill="#EEF2FF" stroke="#6366F1" strokeWidth="1" opacity="0.4" />
    <circle cx="219" cy="104" r="3" fill="#EEF2FF" stroke="#6366F1" strokeWidth="1" opacity="0.3" />
    <circle cx="36" cy="50" r="2" fill="#6366F1" opacity="0.15" />
    <circle cx="48" cy="42" r="1.5" fill="#6366F1" opacity="0.1" />
    <circle cx="200" cy="44" r="2" fill="#6366F1" opacity="0.12" />
    <circle cx="210" cy="38" r="1" fill="#6366F1" opacity="0.08" />
  </svg>
)

const TimerDeco = ({ className }) => (
  <svg className={className} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dot-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1" fill="#6366F1" opacity="0.08" />
      </pattern>
      <pattern id="dot-grid-lg" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="1.5" fill="#6366F1" opacity="0.05" />
      </pattern>
    </defs>
    <rect width="240" height="240" fill="url(#dot-grid)" />
    <rect width="240" height="240" fill="url(#dot-grid-lg)" />
    <circle cx="120" cy="120" r="115" stroke="#D6D3D1" strokeWidth="0.5" opacity="0.4" />
    <circle cx="120" cy="120" r="100" stroke="#D6D3D1" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.3" />
    <circle cx="120" cy="120" r="85" stroke="#D6D3D1" strokeWidth="0.5" opacity="0.2" />
    <circle cx="45" cy="45" r="2" fill="#6366F1" opacity="0.12" />
    <circle cx="195" cy="45" r="2" fill="#6366F1" opacity="0.08" />
    <circle cx="45" cy="195" r="2" fill="#6366F1" opacity="0.1" />
    <circle cx="195" cy="195" r="2" fill="#6366F1" opacity="0.08" />
  </svg>
)

const CornerDeco = ({ className }) => (
  <svg className={className} viewBox="0 0 200 80" fill="none">
    <path d="M0 0 L30 0 Q40 0 40 10 L40 30" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" opacity="0.15" />
    <path d="M200 0 L170 0 Q160 0 160 10 L160 30" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" opacity="0.15" />
    <circle cx="20" cy="20" r="2" fill="#6366F1" opacity="0.1" />
    <circle cx="180" cy="20" r="2" fill="#6366F1" opacity="0.1" />
    <circle cx="100" cy="16" r="1.5" fill="#6366F1" opacity="0.08" />
  </svg>
)

const DecoDots = ({ className }) => (
  <svg className={className} viewBox="0 0 160 12" fill="none">
    <circle cx="6" cy="6" r="2" fill="#6366F1" opacity="0.12" />
    <circle cx="18" cy="6" r="2" fill="#6366F1" opacity="0.08" />
    <circle cx="30" cy="6" r="2" fill="#6366F1" opacity="0.12" />
    <circle cx="42" cy="6" r="2" fill="#6366F1" opacity="0.08" />
    <circle cx="54" cy="6" r="2" fill="#6366F1" opacity="0.12" />
    <circle cx="66" cy="6" r="2" fill="#6366F1" opacity="0.08" />
    <circle cx="78" cy="6" r="2" fill="#6366F1" opacity="0.12" />
    <circle cx="90" cy="6" r="2" fill="#6366F1" opacity="0.08" />
    <circle cx="102" cy="6" r="2" fill="#6366F1" opacity="0.12" />
    <circle cx="114" cy="6" r="2" fill="#6366F1" opacity="0.08" />
    <circle cx="126" cy="6" r="2" fill="#6366F1" opacity="0.12" />
    <circle cx="138" cy="6" r="2" fill="#6366F1" opacity="0.08" />
    <circle cx="150" cy="6" r="2" fill="#6366F1" opacity="0.12" />
  </svg>
)

export { NoReports, TimerDeco, CornerDeco, DecoDots }
