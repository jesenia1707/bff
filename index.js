const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// URLs de los servicios Kubernetes
const DONACIONES_URL = "http://donaton-services-service:8082/api/donaciones";
const USUARIOS_URL = "http://usuarios-service:8081/api/usuarios";
const LOGISTICA_URL = "http://logistica-service:8083/api/logistica";

/* ==========================
   DONACIONES
========================== */

// Crear donación
app.post("/api/donaciones", async (req, res) => {
  try {
    const response = await axios.post(DONACIONES_URL, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error Donaciones:", error.message);
    res.status(500).json({ error: "Error en servicio Donaciones" });
  }
});

// Listar donaciones
app.get("/api/donaciones", async (req, res) => {
  try {
    const response = await axios.get(DONACIONES_URL);
    res.json(response.data);
  } catch (error) {
    console.error("Error Donaciones:", error.message);
    res.status(500).json({ error: "Error en servicio Donaciones" });
  }
});

/* ==========================
   USUARIOS
========================== */

// Crear usuario
app.post("/api/usuarios", async (req, res) => {
  try {
    const response = await axios.post(USUARIOS_URL, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error Usuarios:", error.message);
    res.status(500).json({ error: "Error en servicio Usuarios" });
  }
});

// Listar usuarios
app.get("/api/usuarios", async (req, res) => {
  try {
    const response = await axios.get(USUARIOS_URL);
    res.json(response.data);
  } catch (error) {
    console.error("Error Usuarios:", error.message);
    res.status(500).json({ error: "Error en servicio Usuarios" });
  }
});

/* ==========================
   LOGISTICA
========================== */

// Crear logística
app.post("/api/logistica", async (req, res) => {
  try {
    const response = await axios.post(LOGISTICA_URL, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error Logística:", error.message);
    res.status(500).json({ error: "Error en servicio Logística" });
  }
});

// Listar logística
app.get("/api/logistica", async (req, res) => {
  try {
    const response = await axios.get(LOGISTICA_URL);
    res.json(response.data);
  } catch (error) {
    console.error("Error Logística:", error.message);
    res.status(500).json({ error: "Error en servicio Logística" });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("=====================================");
  console.log(`🚀 BFF ejecutándose en puerto ${PORT}`);
  console.log("=====================================");
});
