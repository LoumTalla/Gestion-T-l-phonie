document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/voicemails", {
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

    const voicemails = await response.json();
    const tableBody = document.querySelector("#voicemailTable tbody");

    if (voicemails.length === 0) {
      tableBody.innerHTML =
        '<tr><td colspan="8">Aucune messagerie vocale trouvée.</td></tr>';
      return;
    }

    voicemails.forEach((voicemail) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${voicemail.id}</td>
          <td>${voicemail.name}</td>
          <td>${voicemail.number}</td>
          <td>${voicemail.context}</td>
          <td>${voicemail.language}</td>
          <td>${voicemail.timezone}</td>
          <td>${voicemail.enabled ? "Oui" : "Non"}</td>
          <td>
            <a href="${voicemail.links[0]?.href}" target="_blank">Détails</a>
          </td>
        `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des messageries vocales :",
      error.message
    );
    alert("Impossible de charger les messageries vocales.");
  }
});
