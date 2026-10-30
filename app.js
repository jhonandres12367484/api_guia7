const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para que la API pueda interpretar formato JSON
app.use(express.json());

// --- CONFIGURACIÓN DE SWAGGER (Guía 6 - Punto 4) ---
try {
    const documentacion = YAML.load('./swagger.yaml');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(documentacion));
} catch (error) {
    console.console?.log('Aviso: El archivo swagger.yaml aún no ha sido creado.') || console.log('Aviso: El archivo swagger.yaml aún no ha sido creado.');
}

// --- IMPORTACIÓN Y USO DE RUTAS ---
// (Asegúrate de ajustar los nombres según los archivos que tengas en tu carpeta routes/)
const autoresRoutes = require('./routes/autores');
// const prestamosRoutes = require('./routes/prestamos');

app.use('/api/autores', autoresRoutes);
// app.use('/api/prestamos', prestamosRoutes);

// Ruta de bienvenida o prueba inicial
app.get('/', (req, res) => {
    res.json({ mensaje: 'API de Biblioteca - Guía 6 Activa y Funcionando' });
});

// --- MIDDLEWARE CENTRAL DE ERRORES (Guía 6 - Punto 2) ---
const manejadorErrores = require('./middleware/errorHandler');
app.use(manejadorErrores);

// --- INICIAR SERVIDOR ---
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Documentación de Swagger disponible en: http://localhost:${PORT}/api-docs`);
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
});

module.exports = app;