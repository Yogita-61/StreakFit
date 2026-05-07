import { useMemo, useState } from 'react'
import { getPlanForCategory } from '../utils/planData'

function ProfileCard({ user, currentBMI, bmiHistory, workoutHistory, updateProfile, darkMode, setDarkMode }) {
  const [name, setName] = useState(user?.name || '')
  const [units, setUnits] = useState('Metric')
  const [status, setStatus] = useState('')
  const plan = getPlanForCategory(currentBMI?.category)

  const streak = useMemo(() => {
    const uniqueDates = new Set(workoutHistory.map((workout) => new Date(workout.date).toDateString()))
    return uniqueDates.size
  }, [workoutHistory])

  const goal = currentBMI?.category === 'Underweight' ? 'Gain' : currentBMI?.category === 'Normal' ? 'Maintain' : 'Lose'

  const saveProfile = async () => {
    try {
      await updateProfile({ name })
      setStatus('Profile updated.')
    } catch (error) {
      setStatus(error.message)
    }
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="app-card p-6 lg:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-[1.6rem] bg-fitness-orange text-3xl font-black text-white shadow-glow">
              {user?.name?.slice(0, 1)?.toUpperCase() || 'S'}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Profile</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 dark:text-white">{user?.name}</h1>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{user?.email}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <label className="block text-sm font-black text-slate-700 dark:text-slate-200" htmlFor="profile-name">Display name</label>
            <input id="profile-name" className="control" value={name} onChange={(event) => setName(event.target.value)} />
            <button type="button" onClick={saveProfile} className="btn-primary w-full">Save Profile</button>
            {status && <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{status}</p>}
          </div>
        </div>

        <div className="app-card p-6 lg:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-fitness-orange">Body Metrics</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            <div className="metric-tile"><span>{currentBMI?.height || '--'}</span><small>Height cm</small></div>
            <div className="metric-tile"><span>{currentBMI?.weight || '--'}</span><small>Weight kg</small></div>
            <div className="metric-tile"><span>{currentBMI?.bmi || '--'}</span><small>BMI</small></div>
            <div className="metric-tile"><span>{goal}</span><small>Goal</small></div>
          </div>
          <div className="mt-5 rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
            <h2 className="text-xl font-black text-slate-950 dark:text-white">{plan.focus}</h2>
            <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">{plan.dietSummary}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="app-card p-6 lg:p-7">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Settings</p>
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
              <div>
                <p className="font-black text-slate-950 dark:text-white">Dark mode</p>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Switch the app appearance.</p>
              </div>
              <button type="button" onClick={() => setDarkMode((value) => !value)} className={`toggle ${darkMode ? 'toggle-active' : ''}`} aria-label="Toggle dark mode">
                <span />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
              <div>
                <p className="font-black text-slate-950 dark:text-white">Units</p>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Choose how metrics display.</p>
              </div>
              <div className="segmented">
                {['Metric', 'Imperial'].map((unit) => (
                  <button key={unit} type="button" onClick={() => setUnits(unit)} className={`segmented-button ${units === unit ? 'segmented-button-active' : ''}`}>{unit}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="app-card p-6 lg:p-7">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Achievements</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="achievement-card"><strong>{streak}</strong><span>Streak days</span></div>
            <div className="achievement-card"><strong>{workoutHistory.length}</strong><span>Workouts</span></div>
            <div className="achievement-card"><strong>{bmiHistory.length}</strong><span>BMI logs</span></div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-orange-50 p-4 text-sm font-black text-orange-700 dark:bg-orange-500/10 dark:text-orange-200">Consistency Badge</div>
            <div className="rounded-3xl bg-emerald-50 p-4 text-sm font-black text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">Progress Tracker Badge</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfileCard
