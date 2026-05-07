function Toast({ message, type = 'success' }) {
  if (!message) return null

  const tone = type === 'error'
    ? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-100'
    : 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-100'

  return (
    <div className={`animate-toast-in fixed right-4 top-4 z-50 max-w-sm rounded-2xl border px-4 py-3 text-sm font-black shadow-soft ${tone}`}>
      {message}
    </div>
  )
}

export default Toast
