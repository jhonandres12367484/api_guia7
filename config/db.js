require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS || process.env.DB_PASSWORD, // Soporta ambos formatos
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306
});

module.exports = pool;