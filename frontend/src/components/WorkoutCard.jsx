import WorkoutAnimation from './WorkoutAnimation'

function WorkoutCard({ workout, isCompleted, onStart, onComplete }) {
  const handleComplete = () => {
    if (!isCompleted && onComplete) {
      onComplete(workout)
    }
  }

  return (
    <div className={`workout-card ${isCompleted ? 'completed' : ''}`}>
      <div className="workout-gif-wrapper">
        <WorkoutAnimation exerciseName={workout.name} />
      </div>

      <div className="workout-content">
        <div className="workout-header">
          <h4>{workout.name}</h4>
          <p className="workout-desc">{workout.description}</p>
        </div>

        <div className="workout-details">
          <div className="detail-item">
            <span className="detail-label">Sets</span>
            <span className="detail-value">{workout.sets}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Reps</span>
            <span className="detail-value">{workout.reps}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Time</span>
            <span className="detail-value">{workout.duration}</span>
          </div>
        </div>

        <div className="workout-actions">
          <button className="timer-btn" onClick={() => onStart(workout)}>
            Start
          </button>
          <button
            className={`complete-btn ${isCompleted ? 'done' : ''}`}
            onClick={handleComplete}
          >
            {isCompleted ? 'Done' : 'Complete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default WorkoutCard
