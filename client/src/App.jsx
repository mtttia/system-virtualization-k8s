import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { useState, useEffect } from 'react'
import { ThemeProviderWrapper } from './providers/ThemeProvider'
import { SnackbarProvider } from './providers/SnackbarProvider'
import ErrorPage from './pages/ErrorPage'

function App()
{
  const [token, setToken] = useState(localStorage.getItem('token'))
  
  useEffect(() =>
  {
    const handleStorageChange = () => setToken(localStorage.getItem('token'))
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <ThemeProviderWrapper>
      <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
        </BrowserRouter>
        </SnackbarProvider>
      </ThemeProviderWrapper>
  )
}

export default App
