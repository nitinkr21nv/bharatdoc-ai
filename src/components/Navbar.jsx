function Navbar({ user, onLogout, onOpenAuth, view }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/40 bg-white/65 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <div>
          <p className="text-xl font-bold tracking-tight text-slate-900">BharatDoc 🇮🇳</p>
          <p className="text-xs text-slate-600">Clarity Before You Sign</p>
        </div>

        {!user && view === "marketing" && (
          <nav className="hidden items-center gap-5 text-sm text-slate-600 lg:flex">
            <a href="#how-it-works" className="transition hover:text-slate-900">
              How it works
            </a>
            <a href="#capabilities" className="transition hover:text-slate-900">
              Capabilities
            </a>
            <a href="#contracts" className="transition hover:text-slate-900">
              Contracts
            </a>
            <a href="#faqs" className="transition hover:text-slate-900">
              FAQs
            </a>
          </nav>
        )}

        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 sm:inline">
              {user.email}
            </span>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenAuth("login")}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => onOpenAuth("signup")}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700"
            >
              Signup
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
