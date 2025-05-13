import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { TextField, Button, Box, Typography, Paper } from '@mui/material'
import { register } from '../services/api'

function Register()
{
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState('')

    const handleSubmit = async e =>
    {
        e.preventDefault()
        try
        {
            const { data } = await register(form.name, form.email, form.password)
            localStorage.setItem('token', data.token)
            navigate('/')
        } catch (err)
        {
            setError(err.response?.data?.message || 'Registration failed')
        }
    }

    return (
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 4, width: 400 }}>
                <Typography variant="h4" gutterBottom>Register</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        margin="normal"
                        required
                    />
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
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>Register</Button>
                    <Button component={Link} to="/login" fullWidth sx={{ mt: 2 }}>Login</Button>
                </form>
            </Paper>
        </Box>
    )
}

export default Register 