import React, { useState, useEffect } from 'react';

type VideoItem = {
  id: string;
  title: string;
};

type Props = {
  videos: VideoItem[];
  pageKey: string;
};

export default function VideoGridWithCheck({ videos, pageKey }: Props) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`videos_completed_${pageKey}`);
      if (saved) {
        setCompleted(JSON.parse(saved));
      }
    } catch {
      // ignore JSON parse error
    }
  }, [pageKey]);

  const toggleVideo = (id: string) => {
    setCompleted((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(`videos_completed_${pageKey}`, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      {videos.map((video, index) => {
        const isDone = Boolean(completed[video.id]);
        return (
          <div
            key={video.id}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border-[3px] border-slate-900 bg-white shadow-[6px_6px_0px_#0f172a] transition-all duration-200 ${
              isDone ? 'ring-2 ring-emerald-500/80 bg-emerald-50/20' : ''
            }`}
          >
            {/* Embed del video */}
            <div className="relative aspect-video w-full bg-black/90">
              <iframe
                title={video.title}
                src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Barra de control y check */}
            <div className="flex items-center justify-between gap-3 p-3 bg-slate-900 text-white">
              <span className="font-nunito font-bold text-sm text-slate-200 truncate">
                {index + 1}. {video.title}
              </span>

              <button
                type="button"
                onClick={() => toggleVideo(video.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-nunito font-extrabold text-xs transition-all cursor-pointer select-none ${
                  isDone
                    ? 'bg-emerald-500 text-white shadow-[2px_2px_0px_#064e3b] hover:bg-emerald-600 active:translate-y-0.5'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white border border-slate-600'
                }`}
              >
                {isDone ? (
                  <>
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Visto</span>
                  </>
                ) : (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 inline-block" />
                    <span>Marcar como visto</span>
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
