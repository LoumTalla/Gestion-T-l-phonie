document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("Fetching groups...");
    const response = await fetch("/api/groups", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `Erreur HTTP ${response.status}: ${response.statusText}. ${errorDetails}`
      );
    }

    const groups = await response.json();
    console.log("Groups fetched successfully:", groups);

    const groupList = document.getElementById("groupList");

    if (groups.length === 0) {
      groupList.textContent = "Aucun groupe trouvé.";
      return;
    }

    // Crée une liste des groupes avec un design amélioré
    groupList.innerHTML = ""; // Réinitialise le contenu
    groups.forEach((group) => {
      // Créer un conteneur pour chaque groupe
      const groupItem = document.createElement("div");
      groupItem.classList.add("group-item");

      // Ajouter les informations du groupe
      const groupInfo = document.createElement("div");
      groupInfo.classList.add("group-info");
      groupInfo.innerHTML = `
        <h3>${group.label}</h3>
        <p><strong>ID:</strong> ${group.id}</p>
        <p><strong>Nom:</strong> ${group.name}</p>
        <p><strong>Extension:</strong> ${
          group.extensions?.[0]?.exten || "Aucune"
        }</p>
      `;

      // Ajouter un bouton pour voir les détails
      const groupActions = document.createElement("div");
      groupActions.classList.add("group-actions");
      const detailsButton = document.createElement("button");
      detailsButton.textContent = "Voir Détails";
      detailsButton.addEventListener("click", () => {
        window.location.href = `/group-details/${group.uuid}`;
      });

      groupActions.appendChild(detailsButton);

      // Ajouter les éléments au conteneur principal
      groupItem.appendChild(groupInfo);
      groupItem.appendChild(groupActions);

      groupList.appendChild(groupItem);
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des groupes :",
      error.message
    );
    const groupList = document.getElementById("groupList");
    groupList.textContent =
      "Une erreur est survenue lors du chargement des groupes.";
  }
});
