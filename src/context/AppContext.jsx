import { createContext, useState, useEffect, useContext } from 'react'
import { api } from '../services/api'

const AppContext = createContext()

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [bmiHistory, setBmiHistory] = useState([])
  const [workoutHistory, setWorkoutHistory] = useState([])
  const [currentBMI, setCurrentBMI] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        if (!userData.id) {
          localStorage.removeItem('currentUser')
          setLoading(false)
          return
        }

        setUser(userData)
        loadUserData(userData.id).finally(() => setLoading(false))
      } catch {
        localStorage.removeItem('currentUser')
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  const loadUserData = async (userId) => {
    if (!userId) return

    try {
      const data = await api.getUserData(userId)
      setBmiHistory(data.bmiHistory)
      setWorkoutHistory(data.workoutHistory)
      setCurrentBMI(data.bmiHistory.length > 0 ? data.bmiHistory[data.bmiHistory.length - 1] : null)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  const login = async (userData) => {
    setUser(userData)
    localStorage.setItem('currentUser', JSON.stringify(userData))
    await loadUserData(userData.id)
  }

  const logout = () => {
    setUser(null)
    setBmiHistory([])
    setWorkoutHistory([])
    setCurrentBMI(null)
    localStorage.removeItem('currentUser')
  }

  const saveBMI = async (bmiData) => {
    if (!user) return
    const { record } = await api.saveBMI(user.id, bmiData)
    const newHistory = [...bmiHistory, record]
    setBmiHistory(newHistory)
    setCurrentBMI(record)
  }

  const deleteBMI = async (recordId) => {
    if (!user) return
    await api.deleteBMI(user.id, recordId)
    const newHistory = bmiHistory.filter((record) => record.id !== recordId)
    setBmiHistory(newHistory)
    setCurrentBMI(newHistory.length > 0 ? newHistory[newHistory.length - 1] : null)
  }

  const saveWorkout = async (workoutData) => {
    if (!user) return
    const { record } = await api.saveWorkout(user.id, workoutData)
    const newHistory = [...workoutHistory, record]
    setWorkoutHistory(newHistory)
  }

  const updateProfile = async (profileData) => {
    if (!user) return
    const { user: updatedUser } = await api.updateProfile(user.id, profileData)
    setUser(updatedUser)
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    bmiHistory,
    workoutHistory,
    currentBMI,
    loading,
    error,
    login,
    logout,
    saveBMI,
    deleteBMI,
    saveWorkout,
    updateProfile
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
