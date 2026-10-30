// middleware/errorHandler.js
const manejadorErrores = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({ mensaje: 'Datos inválidos', detalles: err.errors });
    }

    res.status(err.statusCode || 500).json({
        mensaje: err.message || 'Error interno del servidor'
    });
};

module.exports = manejadorErrores;