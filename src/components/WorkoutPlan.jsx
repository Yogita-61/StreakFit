import { useEffect, useMemo, useState } from 'react'
import WorkoutAnimation from './WorkoutAnimation'
import { getPlanForCategory } from '../utils/planData'

function WorkoutPlan({ currentBMI, workoutHistory, saveWorkout, onGoDashboard }) {
  const plan = getPlanForCategory(currentBMI?.category)
  const [selectedLevel, setSelectedLevel] = useState(plan.levels[0])
  const [selectedCategory, setSelectedCategory] = useState(plan.workoutCategories[0])
  const [activeWorkout, setActiveWorkout] = useState(null)
  const [seconds, setSeconds] = useState(0)
  const [completed, setCompleted] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    setSelectedLevel(plan.levels[0])
    setSelectedCategory(plan.workoutCategories[0])
    setCompleted([])
  }, [plan])

  useEffect(() => {
    if (!activeWorkout) return undefined
    const timer = setInterval(() => setSeconds((value) => value + 1), 1000)
    return () => clearInterval(timer)
  }, [activeWorkout])

  const weeklyCalories = useMemo(
    () => plan.exercises.reduce((total, exercise) => total + exercise.calories, 0),
    [plan.exercises]
  )

  const completedThisWeek = workoutHistory.filter((workout) => {
    const workoutDate = new Date(workout.date)
    const daysAgo = (Date.now() - workoutDate.getTime()) / 86400000
    return daysAgo <= 7
  })

  const completeWorkout = async (workout) => {
    if (completed.includes(workout.name)) return

    try {
      await saveWorkout({
        name: workout.name,
        category: currentBMI?.category || plan.category,
        date: new Date().toISOString()
      })
      setCompleted((items) => [...items, workout.name])
      setMessage('Workout saved to your history.')
    } catch (error) {
      setMessage(error.message)
    }
  }

  if (!currentBMI) {
    return (
      <section className="app-card p-8 text-center">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-fitness-orange">Workout Plan</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Calculate BMI to unlock your plan</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm font-semibold text-slate-500 dark:text-slate-400">
          StreakFit builds the workout schedule around your BMI category so the intensity matches your current goal.
        </p>
        <button type="button" onClick={onGoDashboard} className="btn-primary mt-6">Open BMI Calculator</button>
      </section>
    )
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="app-card overflow-hidden p-6 lg:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-fitness-orange">BMI-Based Workout Plan</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {plan.focus}
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-500 dark:text-slate-400">{plan.workoutSummary}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {plan.workoutCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`pill-button ${selectedCategory === category ? 'pill-button-active' : ''}`}
              >
                {category}
              </button>
            ))}
            {plan.levels.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedLevel(level)}
                className={`pill-button ${selectedLevel === level ? 'pill-button-active' : ''}`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="app-card p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Weekly Summary</p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="metric-tile">
              <span>{completedThisWeek.length}</span>
              <small>Done</small>
            </div>
            <div className="metric-tile">
              <span>{weeklyCalories}</span>
              <small>Cal</small>
            </div>
            <div className="metric-tile">
              <span>{plan.weeklyPlan.filter((day) => day.minutes > 0).length}</span>
              <small>Days</small>
            </div>
          </div>
          <p className="mt-4 rounded-2xl bg-orange-50 p-4 text-sm font-bold text-orange-700 dark:bg-orange-500/10 dark:text-orange-200">
            Target: {plan.weeklyTarget}
          </p>
        </div>
      </section>

      <section className="app-card p-6 lg:p-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Weekly Schedule</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">Day-wise structure</h2>
          </div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{selectedCategory} / {selectedLevel}</p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plan.weeklyPlan.map((day) => (
            <article key={day.day} className="rounded-3xl border border-slate-100 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-soft dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-black text-fitness-orange shadow-sm dark:bg-slate-900">{day.day}</span>
                <span className="text-xs font-black uppercase text-slate-400">{day.minutes || 'Rest'} min</span>
              </div>
              <h3 className="mt-4 text-lg font-black text-slate-950 dark:text-white">{day.title}</h3>
              <p className="mt-2 min-h-10 text-sm font-semibold text-slate-500 dark:text-slate-400">{day.details}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full rounded-full bg-fitness-orange" style={{ width: `${day.intensity}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <div className="app-card p-6 lg:p-7">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Active Workout Mode</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">Step-by-step exercises</h2>
          {message && <p className="mt-4 rounded-2xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">{message}</p>}
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {plan.exercises.map((exercise) => (
              <article key={exercise.name} className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-950">
                <WorkoutAnimation exerciseName={exercise.name} />
                <div className="mt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-black text-slate-950 dark:text-white">{exercise.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{exercise.description}</p>
                    </div>
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-fitness-orange dark:bg-orange-500/10">{exercise.calories} cal</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="mini-stat"><strong>{exercise.sets}</strong><span>Sets</span></div>
                    <div className="mini-stat"><strong>{exercise.reps}</strong><span>Reps</span></div>
                    <div className="mini-stat"><strong>{exercise.duration}</strong><span>Time</span></div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button type="button" onClick={() => { setActiveWorkout(exercise); setSeconds(0) }} className="btn-secondary flex-1">Start</button>
                    <button type="button" onClick={() => completeWorkout(exercise)} className="btn-primary flex-1">
                      {completed.includes(exercise.name) ? 'Done' : 'Complete'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="app-card p-6 lg:p-7">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Workout History</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">Recent sessions</h2>
          <div className="mt-5 space-y-3">
            {workoutHistory.length === 0 ? (
              <p className="rounded-3xl bg-slate-50 p-6 text-center text-sm font-bold text-slate-400 dark:bg-slate-950">Completed workouts will appear here.</p>
            ) : (
              workoutHistory.slice(-7).reverse().map((workout, index) => (
                <div key={`${workout.name}-${workout.date}-${index}`} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                  <div>
                    <p className="font-black text-slate-950 dark:text-white">{workout.name}</p>
                    <p className="text-xs font-bold text-slate-400">{workout.category} / {new Date(workout.date).toLocaleDateString()}</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">Saved</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {activeWorkout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="grid max-h-[92vh] w-full max-w-4xl overflow-auto rounded-[2rem] bg-white p-5 shadow-soft dark:bg-slate-900 lg:grid-cols-[0.9fr_1fr] lg:p-7">
            <WorkoutAnimation exerciseName={activeWorkout.name} large />
            <div className="p-2 lg:p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-fitness-orange">Workout Timer</p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">{activeWorkout.name}</h2>
              <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">{activeWorkout.description}</p>
              <div className="mt-6 rounded-3xl bg-slate-50 p-6 text-center dark:bg-slate-950">
                <p className="text-5xl font-black text-slate-950 dark:text-white">{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</p>
                <p className="mt-2 text-xs font-black uppercase tracking-wide text-slate-400">Active time</p>
              </div>
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setActiveWorkout(null)} className="btn-secondary flex-1">Close</button>
                <button type="button" onClick={() => completeWorkout(activeWorkout).then(() => setActiveWorkout(null))} className="btn-primary flex-1">Finish</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkoutPlan
