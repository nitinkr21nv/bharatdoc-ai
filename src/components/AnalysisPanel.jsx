function getRiskStyles(level) {
  if (level === "high") {
    return {
      badge: "bg-red-100 text-red-700 border-red-200",
      bar: "bg-red-500",
      title: "High",
    }
  }
  if (level === "medium") {
    return {
      badge: "bg-amber-100 text-amber-700 border-amber-200",
      bar: "bg-amber-500",
      title: "Medium",
    }
  }
  return {
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    bar: "bg-emerald-500",
    title: "Low",
  }
}

function AnalysisPanel({ analysis, isAnalyzing }) {
  if (isAnalyzing) {
    return (
      <section className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-xl shadow-blue-100/50 backdrop-blur-md lg:p-6">
        <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
          <span className="animate-pulse">Analyzing with AI...</span>
        </div>
      </section>
    )
  }

  if (!analysis) {
    return (
      <section className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-xl shadow-blue-100/50 backdrop-blur-md lg:p-6">
        <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
          Upload a document to get started
        </p>
      </section>
    )
  }

  const risk = getRiskStyles(analysis.riskLevel)

  return (
    <section className="animate-fade-in-up rounded-3xl border border-white/60 bg-white/70 p-5 shadow-xl shadow-blue-100/50 backdrop-blur-md lg:p-6">
      <h2 className="text-lg font-semibold text-slate-900">Analysis Dashboard</h2>

      <div className="mt-4 space-y-4">
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Section 1: Document Summary</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{analysis.summary}</p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Section 2: Key Points</p>
          <ul className="mt-2 space-y-2">
            {analysis.keyPoints.map((point) => (
              <li key={point} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                📌 {point}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Section 3: Risk Score</p>
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${risk.badge}`}>
              ⚠️ {risk.title}
            </span>
            <span className="text-sm font-semibold text-slate-700">{analysis.riskScore}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className={`h-full ${risk.bar} transition-all duration-500`} style={{ width: `${analysis.riskScore}%` }} />
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Section 4: Key Risks Detected</p>
          <div className="mt-2 space-y-2">
            {analysis.keyRisks.map((riskItem) => (
              <div key={riskItem.title} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-semibold text-slate-800">⚠️ {riskItem.title}</p>
                <p className="mt-1 text-sm text-slate-600">{riskItem.description}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Section 5: Why This Matters</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{analysis.whyItMatters}</p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Section 6: What Should You Do</p>
          <ul className="mt-2 space-y-2">
            {analysis.actions.map((action) => (
              <li key={action} className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                ✅ {action}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}

export default AnalysisPanel
