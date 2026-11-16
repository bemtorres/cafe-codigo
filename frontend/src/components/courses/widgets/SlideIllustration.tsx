export interface SlideIllustrationProps {
  type: 'analyst' | 'shield' | 'server' | 'team';
  brandColor: string;
}

export function SlideIllustration({ type, brandColor }: SlideIllustrationProps) {
  if (type === 'analyst') {
    return (
      <svg
        viewBox="0 0 640 340"
        style={{
          width: '100%',
          maxWidth: '540px',
          height: 'auto',
          display: 'block',
          border: '2px solid #3b4262',
        }}
        role="img"
        aria-label="Ilustración de análisis del caso"
      >
        <defs>
          <linearGradient id="bgGradAnalyst" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d8e2ef" />
            <stop offset="65%" stopColor="#b8c7dc" />
            <stop offset="100%" stopColor="#7589a8" />
          </linearGradient>
        </defs>
        <rect width="640" height="340" fill="url(#bgGradAnalyst)" />
        <polygon points="360,0 640,0 640,340 490,340" fill="#5e7294" opacity="0.45" />
        <path
          d="M200 340 L235 235 L415 245 L445 340 Z"
          fill="#626986"
          stroke="#2d3142"
          strokeWidth="3"
        />
        <path
          d="M275 235 L320 315 L365 238 Z"
          fill="#eef2f7"
          stroke="#2d3142"
          strokeWidth="2.5"
        />
        <path
          d="M285 155 C285 105, 365 105, 365 155 C365 205, 345 235, 322 235 C298 235, 285 205, 285 155 Z"
          fill="#eab8b1"
          stroke="#2d3142"
          strokeWidth="2.5"
        />
        <path
          d="M278 148 C272 105, 305 78, 348 86 C378 92, 386 122, 372 152 C366 126, 345 115, 315 118 C295 120, 286 132, 278 148 Z"
          fill="#f6e076"
          stroke="#2d3142"
          strokeWidth="2.5"
        />
        <line x1="298" y1="145" x2="316" y2="143" stroke="#2d3142" strokeWidth="3" />
        <line x1="335" y1="142" x2="352" y2="146" stroke="#2d3142" strokeWidth="3" />
        <circle cx="308" cy="154" r="3" fill="#2d3142" />
        <circle cx="343" cy="154" r="3" fill="#2d3142" />
        <path d="M324 154 L319 176 L328 178" fill="none" stroke="#2d3142" strokeWidth="2.5" />
        <path
          d="M312 220 C315 198, 342 195, 348 212 C354 228, 345 262, 330 272 L298 255 Z"
          fill="#eab8b1"
          stroke="#2d3142"
          strokeWidth="2.5"
        />
      </svg>
    );
  }

  if (type === 'shield') {
    return (
      <svg
        viewBox="0 0 640 340"
        style={{
          width: '100%',
          maxWidth: '540px',
          height: 'auto',
          display: 'block',
          border: '2px solid #3b4262',
        }}
        role="img"
        aria-label="Ilustración de escudo de seguridad"
      >
        <rect width="640" height="340" fill="#dbe4f0" />
        <polygon points="0,340 640,120 640,340" fill="#9fb2cc" opacity="0.45" />
        <path
          d="M320 55 L430 98 L430 185 C430 250 320 295 320 295 C320 295 210 250 210 185 L210 98 Z"
          fill="#4a5578"
          stroke="#23293d"
          strokeWidth="4"
        />
        <path
          d="M320 78 L405 112 L405 180 C405 232 320 268 320 268 C320 268 235 232 235 180 L235 112 Z"
          fill={brandColor}
          opacity="0.9"
        />
        <path
          d="M285 172 L310 198 L362 145"
          fill="none"
          stroke="#ffffff"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === 'team') {
    return (
      <svg
        viewBox="0 0 640 340"
        style={{
          width: '100%',
          maxWidth: '540px',
          height: 'auto',
          display: 'block',
          border: '2px solid #3b4262',
        }}
        role="img"
        aria-label="Ilustración de documentación en equipo"
      >
        <rect width="640" height="340" fill="#e2e8f0" />
        <rect
          x="110"
          y="50"
          width="420"
          height="240"
          rx="12"
          fill="#ffffff"
          stroke="#334155"
          strokeWidth="3"
        />
        <rect x="145" y="82" width="160" height="20" rx="5" fill={brandColor} />
        <rect x="145" y="118" width="350" height="12" rx="4" fill="#cbd5e1" />
        <rect x="145" y="142" width="300" height="12" rx="4" fill="#cbd5e1" />
        <rect
          x="145"
          y="185"
          width="105"
          height="65"
          rx="8"
          fill="#f8fafc"
          stroke="#64748b"
          strokeWidth="2"
        />
        <rect
          x="268"
          y="185"
          width="105"
          height="65"
          rx="8"
          fill="#f8fafc"
          stroke="#64748b"
          strokeWidth="2"
        />
        <rect
          x="390"
          y="185"
          width="105"
          height="65"
          rx="8"
          fill="#f8fafc"
          stroke="#64748b"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 640 340"
      style={{
        width: '100%',
        maxWidth: '540px',
        height: 'auto',
        display: 'block',
        border: '2px solid #3b4262',
      }}
      role="img"
      aria-label="Ilustración de revisión de código"
    >
      <rect width="640" height="340" fill="#d5dfed" />
      <rect
        x="120"
        y="50"
        width="400"
        height="240"
        rx="12"
        fill="#1e293b"
        stroke="#0f172a"
        strokeWidth="4"
      />
      <circle cx="148" cy="74" r="6" fill="#ef4444" />
      <circle cx="168" cy="74" r="6" fill="#f59e0b" />
      <circle cx="188" cy="74" r="6" fill="#10b981" />
      <rect x="150" y="110" width="180" height="14" rx="4" fill={brandColor} />
      <rect x="150" y="138" width="290" height="12" rx="4" fill="#64748b" />
      <rect x="150" y="162" width="240" height="12" rx="4" fill="#94a3b8" />
      <rect x="150" y="186" width="310" height="12" rx="4" fill="#64748b" />
      <rect x="150" y="220" width="130" height="32" rx="6" fill="#10b981" />
    </svg>
  );
}

