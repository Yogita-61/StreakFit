import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Character from '../components/Character'
import BMIInfo from '../components/BMIInfo'
import { getMotivationalMessage } from '../utils/bmiUtils'

function Dashboard() {
  const { user, currentBMI, workoutHistory } = useAppContext()
  const navigate = useNavigate()

  const completedToday = workoutHistory.filter(w => {
    const today = new Date().toDateString()
    return new Date(w.date).toDateString() === today
  }).length

  const totalWorkouts = workoutHistory.length
  const weeksActive = Math.floor(totalWorkouts / 7)

  return (
    <div className="container">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome back, {user?.name}! 👋</h1>
        <p className="welcome-subtitle">
          {currentBMI ? getMotivationalMessage(currentBMI.category) : "Let's start your fitness journey today!"}
        </p>
      </div>

      <div className="dashboard-grid">
        {/* Character Card */}
        <div className="card character-card">
          <Character category={currentBMI?.category} />
          <p className="text-center" style={{marginTop: '1rem', fontWeight: 600, color: 'var(--text-secondary)'}}>
            Your Fitness Goal: {currentBMI?.category === 'Underweight' ? 'Muscle Gain' : currentBMI?.category === 'Normal' ? 'Maintenance' : 'Fat Loss'}
          </p>
        </div>

        {/* BMI Card */}
        {currentBMI ? (
          <div className="card bmi-card">
            <h3>Your BMI</h3>
            <div className="bmi-display">
              <div className="bmi-value">{currentBMI.bmi}</div>
              <div className={`bmi-category ${currentBMI.category.toLowerCase()}`}>
                {currentBMI.category}
              </div>
              <p className="bmi-info">
                Height: {currentBMI.height}cm | Weight: {currentBMI.weight}kg
              </p>
            </div>
          </div>
        ) : (
          <div className="card action-card">
            <h2>Calculate Your BMI</h2>
            <p>Get personalized workout and diet recommendations</p>
            <button className="btn btn-secondary btn-large" onClick={() => navigate('/home')}>
              📊 Start Now
            </button>
          </div>
        )}

        {/* Stats Card */}
        <div className="card stats-card">
          <h3>Your Progress</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">🔥</div>
              <div className="stat-value">{completedToday}</div>
              <div className="stat-label">Today</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">💪</div>
              <div className="stat-value">{totalWorkouts}</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📅</div>
              <div className="stat-value">{weeksActive}</div>
              <div className="stat-label">Weeks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Section */}
      {currentBMI && (
        <div className="card action-card">
          <h2>Ready to Workout?</h2>
          <p>Start your personalized {currentBMI.category} workout plan now</p>
          <button className="btn btn-secondary btn-large btn-icon" onClick={() => navigate('/workout')}>
            <span>🏋️</span>
            <span>Start Workout</span>
          </button>
        </div>
      )}

      {/* BMI Info Section */}
      <BMIInfo />

      {/* Recent Activity */}
      {workoutHistory.length > 0 && (
        <div className="card">
          <h3>Recent Activity</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
            {workoutHistory.slice(-5).reverse().map((workout, index) => (
              <div key={index} style={{
                padding: '1rem',
                background: 'var(--bg-light)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{fontWeight: 700, color: 'var(--text-primary)'}}>{workout.name}</div>
                  <div style={{fontSize: '0.875rem', color: 'var(--text-secondary)'}}>{workout.category}</div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span>✅</span>
                  <span style={{fontSize: '0.875rem', color: 'var(--text-secondary)'}}>
                    {new Date(workout.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
