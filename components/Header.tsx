import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-700 text-sm font-bold text-white">G</span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Gruha<span className="text-emerald-700">Alert</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-emerald-700">Open plots</Link>
          <Link href="/guides" className="hover:text-emerald-700">Guides</Link>
          <Link href="/about" className="hidden hover:text-emerald-700 sm:inline">About</Link>
          <a href="https://khb.karnataka.gov.in/23/online-application-for-allotment/en"
            target="_blank" rel="noopener noreferrer"
            className="hidden rounded-lg bg-emerald-700 px-3.5 py-1.5 text-white hover:bg-emerald-800 sm:inline-block">
            KHB portal
          </a>
        </nav>
      </div>
    </header>
  );
}
