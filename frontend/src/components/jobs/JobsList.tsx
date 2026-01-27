"use client";

import { useMemo, useState } from "react";
import { mockJobs } from "@/data/mockJobs";
import { JobStatus } from "@/types/job";
import PillButton from "@/components/ui/PillButton";
import JobRow from "@/components/jobs/JobRow";

const TABS: (JobStatus | "all")[] = ["all", "active", "pending", "completed", "disputed"];

export default function JobsList() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("all");

  const jobs = useMemo(() => {
    if (tab === "all") return mockJobs;
    return mockJobs.filter((j) => j.status === tab);
  }, [tab]);

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Jobs</h2>
        <div className="flex items-center gap-2 text-sm">
          {TABS.map((t) => (
            <PillButton key={t} active={tab === t} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </PillButton>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/10 p-8 text-center text-sm text-zinc-600 dark:border-white/20 dark:text-zinc-400">
            No jobs in this view.
          </div>
        ) : (
          jobs.map((job) => <JobRow key={job.id} job={job} />)
        )}
      </div>
    </section>
  );
}
