const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { API_URL, AUTH_TOKEN_EXPIRATION } = require("../Config");

// Fonction pour se connecter et obtenir un token d'authentification
const login = async (username, password) => {
  try {
    // Crée la requête pour obtenir un token
    const response = await fetch(`${API_URL}/auth/0.1/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + Buffer.from(`${username}:${password}`).toString("base64"), // Encodage en Base64 pour l'autorisation
      },
      body: JSON.stringify({ expiration: AUTH_TOKEN_EXPIRATION }),
    });

    // Analyse la réponse de l'API
    const data = await response.json();
    if (!response.ok) {
      // Si la réponse n'est pas correcte, lance une erreur
      throw new Error(data.reason || "Authentication failed");
    }

    return data; // Renvoie les données d'authentification en cas de succès
  } catch (error) {
    console.error("Erreur lors de l'authentification:", error.message);
    throw error; // Lance l'erreur pour être traitée par le contrôleur
  }
};

// Fonction pour se déconnecter en supprimant le token d'authentification
const logout = async (token) => {
  try {
    // Crée la requête pour supprimer le token
    const response = await fetch(`${API_URL}/auth/0.1/token/${token}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
      },
    });

    if (!response.ok) {
      // Si la réponse n'est pas correcte, lance une erreur
      throw new Error("Logout failed");
    }

    return true; // Retourne true si la déconnexion est réussie
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error.message);
    throw error;
  }
};

module.exports = {
  login,
  logout,
};
