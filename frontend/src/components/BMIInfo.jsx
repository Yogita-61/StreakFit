import { useState } from 'react'

function BMIInfo() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="card info-card" onClick={() => setShowInfo(!showInfo)}>
      <div className="info-header">
        <h3>
          <span className="info-icon">💡</span>
          What is BMI?
        </h3>
        <span style={{fontSize: '1.5rem', color: 'var(--text-secondary)'}}>{showInfo ? '▼' : '▶'}</span>
      </div>
      
      {showInfo && (
        <div className="info-content">
          <p>
            <strong>BMI (Body Mass Index)</strong> is a measure of body fat based on height and weight that applies to adult men and women.
          </p>
          
          <ul className="info-list">
            <li>
              <span style={{color: '#1976D2'}}>●</span>
              <strong>Underweight:</strong> BMI &lt; 18.5
            </li>
            <li>
              <span style={{color: '#388E3C'}}>●</span>
              <strong>Normal:</strong> BMI 18.5 - 24.9
            </li>
            <li>
              <span style={{color: '#F57C00'}}>●</span>
              <strong>Overweight:</strong> BMI 25 - 29.9
            </li>
            <li>
              <span style={{color: '#D32F2F'}}>●</span>
              <strong>Obese:</strong> BMI ≥ 30
            </li>
          </ul>

          <p style={{marginTop: '1rem'}}>
            <strong>Why is BMI Important?</strong>
          </p>
          <p>
            BMI helps identify potential health risks and guides personalized fitness recommendations.
          </p>
        </div>
      )}
    </div>
  )
}

export default BMIInfo
