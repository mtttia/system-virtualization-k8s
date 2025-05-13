import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { TextField, Button, Box, Typography, Paper } from '@mui/material'
import { login } from '../services/api'

function Login()
{
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')

    const handleSubmit = async e =>
    {
        e.preventDefault()
        try
        {
            const { data } = await login(form.email, form.password)
            localStorage.setItem('token', data.token)
            navigate('/')
        } catch (err)
        {
            setError(err.response?.data?.message || 'Login failed')
        }
    }

    return (
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 4, width: 400 }}>
                <Typography variant="h4" gutterBottom>Login</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        margin="normal"
                        required
                    />
                    {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>Login</Button>
                    <Button component={Link} to="/register" fullWidth sx={{ mt: 2 }}>Register</Button>
                </form>
            </Paper>
        </Box>
    )
}

export default Login 