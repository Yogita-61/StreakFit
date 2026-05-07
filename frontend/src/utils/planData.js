export const bmiPlans = {
  Underweight: {
    category: 'Underweight',
    focus: 'Muscle gain and strength',
    accent: 'sky',
    weeklyTarget: '3-4 strength days',
    workoutSummary: 'Compound lifting, controlled tempo, and light conditioning.',
    dietSummary: 'Calorie surplus with protein-rich meals and energy-dense snacks.',
    workoutCategories: ['Strength', 'Muscle Gain'],
    levels: ['Beginner', 'Intermediate'],
    weeklyPlan: [
      { day: 'Mon', title: 'Lower Strength', details: 'Squats, lunges, calf raises', minutes: 55, intensity: 72 },
      { day: 'Tue', title: 'Light Cardio', details: 'Incline walk and mobility', minutes: 25, intensity: 38 },
      { day: 'Wed', title: 'Upper Strength', details: 'Press, rows, curls, dips', minutes: 55, intensity: 70 },
      { day: 'Thu', title: 'Recovery', details: 'Stretching and core stability', minutes: 20, intensity: 25 },
      { day: 'Fri', title: 'Full Body', details: 'Deadlifts, squats, presses', minutes: 60, intensity: 78 },
      { day: 'Sat', title: 'Hypertrophy', details: 'Accessory lifts and core', minutes: 45, intensity: 62 },
      { day: 'Sun', title: 'Rest', details: 'Sleep, food prep, hydration', minutes: 0, intensity: 10 }
    ],
    exercises: [
      { name: 'Squats', sets: 4, reps: '8-10', duration: '12 min', calories: 90, description: 'Build lower-body strength with controlled reps.' },
      { name: 'Deadlifts', sets: 4, reps: '6-8', duration: '14 min', calories: 110, description: 'Train posterior chain and total-body power.' },
      { name: 'Bench Press', sets: 4, reps: '8-10', duration: '12 min', calories: 85, description: 'Pressing strength for chest and triceps.' },
      { name: 'Dumbbell Rows', sets: 4, reps: '10-12', duration: '10 min', calories: 75, description: 'Back muscle and posture support.' }
    ],
    meals: {
      veg: [
        { meal: 'Breakfast', calories: 620, foods: 'Paneer oats bowl, banana, milk, almonds' },
        { meal: 'Lunch', calories: 780, foods: 'Rice, dal, paneer curry, curd, vegetables' },
        { meal: 'Snack', calories: 420, foods: 'Peanut butter toast and fruit smoothie' },
        { meal: 'Dinner', calories: 720, foods: 'Chapati, chickpea curry, rice, salad' }
      ],
      nonVeg: [
        { meal: 'Breakfast', calories: 680, foods: 'Eggs, oats, banana, milk, nuts' },
        { meal: 'Lunch', calories: 820, foods: 'Rice, chicken curry, dal, curd, vegetables' },
        { meal: 'Snack', calories: 430, foods: 'Greek yogurt smoothie with peanut butter' },
        { meal: 'Dinner', calories: 760, foods: 'Chapati, grilled chicken, potatoes, salad' }
      ]
    },
    recommendedFoods: ['Rice', 'Nuts', 'Milk', 'Eggs', 'Paneer', 'Chicken', 'Oats'],
    avoidFoods: ['Skipping meals', 'Empty-calorie soda', 'Very low-fat diets']
  },
  Normal: {
    category: 'Normal',
    focus: 'Maintenance and performance',
    accent: 'emerald',
    weeklyTarget: '5 balanced sessions',
    workoutSummary: 'A steady mix of strength, cardio, yoga, and active recovery.',
    dietSummary: 'Balanced calories with protein, fiber, healthy fats, and hydration.',
    workoutCategories: ['Strength', 'Cardio'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    weeklyPlan: [
      { day: 'Mon', title: 'Strength', details: 'Pushups, squats, rows', minutes: 40, intensity: 60 },
      { day: 'Tue', title: 'Cardio', details: 'Run, cycle, or brisk walk', minutes: 35, intensity: 56 },
      { day: 'Wed', title: 'Yoga', details: 'Mobility, breath, flexibility', minutes: 30, intensity: 32 },
      { day: 'Thu', title: 'Full Body', details: 'Circuit training and core', minutes: 42, intensity: 66 },
      { day: 'Fri', title: 'Intervals', details: 'Moderate HIIT blocks', minutes: 28, intensity: 72 },
      { day: 'Sat', title: 'Active Fun', details: 'Sport, hike, dance, swim', minutes: 45, intensity: 50 },
      { day: 'Sun', title: 'Rest', details: 'Walk and stretch lightly', minutes: 15, intensity: 18 }
    ],
    exercises: [
      { name: 'Pushups', sets: 3, reps: '12-15', duration: '8 min', calories: 55, description: 'Upper-body strength and control.' },
      { name: 'Squats', sets: 3, reps: '15-20', duration: '9 min', calories: 70, description: 'Lower-body endurance and mobility.' },
      { name: 'Mountain Climbers', sets: 3, reps: '30 sec', duration: '7 min', calories: 80, description: 'Cardio and core conditioning.' },
      { name: 'Cool Down Stretch', sets: 1, reps: '5 min', duration: '5 min', calories: 20, description: 'Recovery and flexibility.' }
    ],
    meals: {
      veg: [
        { meal: 'Breakfast', calories: 430, foods: 'Oats, fruit, curd, chia seeds' },
        { meal: 'Lunch', calories: 620, foods: 'Chapati, dal, mixed vegetables, salad' },
        { meal: 'Snack', calories: 220, foods: 'Fruit, nuts, buttermilk' },
        { meal: 'Dinner', calories: 560, foods: 'Rice, paneer/tofu, vegetables, soup' }
      ],
      nonVeg: [
        { meal: 'Breakfast', calories: 450, foods: 'Eggs, toast, fruit, curd' },
        { meal: 'Lunch', calories: 640, foods: 'Rice, grilled chicken, dal, salad' },
        { meal: 'Snack', calories: 220, foods: 'Greek yogurt and berries' },
        { meal: 'Dinner', calories: 570, foods: 'Fish or chicken, vegetables, chapati' }
      ]
    },
    recommendedFoods: ['Vegetables', 'Lean protein', 'Whole grains', 'Curd', 'Fruit'],
    avoidFoods: ['Frequent fried snacks', 'Sugary drinks', 'Late-night overeating']
  },
  Overweight: {
    category: 'Overweight',
    focus: 'Fat loss and stamina',
    accent: 'amber',
    weeklyTarget: '4-5 calorie-burning days',
    workoutSummary: 'Cardio, walking, cycling, and light strength training.',
    dietSummary: 'Mild calorie deficit with high fiber, high protein, and low sugar.',
    workoutCategories: ['Cardio', 'Fat Loss'],
    levels: ['Beginner', 'Intermediate'],
    weeklyPlan: [
      { day: 'Mon', title: 'Cardio Base', details: 'Brisk walk or cycling', minutes: 40, intensity: 58 },
      { day: 'Tue', title: 'Light Strength', details: 'Squats, rows, wall pushups', minutes: 35, intensity: 52 },
      { day: 'Wed', title: 'HIIT Intro', details: 'Short intervals with recovery', minutes: 24, intensity: 74 },
      { day: 'Thu', title: 'Walk', details: 'Zone 2 steady pace', minutes: 45, intensity: 46 },
      { day: 'Fri', title: 'Strength Plus Core', details: 'Full-body circuit', minutes: 38, intensity: 64 },
      { day: 'Sat', title: 'Long Cardio', details: 'Cycling, swim, or walk', minutes: 50, intensity: 55 },
      { day: 'Sun', title: 'Recovery', details: 'Mobility and hydration', minutes: 20, intensity: 20 }
    ],
    exercises: [
      { name: 'Brisk Walking', sets: 1, reps: '30 min', duration: '30 min', calories: 180, description: 'Sustainable calorie burn with low stress.' },
      { name: 'Mountain Climbers', sets: 4, reps: '25 sec', duration: '8 min', calories: 95, description: 'Short cardio bursts with core work.' },
      { name: 'Step-ups', sets: 3, reps: '12 each', duration: '9 min', calories: 85, description: 'Leg strength and conditioning.' },
      { name: 'Boxing Punches', sets: 4, reps: '45 sec', duration: '8 min', calories: 90, description: 'Cardio with upper-body movement.' }
    ],
    meals: {
      veg: [
        { meal: 'Breakfast', calories: 330, foods: 'Moong chilla, curd, fruit' },
        { meal: 'Lunch', calories: 510, foods: 'Dal, vegetables, salad, one cup rice' },
        { meal: 'Snack', calories: 160, foods: 'Sprouts or roasted chana' },
        { meal: 'Dinner', calories: 430, foods: 'Soup, paneer/tofu, vegetables, chapati' }
      ],
      nonVeg: [
        { meal: 'Breakfast', calories: 350, foods: 'Egg bhurji, toast, fruit' },
        { meal: 'Lunch', calories: 520, foods: 'Grilled chicken, dal, salad, rice' },
        { meal: 'Snack', calories: 170, foods: 'Boiled eggs or yogurt' },
        { meal: 'Dinner', calories: 450, foods: 'Fish/chicken soup, vegetables, chapati' }
      ]
    },
    recommendedFoods: ['Sprouts', 'Dal', 'Lean protein', 'Leafy greens', 'Low-sugar fruit'],
    avoidFoods: ['Sugary drinks', 'Desserts', 'Deep-fried snacks', 'Refined flour']
  },
  Obese: {
    category: 'Obese',
    focus: 'Safe weight loss',
    accent: 'rose',
    weeklyTarget: 'Daily low-impact movement',
    workoutSummary: 'Joint-friendly cardio, gradual progression, and beginner strength.',
    dietSummary: 'Safe calorie control with high protein, vegetables, and simple structure.',
    workoutCategories: ['Cardio', 'Fat Loss'],
    levels: ['Beginner'],
    weeklyPlan: [
      { day: 'Mon', title: 'Low-impact Walk', details: 'Easy pace plus breathing', minutes: 20, intensity: 32 },
      { day: 'Tue', title: 'Chair Strength', details: 'Sit-to-stand, wall press, bands', minutes: 24, intensity: 38 },
      { day: 'Wed', title: 'Mobility', details: 'Gentle range-of-motion work', minutes: 18, intensity: 24 },
      { day: 'Thu', title: 'Walk Progression', details: 'Add 5 minutes if comfortable', minutes: 25, intensity: 36 },
      { day: 'Fri', title: 'Beginner Circuit', details: 'Low-impact cardio and strength', minutes: 26, intensity: 42 },
      { day: 'Sat', title: 'Long Easy Cardio', details: 'Walk, swim, or cycle', minutes: 30, intensity: 34 },
      { day: 'Sun', title: 'Recovery', details: 'Stretch, meal prep, sleep', minutes: 15, intensity: 18 }
    ],
    exercises: [
      { name: 'Brisk Walking', sets: 1, reps: '15 min', duration: '15 min', calories: 95, description: 'Low-impact movement to build consistency.' },
      { name: 'Wall Sit', sets: 3, reps: '20 sec', duration: '6 min', calories: 45, description: 'Beginner leg strength with control.' },
      { name: 'Arm Circles', sets: 3, reps: '30 sec', duration: '5 min', calories: 30, description: 'Shoulder mobility and circulation.' },
      { name: 'Cool Down Stretch', sets: 1, reps: '8 min', duration: '8 min', calories: 25, description: 'Reduce soreness and improve recovery.' }
    ],
    meals: {
      veg: [
        { meal: 'Breakfast', calories: 300, foods: 'Besan chilla, curd, cucumber' },
        { meal: 'Lunch', calories: 460, foods: 'Dal, large salad, vegetables, small rice portion' },
        { meal: 'Snack', calories: 130, foods: 'Buttermilk and roasted chana' },
        { meal: 'Dinner', calories: 390, foods: 'Vegetable soup, tofu/paneer, greens' }
      ],
      nonVeg: [
        { meal: 'Breakfast', calories: 320, foods: 'Boiled eggs, fruit, unsweetened tea' },
        { meal: 'Lunch', calories: 470, foods: 'Grilled chicken/fish, salad, dal, small rice portion' },
        { meal: 'Snack', calories: 140, foods: 'Yogurt or boiled egg' },
        { meal: 'Dinner', calories: 400, foods: 'Clear soup, lean protein, vegetables' }
      ]
    },
    recommendedFoods: ['Lean protein', 'Vegetables', 'Dal', 'Soup', 'Buttermilk'],
    avoidFoods: ['Sugar', 'Processed food', 'Large carb portions', 'Fried snacks']
  }
}

export const getPlanForCategory = (category) => bmiPlans[category] || bmiPlans.Normal

export const getImprovementInsight = (history) => {
  if (history.length < 2) return 'Calculate BMI twice to unlock progress insights.'

  const first = Number(history[0].bmi)
  const latest = Number(history[history.length - 1].bmi)
  const change = first ? ((first - latest) / first) * 100 : 0
  const rounded = Math.abs(change).toFixed(1)

  if (change > 0) return `You improved your BMI by ${rounded}% from your first check-in.`
  if (change < 0) return `Your BMI moved up by ${rounded}%; adjust your plan gently this week.`
  return 'Your BMI is stable; keep building consistency.'
}
