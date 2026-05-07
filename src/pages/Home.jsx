import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { calculateBMI, getBMICategory, getWorkoutTime, getDietPlan } from '../utils/bmiUtils'

function Home() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState('')
  const { saveBMI } = useAppContext()
  const navigate = useNavigate()

  const handleCalculate = async (e) => {
    e.preventDefault()
    const h = parseFloat(height)
    const w = parseFloat(weight)
    
    if (h > 0 && w > 0) {
      const bmi = calculateBMI(h, w)
      const category = getBMICategory(bmi)
      const workoutTime = getWorkoutTime(category)
      const dietPlan = getDietPlan(category)
      
      const bmiData = {
        bmi,
        category,
        height: h,
        weight: w,
        date: new Date().toISOString()
      }
      
      try {
        await saveBMI(bmiData)
        setMessage('')
        setResult({
          bmi,
          category,
          workoutTime,
          dietPlan
        })
      } catch (err) {
        setMessage(err.message)
      }
    }
  }

  return (
    <div className="container home-page">
      <div className="page-header">
        <h1>BMI Calculator 📊</h1>
        <p>Calculate your Body Mass Index and get personalized fitness plans</p>
      </div>

      <div className="card calculator-card">
        {message && <div className="message error">{message}</div>}
        <form onSubmit={handleCalculate}>
          <div className="form-row">
            <div className="form-group">
              <label>Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height in cm"
                required
              />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in kg"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-large">Calculate BMI</button>
        </form>
      </div>

      {result && (
        <div className="results-section">
          <div className="card bmi-result-card">
            <div className="result-header">
              <h2>Your BMI Result</h2>
            </div>
            <div className="result-value">
              <span className="bmi-number">{result.bmi}</span>
              <span className={`bmi-badge ${result.category.toLowerCase()}`}>
                {result.category}
              </span>
            </div>
          </div>

          <div className="card workout-plan-card">
            <h3>💪 Recommended Workout Plan</h3>
            <div className="plan-info">
              <div className="info-item">
                <span className="info-icon">⏱️</span>
                <div>
                  <strong>Daily Duration</strong>
                  <p>{result.workoutTime}</p>
                </div>
              </div>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/workout')}
            >
              View Full Workout Plan →
            </button>
          </div>

          <div className="card diet-plan-card">
            <h3>🥗 Recommended Diet Plan</h3>
            <ul className="diet-list">
              {result.dietPlan.map((item, index) => (
                <li key={index}>
                  <span className="check-icon">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="next-steps">
            <button 
              className="btn btn-primary btn-large"
              onClick={() => navigate('/workout')}
            >
              Start My Workout Journey 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
