document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const mensajeError = document.getElementById("mensaje-login");
  const mensajeExito = document.getElementById("mensaje-exito");

  // Asegurarse que arranquen ocultos siempre
  mensajeError.style.display = "none";
  mensajeExito.style.display = "none";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuarioLogin = document.getElementById("usuarioLogin").value.trim();
    const passwordLogin = document.getElementById("passwordLogin").value.trim();

    if (!usuarioLogin || !passwordLogin) return;

    try {
      const response = await fetch("data/usuarios.json");
      const usuariosJSON = await response.json();

      const usuariosLocal =
        JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
      const usuariosTotales = [...usuariosJSON, ...usuariosLocal];

      const existe = usuariosTotales.some(
        (user) =>
          user.usuario === usuarioLogin && user.password === passwordLogin
      );

      if (existe) {
        mensajeError.style.display = "none";
        mensajeExito.style.display = "block";
        localStorage.setItem(
          "usuarioActivo",
          JSON.stringify({ usuario: usuarioLogin })
        );

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      } else {
        mensajeExito.style.display = "none";
        mensajeError.style.display = "block";
      }
    } catch (error) {
      console.error("Error cargando usuarios.json", error);
      mensajeExito.style.display = "none";
      mensajeError.style.display = "block";
    }
  });
});
