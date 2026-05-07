<<<<<<< HEAD
# StreakFit - Full-Featured Fitness App

A complete React + Vite fitness application with BMI calculator, personalized workout plans, progress tracking, and animated UI.

## 🚀 Features

### ✅ Completed Features

1. **User Authentication**
   - Login/Register with localStorage
   - Session persistence
   - User profile management

2. **Enhanced Dashboard**
   - Welcome message with username
   - Animated fitness character based on BMI
   - Motivational messages
   - Progress statistics
   - Recent activity tracking

3. **BMI Calculator**
   - Calculate BMI with height/weight
   - Automatic categorization (Underweight/Normal/Overweight/Obese)
   - BMI history tracking
   - Personalized recommendations

4. **BMI-Based Personalization**
   - **Underweight**: Strength training workouts (60-75 min)
   - **Normal**: Balanced maintenance workouts (30-45 min)
   - **Overweight/Obese**: High-intensity fat burning (45-60 min)
   - Custom diet plans for each category

5. **Workout Section**
   - 20 exercises per BMI category
   - Each workout includes:
     - Name, sets, reps
     - Animated emoji icons
     - Timer functionality
     - Completion tracking
   - Progress tracking

6. **Animated Fitness Character**
   - Changes based on BMI category
   - Bouncing animation
   - Motivational messages

7. **Progress & History Tracking**
   - BMI history with dates
   - Workout completion history
   - Statistics dashboard
   - Activity timeline

8. **MongoDB Data Persistence**
   - User accounts stored in MongoDB
   - Passwords hashed before storage
   - BMI history per user stored in MongoDB
   - Workout completion history stored in MongoDB
   - Browser localStorage only keeps the current session user id

9. **Modern UI Design**
   - Pastel blue gradient theme
   - Card-based layout
   - Smooth animations (fade, slide, bounce)
   - Hover effects
   - Responsive design

## 📁 Project Structure

```
streakfit/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── BMIInfo.jsx         # BMI information card
│   │   ├── WorkoutCard.jsx     # Individual workout card
│   │   └── Character.jsx       # Animated character
│   ├── pages/
│   │   ├── LoginRegister.jsx   # Auth page
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   ├── Home.jsx            # BMI calculator
│   │   ├── Workout.jsx         # Workout list
│   │   └── Account.jsx         # User profile
│   ├── context/
│   │   └── AppContext.jsx      # Global state management
│   ├── utils/
│   │   ├── bmiUtils.js         # BMI calculations
│   │   └── workoutData.js      # Workout database
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Global styles
│   └── main.jsx                # Entry point
├── package.json
└── vite.config.js
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **React Router v6** - Navigation
- **Context API** - State management
- **Vite** - Build tool
- **Express** - Backend API
- **MongoDB + Mongoose** - Database persistence
- **bcryptjs** - Password hashing
- **localStorage** - Session restore only
- **CSS3** - Animations & styling

## 📦 Installation

```bash
# Navigate to project
cd streakfit

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Start MongoDB locally, or set MONGO_URI in .env to MongoDB Atlas

# Run development server
npm run dev

# In another terminal, run the backend API
npm run server
```

Open browser at `http://localhost:5173`. The API runs at `http://localhost:5000` by default.

## 🎯 How to Use

### 1. Register/Login
- Open app → Register with name, email, password
- Login with credentials
- Session persists on refresh

### 2. Calculate BMI
- Go to Home page
- Enter height (cm) and weight (kg)
- Click "Calculate BMI"
- View personalized workout and diet plans

### 3. Start Workouts
- Go to Workout page
- View 20 personalized exercises
- Use timer for each exercise
- Mark exercises as complete
- Track progress

### 4. View Progress
- Dashboard shows:
  - Today's completed workouts
  - Total workouts
  - Weeks active
  - Recent activity
- Account page shows:
  - BMI history
  - Workout history
  - Profile information

## 🎨 Features Breakdown

### Context API Implementation
- Global state for user, BMI, workouts
- Automatic localStorage sync
- Centralized data management

### BMI Categories & Plans

**Underweight (<18.5)**
- Focus: Muscle building
- Duration: 60-75 minutes
- Exercises: Strength training (pushups, squats, deadlifts)
- Diet: High protein, calorie surplus

**Normal (18.5-24.9)**
- Focus: Maintenance
- Duration: 30-45 minutes
- Exercises: Balanced routine
- Diet: Balanced nutrition

**Overweight (25-29.9)**
- Focus: Fat loss
- Duration: 45-60 minutes
- Exercises: High-intensity cardio
- Diet: Low-carb, calorie deficit

**Obese (30+)**
- Focus: Weight loss
- Duration: 45-60 minutes
- Exercises: Maximum calorie burn
- Diet: Strict calorie deficit

### Animations
- Fade in on page load
- Slide down for headers
- Bounce for character
- Pulse for active timer
- Celebrate on completion

## MongoDB Storage

Collections used by the backend:

- `users`: name, email, passwordHash, registeredOn
- `bmi_history`: userId, bmi, category, height, weight, date
- `workout_history`: userId, name, category, date

The frontend no longer stores the user database, BMI history, or workout history in localStorage. It stores only `currentUser` so the session can restore after refresh.

## Backend API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/:userId/data`
- `POST /api/users/:userId/bmi`
- `POST /api/users/:userId/workouts`
- `PUT /api/users/:userId/profile`

## 🎭 Character States

- **Underweight**: 🧑🦱 Skinny character
- **Normal**: 💪 Fit character
- **Overweight**: 🧑 Chubby character
- **Obese**: 🧑🦲 Heavy character

## 📱 Responsive Design

- Desktop: Full grid layout
- Tablet: Adjusted columns
- Mobile: Single column, stacked cards

## 🔐 Security Note

This app now uses a backend API and MongoDB. For production:
- Add JWT or cookie-based authentication
- Add rate limiting and stricter CORS
- Use HTTPS and proper secret management
- Keep MongoDB credentials outside source control

## 🚀 Future Enhancements

- Progress photos
- Streak counter
- Social sharing
- Meal planner
- Water intake tracker
- Exercise videos
- Push notifications

## 📄 License

MIT License - Free to use and modify

## 👨‍💻 Author

StreakFit Team

---

**Start your fitness journey today! 💪🔥**
=======
# StreakFit
>>>>>>> 017d1344886e6be2df3b5172316b9d7e00e03d6a
