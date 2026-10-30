const express = require('express');
const router = express.Router();
const { 
    listarAutores, 
    obtenerAutorPorId, 
    crearAutor, 
    actualizarAutor, 
    eliminarAutor 
} = require('../controllers/autoresController');

// Rutas GET
router.get('/', listarAutores);
router.get('/:id', obtenerAutorPorId);

// Ruta POST (Crear)
router.post('/', crearAutor);

// Ruta PUT (Actualizar)
router.put('/:id', actualizarAutor);

// Ruta DELETE (Eliminar)
router.delete('/:id', eliminarAutor);

module.exports = router;