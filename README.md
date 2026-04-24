# 📦 Series Tracker - Frontend

## Link a repositorio de backend
https://github.com/mariale-sierra/ProyectoWeb_backend.git 

## App Corriendo
<img width="1867" height="883" alt="image" src="https://github.com/user-attachments/assets/853e815d-2460-42e3-937b-2c44c3e1d129" />
<img width="1753" height="494" alt="image" src="https://github.com/user-attachments/assets/38c7f9dc-6400-4497-9f86-3c5f2d7f5acd" />
<img width="1685" height="718" alt="image" src="https://github.com/user-attachments/assets/030440e6-a445-4abb-94d3-a3961b45620e" />



## 🚀 Descripción

Este es el frontend del proyecto **Series Tracker**, desarrollado con HTML, CSS y JavaScript vanilla.

El cliente consume una API REST y permite:
- Visualizar series
- Buscar nuevas series
- Agregar series a la lista
- Actualizar progreso de episodios
- Eliminar series
- Asignar ratings

---

## 🛠️ Tecnologías utilizadas


- HTML
- CSS
- JavaScript (Vanilla)
- Fetch API
- DOM manipulation

---

## ▶️ Cómo ejecutar en el servidor
- Conectarse al servidor:
ssh -i id_gcp student@35.239.29.236
- Ir al backend:
cd ~/24405/ProyectoWeb/ProyectoWeb_backend
- Ejecutar el servidor:
nohup ./app &
- Abrir en el navegador:
http://35.239.29.236

## Reflexión

El frontend fue desarrollado completamente en JavaScript vanilla, lo cual permitió entender mejor cómo funciona el DOM, los eventos y la comunicación con APIs sin depender de frameworks.

Aunque frameworks como React o Vue facilitan el desarrollo, usar JavaScript puro hizo más evidente la separación entre cliente y servidor, que era el objetivo principal.

Uno de los mayores retos fue:

Manejo de estados sin librerías
Render dinámico del DOM
Integración con la API REST

En el futuro, sí usaría frameworks para proyectos más grandes, pero esta experiencia fue muy útil para comprender los fundamentos.
