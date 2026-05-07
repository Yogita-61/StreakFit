import { useMemo, useState } from 'react'
import { getPlanForCategory } from '../utils/planData'

function DietPlan({ currentBMI, onGoDashboard }) {
  const plan = getPlanForCategory(currentBMI?.category)
  const [dietType, setDietType] = useState('veg')
  const meals = plan.meals[dietType]
  const calories = useMemo(() => meals.reduce((total, meal) => total + meal.calories, 0), [meals])

  if (!currentBMI) {
    return (
      <section className="app-card p-8 text-center">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-fitness-green">Diet Plan</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Calculate BMI to personalize nutrition</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm font-semibold text-slate-500 dark:text-slate-400">
          Your meal plan adapts to underweight, normal, overweight, or obese BMI ranges.
        </p>
        <button type="button" onClick={onGoDashboard} className="btn-primary mt-6">Open BMI Calculator</button>
      </section>
    )
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <div className="app-card p-6 lg:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-fitness-green">BMI-Based Nutrition</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">{plan.dietSummary}</h1>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-500 dark:text-slate-400">
            Built for your current BMI category: <strong>{currentBMI.category}</strong>. Use this as a practical daily structure and adjust portions to your appetite, health needs, and professional advice.
          </p>
          <div className="mt-6 inline-flex rounded-2xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-950">
            <button type="button" onClick={() => setDietType('veg')} className={`segmented-button ${dietType === 'veg' ? 'segmented-button-active' : ''}`}>Veg</button>
            <button type="button" onClick={() => setDietType('nonVeg')} className={`segmented-button ${dietType === 'nonVeg' ? 'segmented-button-active' : ''}`}>Non-veg</button>
          </div>
        </div>

        <div className="app-card p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Daily Nutrition</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="metric-tile">
              <span>{calories}</span>
              <small>Calories</small>
            </div>
            <div className="metric-tile">
              <span>3L</span>
              <small>Water</small>
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-sky-50 p-4 text-sm font-bold text-sky-700 dark:bg-sky-500/10 dark:text-sky-200">
            Hydration reminder: drink water with each meal and after every workout.
          </div>
        </div>
      </section>

      <section className="app-card p-6 lg:p-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Daily Meal Breakdown</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">Meal planner</h2>
          </div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{dietType === 'veg' ? 'Vegetarian' : 'Non-vegetarian'}</p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {meals.map((meal) => (
            <article key={meal.meal} className="rounded-3xl border border-slate-100 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-soft dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-black text-slate-950 dark:text-white">{meal.meal}</h3>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">{meal.calories} cal</span>
              </div>
              <p className="mt-4 text-sm font-semibold leading-6 text-slate-500 dark:text-slate-400">{meal.foods}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="app-card p-6 lg:p-7">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">Recommended Foods</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {plan.recommendedFoods.map((food) => (
              <span key={food} className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">{food}</span>
            ))}
          </div>
        </div>
        <div className="app-card p-6 lg:p-7">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-600">Avoid or Limit</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {plan.avoidFoods.map((food) => (
              <span key={food} className="rounded-full bg-rose-50 px-4 py-2 text-sm font-black text-rose-700 dark:bg-rose-500/10 dark:text-rose-200">{food}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DietPlan
