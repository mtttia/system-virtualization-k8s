import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline, useTheme } from '@mui/material'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { useState, useEffect, useContext, createContext } from 'react'
import { ThemeProviderWrapper } from './providers/ThemeProvider'
import { SnackbarProvider } from './providers/SnackbarProvider'
import ErrorPage from './pages/ErrorPage'

const Context = createContext()

function App()
{
  const [token, setTokenState] = useState(localStorage.getItem('token'))
  console.log("checking Token", token)

  const handleNewToken = (token) =>
  {
    localStorage.setItem('token', token)
    setTokenState(token)
  }

  return (
    <Context.Provider value={{token, setToken: handleNewToken}} >
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
      </Context.Provider>
  )
}

export const  UseToken = () => {
  return useContext(Context)
}

export default App
