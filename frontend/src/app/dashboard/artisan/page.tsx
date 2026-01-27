import Link from "next/link";
import SummaryCards from "@/components/dashboard/SummaryCards";
import PillButton from "@/components/ui/PillButton";

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

        <SummaryCards />

        {/* Jobs list placeholder */}
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">Jobs</h2>
            <div className="flex items-center gap-2 text-sm">
              <PillButton active>All</PillButton>
              <PillButton>Active</PillButton>
              <PillButton>Pending</PillButton>
              <PillButton>Completed</PillButton>
              <PillButton>Disputed</PillButton>
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
