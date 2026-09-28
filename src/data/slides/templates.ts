export type SlideTemplateId = 'material' | 'fluent' | 'prime' | 'cupertino' | 'hyper';

export interface TemplateColorTokens {
  bgPage: string;
  bgCard: string;
  borderCard: string;
  shadowCard: string;
  headerBg: string;
  headerBorder: string;
  accentColor: string;
  titleColor: string;
  textColor: string;
  badgeBg: string;
  badgeText: string;
  tableHeaderBg: string;
  tableBorder: string;
  keyTakeawayBg: string;
  keyTakeawayBorder: string;
  keyTakeawayText: string;
  navBtnClass: string;
}

export interface SlideTemplate {
  id: SlideTemplateId;
  name: string;
  shortName: string;
  tagline: string;
  inspiration: string;
  icon: string;
  palette: [string, string, string];
  cardRadius: string;
  dark: TemplateColorTokens;
  light: TemplateColorTokens;
}

export const SLIDE_TEMPLATES: Record<SlideTemplateId, SlideTemplate> = {
  material: {
    id: 'material',
    name: 'Material Studio',
    shortName: 'Google Style',
    tagline: 'Superficies tonales limpias y píldoras redondeadas estilo Google M3',
    inspiration: 'Google Material Design 3',
    icon: '🎨',
    palette: ['#1a73e8', '#ea4335', '#34a853'],
    cardRadius: 'rounded-3xl',
    dark: {
      bgPage: 'bg-[#1a1c1e]',
      bgCard: 'bg-[#212429]/95 backdrop-blur-md',
      borderCard: 'border-[#3f4753]/60',
      shadowCard: 'shadow-2xl shadow-black/50',
      headerBg: 'bg-[#1a1c1e]/90 backdrop-blur-md',
      headerBorder: 'border-[#3f4753]/50',
      accentColor: '#8ab4f8',
      titleColor: '#e2e2e6',
      textColor: 'text-[#c4c7c5]',
      badgeBg: 'bg-[#8ab4f8]/20 border border-[#8ab4f8]/40',
      badgeText: 'text-[#8ab4f8]',
      tableHeaderBg: 'bg-[#2c3036] text-[#e2e2e6] border-[#3f4753]',
      tableBorder: 'border-[#3f4753]/80',
      keyTakeawayBg: 'bg-[#fef7e0]/10 border-[#fdd663]/30',
      keyTakeawayBorder: 'border-[#fdd663]/30',
      keyTakeawayText: 'text-[#fdd663]',
      navBtnClass: 'bg-[#8ab4f8] text-[#001d35] hover:bg-[#a8c7fa] shadow-md shadow-[#8ab4f8]/20'
    },
    light: {
      bgPage: 'bg-[#f8fafd]',
      bgCard: 'bg-white',
      borderCard: 'border-[#dfe3e7]',
      shadowCard: 'shadow-xl shadow-blue-900/5',
      headerBg: 'bg-white/95 backdrop-blur-md',
      headerBorder: 'border-[#e1e3e1]',
      accentColor: '#1a73e8',
      titleColor: '#1f1f1f',
      textColor: 'text-[#444746]',
      badgeBg: 'bg-[#c2e7ff] text-[#001d35] border border-[#7fcfff]/50',
      badgeText: 'text-[#001d35]',
      tableHeaderBg: 'bg-[#f0f4f9] text-[#1f1f1f] border-[#dfe3e7]',
      tableBorder: 'border-[#dfe3e7]',
      keyTakeawayBg: 'bg-[#fef7e0] border-[#fdd663]',
      keyTakeawayBorder: 'border-[#fdd663]',
      keyTakeawayText: 'text-[#7c4a03]',
      navBtnClass: 'bg-[#1a73e8] text-white hover:bg-[#1557b0] shadow-md shadow-blue-500/20'
    }
  },

  fluent: {
    id: 'fluent',
    name: 'Fluent Studio',
    shortName: 'Microsoft Style',
    tagline: 'Vidrio translúcido Mica, reflejos acrílicos y estética Windows 11',
    inspiration: 'Microsoft Fluent Design System',
    icon: '🪟',
    palette: ['#0078d4', '#00b7c3', '#60cdff'],
    cardRadius: 'rounded-2xl',
    dark: {
      bgPage: 'bg-[#080d1a]',
      bgCard: 'bg-[#10192e]/85 backdrop-blur-2xl',
      borderCard: 'border-sky-500/30 ring-1 ring-sky-400/20',
      shadowCard: 'shadow-2xl shadow-sky-950/60',
      headerBg: 'bg-[#080d1a]/85 backdrop-blur-xl',
      headerBorder: 'border-sky-900/40',
      accentColor: '#60cdff',
      titleColor: '#f0f9ff',
      textColor: 'text-slate-200',
      badgeBg: 'bg-sky-500/20 border border-sky-400/40',
      badgeText: 'text-sky-300',
      tableHeaderBg: 'bg-sky-950/60 text-sky-100 border-sky-800/60',
      tableBorder: 'border-sky-800/60',
      keyTakeawayBg: 'bg-sky-950/40 border-sky-500/30',
      keyTakeawayBorder: 'border-sky-500/30',
      keyTakeawayText: 'text-sky-200',
      navBtnClass: 'bg-[#0078d4] text-white hover:bg-[#106ebe] shadow-lg shadow-sky-600/30'
    },
    light: {
      bgPage: 'bg-[#f3f4f8]',
      bgCard: 'bg-white/90 backdrop-blur-xl',
      borderCard: 'border-sky-200 ring-1 ring-sky-100',
      shadowCard: 'shadow-xl shadow-sky-200/40',
      headerBg: 'bg-white/85 backdrop-blur-xl',
      headerBorder: 'border-slate-200',
      accentColor: '#0078d4',
      titleColor: '#0f172a',
      textColor: 'text-slate-700',
      badgeBg: 'bg-sky-50 border border-sky-200',
      badgeText: 'text-sky-800',
      tableHeaderBg: 'bg-sky-50/80 text-sky-950 border-sky-200',
      tableBorder: 'border-sky-200',
      keyTakeawayBg: 'bg-sky-50 border-sky-200',
      keyTakeawayBorder: 'border-sky-200',
      keyTakeawayText: 'text-sky-900',
      navBtnClass: 'bg-[#0078d4] text-white hover:bg-[#106ebe] shadow-lg shadow-sky-500/25'
    }
  },

  prime: {
    id: 'prime',
    name: 'Prime Aurora',
    shortName: 'Amazon / AWS Style',
    tagline: 'Consola técnica en grafito oscuro con acentos ámbar de alta fidelidad',
    inspiration: 'Amazon AWS Cloud Console',
    icon: '⚡',
    palette: ['#ff9900', '#232f3e', '#00a4e4'],
    cardRadius: 'rounded-xl',
    dark: {
      bgPage: 'bg-[#0b1017]',
      bgCard: 'bg-[#141d2b]/95 backdrop-blur-xl',
      borderCard: 'border-amber-500/40 ring-1 ring-amber-500/20',
      shadowCard: 'shadow-2xl shadow-black/80',
      headerBg: 'bg-[#0b1017]/95 backdrop-blur-md',
      headerBorder: 'border-slate-800',
      accentColor: '#ff9900',
      titleColor: '#ffb84d',
      textColor: 'text-slate-200',
      badgeBg: 'bg-amber-500/20 border border-amber-500/40',
      badgeText: 'text-amber-400',
      tableHeaderBg: 'bg-[#1d2736] text-amber-300 border-slate-700',
      tableBorder: 'border-slate-700',
      keyTakeawayBg: 'bg-amber-500/10 border-amber-500/30',
      keyTakeawayBorder: 'border-amber-500/30',
      keyTakeawayText: 'text-amber-300',
      navBtnClass: 'bg-[#ff9900] text-slate-950 font-black hover:bg-[#e88b00] shadow-lg shadow-amber-500/30'
    },
    light: {
      bgPage: 'bg-[#f4f6f9]',
      bgCard: 'bg-white',
      borderCard: 'border-amber-400/50 shadow-md shadow-amber-100',
      shadowCard: 'shadow-xl shadow-slate-200/80',
      headerBg: 'bg-[#232f3e] text-white',
      headerBorder: 'border-[#131a22]',
      accentColor: '#d97706',
      titleColor: '#1e293b',
      textColor: 'text-slate-700',
      badgeBg: 'bg-amber-100 text-amber-900 border border-amber-300',
      badgeText: 'text-amber-900',
      tableHeaderBg: 'bg-slate-100 text-slate-900 border-slate-300',
      tableBorder: 'border-slate-200',
      keyTakeawayBg: 'bg-amber-50 border-amber-300',
      keyTakeawayBorder: 'border-amber-300',
      keyTakeawayText: 'text-amber-950',
      navBtnClass: 'bg-[#ff9900] text-slate-950 font-black hover:bg-[#e88b00] shadow-md shadow-amber-500/25'
    }
  },

  cupertino: {
    id: 'cupertino',
    name: 'Cupertino Neo',
    shortName: 'Apple Style',
    tagline: 'Vidrio esmerilado profundo, bordes ultra-finos y minimalismo San Francisco',
    inspiration: 'Apple macOS & iOS Human Interface',
    icon: '🍎',
    palette: ['#0071e3', '#af52de', '#30d158'],
    cardRadius: 'rounded-3xl',
    dark: {
      bgPage: 'bg-[#000000]',
      bgCard: 'bg-[#1c1c1e]/80 backdrop-blur-3xl',
      borderCard: 'border-white/15',
      shadowCard: 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)]',
      headerBg: 'bg-[#000000]/70 backdrop-blur-2xl',
      headerBorder: 'border-white/10',
      accentColor: '#2997ff',
      titleColor: '#f5f5f7',
      textColor: 'text-[#d1d1d6]',
      badgeBg: 'bg-white/10 border border-white/15 backdrop-blur-md',
      badgeText: 'text-white',
      tableHeaderBg: 'bg-white/5 text-[#f5f5f7] border-white/10',
      tableBorder: 'border-white/10',
      keyTakeawayBg: 'bg-white/5 border-white/15 backdrop-blur-md',
      keyTakeawayBorder: 'border-white/15',
      keyTakeawayText: 'text-[#ffd60a]',
      navBtnClass: 'bg-[#2997ff] text-white hover:bg-[#0071e3] shadow-lg shadow-blue-500/30'
    },
    light: {
      bgPage: 'bg-[#f5f5f7]',
      bgCard: 'bg-white/85 backdrop-blur-3xl',
      borderCard: 'border-black/10',
      shadowCard: 'shadow-[0_20px_50px_-12px_rgba(0,0,0,0.09)]',
      headerBg: 'bg-[#ffffff]/70 backdrop-blur-2xl',
      headerBorder: 'border-black/5',
      accentColor: '#0071e3',
      titleColor: '#1d1d1f',
      textColor: 'text-[#515154]',
      badgeBg: 'bg-black/5 border border-black/5',
      badgeText: 'text-[#1d1d1f]',
      tableHeaderBg: 'bg-black/3 text-[#1d1d1f] border-black/5',
      tableBorder: 'border-black/5',
      keyTakeawayBg: 'bg-amber-50/80 border-amber-200/80',
      keyTakeawayBorder: 'border-amber-200/80',
      keyTakeawayText: 'text-amber-900',
      navBtnClass: 'bg-[#0071e3] text-white hover:bg-[#0077ed] shadow-lg shadow-blue-500/20'
    }
  },

  hyper: {
    id: 'hyper',
    name: 'Hyper Dev',
    shortName: 'Vercel / GitHub Style',
    tagline: 'Monocromático de alto contraste, acentos neón y geometría técnica',
    inspiration: 'Vercel & Modern Developer Tooling',
    icon: '🚀',
    palette: ['#00dfd8', '#a3e635', '#ffffff'],
    cardRadius: 'rounded-xl',
    dark: {
      bgPage: 'bg-[#09090b]',
      bgCard: 'bg-[#000000] border-zinc-800',
      borderCard: 'border-zinc-800 ring-1 ring-zinc-700/60',
      shadowCard: 'shadow-2xl shadow-cyan-950/20',
      headerBg: 'bg-[#09090b]/95 backdrop-blur-md',
      headerBorder: 'border-zinc-800',
      accentColor: '#00dfd8',
      titleColor: '#ffffff',
      textColor: 'text-zinc-300',
      badgeBg: 'bg-cyan-950/40 border border-cyan-500/40',
      badgeText: 'text-cyan-300',
      tableHeaderBg: 'bg-zinc-900 text-zinc-100 border-zinc-800',
      tableBorder: 'border-zinc-800',
      keyTakeawayBg: 'bg-zinc-900/90 border-cyan-500/40',
      keyTakeawayBorder: 'border-cyan-500/40',
      keyTakeawayText: 'text-cyan-300',
      navBtnClass: 'bg-white text-black font-extrabold hover:bg-zinc-200 shadow-lg shadow-white/10'
    },
    light: {
      bgPage: 'bg-[#ffffff]',
      bgCard: 'bg-[#fafafa]',
      borderCard: 'border-zinc-300 ring-1 ring-zinc-200',
      shadowCard: 'shadow-xl shadow-zinc-300/40',
      headerBg: 'bg-[#ffffff]/95 backdrop-blur-md',
      headerBorder: 'border-zinc-200',
      accentColor: '#09090b',
      titleColor: '#09090b',
      textColor: 'text-zinc-700',
      badgeBg: 'bg-zinc-100 border border-zinc-300',
      badgeText: 'text-zinc-900',
      tableHeaderBg: 'bg-zinc-100 text-zinc-900 border-zinc-300',
      tableBorder: 'border-zinc-200',
      keyTakeawayBg: 'bg-zinc-100 border-zinc-300',
      keyTakeawayBorder: 'border-zinc-300',
      keyTakeawayText: 'text-zinc-900',
      navBtnClass: 'bg-black text-white font-extrabold hover:bg-zinc-800 shadow-md shadow-black/20'
    }
  }
};

export const TEMPLATE_LIST: SlideTemplate[] = Object.values(SLIDE_TEMPLATES);

export const getSlideTemplate = (id?: string | null): SlideTemplate => {
  if (id && id in SLIDE_TEMPLATES) {
    return SLIDE_TEMPLATES[id as SlideTemplateId];
  }
  return SLIDE_TEMPLATES.material;
};
