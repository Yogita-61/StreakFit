import { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import BMIForm from '../components/bmi/BMIForm'
import ResultCard from '../components/bmi/ResultCard'
import HistoryList from '../components/bmi/HistoryList'
import RecommendationCard from '../components/bmi/RecommendationCard'
import TrendChart from '../components/bmi/TrendChart'
import Toast from '../components/bmi/Toast'
import WorkoutPlan from '../components/WorkoutPlan'
import DietPlan from '../components/DietPlan'
import ProfileCard from '../components/ProfileCard'
import { calculateBMI, getBMICategory } from '../utils/bmiUtils'
import { getImprovementInsight, getPlanForCategory } from '../utils/planData'

const toCentimeters = (height, unit) => (unit === 'ft' ? height * 30.48 : height)
const toKilograms = (weight, unit) => (unit === 'lbs' ? weight * 0.45359237 : weight)

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'D' },
  { path: '/workout', label: 'Workouts', icon: 'W' },
  { path: '/diet', label: 'Diet Plan', icon: 'N' },
  { path: '/account', label: 'Account', icon: 'A' }
]

function FitnessDashboard() {
  const {
    user,
    logout,
    currentBMI,
    bmiHistory,
    workoutHistory,
    saveBMI,
    deleteBMI,
    saveWorkout,
    updateProfile
  } = useAppContext()
  const [darkMode, setDarkMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(timer)
  }, [toast])

  const plan = getPlanForCategory(currentBMI?.category)

  const stats = useMemo(() => {
    const latest = currentBMI
    const previous = bmiHistory.length > 1 ? bmiHistory[bmiHistory.length - 2] : null
    const delta = latest && previous ? Number((Number(latest.bmi) - Number(previous.bmi)).toFixed(1)) : 0
    const workoutDates = new Set(workoutHistory.map((workout) => new Date(workout.date).toDateString()))

    return {
      total: bmiHistory.length,
      latest: latest?.bmi || '--',
      delta,
      category: latest?.category || 'Normal',
      workouts: workoutHistory.length,
      streak: workoutDates.size,
      insight: getImprovementInsight(bmiHistory)
    }
  }, [bmiHistory, currentBMI, workoutHistory])

  const handleCalculate = async ({ height, weight, heightUnit, weightUnit }) => {
    const normalizedHeight = Number(toCentimeters(height, heightUnit).toFixed(1))
    const normalizedWeight = Number(toKilograms(weight, weightUnit).toFixed(1))
    const bmi = Number(calculateBMI(normalizedHeight, normalizedWeight))
    const category = getBMICategory(bmi)

    const record = {
      bmi,
      category,
      height: normalizedHeight,
      weight: normalizedWeight,
      inputHeight: String(height),
      inputWeight: String(weight),
      heightUnit,
      weightUnit,
      date: new Date().toISOString()
    }

    try {
      setIsSaving(true)
      await saveBMI(record)
      setToast({ message: 'BMI calculated successfully', type: 'success' })
    } catch (error) {
      setToast({ message: error.message, type: 'error' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (recordId) => {
    try {
      await deleteBMI(recordId)
      setToast({ message: 'BMI record deleted', type: 'success' })
    } catch (error) {
      setToast({ message: error.message, type: 'error' })
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="app-card animate-fade-up overflow-hidden p-6 lg:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-fitness-orange">Health Dashboard</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Know your BMI. Build your streak. Follow the right plan.
            </h1>
            <p className="mt-4 text-sm font-semibold leading-6 text-slate-500 dark:text-slate-400">
              Calculate BMI multiple times, watch your trend, and get workout and diet recommendations that adapt to your latest result.
            </p>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="metric-tile"><span>{stats.streak}</span><small>Streak days</small></div>
            <div className="metric-tile"><span>{stats.workouts}</span><small>Workouts</small></div>
            <div className="metric-tile"><span>{stats.total}</span><small>BMI logs</small></div>
          </div>
        </div>

        <div className="app-card animate-fade-up p-6" style={{ animationDelay: '80ms' }}>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Quick Insights</p>
          <p className="mt-5 text-2xl font-black leading-tight text-slate-950 dark:text-white">{stats.insight}</p>
          <div className="mt-5 rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
            <p className="text-xs font-black uppercase tracking-wide text-slate-400">Latest BMI</p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <span className="text-4xl font-black text-slate-950 dark:text-white">{stats.latest}</span>
              <span className={`text-xl font-black ${stats.delta <= 0 ? 'text-fitness-green' : 'text-fitness-orange'}`}>
                {stats.total > 1 ? (stats.delta > 0 ? `+${stats.delta}` : stats.delta) : '--'}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <BMIForm onCalculate={handleCalculate} isSaving={isSaving} />
        <ResultCard result={currentBMI} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <TrendChart history={bmiHistory} />
        <RecommendationCard category={currentBMI?.category} />
      </section>

      <section className="app-card p-6 lg:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-fitness-orange">Quick Plan Preview</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">{plan.focus}</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold text-slate-500 dark:text-slate-400">{plan.workoutSummary} {plan.dietSummary}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => navigate('/workout')} className="btn-primary">View Workouts</button>
            <button type="button" onClick={() => navigate('/diet')} className="btn-secondary">View Diet</button>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-orange-50 p-5 dark:bg-orange-500/10">
            <p className="text-xs font-black uppercase tracking-wide text-orange-700 dark:text-orange-200">Workout</p>
            <p className="mt-2 text-lg font-black text-slate-950 dark:text-white">{plan.weeklyTarget}</p>
          </div>
          <div className="rounded-3xl bg-emerald-50 p-5 dark:bg-emerald-500/10">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-200">Diet</p>
            <p className="mt-2 text-lg font-black text-slate-950 dark:text-white">{plan.recommendedFoods.slice(0, 4).join(', ')}</p>
          </div>
        </div>
      </section>

      <HistoryList history={bmiHistory} onDelete={handleDelete} />
    </div>
  )

  const renderPage = () => {
    if (location.pathname === '/workout') {
      return (
        <WorkoutPlan
          currentBMI={currentBMI}
          workoutHistory={workoutHistory}
          saveWorkout={saveWorkout}
          onGoDashboard={() => navigate('/dashboard')}
        />
      )
    }

    if (location.pathname === '/diet') {
      return <DietPlan currentBMI={currentBMI} onGoDashboard={() => navigate('/dashboard')} />
    }

    if (location.pathname === '/account') {
      return (
        <ProfileCard
          user={user}
          currentBMI={currentBMI}
          bmiHistory={bmiHistory}
          workoutHistory={workoutHistory}
          updateProfile={updateProfile}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )
    }

    return renderDashboard()
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <main className="min-h-screen bg-fitness-mist text-slate-950 transition-colors dark:bg-slate-950 dark:text-white">
        <Toast message={toast?.message} type={toast?.type} />

        <header className="sticky top-0 z-40 border-b border-white/70 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <button type="button" onClick={() => navigate('/dashboard')} className="flex items-center gap-3 text-left">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fitness-orange text-lg font-black text-white shadow-glow">
                S
              </div>
              <div>
                <p className="text-xl font-black tracking-tight text-slate-950 dark:text-white">StreakFit</p>
                <p className="text-xs font-bold text-slate-400">Premium BMI fitness planner</p>
              </div>
            </button>

            <nav className="hidden items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900 lg:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive || (item.path === '/dashboard' && location.pathname === '/home') ? 'nav-link-active' : ''}`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDarkMode((value) => !value)}
                className="icon-button"
                aria-label="Toggle dark mode"
                title="Toggle dark mode"
              >
                {darkMode ? 'L' : 'D'}
              </button>
              <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-xs font-black text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                  {user?.name?.slice(0, 1)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-white">{user?.name || 'User'}</p>
                  <p className="text-[11px] font-semibold text-slate-400">{user?.email}</p>
                </div>
              </div>
              <button type="button" onClick={handleLogout} className="btn-secondary hidden sm:inline-flex">Logout</button>
            </div>
          </div>

          <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-4 sm:px-6 lg:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link min-w-fit ${isActive || (item.path === '/dashboard' && location.pathname === '/home') ? 'nav-link-active' : ''}`}
              >
                <span>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {renderPage()}
        </div>
      </main>
    </div>
  )
}

export default FitnessDashboard
