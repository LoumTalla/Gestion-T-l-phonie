document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/lines", {
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

    const linesData = await response.json();
    const linesTableBody = document.querySelector("#linesTable tbody");

    // Remplir les données dans le tableau
    linesData.items.forEach((line) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${line.protocol || "N/A"}</td>
          <td>${line.name || "N/A"}</td>
          <td>${line.provisioning_extension || "N/A"}</td>
          <td>${line.caller_id_name || "N/A"} (${
        line.caller_id_num || "N/A"
      })</td>
          <td>${line.extensions[0]?.exten || "N/A"}</td>
          <td>${line.users[0]?.firstname || "N/A"} ${
        line.users[0]?.lastname || "N/A"
      }</td>
        `;
      linesTableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des lignes :", error);
    alert("Impossible de charger les lignes.");
  }
});
