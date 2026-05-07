import { getCategoryMeta } from './bmiMeta'

function TrendChart({ history }) {
  const points = history.slice(-8)
  const values = points.map((record) => Number(record.bmi))
  const min = Math.min(...values, 15)
  const max = Math.max(...values, 35)
  const range = Math.max(max - min, 1)
  const width = 320
  const height = 150
  const padding = 18

  const coordinates = points.map((record, index) => {
    const x = points.length === 1 ? width / 2 : padding + (index * (width - padding * 2)) / (points.length - 1)
    const y = height - padding - ((Number(record.bmi) - min) / range) * (height - padding * 2)
    return { x, y, record }
  })

  const path = coordinates.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
  const latest = points[points.length - 1]
  const first = points[0]
  const delta = latest && first ? Number((Number(latest.bmi) - Number(first.bmi)).toFixed(1)) : 0
  const deltaText = delta > 0 ? `+${delta}` : `${delta}`

  return (
    <section className="app-card p-5 sm:p-6 lg:p-7">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Data Visualization</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">BMI trend</h2>
        </div>
        <div className={`rounded-2xl px-3 py-2 text-sm font-black ${delta <= 0 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200' : 'bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-200'}`}>
          {points.length > 1 ? deltaText : 'New'}
        </div>
      </div>

      {points.length === 0 ? (
        <div className="flex h-[190px] items-center justify-center rounded-3xl bg-slate-50 text-sm font-bold text-slate-400 dark:bg-slate-950">
          Your BMI chart will appear after calculations.
        </div>
      ) : (
        <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-48 w-full overflow-visible">
            <line x1="18" y1="35" x2="302" y2="35" stroke="currentColor" className="text-emerald-200 dark:text-emerald-900" strokeDasharray="5 5" />
            <line x1="18" y1="86" x2="302" y2="86" stroke="currentColor" className="text-orange-200 dark:text-orange-900" strokeDasharray="5 5" />
            <path d={path} fill="none" stroke="#ff6b35" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            {coordinates.map((point) => {
              const meta = getCategoryMeta(point.record.category)
              return (
                <g key={point.record.id}>
                  <circle cx={point.x} cy={point.y} r="7" fill="white" stroke={meta.bar} strokeWidth="4" />
                </g>
              )
            })}
          </svg>
          <div className="mt-2 flex items-center justify-between text-xs font-black uppercase tracking-wide text-slate-400">
            <span>Older</span>
            <span>Latest</span>
          </div>
        </div>
      )}
    </section>
  )
}

export default TrendChart
