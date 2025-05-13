const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) =>
{
    try
    {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token)
        {
            return res.status(401).json({
                success: false,
                message: 'Token non fornito'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user)
        {
            return res.status(404).json({
                success: false,
                message: 'Utente non trovato'
            });
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error)
    {
        res.status(401).json({
            success: false,
            message: 'Token non valido'
        });
    }
};

module.exports = auth; 