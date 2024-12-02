document.addEventListener("DOMContentLoaded", async () => {
  const userList = document.getElementById("userList");

  try {
    const response = await fetch("/api/users"); // Assurez-vous que la route API est correcte
    if (!response.ok)
      throw new Error("Erreur lors du chargement des utilisateurs");

    const users = await response.json();

    // Génération des lignes du tableau
    users.items.forEach((user) => {
      const row = document.createElement("tr");
      row.setAttribute("data-id", user.uuid);

      row.innerHTML = `
          <td><input type="checkbox"></td>
          <td>${user.firstname || "N/A"}</td>
          <td>${user.lastname || "N/A"}</td>
          <td>${user.email || "N/A"}</td>
          <td>${
            user.lines && user.lines[0] ? user.lines[0].caller_id_num : "N/A"
          }</td>
          <td>${
            user.lines && user.lines[0]
              ? user.lines[0].provisioning_extension
              : "N/A"
          }</td>
        `;

      // Ajouter un événement de clic pour rediriger vers la page de profil de l'utilisateur
      row.addEventListener("click", () => {
        const userId = row.getAttribute("data-id");
        window.location.href = `/profile/${userId}`; // Redirige vers /profile/{userId}
      });

      userList.appendChild(row);
    });
  } catch (error) {
    console.error("Erreur :", error);
    alert("Impossible de charger la liste des utilisateurs.");
  }
});
