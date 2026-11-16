export function CourseLoadingSkeleton() {
  return (
    <div className="h-dvh overflow-hidden bg-white">
      <p role="status" className="sr-only">Cargando el curso…</p>

      <div aria-hidden="true" className="flex h-full motion-safe:animate-pulse">
        <div className="hidden w-[292px] shrink-0 border-r border-slate-200 md:block">
          <div className="space-y-4 border-b border-slate-200 bg-slate-100 p-5">
            <div className="h-3 w-20 rounded bg-slate-200" />
            <div className="h-6 w-5/6 rounded bg-slate-200" />
            <div className="h-1 w-full rounded-full bg-slate-200" />
          </div>
          <div className="space-y-6 p-5">
            {[0, 1, 2].map((group) => (
              <div key={group} className="space-y-3">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="ml-3 h-3 w-3/5 rounded bg-slate-100" />
                <div className="ml-3 h-3 w-1/2 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-md bg-slate-100" />
              <div className="h-4 w-28 rounded bg-slate-200 sm:w-36" />
            </div>
            <div className="size-8 rounded-md bg-slate-100" />
          </div>

          <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-8 sm:py-12">
            <div className="space-y-3">
              <div className="h-3 w-24 rounded bg-slate-200" />
              <div className="h-7 w-4/5 rounded bg-slate-200 sm:w-2/3" />
              <div className="h-3 w-3/5 rounded bg-slate-100" />
            </div>
            <div className="aspect-video w-full rounded-xl bg-slate-100" />
            <div className="space-y-3">
              <div className="h-3 w-11/12 rounded bg-slate-100" />
              <div className="h-3 w-3/4 rounded bg-slate-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
