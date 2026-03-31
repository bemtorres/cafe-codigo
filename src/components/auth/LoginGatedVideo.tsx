import { useSupabaseAuth } from '../../lib/supabase/useSupabaseAuth';

type Props = {
  videoId: string;
  title?: string;
};

function thumbUrl(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

/**
 * Muestra un embed de YouTube solo si hay sesión; si no, miniatura con CTA a /cuenta/.
 */
export default function LoginGatedVideo({ videoId, title = 'Video' }: Props) {
  const { supabase, loading: authLoading, session } = useSupabaseAuth();
  const embedSrc = `https://www.youtube.com/embed/${videoId}`;
  const unlocked = Boolean(session);

  if (authLoading) {
    return (
      <div
        className="mt-4 aspect-video w-full animate-pulse rounded-xl bg-white/20"
        aria-hidden
      />
    );
  }

  if (!supabase || !unlocked) {
    return (
      <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl border-2 border-white/25 bg-black/40 shadow-[4px_4px_0px_rgba(0,0,0,0.25)]">
        <img
          src={thumbUrl(videoId)}
          alt=""
          className="h-full w-full object-cover opacity-70"
          loading="lazy"
          width={480}
          height={360}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/50 p-4 text-center">
          <p className="max-w-[18rem] font-nunito text-sm font-extrabold leading-snug text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Desbloquear contenido iniciando sesión
          </p>
          <a
            href="/cuenta/"
            className="inline-flex rounded-full border-2 border-white bg-white/95 px-5 py-2 font-nunito text-sm font-extrabold text-textPrimary no-underline shadow-neo transition-transform hover:-translate-y-0.5"
          >
            Ir a cuenta
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border-2 border-white/25 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
      <iframe
        title={title}
        src={`${embedSrc}?rel=0`}
        className="h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
