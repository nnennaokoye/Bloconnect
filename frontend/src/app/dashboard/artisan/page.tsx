import Link from "next/link";

export default function ArtisanDashboardPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold sm:text-3xl">Artisan Dashboard</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Overview of your jobs, earnings, and account status.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/artisans"
              className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 px-4 text-sm transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            >
              Browse marketplace
            </Link>
            <Link
              href="/jobs"
              className="inline-flex h-10 items-center justify-center rounded-full bg-black px-4 text-sm text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-300"
            >
              My jobs
            </Link>
          </div>
        </div>

        {/* Summary cards placeholder */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-black/10 p-4 dark:border-white/15">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Total earnings</div>
            <div className="mt-2 text-2xl font-semibold">Ξ 0.00</div>
          </div>
          <div className="rounded-2xl border border-black/10 p-4 dark:border-white/15">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Active jobs</div>
            <div className="mt-2 text-2xl font-semibold">0</div>
          </div>
          <div className="rounded-2xl border border-black/10 p-4 dark:border-white/15">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Rating</div>
            <div className="mt-2 text-2xl font-semibold">—</div>
          </div>
          <div className="rounded-2xl border border-black/10 p-4 dark:border-white/15">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Availability</div>
            <div className="mt-2 text-2xl font-semibold">Open</div>
          </div>
        </section>

        {/* Jobs list placeholder */}
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">Jobs</h2>
            <div className="flex items-center gap-2 text-sm">
              <button className="rounded-full border border-black/10 px-3 py-1 transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10">
                All
              </button>
              <button className="rounded-full border border-black/10 px-3 py-1 transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10">
                Active
              </button>
              <button className="rounded-full border border-black/10 px-3 py-1 transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10">
                Pending
              </button>
              <button className="rounded-full border border-black/10 px-3 py-1 transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10">
                Completed
              </button>
              <button className="rounded-full border border-black/10 px-3 py-1 transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10">
                Disputed
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-black/10 p-8 text-center text-sm text-zinc-600 dark:border-white/20 dark:text-zinc-400">
            No jobs yet. When you accept or are assigned a job, it will appear here.
          </div>
        </section>
      </div>
    </div>
  );
}
