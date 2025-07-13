# Entrega Final JavaScript – Matías González

## 📋 Descripción

Proyecto correspondiente a la Entrega Final del curso de JavaScript.  
Consiste en un blog técnico interactivo donde los usuarios pueden:

- Crear, visualizar, editar y eliminar artículos de blog.
- Iniciar sesión para acceder a funciones de edición y eliminación.
- Consultar un listado de artículos cargados dinámicamente desde un archivo JSON.
- Guardar toda la información de usuarios y artículos utilizando `localStorage` para mantener persistencia de datos.

El proyecto está desarrollado únicamente con HTML, CSS y JavaScript, respetando las consignas solicitadas.

## 🚀 Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (DOM, Eventos, LocalStorage, Fetch)
- JSON (como simulador de base de datos)

## ✅ Funcionalidades Implementadas

- **Carga de Artículos desde un formulario**: mediante un formulario dedicado, los usuarios pueden crear artículos que se almacenan en `localStorage`.
- **Listado dinámico de artículos desde JSON**: el sistema carga y visualiza artículos predefinidos obtenidos desde un archivo `articulos.json` utilizando el método `fetch()`.
- **Edición y eliminación de artículos**: con botones integrados en el listado, los usuarios pueden modificar o eliminar artículos existentes.
- **Inicio de sesión**: el acceso a funciones de edición y eliminación está protegido mediante login. Las credenciales se validan contra un archivo `usuarios.json` simulado, y la sesión se guarda en `localStorage`.
- **Persistencia de datos**: toda la información se mantiene entre recargas gracias al uso de `localStorage`.

## 🎯 Instrucciones de Uso

1. Descargar o clonar el repositorio.
2. Abrir `index.html` en el navegador.
3. Para crear un artículo, ingresar desde el botón "Carga" al formulario de carga.
4. Para editar o eliminar artículos, iniciar sesión con las credenciales predefinidas.
5. Consultar el listado de artículos cargados desde el archivo JSON disponible al iniciar el sitio.

## 👨‍💻 Autor

**Matías Agustín González**  
Curso de JavaScript – Coderhouse
