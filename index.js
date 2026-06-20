const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// =================================
// MIDDLEWARES
// =================================
app.use(cors());
app.use(express.json());

// =================================
// MICROSERVICIOS KUBERNETES
// =================================
const DONACIONES_API =
"http://donaton-services-service:8082/api/donaciones";

const USUARIOS_API =
"http://usuarios-service:8081/api/usuarios";

const LOGISTICA_API =
"http://logistica-service:8083/api/logistica";

// =================================
// HOME
// =================================
app.get("/", (req, res) => {
res.json({
mensaje: "BFF DONATON funcionando correctamente"
});
});

// =================================
// HEALTH CHECK
// =================================
app.get("/health", (req, res) => {
res.json({
status: "UP",
servicio: "BFF DONATON"
});
});

// =================================
// DONACIONES
// =================================

// Obtener todas las donaciones
app.get("/api/donaciones", async (req, res) => {
try {
const response = await axios.get(DONACIONES_API);
res.json(response.data);
} catch (error) {
console.error(error.message);


res.status(500).json({
  error: "Error al obtener donaciones"
});


}
});

// Crear donación
app.post("/api/donaciones", async (req, res) => {
try {


const payload = {
  tipo: req.body.tipo,
  cantidad: Number(req.body.cantidad),
  ubicacion: req.body.ubicacion,
  usuarioId: req.body.usuarioId
};

const response = await axios.post(
  DONACIONES_API,
  payload
);

res.status(201).json(response.data);

} catch (error) {


console.error(error.message);

res.status(500).json({
  error: "Error al registrar donación"
});


}
});

// =================================
// USUARIOS
// =================================

// Obtener usuarios
app.get("/api/usuarios", async (req, res) => {
try {

const response = await axios.get(
  USUARIOS_API
);

res.json(response.data);


} catch (error) {


console.error(error.message);

res.status(500).json({
  error: "Error al obtener usuarios"
});


}
});

// Crear usuario
app.post("/api/usuarios", async (req, res) => {
try {


const response = await axios.post(
  USUARIOS_API,
  req.body
);

res.status(201).json(response.data);


} catch (error) {


console.error(error.message);

res.status(500).json({
  error: "Error al crear usuario"
});


}
});

// =================================
// LOGISTICA
// =================================

// Obtener logística
app.get("/api/logistica", async (req, res) => {
try {


const response = await axios.get(
  LOGISTICA_API
);

res.json(response.data);


} catch (error) {


console.error(error.message);

res.status(500).json({
  error: "Error al obtener logística"
});


}
});

// Crear logística
app.post("/api/logistica", async (req, res) => {
try {


const response = await axios.post(
  LOGISTICA_API,
  req.body
);

res.status(201).json(response.data);


} catch (error) {


console.error(error.message);

res.status(500).json({
  error: "Error al registrar logística"
});


}
});

// =================================
// DASHBOARD
// =================================

app.get("/api/dashboard", async (req, res) => {

try {


const [
  donaciones,
  usuarios,
  logistica
] = await Promise.all([

  axios.get(DONACIONES_API),
  axios.get(USUARIOS_API),
  axios.get(LOGISTICA_API)

]);

res.json({

  totalDonaciones:
    donaciones.data.length,

  totalUsuarios:
    usuarios.data.length,

  totalLogistica:
    logistica.data.length,

  donaciones:
    donaciones.data,

  usuarios:
    usuarios.data,

  logistica:
    logistica.data

});


} catch (error) {


console.error(error.message);

res.status(500).json({
  error: "Error al construir dashboard"
});


}
});

// =================================
// PUERTO
// =================================

const PORT = 3000;

app.listen(PORT, () => {

console.log("=================================");
console.log(`🚀 BFF ejecutándose en puerto ${PORT}`);
console.log(`📦 Donaciones -> ${DONACIONES_API}`);
console.log(`👤 Usuarios -> ${USUARIOS_API}`);
console.log(`🚚 Logística -> ${LOGISTICA_API}`);
console.log("=================================");

});
