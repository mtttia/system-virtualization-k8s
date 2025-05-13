import { useState, useEffect } from 'react'
import { Button, Box, Typography, Paper, Grid } from '@mui/material'
import { getMe, getDashboard, crash } from '../services/api'
import { useSnackbar } from '../providers/SnackbarProvider'

function Dashboard()
{
    const [user, setUser] = useState(null)
    const [dashboard, setDashboard] = useState(null)
    const [error, setError] = useState('')
    const { showSnackbar } = useSnackbar()

    useEffect(() =>
    {
        handleRefresh()
    }, [])

    const handleRefresh = async () =>
    {
        try
        {
            const [userData, dashboardData] = await Promise.all([getMe(), getDashboard()])
            setUser(userData.data.user)
            setDashboard(dashboardData.data.data)
            showSnackbar('Data refreshed successfully')
        } catch (err)
        {
            handleLogout()
            showSnackbar(err.response?.data?.message || 'Failed to fetch data', 'error')
            setError(err.response?.data?.message || 'Failed to fetch data')
        }
    }

    const handleLogout = () =>
    {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }
    
    const handleCrash = async () =>
    {
        const message = (await crash()).data.message
        showSnackbar(message)
    }

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h4">Dashboard</Typography>
                <Box>
                    <Button variant="outlined" sx={{mx:2}} onClick={handleRefresh}>Refresh</Button>
                    <Button variant="outlined" sx={{mx:2}} onClick={handleLogout}>Logout</Button>
                </Box>
            </Box>

            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height:"100%" }}>
                        <Typography variant="h6" gutterBottom>User Profile</Typography>
                        {user && (
                            <>
                                <Typography>Name: {user.name}</Typography>
                                <Typography>Email: {user.email}</Typography>
                            </>
                        )}
                    </Paper>    
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height:"100%" }}>
                        <Typography variant="h6" gutterBottom>Dashboard Data</Typography>
                        {dashboard && (
                            <>
                                <Typography>Last Login: {new Date(dashboard.lastLogin).toLocaleString()}</Typography>
                            </>
                        )}
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height:"100%" }}>
                        <Typography variant="h6" gutterBottom>Server crash</Typography>
                        <Typography variant="body1" gutterBottom>Clicking here you make a request that crash the server</Typography>
                        <Button variant="contained" color="error" onClick={handleCrash}>Crash</Button>
                        
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Dashboard 