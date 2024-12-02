document.addEventListener("DOMContentLoaded", async () => {
  // Récupérer l'ID utilisateur depuis l'URL
  const userId = window.location.pathname.split("/").pop();

  if (!userId) {
    console.error("ID utilisateur introuvable dans l'URL !");
    alert("Impossible de charger les services voix.");
    return;
  }

  console.log("ID utilisateur récupéré :", userId);

  // Charger les données des services voix
  try {
    const response = await fetch(`/api/users/${userId}/services`, {
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

    const servicesData = await response.json();
    console.log("Données des services voix récupérées :", servicesData);

    // Remplir les champs du formulaire avec les données récupérées
    document.getElementById("dnd_enabled").checked =
      servicesData.dnd?.enabled || false;
    document.getElementById("incallfilter_enabled").checked =
      servicesData.incallfilter?.enabled || false;
    document.getElementById("ring_seconds").value =
      servicesData.ring_seconds || 30; // Valeur par défaut
    document.getElementById("simultaneous_calls").value =
      servicesData.simultaneous_calls || 5; // Valeur par défaut
  } catch (error) {
    console.error("Erreur lors de la récupération des services voix :", error);
    alert("Impossible de charger les services voix.");
  }

  // Sauvegarder les modifications
  document.getElementById("saveButton").addEventListener("click", async () => {
    const updatedData = {
      dnd: { enabled: document.getElementById("dnd_enabled").checked },
      incallfilter: {
        enabled: document.getElementById("incallfilter_enabled").checked,
      },
      ring_seconds: parseInt(document.getElementById("ring_seconds").value),
      simultaneous_calls: parseInt(
        document.getElementById("simultaneous_calls").value
      ),
    };

    console.log("Données à mettre à jour :", updatedData);

    try {
      const response = await fetch(`/api/users/${userId}/services`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `Erreur HTTP ${response.status} : ${response.statusText}. ${errorDetails}`
        );
      }

      alert("Services voix mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour des services voix :", error);
      alert("Impossible de mettre à jour les services voix.");
    }
  });
});
