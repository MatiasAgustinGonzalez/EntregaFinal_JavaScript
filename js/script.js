// Detectar en qué página estamos
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.includes("formularioCarga.html")) {
    inicializarFormulario();
  } else if (path.includes("index.html")) {
    renderizarArticulos();
    inicializarModal();
  } else if (path.includes("formularioEdicion.html")) {
    inicializarFormularioEdicion();
  }
});

// Obtener y guardar artículos
function obtenerArticulos() {
  return JSON.parse(localStorage.getItem("articulos")) || [];
}

function guardarArticulos(articulos) {
  localStorage.setItem("articulos", JSON.stringify(articulos));
}

// Variables para control de eliminación
let articuloAEliminar = null;

// Renderizar artículos con botones
function renderizarArticulos() {
  const listaArticulos = document.getElementById("lista-articulos");
  const articulos = obtenerArticulos();

  if (!listaArticulos) return;

  listaArticulos.innerHTML = "";

  articulos.forEach((articulo, index) => {
    const div = document.createElement("div");
    div.className = "blog-container";

    div.innerHTML = `
      <h2>${articulo.titulo}</h2>
      <p>${articulo.contenido}</p>
      <div class="blog-footer">
        <p>${articulo.fecha || "Fecha no disponible"}</p>
        <div>
          <button onclick="editarArticulo(${index})">Editar</button>
          <button onclick="eliminarArticulo(${index})">Eliminar</button>
        </div>
      </div>
    `;

    listaArticulos.appendChild(div);
  });
}

// Formulario de carga
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

    const articulos = obtenerArticulos();
    articulos.unshift(nuevoArticulo);
    guardarArticulos(articulos);

    mensaje.style.display = "block";
    form.reset();

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  });
}

// Formulario de edición
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

    const nuevosArticulos = obtenerArticulos();
    nuevosArticulos[data.index] = {
      ...nuevosArticulos[data.index],
      titulo: tituloInput.value.trim(),
      contenido: contenidoInput.value.trim(),
    };

    guardarArticulos(nuevosArticulos);
    localStorage.removeItem("articuloEditar");

    mensaje.style.display = "block";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  });
}

// Editar artículo
function editarArticulo(index) {
  const articulos = obtenerArticulos();
  const articulo = articulos[index];

  localStorage.setItem(
    "articuloEditar",
    JSON.stringify({ ...articulo, index })
  );
  window.location.href = "formularioEdicion.html";
}

// Modal de eliminación
function inicializarModal() {
  console.log("Inicializando modal...");

  const modal = document.getElementById("modal-eliminar");
  const btnConfirmar = document.getElementById("btn-confirmar");
  const btnCancelar = document.getElementById("btn-cancelar");

  console.log(modal, btnConfirmar, btnCancelar);

  if (btnConfirmar && btnCancelar && modal) {
    btnConfirmar.addEventListener("click", () => {
      if (articuloAEliminar !== null) {
        const articulos = obtenerArticulos();
        articulos.splice(articuloAEliminar, 1);
        guardarArticulos(articulos);
        renderizarArticulos();
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
  const modal = document.getElementById("modal-eliminar");
  if (modal) {
    modal.style.display = "flex";
  }
}
