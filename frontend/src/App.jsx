import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useAppContext } from './context/AppContext'
import { ThemeProvider } from './context/ThemeContext'
import LoginRegister from './pages/LoginRegister'
import FitnessDashboard from './pages/FitnessDashboard'

function ProtectedRoute({ children }) {
  const { user, loading } = useAppContext()

  if (loading) {
    return null
  }

  return user ? children : <Navigate to="/" />
}

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginRegister />} />
            <Route path="/login" element={<LoginRegister defaultMode="login" />} />
            <Route path="/register" element={<LoginRegister defaultMode="register" />} />
            <Route path="/home" element={<ProtectedRoute><FitnessDashboard /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><FitnessDashboard /></ProtectedRoute>} />
            <Route path="/account" element={<ProtectedRoute><FitnessDashboard /></ProtectedRoute>} />
            <Route path="/workout" element={<ProtectedRoute><FitnessDashboard /></ProtectedRoute>} />
            <Route path="/diet" element={<ProtectedRoute><FitnessDashboard /></ProtectedRoute>} />
            <Route path="/plans" element={<ProtectedRoute><FitnessDashboard /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  )
}

export default App
