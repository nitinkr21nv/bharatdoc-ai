import { useState } from "react"

function AuthCard({ mode, onModeChange, onAuthSuccess }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const isSignup = mode === "signup"

  const onSubmit = (event) => {
    event.preventDefault()
    const user = {
      name: isSignup ? name || "User" : "User",
      email,
    }
    localStorage.setItem("bharatdoc_user", JSON.stringify(user))
    onAuthSuccess(user)
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-md rounded-3xl border border-white/60 bg-white/75 p-6 shadow-2xl shadow-blue-100/60 backdrop-blur-md">
      <p className="text-2xl font-bold tracking-tight text-slate-900">
        {isSignup ? "Create your account" : "Welcome back"}
      </p>
      <p className="mt-1 text-sm text-slate-600">
        {isSignup ? "Start analyzing smarter documents today." : "Log in to your BharatDoc dashboard."}
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-3">
        {isSignup && (
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            required
            placeholder="Full name"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
          />
        )}
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          required
          placeholder="Email address"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          required
          placeholder="Password"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98]"
        >
          {isSignup ? "Create account" : "Login"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => onModeChange(isSignup ? "login" : "signup")}
        className="mt-4 text-sm text-blue-700 transition hover:text-blue-800"
      >
        {isSignup ? "Already have an account? Login" : "New here? Create an account"}
      </button>
    </div>
  )
}

export default AuthCard
