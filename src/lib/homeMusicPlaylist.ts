import playlistMeta from '../assets/music/playlist.json';

export type HomeMusicTrack = {
  id: string;
  title: string;
  artist?: string;
  src: string;
};

type PlaylistMetaEntry = {
  file: string;
  title?: string;
  artist?: string;
};

const audioGlob = import.meta.glob<{ default: string }>('../assets/music/*.{mp3,m4a,ogg,wav}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function prettifyFileName(fileName: string): string {
  const base = fileName.replace(/\.[^.]+$/, '');
  return base.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim() || 'Pista';
}

/**
 * Pistas detectadas automáticamente desde `src/assets/music/*.mp3` (y m4a, ogg, wav).
 * Opcional: editá `playlist.json` con `{ "file": "nombre.mp3", "title": "...", "artist": "..." }`.
 */
export function getHomeMusicTracks(): HomeMusicTrack[] {
  const metaList = (playlistMeta as PlaylistMetaEntry[]).filter((e) => e?.file);
  const metaByFile = new Map(metaList.map((m) => [m.file, m]));

  return Object.entries(audioGlob).map(([path, src], i) => {
    const fileName = path.split('/').pop() ?? `track-${i}`;
    const meta = metaByFile.get(fileName);
    return {
      id: `home-music-${i}-${fileName}`,
      title: meta?.title?.trim() || prettifyFileName(fileName),
      artist: meta?.artist?.trim() || undefined,
      src,
    };
  });
}
