import { useEffect, useState } from 'react';
import { getSupabaseBrowser } from '../../lib/supabase/client';
import { fetchSponsorWall, type SponsorWallRow } from '../../lib/supabase/sponsors';

export interface SponsorDisplay {
  id: string;
  name: string;
  role: string;
  avatar: string;
  badge: string;
  color: string;
  coffeeCount: number;
  message?: string;
  tier: 'Legendary' | 'Gold' | 'Coffee Backer' | 'Sponsor';
}

// Lista de patrocinadores/colaboradores destacados de demostración
const FALLBACK_SPONSORS: SponsorDisplay[] = [
  {
    id: 'f-1',
    name: 'Sebastián Morales',
    role: 'FullStack Dev & Contribuidor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    badge: '🚀 Sponsor Fundador',
    color: '#3B82F6',
    coffeeCount: 15,
    message: '¡Excelente plataforma para la comunidad hispana! A seguir creciendo.',
    tier: 'Legendary',
  },
  {
    id: 'f-2',
    name: 'Camila Reyes',
    role: 'Diseñadora UI/UX & Estudiante',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    badge: '🎨 Sponsor Diamante',
    color: '#EC4899',
    coffeeCount: 12,
    message: 'Gracias por las guías visuales de POO y algoritmos.',
    tier: 'Legendary',
  },
  {
    id: 'f-3',
    name: 'Mateo Fernández',
    role: 'Backend Python Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    badge: '🐍 Python Backer',
    color: '#10B981',
    coffeeCount: 8,
    message: 'Apoyando el servidor y los nuevos simuladores interactivos.',
    tier: 'Gold',
  },
  {
    id: 'f-4',
    name: 'Valentina Silva',
    role: 'Docente de Informática',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    badge: '📚 Mentor Sponsor',
    color: '#8B5CF6',
    coffeeCount: 10,
    message: 'Uso los desafíos de condicionales con mis alumnos de primer año.',
    tier: 'Gold',
  },
  {
    id: 'f-5',
    name: 'Ignacio Castro',
    role: 'Desarrollador C# / .NET',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    badge: '☕ Coffeelover',
    color: '#F59E0B',
    coffeeCount: 5,
    message: '¡Por más lecciones claras de arquitectura y POO!',
    tier: 'Coffee Backer',
  },
  {
    id: 'f-6',
    name: 'Lucía Benítez',
    role: 'Frontend React & Astro',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    badge: '⚡ Community Supporter',
    color: '#06B6D4',
    coffeeCount: 6,
    message: 'La mejor comunidad en español para repasar las bases de programación.',
    tier: 'Coffee Backer',
  },
  {
    id: 'f-7',
    name: 'Rodrigo Araya',
    role: 'Analista de Datos',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    badge: '📊 Data Supporter',
    color: '#6366F1',
    coffeeCount: 4,
    message: 'Un café para mantener la plataforma rápida y sin publicidad.',
    tier: 'Coffee Backer',
  },
  {
    id: 'f-8',
    name: 'Elena Gómez',
    role: 'Estudiante de Ingenería',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    badge: '🌱 Student Backer',
    color: '#14B8A6',
    coffeeCount: 3,
    message: '¡Amo los ejercicios guiados y el simulador de café!',
    tier: 'Sponsor',
  },
  {
    id: 'f-9',
    name: 'Felipe Mendoza',
    role: 'Entusiasta de C++',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    badge: '⚙️ Code Lover',
    color: '#64748B',
    coffeeCount: 5,
    message: 'Gran trabajo haciendo accesible la lógica de programación.',
    tier: 'Sponsor',
  },
];

export default function SponsorsWall() {
  const [dbRows, setDbRows] = useState<SponsorWallRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setLoading(false);
      return;
    }
    void fetchSponsorWall(supabase).then(({ rows: r }) => {
      setLoading(false);
      setDbRows(r || []);
    });
  }, []);

  // Combinar registros reales de Supabase con la grilla precargada visual
  const realSponsors: SponsorDisplay[] = dbRows.map((r, i) => ({
    id: r.id,
    name: r.display_name?.trim() || 'Colaborador Anónimo',
    role: 'Sponsor de la Comunidad',
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(r.display_name || r.id)}`,
    badge: '☕ Sponsor Oficial',
    color: '#10B981',
    coffeeCount: 3 + (i % 5),
    message: 'Colaborador activo de la plataforma.',
    tier: 'Gold',
  }));

  const allSponsors = [...realSponsors, ...FALLBACK_SPONSORS];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="animate-pulse bg-slate-100 border-2 border-slate-200 rounded-2xl p-4 h-28 flex items-center gap-3">
            <div className="w-14 h-14 bg-slate-200 rounded-2xl shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Grid de Tarjetas de Colaboradores con Foto/Miniatura */}
      <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {allSponsors.map((sp) => (
          <li
            key={sp.id}
            className="group relative flex flex-col justify-between rounded-3xl border-3 border-[#1E1210] bg-white p-4 shadow-[4px_4px_0px_#1E1210] hover:-translate-y-1 transition-all duration-200 overflow-hidden"
          >
            {/* Header del Colaborador */}
            <div className="flex items-start gap-3">
              <div className="relative shrink-0">
                <img
                  src={sp.avatar}
                  alt={sp.name}
                  className="w-13 h-13 rounded-2xl border-2 border-[#1E1210] object-cover shadow-[2px_2px_0px_#1E1210] bg-amber-50"
                  loading="lazy"
                />
                <span
                  className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#1E1210] bg-amber-400 text-xs shadow-sm"
                  title={`${sp.coffeeCount} cafés donados`}
                >
                  ☕
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="m-0 font-nunito text-base font-black text-[#1E1210] truncate">
                    {sp.name}
                  </h3>
                </div>
                <p className="m-0 font-nunito text-xs font-bold text-slate-500 truncate">
                  {sp.role}
                </p>
                <span
                  className="mt-1 inline-block rounded-lg px-2 py-0.5 font-nunito text-[0.68rem] font-extrabold text-white shadow-xs"
                  style={{ backgroundColor: sp.color }}
                >
                  {sp.badge}
                </span>
              </div>
            </div>

            {/* Mensaje o Comentario */}
            {sp.message && (
              <p className="mt-3 m-0 rounded-xl bg-slate-50 border border-slate-200 p-2.5 font-quicksand font-semibold text-xs text-slate-600 leading-snug italic">
                "{sp.message}"
              </p>
            )}

            {/* Footer con cantidad de aportes */}
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[0.7rem] font-nunito font-black text-slate-400">
              <span>Nivel: {sp.tier}</span>
              <span className="text-amber-600 font-extrabold flex items-center gap-1">
                <span>{sp.coffeeCount} cafés</span> ☕
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
