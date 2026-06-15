const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// ===============================
// MIDDLEWARES
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// MICROSERVICIOS SPRING BOOT
// ===============================
const DONACIONES_API_URL = "http://127.0.0.1:8080/api/donaciones";
const USUARIOS_API_URL = "http://127.0.0.1:8081/api/usuarios";
const LOGISTICA_API_URL = "http://127.0.0.1:8082/api/logistica";

// ===============================
// DONACIONES
// ===============================

// Obtener donaciones
app.get("/api/donaciones", async (req, res) => {
    try {
        const response = await axios.get(DONACIONES_API_URL);
        res.json(response.data);
    } catch (error) {
        console.error("❌ Error obteniendo donaciones:", error.message);
        res.status(500).json({
            error: "No se pudieron obtener las donaciones"
        });
    }
});

// Crear donación
app.post("/api/donaciones", async (req, res) => {
    try {
        console.log("📥 Donación recibida:", req.body);

        const response = await axios.post(
            DONACIONES_API_URL,
            req.body
        );

        console.log("✅ Donación guardada");

        res.status(201).json(response.data);

    } catch (error) {
        console.error("❌ Error guardando donación:", error.message);

        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({
                error: "Servicio de donaciones no disponible"
            });
        }
    }
});

// ===============================
// USUARIOS
// ===============================

// Obtener usuarios
app.get("/api/usuarios", async (req, res) => {
    try {
        const response = await axios.get(USUARIOS_API_URL);
        res.json(response.data);
    } catch (error) {
        console.error("❌ Error obteniendo usuarios:", error.message);
        res.status(500).json({
            error: "No se pudieron obtener los usuarios"
        });
    }
});

// Crear usuario
app.post("/api/usuarios", async (req, res) => {
    try {
        console.log("📥 Usuario recibido:", req.body);

        const response = await axios.post(
            USUARIOS_API_URL,
            req.body
        );

        console.log("✅ Usuario guardado");

        res.status(201).json(response.data);

    } catch (error) {
        console.error("❌ Error guardando usuario:", error.message);

        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({
                error: "Servicio de usuarios no disponible"
            });
        }
    }
});

// ===============================
// LOGISTICA
// ===============================

// Obtener logística
app.get("/api/logistica", async (req, res) => {
    try {
        const response = await axios.get(LOGISTICA_API_URL);
        res.json(response.data);
    } catch (error) {
        console.error("❌ Error obteniendo logística:", error.message);
        res.status(500).json({
            error: "No se pudieron obtener los datos de logística"
        });
    }
});

// Crear registro logística
app.post("/api/logistica", async (req, res) => {
    try {
        console.log("📥 Registro logística recibido:", req.body);

        const response = await axios.post(
            LOGISTICA_API_URL,
            req.body
        );

        console.log("✅ Registro logística guardado");

        res.status(201).json(response.data);

    } catch (error) {
        console.error("❌ Error guardando logística:", error.message);

        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({
                error: "Servicio de logística no disponible"
            });
        }
    }
});

// ===============================
// HEALTH CHECK
// ===============================
app.get("/", (req, res) => {
    res.json({
        mensaje: "BFF funcionando correctamente",
        servicios: {
            donaciones: DONACIONES_API_URL,
            usuarios: USUARIOS_API_URL,
            logistica: LOGISTICA_API_URL
        }
    });
});

// ===============================
// INICIAR SERVIDOR
// ===============================
const PORT = 3000;

app.listen(PORT, () => {
    console.log("====================================");
    console.log(`🚀 BFF ejecutándose en puerto ${PORT}`);
    console.log(`📦 Donaciones -> ${DONACIONES_API_URL}`);
    console.log(`👤 Usuarios -> ${USUARIOS_API_URL}`);
    console.log(`🚚 Logística -> ${LOGISTICA_API_URL}`);
    console.log("====================================");
});