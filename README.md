# 🧾 API de Productos del Marketplace - NestJS

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![NestJS](https://img.shields.io/badge/NestJS-%F0%9F%90%8D-red)
![Status](https://img.shields.io/badge/status-active-brightgreen)

## 📌 Descripción General

Esta API está desarrollada en **NestJS** y proporciona acceso estructurado a los productos del marketplace. Está diseñada para integrarse fácilmente con cualquier cliente o aplicación frontend.

### Funcionalidades principales:
1. 📦 Catálogo completo de productos  
2. 🔥 Ofertas especiales (baratazos)  
3. 🎁 Paquetes y combos promocionales

Cada endpoint retorna respuestas detalladas y consistentes en formato JSON.

---

## 🚀 Tecnologías Usadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [sqlserver] *(ajustar según tu base de datos)*
- [Swagger](https://swagger.io/) *(documentación interactiva)*

---

## 🛠 Configuración del Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=5991
BASE_URL=http://localhost:5991/api/v1
DATABASE_URL=...
```

Instala las dependencias:

```bash
npm install
```

Levanta el servidor:

```bash
npm run start:dev
```

---

## 🔐 Autenticación

*(Si tu API tiene autenticación)*  
Algunos endpoints pueden requerir token JWT. Asegúrate de incluirlo en los headers de tus solicitudes:

```http
Authorization: Bearer <tu_token>
```

---

## 📚 Endpoints Principales

Todos los endpoints están bajo el prefijo `/api/v1`.

### 1. `GET /productos/Productos-WEB-WEP`
Obtiene el catálogo completo de productos.

**Respuesta:**

```json
{
  "status": 200,
  "message": "Productos obtenidos.",
  "data": [
    {
      "Codigo": "AAAAxxxxx",
      "Titulo": "titulo",
      "Descripcion": "descripcion",
      "Precio": 100,
      "Imagen": "imagen.url.com",
      "Url": "marketplace.url.com"
    }
  ]
}
```

---

### 2. `GET /productos/Baratazos-WEB-WEP`
Obtiene las ofertas especiales del marketplace.

**Respuesta:**

```json
{
  "status": 200,
  "message": "Baratazos obtenidos.",
  "data": [
    {
      "Codigo": "BBBB*****",
      "Titulo": "titulo",
      "Descripcion": "Descripcion",
      "PrecioAntes": 150,
      "PrecioPromocional": 100,
      "Imagen": "imagen.url.com",
      "Url": "marketplace.url.com"
    }
  ]
}
```

---

### 3. `GET /productos/Ofertas-WEB-WEP`
Obtiene combos y promociones especiales.

**Respuesta:**

```json
{
  "status": 200,
  "message": "Ofertas obtenidas.",
  "data": [
    {
      "Titulo": "titulo",
      "Descripcion": "descripcion",
      "Precio": 200,
      "Imagen": "imagen.url.com",
      "Url": "marketplace.url.com"
    }
  ]
}
```

---

## 📘 Documentación Interactiva

Puedes explorar y probar los endpoints directamente en Swagger:

```
http://localhost:5991/api/v1/docs
```

---