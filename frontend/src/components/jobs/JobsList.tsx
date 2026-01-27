"use client";

import { useEffect, useMemo, useState } from "react";
import { mockJobs } from "@/data/mockJobs";
import { JobStatus } from "@/types/job";
import PillButton from "@/components/ui/PillButton";
import JobRow from "@/components/jobs/JobRow";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import { Job } from "@/types/job";
import SearchInput from "@/components/ui/SearchInput";
import Skeleton from "@/components/ui/Skeleton";

const TABS: (JobStatus | "all")[] = ["all", "active", "pending", "completed", "disputed"];

export default function JobsList() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("all");
  const [selected, setSelected] = useState<Job | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"deadline_asc" | "deadline_desc" | "budget_desc" | "budget_asc">("deadline_asc");

  const jobs = useMemo(() => {
    let data = tab === "all" ? mockJobs : mockJobs.filter((j) => j.status === tab);
    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter((j) => j.title.toLowerCase().includes(q) || j.client.name.toLowerCase().includes(q) || j.id.toLowerCase().includes(q));
    }
    const arr = [...data];
    if (sort === "deadline_asc") arr.sort((a, b) => +new Date(a.deadline) - +new Date(b.deadline));
    if (sort === "deadline_desc") arr.sort((a, b) => +new Date(b.deadline) - +new Date(a.deadline));
    if (sort === "budget_desc") arr.sort((a, b) => b.budgetEth - a.budgetEth);
    if (sort === "budget_asc") arr.sort((a, b) => a.budgetEth - b.budgetEth);
    return arr;
  }, [tab, query, sort]);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(jobs.length / pageSize));
  const pageJobs = useMemo(() => {
    const start = (page - 1) * pageSize;
    return jobs.slice(start, start + pageSize);
  }, [jobs, page]);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [tab, query, sort]);
  useEffect(() => {
    // reset page when filters change
    setPage(1);
  }, [tab, query, sort]);

  return (
    <section className="mt-10">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-medium">Jobs</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-center gap-2 text-sm">
            {TABS.map((t) => (
              <PillButton key={t} active={tab === t} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </PillButton>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SearchInput placeholder="Search jobs, clients, IDs" value={query} onChange={(e) => setQuery(e.target.value)} />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="rounded-full border border-black/10 bg-transparent px-3 py-2 text-sm dark:border-white/20"
              aria-label="Sort jobs"
            >
              <option value="deadline_asc">Deadline ↑</option>
              <option value="deadline_desc">Deadline ↓</option>
              <option value="budget_desc">Budget ↓</option>
              <option value="budget_asc">Budget ↑</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-black/10 p-4 dark:border-white/15">
              <Skeleton className="h-4 w-40" />
              <div className="mt-2 flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          ))
        ) : jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/10 p-8 text-center text-sm text-zinc-600 dark:border-white/20 dark:text-zinc-400">
            No jobs in this view.
          </div>
        ) : (
          pageJobs.map((job) => <JobRow key={job.id} job={job} onClick={setSelected} />)
        )}
      </div>

      {!loading && jobs.length > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
          <div>
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, jobs.length)} of {jobs.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="rounded-full border border-black/10 px-3 py-1 transition-colors hover:bg-black/5 disabled:opacity-50 dark:border-white/20 dark:hover:bg-white/10"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span>
              Page {page} / {totalPages}
            </span>
            <button
              className="rounded-full border border-black/10 px-3 py-1 transition-colors hover:bg-black/5 disabled:opacity-50 dark:border-white/20 dark:hover:bg-white/10"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      <JobDetailModal job={selected ?? undefined} open={!!selected} onClose={() => setSelected(null)} />
    </section>
  );
}
