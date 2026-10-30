const pool = require('../config/db');

// 1. Listar todos los autores
const listarAutores = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM autores');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error al consultar los autores", detalle: error.message });
    }
};

// 2. Obtener autor por ID
const obtenerAutorPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM autores WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error al buscar el autor", detalle: error.message });
    }
};

// 3. Crear autor con validación
const crearAutor = async (req, res) => {
    try {
        const { nombre, nacionalidad } = req.body;

        if (!nombre || !nacionalidad) {
            return res.status(400).json({ 
                error: "Campos obligatorios faltantes", 
                detalle: "Los campos 'nombre' y 'nacionalidad' son requeridos." 
            });
        }

        const [result] = await pool.execute(
            'INSERT INTO autores (nombre, nacionalidad) VALUES (?, ?)',
            [nombre, nacionalidad]
        );

        res.status(201).json({
            mensaje: "Autor creado exitosamente",
            id: result.insertId,
            autor: { id: result.insertId, nombre, nacionalidad }
        });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar el autor", detalle: error.message });
    }
};

// 4. Actualizar autor con validación
const actualizarAutor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, nacionalidad } = req.body;

        if (!nombre || !nacionalidad) {
            return res.status(400).json({ 
                error: "Campos obligatorios faltantes", 
                detalle: "Debe proporcionar 'nombre' y 'nacionalidad' para actualizar." 
            });
        }

        const [result] = await pool.execute(
            'UPDATE autores SET nombre = ?, nacionalidad = ? WHERE id = ?',
            [nombre, nacionalidad, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No se encontró el autor para actualizar" });
        }

        res.status(200).json({
            mensaje: "Autor actualizado exitosamente",
            autor: { id: Number(id), nombre, nacionalidad }
        });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el autor", detalle: error.message });
    }
};

// 5. Eliminar autor
const eliminarAutor = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.execute('DELETE FROM autores WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No se encontró el autor para eliminar" });
        }

        res.status(200).json({ mensaje: `Autor con ID ${id} eliminado exitosamente` });
    } catch (error) {
        res.status(500).json({ 
            error: "Error al eliminar el autor", 
            detalle: "Verifique que el autor no tenga libros vinculados." 
        });
    }
};

// Exportar todas las funciones del controlador
module.exports = {
    listarAutores,
    obtenerAutorPorId,
    crearAutor,
    actualizarAutor,
    eliminarAutor
};