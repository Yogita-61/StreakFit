export const calculateBMI = (height, weight) => {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  return bmi.toFixed(1)
}

export const getBMICategory = (bmi) => {
  const bmiValue = parseFloat(bmi)
  if (bmiValue < 18.5) return 'Underweight'
  if (bmiValue >= 18.5 && bmiValue < 25) return 'Normal'
  if (bmiValue >= 25 && bmiValue < 30) return 'Overweight'
  return 'Obese'
}

export const getMotivationalMessage = (category) => {
  const messages = {
    Underweight: "Let's build strength and gain healthy weight! 💪",
    Normal: "Great job! Keep maintaining your healthy lifestyle! 🌟",
    Overweight: "You're on the right path! Let's work towards your goals! 🔥",
    Obese: "Every journey starts with a single step. You've got this! 💯"
  }
  return messages[category] || "Start your fitness journey today!"
}

export const getWorkoutTime = (category) => {
  const times = {
    Underweight: '60-75 minutes (Strength focus)',
    Normal: '30-45 minutes (Maintenance)',
    Overweight: '45-60 minutes (Fat burning)',
    Obese: '45-60 minutes (High intensity)'
  }
  return times[category] || '30-45 minutes'
}

export const getDietPlan = (category) => {
  const plans = {
    Underweight: [
      'High protein meals (chicken, eggs, fish)',
      'Healthy fats (nuts, avocado, olive oil)',
      'Complex carbs (brown rice, oats, sweet potato)',
      'Protein shakes between meals',
      'Eat 5-6 small meals daily',
      'Calorie surplus: +500 calories/day'
    ],
    Normal: [
      'Balanced diet with all food groups',
      'Lean proteins (chicken, fish, tofu)',
      'Whole grains and vegetables',
      'Moderate portions',
      'Stay hydrated (2-3 liters water)',
      'Maintain current calorie intake'
    ],
    Overweight: [
      'Low-carb, high-protein diet',
      'Lots of vegetables and fiber',
      'Lean proteins (chicken breast, fish)',
      'Avoid sugary drinks and snacks',
      'Portion control',
      'Calorie deficit: -500 calories/day'
    ],
    Obese: [
      'Strict calorie deficit (-700 calories/day)',
      'High protein, low carb meals',
      'Green vegetables in every meal',
      'No processed foods or sugar',
      'Drink 3-4 liters water daily',
      'Intermittent fasting (16:8)'
    ]
  }
  return plans[category] || []
}
