const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Endpoint de Login para generar el token
router.post('/login', (req, res) => {
    const { usuario, password } = req.body;

    // Validación de prueba (puedes adaptarla a tu tabla de usuarios si la tienes)
    if (usuario === 'admin' && password === '123456') {
        const token = jwt.sign({ usuario: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ mensaje: 'Login exitoso', token });
    }

    res.status(400).json({ mensaje: 'Usuario o contraseña incorrectos' });
});

module.exports = router;
