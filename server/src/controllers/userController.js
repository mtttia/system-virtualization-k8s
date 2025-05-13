const User = require('../models/User');

exports.getDashboard = async (req, res) =>
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
            data: {
                user,
                lastLogin: user.lastLogin
            }
        });
    } catch (error)
    {
        res.status(500).json({
            success: false,
            message: 'Errore nel recupero dei dati dashboard'
        });
    }
};

exports.updateProfile = async (req, res) =>
{
    try
    {
        const { name } = req.body;
        const user = await User.findByPk(req.user.id);

        if (!user)
        {
            return res.status(404).json({
                success: false,
                message: 'Utente non trovato'
            });
        }

        user.name = name;
        await user.save();

        res.json({
            success: true,
            message: 'Profilo aggiornato con successo',
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
            message: 'Errore durante l\'aggiornamento del profilo'
        });
    }
}; 