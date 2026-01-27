"use client";

import Card from "@/components/ui/Card";
import Switch from "@/components/ui/Switch";
import { useState } from "react";
import { formatEth } from "@/utils/formatters";

export default function SummaryCards() {
  const [available, setAvailable] = useState(true);

  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card title={<span className="inline-flex items-center gap-2"><span aria-hidden>💰</span><span>Total earnings</span></span>}>
        <div className="text-2xl font-semibold">{formatEth(0)}</div>
      </Card>
      <Card title={<span className="inline-flex items-center gap-2"><span aria-hidden>🛠️</span><span>Active jobs</span></span>}>
        <div className="text-2xl font-semibold">0</div>
      </Card>
      <Card title={<span className="inline-flex items-center gap-2"><span aria-hidden>⭐</span><span>Rating</span></span>}>
        <div className="text-2xl font-semibold">—</div>
      </Card>
      <Card
        title={<span className="inline-flex items-center gap-2"><span aria-hidden>✅</span><span>Availability</span></span>}
        footer={
          <div className="flex items-center justify-between">
            <span className="text-zinc-600 dark:text-zinc-400">Receive new job requests</span>
            <Switch checked={available} onChange={setAvailable} aria-label="Toggle availability" />
          </div>
        }
      >
        <div className="text-2xl font-semibold">{available ? "Open" : "Away"}</div>
      </Card>
    </section>
  );
}
