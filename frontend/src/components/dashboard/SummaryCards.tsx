"use client";

import Card from "@/components/ui/Card";

export default function SummaryCards() {
  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card title="Total earnings">
        <div className="text-2xl font-semibold">Ξ 0.00</div>
      </Card>
      <Card title="Active jobs">
        <div className="text-2xl font-semibold">0</div>
      </Card>
      <Card title="Rating">
        <div className="text-2xl font-semibold">—</div>
      </Card>
      <Card title="Availability">
        <div className="text-2xl font-semibold">Open</div>
      </Card>
    </section>
  );
}
