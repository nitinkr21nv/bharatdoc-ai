function UploadPanel({
  uploadedFile,
  isAnalyzing,
  onFileUpload,
  onAnalyze,
  onSampleDocument,
}) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-xl shadow-blue-100/50 backdrop-blur-md lg:p-6">
      <h2 className="text-lg font-semibold text-slate-900">📄 Upload Document</h2>
      <p className="mt-1 text-sm text-slate-500">Supports PDF and images for instant AI review</p>

      <input
        type="file"
        accept=".pdf,image/*"
        onChange={onFileUpload}
        className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm transition file:mr-3 file:rounded-md file:border-0 file:bg-blue-100 file:px-2.5 file:py-1.5 file:text-xs file:font-semibold file:text-blue-700 hover:border-blue-300"
      />

      {!uploadedFile && (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
          Upload a document to get started
        </div>
      )}

      {uploadedFile && (
        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-slate-700">
          Selected file: <span className="font-semibold text-slate-900">{uploadedFile.name}</span>
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <button
          type="button"
          onClick={onSampleDocument}
          className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-100 active:scale-[0.98]"
        >
          Sample Document
        </button>
        <button
          type="button"
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-300 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:from-blue-300 disabled:to-indigo-300"
        >
          {isAnalyzing ? "Analyzing with AI..." : "Analyze Document"}
        </button>
      </div>
    </section>
  )
}

export default UploadPanel
