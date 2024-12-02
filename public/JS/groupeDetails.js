document.addEventListener("DOMContentLoaded", async () => {
  // Récupérer l'ID du groupe depuis l'URL
  const groupId = window.location.pathname.split("/").pop();

  if (!groupId) {
    console.error("ID du groupe introuvable dans l'URL !");
    alert("Impossible de charger les détails du groupe.");
    return;
  }

  console.log("ID du groupe récupéré :", groupId);

  // Charger les détails du groupe
  try {
    const response = await fetch(`/api/groups/${groupId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `Erreur HTTP ${response.status} : ${response.statusText}. ${errorDetails}`
      );
    }

    const groupData = await response.json();
    console.log("Données du groupe récupérées :", groupData);

    // Remplir les champs du formulaire avec les données récupérées
    document.getElementById("label").value = groupData.label || "";
    document.getElementById("name").value = groupData.name || "";
    document.getElementById("extension").value =
      groupData.extensions?.[0]?.exten || ""; // Première extension si disponible
    document.getElementById("ring_strategy").value =
      groupData.ring_strategy || "all"; // Valeur par défaut
    document.getElementById("music_on_hold").value =
      groupData.music_on_hold || "";
    document.getElementById("preprocess_subroutine").checked =
      groupData.preprocess_subroutine === "enabled";
    document.getElementById("ring_in_use").checked = !!groupData.ring_in_use;
    document.getElementById("mark_answered_elsewhere").checked =
      !!groupData.mark_answered_elsewhere;
    document.getElementById("retry_delay").value = groupData.retry_delay || 5; // Valeur par défaut
    document.getElementById("user_timeout").value =
      groupData.user_timeout || 15; // Valeur par défaut
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du groupe :",
      error.message
    );
    alert("Impossible de charger les détails du groupe.");
  }

  // Sauvegarder les modifications
  document.getElementById("saveButton").addEventListener("click", async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const updatedGroup = {
      label: document.getElementById("label").value,
      ring_strategy: document.getElementById("ring_strategy").value,
      music_on_hold: document.getElementById("music_on_hold").value || null,
      preprocess_subroutine: document.getElementById("preprocess_subroutine")
        .checked
        ? "enabled"
        : null,
      ring_in_use: document.getElementById("ring_in_use").checked,
      mark_answered_elsewhere: document.getElementById(
        "mark_answered_elsewhere"
      ).checked,
      retry_delay: parseInt(document.getElementById("retry_delay").value, 10),
      user_timeout: parseInt(document.getElementById("user_timeout").value, 10),
    };

    console.log("Données à mettre à jour :", updatedGroup);

    try {
      const response = await fetch(`/api/groups/${groupId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGroup),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `Erreur HTTP ${response.status} : ${response.statusText}. ${errorDetails}`
        );
      }

      const resultText = await response.text();
      const result = resultText ? JSON.parse(resultText) : {};

      console.log("Réponse de mise à jour :", result);
      alert("Détails du groupe mis à jour avec succès !");
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des détails du groupe :",
        error.message
      );
      alert("Impossible de mettre à jour les détails du groupe.");
    }
  });
});
