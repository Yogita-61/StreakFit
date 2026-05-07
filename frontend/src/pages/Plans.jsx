import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const plans = {
  day: {
    workout: [
      'Warm-up: 5 min jogging',
      'Jumping Jacks – 3 sets × 20 reps',
      'Pushups – 3 sets × 15 reps',
      'Squats – 3 sets × 20 reps',
      'Plank – 3 sets × 30 sec',
      'Cool down: 5 min stretching'
    ],
    diet: [
      'Breakfast: Oatmeal with fruits (300 cal)',
      'Snack: Apple with almonds (150 cal)',
      'Lunch: Grilled chicken with vegetables (450 cal)',
      'Snack: Greek yogurt (100 cal)',
      'Dinner: Fish with brown rice (400 cal)',
      'Total: ~1400 calories'
    ]
  },
  week: {
    workout: [
      'Monday: Upper Body (Pushups, Pull-ups, Dips)',
      'Tuesday: Lower Body (Squats, Lunges, Calf raises)',
      'Wednesday: Cardio (30 min running)',
      'Thursday: Core (Planks, Crunches, Leg raises)',
      'Friday: Full Body (Burpees, Mountain climbers)',
      'Saturday: Active Recovery (Yoga, Stretching)',
      'Sunday: Rest Day'
    ],
    diet: [
      'Daily Calories: 1400-1600',
      'Protein: 100-120g per day',
      'Carbs: 150-180g per day',
      'Fats: 40-50g per day',
      'Water: 3-4 liters daily',
      'Cheat meal: Once per week'
    ]
  },
  month: {
    workout: [
      'Week 1: Build Foundation (Light weights, form focus)',
      'Week 2: Increase Intensity (Add more reps)',
      'Week 3: Progressive Overload (Heavier weights)',
      'Week 4: Peak Performance (Max effort)',
      'Track: Weight, Body measurements weekly',
      'Goal: Lose 2-4 kg or gain muscle'
    ],
    diet: [
      'Week 1: Clean eating, remove junk food',
      'Week 2: Meal prep, portion control',
      'Week 3: Optimize macros, track calories',
      'Week 4: Maintain consistency',
      'Monthly Goal: Develop healthy eating habits',
      'Supplements: Multivitamin, Protein powder'
    ]
  },
  year: {
    workout: [
      'Q1 (Jan-Mar): Fat Loss Phase - High cardio',
      'Q2 (Apr-Jun): Muscle Building - Strength training',
      'Q3 (Jul-Sep): Endurance - Long distance running',
      'Q4 (Oct-Dec): Maintenance - Balanced routine',
      'Annual Goal: Transform body composition',
      'Track: Monthly progress photos, measurements'
    ],
    diet: [
      'Q1: Calorie deficit (1400 cal/day)',
      'Q2: Calorie surplus (2000 cal/day)',
      'Q3: Maintenance calories (1800 cal/day)',
      'Q4: Flexible dieting with 80/20 rule',
      'Annual Goal: Sustainable healthy lifestyle',
      'Learn: Meal planning, nutrition basics'
    ]
  }
}

function Plans() {
  const [selectedPlan, setSelectedPlan] = useState('day')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    navigate('/login')
  }

  return (
    <div className="container">
      <div className="header">
        <h1>StreakFit Fitness App</h1>
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/account">Account</Link>
          <Link to="/dashboard">Dashboard</Link>
          <a onClick={handleLogout} style={{cursor: 'pointer'}}>Logout</a>
        </div>
      </div>

      <div className="card">
        <h2>Workout & Diet Plans</h2>
        
        <div className="plan-tabs">
          <div 
            className={`plan-tab ${selectedPlan === 'day' ? 'active' : ''}`}
            onClick={() => setSelectedPlan('day')}
          >
            1 Day
          </div>
          <div 
            className={`plan-tab ${selectedPlan === 'week' ? 'active' : ''}`}
            onClick={() => setSelectedPlan('week')}
          >
            1 Week
          </div>
          <div 
            className={`plan-tab ${selectedPlan === 'month' ? 'active' : ''}`}
            onClick={() => setSelectedPlan('month')}
          >
            1 Month
          </div>
          <div 
            className={`plan-tab ${selectedPlan === 'year' ? 'active' : ''}`}
            onClick={() => setSelectedPlan('year')}
          >
            1 Year
          </div>
        </div>

        <div className="workout-section">
          <h3>🏋️ Workout Plan</h3>
          <div className="plan-content">
            <ul className="workout-list">
              {plans[selectedPlan].workout.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="diet-section">
          <h3>🥗 Diet Plan</h3>
          <div className="plan-content">
            <ul className="diet-list">
              {plans[selectedPlan].diet.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plans
