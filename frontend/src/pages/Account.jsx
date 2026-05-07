import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function Account() {
  const { user, bmiHistory, workoutHistory } = useAppContext()
  const navigate = useNavigate()

  if (!user) {
    navigate('/')
    return null
  }

  const latestBmi = bmiHistory.length > 0 ? bmiHistory[bmiHistory.length - 1] : null
  const streakDays = Math.floor(workoutHistory.length / 3) // Simple streak calculation

  return (
    <div className="container">
      {/* Page Header */}
      <div className="page-header">
        <h1>My Account 👤</h1>
        <p>Track your fitness journey and progress</p>
      </div>

      {/* Profile Card */}
      <div className="card profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-icon">👤</span>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            <div className="profile-meta">
              <span className="meta-item">
                <span className="meta-icon">📅</span>
                Member since {user.registeredOn || 'N/A'}
              </span>
              <span className="status-badge active">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)'}}>
            <span className="stat-icon">💪</span>
          </div>
          <div className="stat-content">
            <div className="stat-value">{workoutHistory.length}</div>
            <div className="stat-label">Total Workouts</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)'}}>
            <span className="stat-icon">📊</span>
          </div>
          <div className="stat-content">
            <div className="stat-value">{bmiHistory.length}</div>
            <div className="stat-label">BMI Calculations</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{background: 'linear-gradient(135deg, #FFD93D 0%, #FFA500 100%)'}}>
            <span className="stat-icon">🔥</span>
          </div>
          <div className="stat-content">
            <div className="stat-value">{streakDays}</div>
            <div className="stat-label">Streak Days</div>
          </div>
        </div>
      </div>

      {/* Latest BMI Highlight */}
      {latestBmi && (
        <div className="card bmi-highlight-card">
          <h3 className="section-title">Your Current BMI</h3>
          <div className="bmi-highlight-content">
            <div className="bmi-main">
              <div className="bmi-number">{latestBmi.bmi}</div>
              <div className={`bmi-badge ${latestBmi.category.toLowerCase()}`}>
                {latestBmi.category}
              </div>
            </div>
            <div className="bmi-details">
              <div className="bmi-detail-item">
                <span className="detail-icon">📏</span>
                <span className="detail-text">Height: {latestBmi.height} cm</span>
              </div>
              <div className="bmi-detail-item">
                <span className="detail-icon">⚖️</span>
                <span className="detail-text">Weight: {latestBmi.weight} kg</span>
              </div>
              <div className="bmi-detail-item">
                <span className="detail-icon">📅</span>
                <span className="detail-text">
                  {new Date(latestBmi.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BMI History */}
      {bmiHistory.length > 0 && (
        <div className="card">
          <h3 className="section-title">BMI History</h3>
          <div className="bmi-history-grid">
            {bmiHistory.slice().reverse().map((record, index) => (
              <div key={index} className="bmi-history-card">
                <div className="history-header">
                  <div className="history-bmi">{record.bmi}</div>
                  <div className={`history-badge ${record.category.toLowerCase()}`}>
                    {record.category}
                  </div>
                </div>
                <div className="history-details">
                  <div className="history-detail">
                    <span>📏</span> {record.height}cm
                  </div>
                  <div className="history-detail">
                    <span>⚖️</span> {record.weight}kg
                  </div>
                </div>
                <div className="history-date">
                  {new Date(record.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {bmiHistory.length === 0 && (
        <div className="card empty-state-card">
          <div className="empty-icon">📊</div>
          <h3>No BMI Records Yet</h3>
          <p>Start tracking your fitness journey by calculating your BMI</p>
          <button className="btn btn-primary" onClick={() => navigate('/home')}>
            Calculate BMI
          </button>
        </div>
      )}
    </div>
  )
}

export default Account
