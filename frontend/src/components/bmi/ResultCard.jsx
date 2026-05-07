import { getBmiProgress, getCategoryMeta } from './bmiMeta'

function ResultCard({ result }) {
  const activeResult = result || {
    bmi: '--',
    category: 'Normal',
    height: '--',
    weight: '--'
  }

  const meta = getCategoryMeta(activeResult.category)
  const progress = getBmiProgress(activeResult.bmi)
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <section className="app-card relative overflow-hidden p-5 sm:p-6 lg:p-7">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-orange-100/70 dark:bg-orange-500/10" />
      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Latest Result</p>
        <div className="mt-5 grid items-center gap-6 sm:grid-cols-[160px_1fr]">
          <div className="relative mx-auto h-40 w-40">
            <svg viewBox="0 0 140 140" className="-rotate-90">
              <circle cx="70" cy="70" r={radius} fill="none" strokeWidth="14" className="stroke-slate-100 dark:stroke-slate-800" />
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                strokeWidth="14"
                strokeLinecap="round"
                stroke={meta.bar}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-950 dark:text-white">{activeResult.bmi}</span>
              <span className="text-xs font-black uppercase tracking-wide text-slate-400">BMI</span>
            </div>
          </div>

          <div>
            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wide ${meta.tone}`}>
              {activeResult.category}
            </span>
            <h3 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">{meta.summary}</h3>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-xs font-black uppercase tracking-wide text-slate-400">Height</p>
                <p className="mt-1 text-lg font-black text-slate-900 dark:text-white">{activeResult.height} cm</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-xs font-black uppercase tracking-wide text-slate-400">Weight</p>
                <p className="mt-1 text-lg font-black text-slate-900 dark:text-white">{activeResult.weight} kg</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResultCard
