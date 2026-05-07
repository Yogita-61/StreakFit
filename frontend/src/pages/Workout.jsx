import { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { getWorkoutsByCategory } from '../utils/workoutData'
import WorkoutCard from '../components/WorkoutCard'
import WorkoutAnimation from '../components/WorkoutAnimation'

function Workout() {
  const { currentBMI, saveWorkout } = useAppContext()
  const [workouts, setWorkouts] = useState([])
  const [completedWorkouts, setCompletedWorkouts] = useState([])
  const [activeWorkout, setActiveWorkout] = useState(null)
  const [focusSeconds, setFocusSeconds] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (currentBMI) {
      const categoryWorkouts = getWorkoutsByCategory(currentBMI.category)
      setWorkouts(categoryWorkouts)
      setCompletedWorkouts([])
    }
  }, [currentBMI])

  const handleWorkoutComplete = async (workout) => {
    if (completedWorkouts.includes(workout.name)) return

    const workoutData = {
      name: workout.name,
      category: currentBMI.category,
      date: new Date().toISOString()
    }

    try {
      await saveWorkout(workoutData)
      setCompletedWorkouts(prev => [...prev, workout.name])
      setMessage('')
    } catch (err) {
      setMessage(err.message)
    }
  }

  const handleStartWorkout = (workout) => {
    setActiveWorkout(workout)
    setFocusSeconds(0)
  }

  const closeFocus = () => {
    setActiveWorkout(null)
    setFocusSeconds(0)
  }

  useEffect(() => {
    if (!activeWorkout) return undefined

    const interval = setInterval(() => {
      setFocusSeconds(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [activeWorkout])

  if (!currentBMI) {
    return (
      <div className="container">
        <div className="card empty-state-card">
          <div className="empty-icon">BMI</div>
          <h2>Calculate Your BMI First</h2>
          <p>Please calculate your BMI to get personalized workout recommendations.</p>
          <button className="btn btn-primary btn-large" onClick={() => window.location.href = '/home'}>
            Calculate BMI
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="page-header workout-page-header">
        <div>
          <p className="auth-kicker">Personalized plan</p>
          <h1>Your Workout Plan</h1>
          <p>Built for your current BMI category: <strong>{currentBMI.category}</strong></p>
        </div>
      </div>

      <div className="workout-summary">
        <div className="summary-pill active">
          <span>Done</span>
          <strong>{completedWorkouts.length} completed today</strong>
        </div>
        <div className="summary-pill">
          <span>Goal</span>
          <strong>{workouts.length} total exercises</strong>
        </div>
      </div>

      {message && <div className="message error">{message}</div>}

      <div className="workouts-grid">
        {workouts.map((workout, index) => (
          <WorkoutCard
            key={`${workout.name}-${index}`}
            workout={workout}
            isCompleted={completedWorkouts.includes(workout.name)}
            onStart={handleStartWorkout}
            onComplete={handleWorkoutComplete}
          />
        ))}
      </div>

      {completedWorkouts.length === workouts.length && workouts.length > 0 && (
        <div className="card workout-complete-card">
          <h2>Congratulations!</h2>
          <p>You've completed all workouts for today.</p>
        </div>
      )}

      {activeWorkout && (
        <div className="workout-focus" role="dialog" aria-modal="true" aria-label={`${activeWorkout.name} workout`}>
          <div className="workout-focus-inner">
            <button className="focus-close" onClick={closeFocus} aria-label="Close workout">
              Close
            </button>

            <div className="focus-visual">
              <WorkoutAnimation exerciseName={activeWorkout.name} large />
            </div>

            <div className="focus-panel">
              <p className="auth-kicker">Exercise in progress</p>
              <h2>{activeWorkout.name}</h2>
              <p>{activeWorkout.description}</p>

              <div className="focus-stats">
                <div>
                  <span>Sets</span>
                  <strong>{activeWorkout.sets}</strong>
                </div>
                <div>
                  <span>Reps</span>
                  <strong>{activeWorkout.reps}</strong>
                </div>
                <div>
                  <span>Time</span>
                  <strong>{activeWorkout.duration}</strong>
                </div>
                <div>
                  <span>Timer</span>
                  <strong>{focusSeconds}s</strong>
                </div>
              </div>

              <button
                className="btn btn-primary btn-large"
                onClick={() => {
                  handleWorkoutComplete(activeWorkout).then(closeFocus)
                }}
              >
                Finish Exercise
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Workout
