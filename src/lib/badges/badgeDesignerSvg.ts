/** Genera SVG de insignia circular (estilo Aprende) y data URL para image_url en DB. */

export type BadgeDesignerOptions = {
  line1: string;
  line2: string;
  primaryColor: string;
  secondaryColor: string;
  borderColor: string;
  accentColor: string;
};

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateBadgeSvg(opts: BadgeDesignerOptions): string {
  const l1 = escapeXml(opts.line1.trim().slice(0, 18));
  const l2 = escapeXml(opts.line2.trim().slice(0, 18));
  const p = opts.primaryColor;
  const s = opts.secondaryColor;
  const b = opts.borderColor;
  const a = opts.accentColor;

  const secondLine = l2
    ? `<text x="64" y="108" font-family="system-ui,Segoe UI,sans-serif" font-size="10" font-weight="800" fill="${b}" text-anchor="middle" opacity="0.9">${l2}</text>`
    : '';

  const y1 = l2 ? 88 : 96;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p}"/>
      <stop offset="100%" stop-color="${s}"/>
    </linearGradient>
  </defs>
  <circle cx="64" cy="64" r="60" fill="url(#bg)" stroke="${b}" stroke-width="4"/>
  <path d="M64 22 L69 40 L88 40 L73 50 L78 68 L64 58 L50 68 L55 50 L40 40 L59 40 Z"
        fill="${a}" stroke="${b}" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="64" y="${y1}" font-family="system-ui,Segoe UI,sans-serif" font-size="12" font-weight="900" fill="${b}" text-anchor="middle">${l1}</text>
  ${secondLine}
</svg>`;
}

export function badgeSvgToDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
