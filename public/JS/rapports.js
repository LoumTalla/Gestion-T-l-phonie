document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("Fetching call reports...");
    const response = await fetch("/api/reports", {
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

    const reports = await response.json();
    console.log("Call reports fetched successfully:", reports);

    const tableBody = document.querySelector("#cdrTable tbody");

    if (reports.length === 0) {
      tableBody.innerHTML =
        '<tr><td colspan="6">Aucun rapport d\'appel trouvé.</td></tr>';
      return;
    }

    reports.forEach((report) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${report.id}</td>
          <td>${report.call_direction}</td>
          <td>${report.source_extension || "Inconnu"} (${
        report.source_name || "Anonyme"
      })</td>
          <td>${report.destination_extension || "Inconnu"} (${
        report.destination_name || "Anonyme"
      })</td>
          <td>${new Date(report.start).toLocaleString()}</td>
          <td>${report.duration ? `${report.duration}s` : "Non répondu"}</td>
        `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des rapports d'appels :",
      error.message
    );
    alert("Impossible de charger les rapports d'appels.");
  }
});
