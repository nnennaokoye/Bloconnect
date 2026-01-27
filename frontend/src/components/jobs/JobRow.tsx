import StatusBadge from "@/components/ui/StatusBadge";
import { Job } from "@/types/job";
import Avatar from "@/components/ui/Avatar";

type Props = {
  job: Job;
};

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}

export default function JobRow({ job }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-black/10 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/15">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-medium sm:text-base">{job.title}</h3>
          <StatusBadge status={job.status} />
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
          <Avatar name={job.client.name} />
          <span className="font-medium">{job.client.name}</span>
          <span className="mx-2">•</span>
          <span>Budget Ξ {job.budgetEth}</span>
          <span className="mx-2">•</span>
          <span>Deadline {formatDate(job.deadline)}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          className="rounded-full border border-black/10 px-3 py-1 text-sm transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
          disabled
          title="Submit work (coming soon)"
        >
          Submit Work
        </button>
        <button
          className="rounded-full border border-black/10 px-3 py-1 text-sm transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
          disabled
          title="Mark complete (coming soon)"
        >
          Mark Complete
        </button>
        <button
          className="rounded-full border border-black/10 px-3 py-1 text-sm transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
          disabled
          title="Message client (coming soon)"
        >
          Message
        </button>
      </div>
    </div>
  );
}
