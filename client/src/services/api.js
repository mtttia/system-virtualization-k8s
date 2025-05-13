import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(config =>
{
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

api.interceptors.response.use(
    response => response,
    error =>
    {
        console.log("error throw here", error);
        
        if (error.response?.status === 401)
        {
            localStorage.removeItem('token')
            // window.location.href = '/login'
        }
        else if (error.code == "ERR_NETWORK")
        {
            window.location.href = '/error'
        }
        return Promise.reject(error)
    }
)

export const login = (email, password) => api.post('/auth/login', { email, password })
export const register = (name, email, password) => api.post('/auth/register', { name, email, password })
export const getMe = () => api.get('/auth/me')
export const getDashboard = () => api.get('/users/dashboard') 
export const crash = () => api.get('/crash-server')