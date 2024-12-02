document.addEventListener("DOMContentLoaded", async () => {
  // Récupérer l'ID de la ligne depuis l'URL
  const lineId = window.location.pathname.split("/").pop();

  if (!lineId) {
    console.error("ID de ligne introuvable dans l'URL !");
    document.getElementById("lineDetails").textContent =
      "Impossible de charger les détails de la ligne. Aucun ID fourni.";
    return;
  }

  try {
    // Récupérer les détails de la ligne via l'API
    const response = await fetch(`/api/lines/${lineId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
    }

    const lineDetails = await response.json();

    // Construire l'affichage des détails
    const detailsContainer = document.getElementById("lineDetails");
    detailsContainer.innerHTML = `
        <h2>Détails de la Ligne</h2>
        <ul>
          <li><strong>ID:</strong> ${lineDetails.id}</li>
          <li><strong>Nom:</strong> ${lineDetails.name}</li>
          <li><strong>Protocol:</strong> ${lineDetails.protocol}</li>
          <li><strong>Appareil ID:</strong> ${
            lineDetails.device_id || "Aucun"
          }</li>
          <li><strong>Extension:</strong> ${
            lineDetails.provisioning_extension
          }</li>
          <li><strong>Nom de l'appelant:</strong> ${
            lineDetails.caller_id_name
          }</li>
          <li><strong>Numéro de l'appelant:</strong> ${
            lineDetails.caller_id_num
          }</li>
          <li><strong>Utilisateur:</strong> ${
            lineDetails.users[0]?.firstname || "Inconnu"
          } ${lineDetails.users[0]?.lastname || ""}</li>
        </ul>
      `;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de la ligne :",
      error
    );
    document.getElementById("lineDetails").textContent =
      "Erreur lors de la récupération des détails de la ligne.";
  }
});
