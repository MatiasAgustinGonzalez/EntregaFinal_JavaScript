document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");
  const mensajeError = document.getElementById("mensaje-registro-error");
  const mensajeExito = document.getElementById("mensaje-registro-exito");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevoUsuario = document.getElementById("nuevoUsuario").value.trim();
    const nuevaPassword = document.getElementById("nuevaPassword").value.trim();

    if (!nuevoUsuario || !nuevaPassword) return;

    try {
      const response = await fetch("data/usuarios.json");
      const usuariosJSON = await response.json();
      const usuariosLocal =
        JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

      const usuariosTotales = [...usuariosJSON, ...usuariosLocal];

      const existe = usuariosTotales.some(
        (user) => user.usuario === nuevoUsuario
      );

      if (existe) {
        mensajeError.style.display = "block";
        mensajeExito.style.display = "none";
      } else {
        usuariosLocal.push({ usuario: nuevoUsuario, password: nuevaPassword });
        localStorage.setItem(
          "usuariosRegistrados",
          JSON.stringify(usuariosLocal)
        );

        mensajeError.style.display = "none";
        mensajeExito.style.display = "block";

        setTimeout(() => {
          window.location.href = "login.html";
        }, 1500);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  });
});
