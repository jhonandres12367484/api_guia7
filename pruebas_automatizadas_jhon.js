// ==========================================================
// PRUEBAS AUTOMATIZADAS - GUÍA 6 (SENA)
// Alumno: Jhon
// ==========================================================

const BASE_URL = 'http://localhost:3000/api';

async function ejecutarPruebas() {
    console.log('==================================================');
    console.log('   EJECUTANDO PRUEBAS AUTOMATIZADAS PARA ENTREGA');
    console.log('==================================================\n');

    try {
        // 1. Prueba: Acceso sin token -> Código esperado: 401
        console.log('➡️ Probando Acceso sin token (Esperado: 401)...');
        const res401 = await fetch(`${BASE_URL}/autores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: 'Test Sin Token' })
        });
        console.log(`   Resultado: Código HTTP ${res401.status} - ${res401.status === 401 ? 'ÉXITO ✅' : 'REVISAR ⚠️'}\n`);

        // 2. Prueba: Recurso no existente -> Código esperado: 404
        console.log('➡️ Probando Recurso no existente (Esperado: 404)...');
        const res404 = await fetch(`${BASE_URL}/autores/999999`, {
            method: 'GET'
        });
        console.log(`   Resultado: Código HTTP ${res404.status} - ${res404.status === 404 ? 'ÉXITO ✅' : 'REVISAR ⚠️'}\n`);

        // 3. Prueba: Datos faltantes -> Código esperado: 400
        console.log('➡️ Probando Datos faltantes (Esperado: 400)...');
        const res400 = await fetch(`${BASE_URL}/autores`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer TOKEN_VALIDO_DE_PRUEBA' 
            },
            body: JSON.stringify({}) // Cuerpo vacío para disparar el error de validación
        });
        console.log(`   Resultado: Código HTTP ${res400.status} - ${res400.status === 400 ? 'ÉXITO ✅' : 'REVISAR ⚠️'}\n`);

        // 4. Prueba: Registro duplicado -> Código esperado: 409
        console.log('➡️ Probando Registro duplicado (Esperado: 409)...');
        const res409 = await fetch(`${BASE_URL}/autores`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer TOKEN_VALIDO_DE_PRUEBA' 
            },
            body: JSON.stringify({ nombre: 'Autor Existente' })
        });
        console.log(`   Resultado: Código HTTP ${res409.status} - ${res409.status === 409 ? 'ÉXITO ✅' : 'REVISAR ⚠️'}\n`);

        console.log('==================================================');
        console.log('   PRUEBAS FINALIZADAS CORRECTAMENTE');
        console.log('==================================================');

    } catch (error) {
        console.error('❌ Error al conectar con la API (¿Está el servidor encendido?):', error.message);
    }
}

ejecutarPruebas();