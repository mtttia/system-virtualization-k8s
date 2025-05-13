const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const generateToken = (user) =>
{
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

exports.register = async (req, res) =>
{
    try
    {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where:{email: email} });
        if (existingUser)
        {
            return res.status(400).json({
                success: false,
                message: 'Email già registrata'
            });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password
        });

        const token = generateToken(user);

        res.status(201).json({
            success: true,
            message: 'Utente registrato con successo',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.login = async (req, res) =>
{
    try
    {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user)
        {
            return res.status(401).json({
                success: false,
                message: 'Email non valida'
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
        {
            return res.status(401).json({
                success: false,
                message: 'password non validi'
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        const token = generateToken(user);

        res.json({
            success: true,
            message: 'Login effettuato con successo',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getCurrentUser = async (req, res) =>
{
    try
    {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });

        if (!user)
        {
            return res.status(404).json({
                success: false,
                message: 'Utente non trovato'
            });
        }

        res.json({
            success: true,
            user
        });
    } catch (error)
    {
        res.status(500).json({
            success: false,
            message: 'Errore nel recupero dei dati utente'
        });
    }
}; 