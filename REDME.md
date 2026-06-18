# BFF Donatón

## Descripción

El BFF (Backend For Frontend) actúa como punto de entrada para el frontend de Donatón. Su función es centralizar las solicitudes realizadas desde la interfaz web y comunicarse con los microservicios del sistema.

## Tecnologías

- Java 17
- Spring Boot
- REST API
- Docker
- Kubernetes

## Arquitectura

El BFF se comunica con los siguientes microservicios:

- Usuarios
- Donaciones
- Logística

```text
Frontend React
       │
       ▼
      BFF
       │
 ┌─────┼─────┐
 ▼     ▼     ▼
Usuarios Donaciones Logística