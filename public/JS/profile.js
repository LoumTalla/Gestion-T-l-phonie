document.addEventListener("DOMContentLoaded", async () => {
  try {
    const userId = window.location.pathname.split("/").pop(); // Récupérer l'ID utilisateur depuis l'URL
    const response = await fetch(`/api/users/${userId}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const profileData = await response.json();
      document.getElementById("uuid").value = profileData.uuid || "N/A";
      document.getElementById("prenom").value = profileData.firstname || "N/A";
      document.getElementById("nom").value = profileData.lastname || "N/A";
      document.getElementById("email").value = profileData.email || "N/A";

      // Gestion des types de souscription
      const subscriptionTypes = {
        0: "Voix",
        1: "Communication Unifiée",
        2: "Relation Client",
      };

      const subscriptionType = profileData.subscription_type;

      if (subscriptionType in subscriptionTypes) {
        const value = subscriptionTypes[subscriptionType];
        const radio = document.querySelector(
          `input[name="subscription"][value="${value}"]`
        );
        if (radio) {
          radio.checked = true; // Cocher la case correspondant au type de souscription
        }
      } else {
        console.warn(
          "Type de souscription inconnu :",
          profileData.subscription_type
        );
      }
    } else {
      throw new Error(
        "Erreur lors de la récupération des données du profil utilisateur"
      );
    }
  } catch (error) {
    console.error("Erreur :", error.message);
    alert("Impossible de charger le profil utilisateur.");
  }

  document.querySelector("#saveButton").addEventListener("click", async () => {
    const userId = window.location.pathname.split("/").pop();
    const updatedData = {
      firstname: document.getElementById("prenom").value,
      lastname: document.getElementById("nom").value,
      email: document.getElementById("email").value,
    };

    try {
      const saveResponse = await fetch(`/api/users/${userId}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const resultText = await saveResponse.text();
      const result = resultText.trim()
        ? JSON.parse(resultText)
        : { message: "Profil mis à jour avec succès !" };

      alert(result.message);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error.message);
    }
  });
});
