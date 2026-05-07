import { useMemo, useState } from 'react'

const heightPlaceholders = {
  cm: '170',
  ft: '5.8'
}

const weightPlaceholders = {
  kg: '68',
  lbs: '150'
}

function BMIForm({ onCalculate, isSaving }) {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [heightUnit, setHeightUnit] = useState('cm')
  const [weightUnit, setWeightUnit] = useState('kg')
  const [errors, setErrors] = useState({})

  const helper = useMemo(() => {
    if (heightUnit === 'ft' && weightUnit === 'lbs') return 'Using feet and pounds. We convert to cm and kg for BMI.'
    if (heightUnit === 'ft') return 'Height is converted from feet to centimeters for accurate BMI.'
    if (weightUnit === 'lbs') return 'Weight is converted from pounds to kilograms for accurate BMI.'
    return 'Use your latest body measurements for the most useful trend.'
  }, [heightUnit, weightUnit])

  const validate = () => {
    const nextErrors = {}
    const h = Number(height)
    const w = Number(weight)

    if (!height || Number.isNaN(h) || h <= 0) nextErrors.height = 'Enter a valid height.'
    if (!weight || Number.isNaN(w) || w <= 0) nextErrors.weight = 'Enter a valid weight.'
    if (heightUnit === 'cm' && (h < 60 || h > 260)) nextErrors.height = 'Height should be between 60 and 260 cm.'
    if (heightUnit === 'ft' && (h < 2 || h > 9)) nextErrors.height = 'Height should be between 2 and 9 ft.'
    if (weightUnit === 'kg' && (w < 20 || w > 350)) nextErrors.weight = 'Weight should be between 20 and 350 kg.'
    if (weightUnit === 'lbs' && (w < 44 || w > 770)) nextErrors.weight = 'Weight should be between 44 and 770 lbs.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return

    onCalculate({
      height: Number(height),
      weight: Number(weight),
      heightUnit,
      weightUnit
    })
  }

  return (
    <section className="app-card p-5 sm:p-6 lg:p-7">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-fitness-orange">BMI Calculator</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">Measure your body balance</h2>
          <p className="mt-2 max-w-xl text-sm font-medium text-slate-500 dark:text-slate-400">{helper}</p>
        </div>
        <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm font-black text-fitness-orange dark:bg-orange-500/10 dark:text-orange-200">
          Live validation
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label htmlFor="height" className="text-sm font-black text-slate-700 dark:text-slate-200">Height</label>
              <div className="segmented">
                {['cm', 'ft'].map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    className={`segmented-button ${heightUnit === unit ? 'segmented-button-active' : ''}`}
                    onClick={() => setHeightUnit(unit)}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
            <input
              id="height"
              className="control"
              inputMode="decimal"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
              placeholder={heightPlaceholders[heightUnit]}
            />
            {errors.height && <p className="mt-2 text-sm font-bold text-rose-600">{errors.height}</p>}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label htmlFor="weight" className="text-sm font-black text-slate-700 dark:text-slate-200">Weight</label>
              <div className="segmented">
                {['kg', 'lbs'].map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    className={`segmented-button ${weightUnit === unit ? 'segmented-button-active' : ''}`}
                    onClick={() => setWeightUnit(unit)}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
            <input
              id="weight"
              className="control"
              inputMode="decimal"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              placeholder={weightPlaceholders[weightUnit]}
            />
            {errors.weight && <p className="mt-2 text-sm font-bold text-rose-600">{errors.weight}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="group flex min-h-14 w-full items-center justify-center rounded-2xl bg-fitness-orange px-5 text-base font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSaving ? 'Saving result...' : 'Calculate BMI'}
          <span className="ml-2 transition group-hover:translate-x-1">-&gt;</span>
        </button>
      </form>
    </section>
  )
}

export default BMIForm
