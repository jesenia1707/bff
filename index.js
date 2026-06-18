const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Middlewares obligatorios
app.use(cors());
app.use(express.json());

// Configuración de URLs (Usamos 127.0.0.1 para evitar problemas de DNS en Windows)
const JAVA_API_URL = "http://127.0.0.1:8080/api/donaciones";

// --- 1. RUTA PARA RECIBIR DONACIONES (POST) ---
app.post("/api/donaciones", async (req, res) => {
    try {
        console.log("📥 BFF recibió datos de React:", req.body);

        // Estructuramos el objeto exactamente como lo espera tu Entity en Java
        const payload = {
            tipo: req.body.tipo,
            cantidad: Number(req.body.cantidad), // Aseguramos que sea número
            ubicacion: req.body.ubicacion
        };

        console.log("🚀 Enviando a Spring Boot...");
        
        const response = await axios.post(JAVA_API_URL, payload);

        console.log("✅ Spring Boot guardó con éxito en la DB 'donaton'");
        res.status(201).json(response.data);

    } catch (error) {
        console.error("❌ Error en la comunicación con el Backend:");
        
        if (error.response) {
            // Java respondió pero con error (ej: 400, 500)
            console.error("Detalle de Java:", error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
            // El BFF no pudo ni siquiera hablar con Java
            console.error("No se pudo conectar con Java en el puerto 8080. ¿Está encendido?");
            res.status(503).json({ error: "Servicio de Spring Boot no disponible" });
        } else {
            console.error("Error desconocido:", error.message);
            res.status(500).json({ error: "Error interno del BFF" });
        }
    }
});

// --- 2. RUTA PARA LISTAR DONACIONES (GET) ---
app.get("/api/donaciones", async (req, res) => {
    try {
        const response = await axios.get(JAVA_API_URL);
        res.json(response.data);
    } catch (error) {
        console.error("❌ Error al obtener lista:", error.message);
        res.status(500).json({ error: "No se pudieron obtener las donaciones" });
    }
});

// --- 3. INICIO DEL SERVIDOR ---
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`-------------------------------------------`);
    console.log(`🚀 BFF encendido en http://localhost:${PORT}`);
    console.log(`📡 Conectando a Java en: ${JAVA_API_URL}`);
    console.log(`-------------------------------------------`);
});
