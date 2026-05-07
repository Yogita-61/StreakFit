import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { api } from '../services/api'

function LoginRegister({ defaultMode = 'login' }) {
  const [isLogin, setIsLogin] = useState(defaultMode !== 'register')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAppContext()
  const navigate = useNavigate()

  const resetMessage = () => setMessage('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      const { user } = await api.login({ email, password })
      await login(user)
      navigate('/dashboard')
    } catch (err) {
      setMessage(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      await api.register({ name, email, password })
      setMessage('Registration successful. You can log in now.')

      setTimeout(() => {
        setIsLogin(true)
        setName('')
        setPassword('')
      }, 900)
    } catch (err) {
      setMessage(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-fitness-mist px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-soft lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative flex min-h-[420px] flex-col justify-between overflow-hidden bg-gradient-to-br from-fitness-orange via-orange-500 to-fitness-green p-6 text-white sm:p-10">
          <div className="absolute inset-6 rounded-[1.5rem] border border-white/20" />
          <div className="relative flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-black text-fitness-orange shadow-lg">S</span>
            <span className="text-xl font-black">StreakFit</span>
          </div>

          <div className="relative max-w-xl py-12">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/75">Premium health dashboard</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">BMI clarity for healthier daily choices.</h1>
            <p className="mt-5 max-w-md text-base font-semibold leading-7 text-white/82">
              Calculate BMI, watch your trend, and get focused recommendations in a calm, motivating workspace.
            </p>
          </div>

          <div className="relative grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/25 bg-white/18 p-4 backdrop-blur">
              <p className="text-3xl font-black">4</p>
              <p className="text-sm font-bold text-white/75">BMI ranges tracked</p>
            </div>
            <div className="rounded-3xl border border-white/25 bg-white/18 p-4 backdrop-blur">
              <p className="text-3xl font-black">24/7</p>
              <p className="text-sm font-bold text-white/75">Progress history</p>
            </div>
          </div>
        </div>

        <div className="flex items-center p-6 sm:p-10">
          <div className="w-full">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-fitness-orange">{isLogin ? 'Welcome back' : 'Create account'}</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">{isLogin ? 'Log in to continue' : 'Start your fitness journey'}</h2>
            <p className="mt-2 text-sm font-semibold text-slate-500">Your BMI history and recommendations are saved in MongoDB.</p>

          <div className="mt-7 grid grid-cols-2 gap-1 rounded-2xl border border-slate-200 bg-slate-100 p-1" role="tablist" aria-label="Authentication mode">
            <button
              type="button"
              className={`rounded-xl px-4 py-3 text-sm font-black transition ${isLogin ? 'bg-white text-fitness-orange shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              onClick={() => {
                setIsLogin(true)
                resetMessage()
              }}
            >
              Login
            </button>
            <button
              type="button"
              className={`rounded-xl px-4 py-3 text-sm font-black transition ${!isLogin ? 'bg-white text-fitness-orange shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              onClick={() => {
                setIsLogin(false)
                resetMessage()
              }}
            >
              Register
            </button>
          </div>

          {message && (
            <div className={`mt-5 rounded-2xl border px-4 py-3 text-sm font-black ${message.includes('successful') ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
              {message}
            </div>
          )}

          <form className="mt-6 space-y-5" onSubmit={isLogin ? handleLogin : handleRegister}>
            {!isLogin && (
              <div>
                <label htmlFor="auth-name" className="mb-2 block text-sm font-black text-slate-700">Name</label>
                <input
                  id="auth-name"
                  type="text"
                  className="control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor="auth-email" className="mb-2 block text-sm font-black text-slate-700">Email</label>
              <input
                id="auth-email"
                type="email"
                className="control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="auth-password" className="mb-2 block text-sm font-black text-slate-700">Password</label>
              <input
                id="auth-password"
                type="password"
                className="control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="min-h-14 w-full rounded-2xl bg-fitness-orange px-5 text-base font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:opacity-70" disabled={isSubmitting}>
              {isSubmitting ? 'Please wait...' : isLogin ? 'Login' : 'Create account'}
            </button>
          </form>
        </div>
        </div>
      </section>
    </main>
  )
}

export default LoginRegister
