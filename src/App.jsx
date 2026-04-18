import { useEffect, useState } from "react"
import AnalysisPanel from "./components/AnalysisPanel"
import AuthCard from "./components/AuthCard"
import Navbar from "./components/Navbar"
import UploadPanel from "./components/UploadPanel"
import { simulateAnalysis } from "./services/simulateAnalysis"

function getStoredUser() {
  const raw = localStorage.getItem("bharatdoc_user")
  return raw ? JSON.parse(raw) : null
}

function App() {
  const [user, setUser] = useState(getStoredUser)
  const [view, setView] = useState(user ? "dashboard" : "marketing")
  const [authMode, setAuthMode] = useState("login")
  const [theme, setTheme] = useState("light")
  const [walkthroughIndex, setWalkthroughIndex] = useState(0)
  const [waitlistEmail, setWaitlistEmail] = useState("")
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)
  const [showDeferredSections, setShowDeferredSections] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const onFileUpload = (event) => {
    const file = event.target.files?.[0]
    setUploadedFile(file || null)
    setAnalysis(null)
  }

  const onAnalyze = async () => {
    if (!uploadedFile) {
      return
    }

    setIsAnalyzing(true)
    await new Promise((resolve) => setTimeout(resolve, 1400))
    setAnalysis(simulateAnalysis(uploadedFile.name, "en"))
    setIsAnalyzing(false)
  }

  const useSampleDocument = () => {
    const sampleName = "sample-loan-agreement.pdf"
    setUploadedFile({ name: sampleName })
    setAnalysis(simulateAnalysis(sampleName, "en"))
  }

  const onAuthSuccess = (authUser) => {
    setUser(authUser)
    setView("dashboard")
  }

  const onLogout = () => {
    localStorage.removeItem("bharatdoc_user")
    setUser(null)
    setView("marketing")
    setUploadedFile(null)
    setAnalysis(null)
  }

  const onOpenAuth = (mode) => {
    setAuthMode(mode)
    setView("auth")
  }

  const walkthroughSteps = [
    {
      title: "Upload in one click",
      description: "Drop contracts or policies and get instant extraction + clause indexing.",
    },
    {
      title: "AI detects risk patterns",
      description: "Surface red flags, unusual obligations, and hidden financial exposure.",
    },
    {
      title: "Act with confidence",
      description: "Use plain-language recommendations before legal final review.",
    },
  ]

  const onJoinWaitlist = (event) => {
    event.preventDefault()
    if (!waitlistEmail.trim()) return
    setWaitlistSubmitted(true)
    setWaitlistEmail("")
  }

  useEffect(() => {
    const timer = window.setTimeout(() => setShowDeferredSections(true), 80)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <main
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-slate-100"
          : "bg-gradient-to-b from-[#eef3ff] via-[#f8f7ff] to-[#f8faff] text-slate-800"
      } ${theme === "dark" ? "theme-dark" : "theme-light"}`}
    >
      <Navbar user={user} onLogout={onLogout} onOpenAuth={onOpenAuth} view={view} />

      <div className="mx-auto w-full max-w-[420px] px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-10 lg:py-10">
        {view === "auth" ? (
          <AuthCard mode={authMode} onModeChange={setAuthMode} onAuthSuccess={onAuthSuccess} />
        ) : view === "dashboard" ? (
          <>
            <section className="rounded-3xl border border-white/60 bg-white/65 p-5 shadow-xl shadow-blue-100/60 backdrop-blur-md sm:p-6 lg:p-10">
              <div className="text-center lg:text-left">
                <p className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-6xl">BharatDoc 🇮🇳</p>
                <p className="mt-2 text-base font-semibold leading-tight text-slate-700 sm:mt-3 sm:text-lg lg:text-2xl">
                  Understand any document in seconds
                </p>
                <p className="mt-1.5 text-sm font-medium text-blue-700 lg:mt-2 lg:text-base">Clarity Before You Sign</p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 lg:justify-start">
                  <span className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1">
                    Used by 10,000+ users
                  </span>
                  <span className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1">
                    Trusted for document clarity
                  </span>
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-7">
              <UploadPanel
                uploadedFile={uploadedFile}
                isAnalyzing={isAnalyzing}
                onFileUpload={onFileUpload}
                onAnalyze={onAnalyze}
                onSampleDocument={useSampleDocument}
              />
              <AnalysisPanel analysis={analysis} isAnalyzing={isAnalyzing} />
            </section>
          </>
        ) : (
          <>
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                  theme === "dark"
                    ? "border-slate-600 bg-slate-900 text-slate-200 hover:bg-slate-800"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {theme === "light" ? "Dark mode" : "Light mode"}
              </button>
            </div>

            <section className="glass-card parallax-soft animate-fade-in-up stagger-1 relative overflow-hidden rounded-3xl border border-white/70 bg-white/70 px-5 py-8 shadow-2xl shadow-blue-100/60 backdrop-blur-md sm:px-6 sm:py-10 lg:px-10 lg:py-16">
              <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-blue-200/40 blur-3xl" />
              <div className="pointer-events-none absolute -right-16 -bottom-20 h-56 w-56 rounded-full bg-indigo-200/40 blur-3xl" />
              <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:text-left">
                <div className="text-center lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">AI Contract Assistant</p>
                <h1 className="mt-2.5 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:mt-3 sm:text-5xl lg:text-6xl">
                  Speed up your document negotiations with AI
                </h1>
                <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:mt-4 sm:text-lg sm:leading-7">
                  Get insights quickly, identify important terms, and evaluate risk before you send it for final review.
                </p>
                <div className="mx-auto mt-5 grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
                  {[
                    ["10k+", "Documents reviewed"],
                    ["< 60s", "Average first summary"],
                    ["99.9%", "Secure processing uptime"],
                  ].map(([value, label]) => (
                    <div key={label} className="surface-card rounded-xl border border-white/80 bg-white/80 p-3 shadow-sm">
                      <p className="text-lg font-bold text-slate-900">{value}</p>
                      <p className="text-xs text-slate-600">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 lg:justify-start">
                  <button
                    type="button"
                    onClick={() => onOpenAuth("signup")}
                    className="btn-glow rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Start Free
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenAuth("login")}
                    className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50"
                  >
                    Login
                  </button>
                </div>
              </div>
                <div className="animate-float relative mx-auto hidden h-60 w-full max-w-sm lg:block">
                  <div className="absolute left-6 top-4 w-56 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl">
                    <p className="text-xs font-semibold text-blue-700">Document Summary</p>
                    <p className="mt-2 text-xs text-slate-600">Risks identified in repayment and penalty clauses.</p>
                  </div>
                  <div className="absolute right-2 top-20 w-60 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl">
                    <p className="text-xs font-semibold text-slate-800">AI Risk Score</p>
                    <div className="mt-2 h-2 rounded-full bg-slate-100">
                      <div className="h-full w-3/4 rounded-full bg-amber-400" />
                    </div>
                    <p className="mt-2 text-xs text-slate-600">Medium risk. Review before signing.</p>
                  </div>
                  <div className="absolute bottom-2 left-12 w-52 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl">
                    <p className="text-xs font-semibold text-emerald-700">Suggested action</p>
                    <p className="mt-1 text-xs text-slate-600">Request clarification on variable interest terms.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="glass-card animate-fade-in-up stagger-2 mt-5 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 shadow-lg shadow-blue-100/40 sm:mt-6">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Trusted by modern teams</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-center text-xs font-medium text-slate-600 sm:grid-cols-4">
                {["Astra Legal", "PaperBridge", "Nova VC", "UrbanStack"].map((logo) => (
                  <div key={logo} className="surface-card rounded-lg border border-slate-200 bg-white px-2 py-2">
                    {logo}
                  </div>
                ))}
              </div>
            </section>

            <section id="how-it-works" className="perf-section glass-card animate-fade-in-up stagger-3 mt-6 rounded-3xl border border-white/70 bg-white/65 p-5 shadow-xl shadow-blue-100/40 backdrop-blur-md sm:mt-8 sm:p-6 lg:p-8">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">How it works</p>
                  <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
                    Built for fast, confident document decisions
                  </h2>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["01", "Upload your document", "Upload document(s) or URL. Our AI evaluates with a consistent playbook."],
                  ["02", "Get a quick summary", "See key clauses, red flags, and plain-language explanations instantly."],
                  ["03", "Understand change impact", "Compare revisions and understand what changed and why it matters."],
                ].map(([step, title, desc]) => (
                  <article key={title} className="surface-card rounded-2xl border border-white/80 bg-white/80 p-5 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
                    <p className="text-xs font-bold tracking-wider text-blue-700">{step}</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{title}</p>
                    <p className="mt-2 text-sm text-slate-600">{desc}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="capabilities" className="perf-section glass-card animate-fade-in-up stagger-4 mt-6 rounded-3xl border border-white/70 bg-white/70 p-5 shadow-xl shadow-blue-100/40 backdrop-blur-md sm:mt-8 sm:p-6 lg:p-8">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Your personal document assistant</h2>
              <p className="mt-1.5 text-sm leading-6 text-slate-600 lg:text-base">
                BharatDoc automates repetitive review tasks so you can focus on critical decisions faster.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="surface-card rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">Bulk analysis</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Understand what is inside all contracts and export summary reports for teams.
                  </p>
                </div>
                <div className="surface-card rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">Change intelligence</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Spot additions, deletions, and risk shifts between versions in seconds.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "NDA",
                  "Privacy Policy",
                  "SaaS Contracts",
                  "Master Service Agreement",
                  "Supplier Agreement",
                  "Employee Agreement",
                ].map((item) => (
                  <div
                    key={item}
                    className="surface-card rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {showDeferredSections && (
              <section className="perf-section glass-card animate-fade-in-up stagger-4 mt-6 rounded-3xl border border-white/70 bg-white/75 p-5 shadow-xl shadow-blue-100/40 backdrop-blur-md sm:mt-8 sm:p-6 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Product walkthrough</p>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">See BharatDoc in 3 steps</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setWalkthroughIndex((prev) => (prev === 0 ? walkthroughSteps.length - 1 : prev - 1))}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => setWalkthroughIndex((prev) => (prev + 1) % walkthroughSteps.length)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700"
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="surface-card mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                  Step {walkthroughIndex + 1} of {walkthroughSteps.length}
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{walkthroughSteps[walkthroughIndex].title}</p>
                <p className="mt-2 text-sm text-slate-600">{walkthroughSteps[walkthroughIndex].description}</p>
              </div>
              </section>
            )}

            {showDeferredSections && (
              <section className="perf-section glass-card animate-fade-in-up stagger-5 mt-6 rounded-3xl border border-white/70 bg-white/75 p-5 shadow-xl shadow-blue-100/40 backdrop-blur-md sm:mt-8 sm:p-6 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Pricing</p>
              <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Simple plans for every team</h3>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {[
                  ["Starter", "Free", ["5 docs/month", "AI summary", "Basic risk alerts"]],
                  ["Growth", "$19/mo", ["Unlimited docs", "Advanced risk scoring", "Priority processing"]],
                  ["Scale", "Custom", ["Team workspace", "Bulk analysis", "API + enterprise support"]],
                ].map(([plan, price, features], idx) => (
                  <article
                    key={plan}
                    className={`rounded-2xl border p-4 shadow-sm ${
                      idx === 1 ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white"
                    }`}
                  >
                    <p className="text-sm font-semibold text-slate-900">{plan}</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">{price}</p>
                    <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                      {features.map((feature) => (
                        <li key={feature}>• {feature}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
              </section>
            )}

            {showDeferredSections && (
              <section className="perf-section glass-card animate-fade-in-up stagger-5 mt-6 rounded-3xl border border-white/70 bg-white/75 p-5 shadow-xl shadow-blue-100/40 backdrop-blur-md sm:mt-8 sm:p-6 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">What users say</p>
              <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Loved by founders and legal teams</h3>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {[
                  ["Aarav S.", "Founder", "BharatDoc saved us hours every week by turning legal text into clear action items."],
                  ["Nisha R.", "Ops Lead", "The risk scoring and summary view made negotiations much faster and more confident."],
                  ["Rohan M.", "Product Manager", "Looks and feels like a premium tool. Perfect for demos and real workflows."],
                ].map(([name, role, quote]) => (
                  <article key={name} className="surface-card rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                        {name[0]}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{name}</p>
                        <p className="text-xs text-slate-500">{role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">“{quote}”</p>
                  </article>
                ))}
              </div>
              </section>
            )}

            <section id="contracts" className="perf-section animate-fade-in-up stagger-5 mt-6 grid gap-4 sm:mt-8 lg:grid-cols-2">
              <article className="glass-card rounded-2xl border border-white/70 bg-white/75 p-5 shadow-lg shadow-blue-100/40 backdrop-blur-md">
                <p className="text-sm font-semibold text-slate-900">Save time</p>
                <p className="mt-2 text-sm text-slate-600">
                  Jump directly to critical sections and reduce manual review effort.
                </p>
              </article>
              <article className="glass-card rounded-2xl border border-white/70 bg-white/75 p-5 shadow-lg shadow-blue-100/40 backdrop-blur-md">
                <p className="text-sm font-semibold text-slate-900">Protect information</p>
                <p className="mt-2 text-sm text-slate-600">
                  Keep confidential data safer with privacy-first processing flows.
                </p>
              </article>
              <article className="glass-card rounded-2xl border border-white/70 bg-white/75 p-5 shadow-lg shadow-blue-100/40 backdrop-blur-md">
                <p className="text-sm font-semibold text-slate-900">Scale your practice</p>
                <p className="mt-2 text-sm text-slate-600">
                  Analyze large volumes of documents with consistent quality and speed.
                </p>
              </article>
              <article className="glass-card rounded-2xl border border-white/70 bg-white/75 p-5 shadow-lg shadow-blue-100/40 backdrop-blur-md">
                <p className="text-sm font-semibold text-slate-900">Risk-first clarity</p>
                <p className="mt-2 text-sm text-slate-600">
                  Get actionable warnings and plain-language explanations before you sign.
                </p>
              </article>
            </section>

            <section id="faqs" className="perf-section glass-card animate-fade-in-up stagger-6 mt-6 rounded-3xl border border-white/70 bg-white/70 p-5 shadow-xl shadow-blue-100/40 backdrop-blur-md sm:mt-8 sm:p-6 lg:p-8">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">FAQs</h2>
              <div className="mt-4 space-y-3">
                {[
                  "How does it work?",
                  "How does BharatDoc identify red flags?",
                  "How much does it cost?",
                  "Is the AI as good as a lawyer?",
                ].map((faq) => (
                  <details key={faq} className="surface-card group rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <summary className="cursor-pointer list-none text-sm font-semibold text-slate-800">
                      {faq}
                    </summary>
                    <p className="mt-2 text-sm text-slate-600">
                      BharatDoc provides AI-generated insights to speed up review and improve clarity before professional final review.
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <section className="animate-fade-in-up stagger-7 mt-6 rounded-3xl border border-blue-200/60 bg-gradient-to-r from-blue-600 to-indigo-600 p-5 pb-20 text-white shadow-xl shadow-blue-300/30 sm:mt-8 sm:p-6 lg:flex lg:items-center lg:justify-between lg:pb-8 lg:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">Ready to start</p>
                <p className="mt-2 text-2xl font-bold tracking-tight">Bring clarity to every agreement you review</p>
                <p className="mt-2 text-sm text-blue-100">Create your account and test BharatDoc with sample documents in minutes.</p>
                <form onSubmit={onJoinWaitlist} className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    placeholder="Enter work email"
                    value={waitlistEmail}
                    onChange={(event) => setWaitlistEmail(event.target.value)}
                    className="w-full rounded-xl border border-blue-200 bg-white/95 px-3 py-2 text-sm text-slate-800 outline-none sm:max-w-xs"
                  />
                  <button
                    type="submit"
                    className="rounded-xl border border-white/60 bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25"
                  >
                    Join Waitlist
                  </button>
                </form>
                {waitlistSubmitted && (
                  <p className="mt-2 text-xs text-blue-100">Thanks! We will contact you shortly.</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => onOpenAuth("signup")}
                className="btn-glow mt-4 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-50 lg:mt-0"
              >
                Create Free Account
              </button>
            </section>

            <footer className="mt-8 rounded-2xl border border-white/70 bg-white/70 px-5 py-4 text-center text-xs text-slate-500 shadow-lg shadow-blue-100/30">
              BharatDoc 🇮🇳 · Copyright © 2026 · AI-generated insights for informational purposes only.
            </footer>

            <div className="fixed bottom-4 left-1/2 z-30 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-blue-200 bg-white/95 p-2 shadow-2xl shadow-blue-200 backdrop-blur md:hidden">
              <button
                type="button"
                onClick={() => onOpenAuth("signup")}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white"
              >
                Start Free Today
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default App
