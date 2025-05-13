import { Button, Box, Typography, Paper, Grid } from '@mui/material'
import { crash } from '../services/api'
import { useSnackbar } from '../providers/SnackbarProvider'
import { useNavigate } from 'react-router-dom'

function ErrorPage()
{
    const { showSnackbar } = useSnackbar()
    const navigate = useNavigate()
    
    const handleReload = async () =>
    {
        navigate("/");
    }

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h4">Error Page</Typography>
            </Box>

            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>Reload server</Typography>
                    <Button variant="contained" color="error" onClick={handleReload}>Reload</Button>
                    
                </Paper>
            </Grid>
        </Box>
    )
}

export default ErrorPage 