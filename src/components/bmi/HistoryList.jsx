import { getCategoryMeta, getTrend } from './bmiMeta'

function HistoryList({ history, onDelete }) {
  const sortedHistory = [...history].sort((a, b) => new Date(a.date) - new Date(b.date))
  const displayHistory = [...sortedHistory].reverse()

  if (history.length === 0) {
    return (
      <section className="app-card p-5 sm:p-6 lg:p-7">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">History</p>
        <div className="mt-5 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-950">
          <h3 className="text-xl font-black text-slate-950 dark:text-white">No BMI records yet</h3>
          <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">Calculate your first BMI to start tracking progress.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="app-card p-5 sm:p-6 lg:p-7">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">History Panel</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">BMI calculations</h2>
        </div>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{history.length} saved results</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800">
        <div className="hidden grid-cols-[1.4fr_1fr_0.8fr_1fr_0.7fr] gap-4 bg-slate-50 px-5 py-3 text-xs font-black uppercase tracking-wide text-slate-400 dark:bg-slate-950 md:grid">
          <span>Date and time</span>
          <span>Height / Weight</span>
          <span>BMI</span>
          <span>Category</span>
          <span>Action</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {displayHistory.map((record) => {
            const originalIndex = sortedHistory.findIndex((item) => item.id === record.id)
            const trend = getTrend(sortedHistory, originalIndex)
            const meta = getCategoryMeta(record.category)
            const trendColor = trend.direction === 'down' ? 'text-fitness-green' : trend.direction === 'up' ? 'text-orange-600' : 'text-slate-400'

            return (
              <article key={record.id} className="grid gap-3 px-5 py-4 transition hover:bg-slate-50 dark:hover:bg-slate-950 md:grid-cols-[1.4fr_1fr_0.8fr_1fr_0.7fr] md:items-center md:gap-4">
                <div>
                  <p className="text-sm font-black text-slate-900 dark:text-white">{new Date(record.date).toLocaleDateString()}</p>
                  <p className="text-xs font-semibold text-slate-400">{new Date(record.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                  {record.inputHeight || record.height} {record.heightUnit || 'cm'} / {record.inputWeight || record.weight} {record.weightUnit || 'kg'}
                </p>
                <div>
                  <p className="text-lg font-black text-slate-950 dark:text-white">{record.bmi}</p>
                  <p className={`text-xs font-black ${trendColor}`}>{trend.direction === 'up' ? 'up ' : trend.direction === 'down' ? 'down ' : ''}{trend.label}</p>
                </div>
                <span className={`w-fit rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wide ${meta.tone}`}>{record.category}</span>
                <button
                  type="button"
                  onClick={() => onDelete(record.id)}
                  className="w-fit rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-xs font-black text-rose-600 transition hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200"
                >
                  Delete
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HistoryList
