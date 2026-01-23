import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <section className="flex flex-col items-center gap-8 text-center">
          <div className="flex items-center gap-3 rounded-full border border-black/10 px-3 py-1 text-sm dark:border-white/15">
            <span className="inline-flex h-2 w-2 rounded-full bg-sky-500" />
            <span>Live on Base · Low fees, fast finality</span>
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Hire verified artisans with escrowed payments on Base
          </h1>
          <p className="max-w-2xl text-lg leading-7 text-zinc-600 dark:text-zinc-400">
            Bloconnect lets clients safely hire verified artisans. Funds are held in smart contract escrow with timeouts and dispute protection.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/artisans"
              className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-300"
            >
              Find artisans.
            </Link>
            <Link
              href="/profile"
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 px-6 transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            >
              Become an artisan
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <Image src="/globe.svg" alt="Base" width={18} height={18} className="opacity-80" />
            <span>Optimized for Base · EVM compatible</span>
          </div>
        </section>

        <section className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-black/10 p-5 dark:border-white/15">
            <h3 className="text-lg font-medium">Escrowed payments</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Funds are locked until completion or finalized after dispute windows.</p>
          </div>
          <div className="rounded-2xl border border-black/10 p-5 dark:border-white/15">
            <h3 className="text-lg font-medium">Timeouts & disputes</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Automatic timeouts allow artisans to claim; clients can dispute within the window.</p>
          </div>
          <div className="rounded-2xl border border-black/10 p-5 dark:border-white/15">
            <h3 className="text-lg font-medium">Verified artisans</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Profiles show verification state so clients can hire confidently.</p>
          </div>
          <div className="rounded-2xl border border-black/10 p-5 dark:border-white/15">
            <h3 className="text-lg font-medium">Low fees on Base</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Fast, low-cost transactions with a configurable platform fee.</p>
          </div>
        </section>

        <section id="how-it-works" className="mt-28">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl">How it works</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Simple, transparent steps for clients and artisans.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-black/10 p-6 dark:border-white/15">
            <div className="text-3xl font-semibold">1</div>
            <h4 className="mt-3 font-medium">Browse artisans</h4>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Pick a verified artisan that fits your job.</p>
          </div>
          <div className="rounded-2xl border border-black/10 p-6 dark:border-white/15">
            <div className="text-3xl font-semibold">2</div>
            <h4 className="mt-3 font-medium">Create and fund job</h4>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Lock payment in the smart contract escrow.</p>
          </div>
          <div className="rounded-2xl border border-black/10 p-6 dark:border-white/15">
            <div className="text-3xl font-semibold">3</div>
            <h4 className="mt-3 font-medium">Complete or claim</h4>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Client marks complete for withdrawal, or artisan claims after timeout.</p>
          </div>
          </div>
        </section>
      </main>
    </div>
  );
}
