document.addEventListener("DOMContentLoaded", () => {
  const menuToggles = document.querySelectorAll(".menu-toggle");

  // Gérer l'ouverture et la fermeture des sous-menus
  menuToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const submenu = toggle.nextElementSibling;

      // Vérifie si le sous-menu existe avant de manipuler
      if (submenu) {
        submenu.classList.toggle("open");
        submenu.style.maxHeight = submenu.classList.contains("open")
          ? submenu.scrollHeight + "px"
          : "0";

        // Ajout d'une animation fluide
        submenu.style.transition = "max-height 0.3s ease-in-out";
      }
    });
  });

  // Menu mobile responsive (ajout d'un bouton si nécessaire)
  const sidebar = document.querySelector(".sidebar");
  const menuBtn = document.querySelector(".menu-btn");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Message de confirmation lors de la déconnexion
  const logoutLink = document.querySelector('a[href="/logout"]');
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      if (!confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
        e.preventDefault();
      }
    });
  }

  // Fonctionnalité pour fermer les sous-menus ouverts lors d'un clic extérieur
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".sidebar")) {
      document.querySelectorAll(".submenu.open").forEach((submenu) => {
        submenu.classList.remove("open");
        submenu.style.maxHeight = "0";
      });
    }
  });
});
