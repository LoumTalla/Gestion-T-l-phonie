document.addEventListener("DOMContentLoaded", () => {
  const menuToggles = document.querySelectorAll(".menu-toggle");

  // Gérer l'ouverture et la fermeture des sous-menus
  menuToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();

      const submenu = toggle.nextElementSibling;

      // Vérifie si le sous-menu existe avant de manipuler
      if (submenu && submenu.classList.contains("submenu")) {
        const isOpen = submenu.classList.contains("open");

        // Ferme tous les autres sous-menus avant d'ouvrir le nouveau
        document.querySelectorAll(".submenu.open").forEach((openSubmenu) => {
          if (openSubmenu !== submenu) {
            openSubmenu.classList.remove("open");
            openSubmenu.style.maxHeight = "0";
          }
        });

        // Ouvre ou ferme le sous-menu actuel
        submenu.classList.toggle("open", !isOpen);
        submenu.style.maxHeight = isOpen ? "0" : submenu.scrollHeight + "px";
        submenu.style.transition = "max-height 0.3s ease-in-out";
      }
    });
  });

  // Menu mobile responsive (ajout d'un bouton si nécessaire)
  const sidebar = document.querySelector(".sidebar");
  const menuBtn = document.querySelector(".menu-btn");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      if (sidebar) {
        sidebar.classList.toggle("open");
      }
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
