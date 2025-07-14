document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.includes("formularioCarga.html")) {
    inicializarFormulario();
  } else if (path.includes("index.html")) {
    inicializarModal();
    cargarYRenderizarArticulos();
  } else if (path.includes("formularioEdicion.html")) {
    inicializarFormularioEdicion();
  }
});

let articulosLocales = [];
let articulosJSON = [];
let articuloAEliminar = null;

async function cargarYRenderizarArticulos() {
  articulosLocales = obtenerArticulosLocal();

  try {
    const response = await fetch("../data/articulos.json");
    if (!response.ok) throw new Error("No se pudo cargar el JSON.");
    articulosJSON = await response.json();
  } catch (error) {
    console.error("Error JSON:", error);
    articulosJSON = [];
  }

  renderizarArticulos();
}

function obtenerArticulosLocal() {
  return JSON.parse(localStorage.getItem("articulos")) || [];
}

function guardarArticulosLocal(articulos) {
  localStorage.setItem("articulos", JSON.stringify(articulos));
}

function renderizarArticulos() {
  const listaArticulos = document.getElementById("lista-articulos");
  listaArticulos.innerHTML = "";

  articulosJSON.forEach((art) => {
    listaArticulos.innerHTML += `
      <div class="blog-container">
        <h2>${art.titulo}</h2>
        <p>${art.contenido}</p>
        <div class="blog-footer">
          <p>${art.fecha || "Fecha no disponible"}</p>
        </div>
      </div>`;
  });

  articulosLocales.forEach((art, index) => {
    listaArticulos.innerHTML += `
      <div class="blog-container">
        <h2>${art.titulo}</h2>
        <p>${art.contenido}</p>
        <div class="blog-footer">
          <p>${art.fecha || "Fecha no disponible"}</p>
          <div>
            <button onclick="editarArticulo(${index})">Editar</button>
            <button onclick="eliminarArticulo(${index})">Eliminar</button>
          </div>
        </div>
      </div>`;
  });
}

function inicializarFormulario() {
  const form = document.getElementById("blogForm");
  const mensaje = document.getElementById("mensaje-exito");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const contenido = document.getElementById("contenido").value.trim();

    if (!titulo || !contenido) return;

    const nuevoArticulo = {
      titulo,
      contenido,
      fecha: new Date().toLocaleDateString("es-AR"),
    };

    const articulos = obtenerArticulosLocal();
    articulos.unshift(nuevoArticulo);
    guardarArticulosLocal(articulos);

    mensaje.style.display = "block";
    form.reset();

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  });
}

function inicializarFormularioEdicion() {
  const form = document.getElementById("editForm");
  const tituloInput = document.getElementById("titulo");
  const contenidoInput = document.getElementById("contenido");
  const mensaje = document.getElementById("mensaje-edicion");

  const data = JSON.parse(localStorage.getItem("articuloEditar"));

  if (!data) {
    alert("No hay artículo para editar");
    window.location.href = "index.html";
    return;
  }

  tituloInput.value = data.titulo;
  contenidoInput.value = data.contenido;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevosArticulos = obtenerArticulosLocal();
    nuevosArticulos[data.index] = {
      ...nuevosArticulos[data.index],
      titulo: tituloInput.value.trim(),
      contenido: contenidoInput.value.trim(),
    };

    guardarArticulosLocal(nuevosArticulos);
    localStorage.removeItem("articuloEditar");

    mensaje.style.display = "block";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  });
}

function editarArticulo(index) {
  const articulos = obtenerArticulosLocal();
  const articulo = articulos[index];

  localStorage.setItem(
    "articuloEditar",
    JSON.stringify({ ...articulo, index })
  );
  window.location.href = "formularioEdicion.html";
}

function inicializarModal() {
  const modal = document.getElementById("modal-eliminar");
  const btnConfirmar = document.getElementById("btn-confirmar");
  const btnCancelar = document.getElementById("btn-cancelar");

  if (btnConfirmar && btnCancelar) {
    btnConfirmar.addEventListener("click", () => {
      if (articuloAEliminar !== null) {
        let articulos = obtenerArticulosLocal();
        articulos.splice(articuloAEliminar, 1);
        guardarArticulosLocal(articulos);
        cargarYRenderizarArticulos();
        articuloAEliminar = null;
        modal.style.display = "none";
      }
    });

    btnCancelar.addEventListener("click", () => {
      articuloAEliminar = null;
      modal.style.display = "none";
    });
  }
}

function eliminarArticulo(index) {
  articuloAEliminar = index;
  document.getElementById("modal-eliminar").style.display = "flex";
}

window.eliminarArticulo = eliminarArticulo;
window.editarArticulo = editarArticulo;
