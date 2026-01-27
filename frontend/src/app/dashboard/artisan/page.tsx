import Link from "next/link";
import SummaryCards from "@/components/dashboard/SummaryCards";
import JobsList from "@/components/jobs/JobsList";

export const metadata = {
  title: "Artisan Dashboard · Bloconnect",
  description: "Manage artisan jobs, earnings, and availability on Bloconnect.",
};

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

        <JobsList />
      </div>
    </div>
  );
}
