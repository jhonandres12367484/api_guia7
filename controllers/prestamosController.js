// POST /api/prestamos/devolucion
exports.devolverLibro = async (req, res) => {
    const { prestamo_id } = req.body;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // 1. Verificar si el préstamo existe y está activo
        const [prestamo] = await connection.execute(
            'SELECT * FROM prestamos WHERE id = ? AND estado = "Prestado"',
            [prestamo_id]
        );

        if (prestamo.length === 0) {
            await connection.rollback();
            return res.status(404).json({ mensaje: 'Préstamo no encontrado o ya devuelto' });
        }

        // 2. Actualizar estado del préstamo
        await connection.execute(
            'UPDATE prestamos SET estado = "Devuelto" WHERE id = ?',
            [prestamo_id]
        );

        await connection.commit();
        res.json({ mensaje: 'Devolución registrada exitosamente (Transacción completada)' });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ mensaje: 'Error en la transacción', error: error.message });
    } finally {
        connection.release();
    }
};