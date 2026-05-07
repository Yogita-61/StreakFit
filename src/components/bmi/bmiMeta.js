export const categoryMeta = {
  Underweight: {
    label: 'Underweight',
    tone: 'text-sky-700 bg-sky-50 border-sky-200 dark:text-sky-200 dark:bg-sky-500/10 dark:border-sky-400/25',
    bar: '#0ea5e9',
    ring: 'stroke-sky-500',
    summary: 'Focus on healthy weight gain, muscle building, and consistent meals.'
  },
  Normal: {
    label: 'Normal',
    tone: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-400/25',
    bar: '#22c55e',
    ring: 'stroke-emerald-500',
    summary: 'Maintain your current balance with steady activity and nutrient-dense food.'
  },
  Overweight: {
    label: 'Overweight',
    tone: 'text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-200 dark:bg-orange-500/10 dark:border-orange-400/25',
    bar: '#ff6b35',
    ring: 'stroke-orange-500',
    summary: 'Aim for gradual fat loss with cardio, strength work, and portion control.'
  },
  Obese: {
    label: 'Obese',
    tone: 'text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-200 dark:bg-rose-500/10 dark:border-rose-400/25',
    bar: '#ef4444',
    ring: 'stroke-rose-500',
    summary: 'Start with sustainable low-impact activity, nutrition structure, and medical guidance.'
  }
}

export const getCategoryMeta = (category) => categoryMeta[category] || categoryMeta.Normal

export const getBmiProgress = (bmi) => {
  const value = Number(bmi) || 0
  return Math.min(Math.max((value / 40) * 100, 0), 100)
}

export const getTrend = (history, index) => {
  if (index <= 0) return { label: 'New', direction: 'same', diff: 0 }

  const previous = Number(history[index - 1]?.bmi)
  const current = Number(history[index]?.bmi)
  const diff = Number((current - previous).toFixed(1))

  if (diff > 0) return { label: `+${diff}`, direction: 'up', diff }
  if (diff < 0) return { label: `${diff}`, direction: 'down', diff }
  return { label: '0.0', direction: 'same', diff }
}
