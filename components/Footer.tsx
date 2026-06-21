import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div className="max-w-md">
            <p className="flex items-center gap-2 font-bold text-slate-900">
              <span className="grid h-6 w-6 place-items-center rounded bg-emerald-700 text-xs text-white">G</span>
              GruhaAlert
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              An independent service that collects public Karnataka Housing Board notices and presents the open
              residential plots in plain English. <strong className="font-medium text-slate-600">Not affiliated
              with KHB or any government body</strong> — always confirm on the official PDF before you act.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-emerald-700">Open plots</Link>
            <Link href="/about" className="hover:text-emerald-700">How it works</Link>
            <Link href="/privacy" className="hover:text-emerald-700">Privacy</Link>
            <Link href="/disclaimer" className="hover:text-emerald-700">Disclaimer</Link>
            <Link href="/contact" className="hover:text-emerald-700">Contact</Link>
            <a href="https://khb.karnataka.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700">KHB official ↗</a>
          </nav>
        </div>
        <p className="mt-8 border-t border-stone-100 pt-5 text-xs text-slate-400">
          © {new Date().getFullYear()} GruhaAlert · Data sourced from khb.karnataka.gov.in
        </p>
      </div>
    </footer>
  );
}
