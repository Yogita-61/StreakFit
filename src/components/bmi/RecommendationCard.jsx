import { getCategoryMeta } from './bmiMeta'

const recommendationContent = {
  Underweight: [
    {
      title: 'High-calorie nutrition',
      points: ['Add nut butters, avocado, olive oil, and smoothies', 'Eat protein at every meal', 'Choose calorie-dense snacks between meals']
    },
    {
      title: 'Strength training',
      points: ['Train major muscle groups 3-4 days weekly', 'Use progressive overload', 'Prioritize sleep and recovery']
    }
  ],
  Normal: [
    {
      title: 'Maintenance rhythm',
      points: ['Keep meals balanced with protein, fiber, and healthy fats', 'Hydrate consistently', 'Track weight monthly, not obsessively']
    },
    {
      title: 'Balanced workouts',
      points: ['Mix strength, mobility, and cardio', 'Aim for 150 minutes of weekly activity', 'Keep one active recovery day']
    }
  ],
  Overweight: [
    {
      title: 'Weight loss plan',
      points: ['Create a mild calorie deficit', 'Increase protein and vegetables', 'Limit sugary drinks and ultra-processed snacks']
    },
    {
      title: 'Cardio plus strength',
      points: ['Walk or cycle 30-45 minutes most days', 'Strength train 2-3 times weekly', 'Use steps as a daily progress target']
    }
  ],
  Obese: [
    {
      title: 'Safe fat-loss structure',
      points: ['Start with low-impact cardio and gradual volume', 'Use simple meal planning and portions', 'Consider professional medical guidance']
    },
    {
      title: 'Daily consistency',
      points: ['Build a 10-minute movement habit first', 'Prioritize protein and vegetables', 'Track progress weekly with compassion']
    }
  ]
}

function RecommendationCard({ category }) {
  const activeCategory = category || 'Normal'
  const meta = getCategoryMeta(activeCategory)
  const cards = recommendationContent[activeCategory] || recommendationContent.Normal

  return (
    <section className="app-card p-5 sm:p-6 lg:p-7">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-fitness-green">Smart Recommendations</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">Your next healthy move</h2>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wide ${meta.tone}`}>{activeCategory}</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card, index) => (
          <article
            key={card.title}
            className="animate-fade-up rounded-3xl border border-slate-100 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-soft dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-black text-fitness-orange shadow-sm dark:bg-slate-900">
              {index + 1}
            </div>
            <h3 className="text-lg font-black text-slate-950 dark:text-white">{card.title}</h3>
            <ul className="mt-4 space-y-3">
              {card.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-fitness-green" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default RecommendationCard
