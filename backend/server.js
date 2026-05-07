import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/streakfit'
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }))
app.use(express.json())

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    registeredOn: { type: String, required: true }
  },
  { timestamps: true }
)

const bmiHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    bmi: { type: Number, required: true },
    category: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    inputHeight: { type: String },
    inputWeight: { type: String },
    heightUnit: { type: String, default: 'cm' },
    weightUnit: { type: String, default: 'kg' },
    date: { type: Date, required: true }
  },
  { timestamps: true, collection: 'bmi_history' }
)

const workoutHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true }
  },
  { timestamps: true, collection: 'workout_history' }
)

const User = mongoose.model('User', userSchema)
const BmiHistory = mongoose.model('BmiHistory', bmiHistorySchema)
const WorkoutHistory = mongoose.model('WorkoutHistory', workoutHistorySchema)

const toSafeUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  registeredOn: user.registeredOn
})

const serializeRecord = (record) => {
  const raw = record.toObject()
  return {
    id: raw._id.toString(),
    bmi: raw.bmi,
    category: raw.category,
    height: raw.height,
    weight: raw.weight,
    inputHeight: raw.inputHeight,
    inputWeight: raw.inputWeight,
    heightUnit: raw.heightUnit,
    weightUnit: raw.weightUnit,
    name: raw.name,
    date: raw.date.toISOString()
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' })
})

app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() })
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    const registeredOn = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await User.create({ name, email, passwordHash, registeredOn })

    res.status(201).json({ user: toSafeUser(user) })
  } catch (error) {
    next(error)
  }
})

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    res.json({ user: toSafeUser(user) })
  } catch (error) {
    next(error)
  }
})

app.get('/api/users/:userId/data', async (req, res, next) => {
  try {
    const { userId } = req.params
    const [bmiHistory, workoutHistory] = await Promise.all([
      BmiHistory.find({ userId }).sort({ date: 1 }),
      WorkoutHistory.find({ userId }).sort({ date: 1 })
    ])

    res.json({
      bmiHistory: bmiHistory.map(serializeRecord),
      workoutHistory: workoutHistory.map(serializeRecord)
    })
  } catch (error) {
    next(error)
  }
})

app.post('/api/users/:userId/bmi', async (req, res, next) => {
  try {
    const { userId } = req.params
    const { bmi, category, height, weight, inputHeight, inputWeight, heightUnit, weightUnit, date } = req.body

    const record = await BmiHistory.create({
      userId,
      bmi,
      category,
      height,
      weight,
      inputHeight,
      inputWeight,
      heightUnit,
      weightUnit,
      date: date ? new Date(date) : new Date()
    })

    res.status(201).json({ record: serializeRecord(record) })
  } catch (error) {
    next(error)
  }
})

app.delete('/api/users/:userId/bmi/:recordId', async (req, res, next) => {
  try {
    const { userId, recordId } = req.params
    const deleted = await BmiHistory.findOneAndDelete({ _id: recordId, userId })

    if (!deleted) {
      return res.status(404).json({ message: 'BMI record not found.' })
    }

    res.json({ id: recordId })
  } catch (error) {
    next(error)
  }
})

app.post('/api/users/:userId/workouts', async (req, res, next) => {
  try {
    const { userId } = req.params
    const { name, category, date } = req.body

    const record = await WorkoutHistory.create({
      userId,
      name,
      category,
      date: date ? new Date(date) : new Date()
    })

    res.status(201).json({ record: serializeRecord(record) })
  } catch (error) {
    next(error)
  }
})

app.put('/api/users/:userId/profile', async (req, res, next) => {
  try {
    const { userId } = req.params
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ message: 'Name is required.' })
    }

    const user = await User.findByIdAndUpdate(userId, { name }, { new: true, runValidators: true })
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    res.json({ user: toSafeUser(user) })
  } catch (error) {
    next(error)
  }
})

app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({ message: 'Something went wrong on the server.' })
})

mongoose
  .connect(MONGO_URI)
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`StreakFit API running on http://localhost:${PORT}`)
    })

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Stop the existing server or set PORT to another value.`)
        process.exit(1)
      }

      throw error
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  })
