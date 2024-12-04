const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { API_URL } = require("../Config");

// Fonction pour obtenir le profil utilisateur
const getUserProfile = async (token, userId) => {
  try {
    console.log(`Fetching user profile for userId: ${userId}`);
    const response = await fetch(`${API_URL}/confd/1.1/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${
          errorDetails || "Erreur lors de la récupération du profil utilisateur"
        }`
      );
    }

    const data = await response.json();
    console.log("User profile fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Erreur dans getUserProfile :", error.message);
    throw error;
  }
};

const updateUserProfile = async (token, userId, profileData) => {
  try {
    console.log(`Updating user profile for userId: ${userId}`);

    const response = await fetch(`${API_URL}/confd/1.1/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
        accept: "application/json",
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${
          errorDetails || "Erreur lors de la mise à jour du profil utilisateur"
        }`
      );
    }

    const resultText = await response.text();
    const data = resultText ? JSON.parse(resultText) : {};
    console.log("User profile updated successfully:", data);

    return data;
  } catch (error) {
    console.error("Erreur dans updateUserProfile :", error.message);
    throw error;
  }
};

// Fonction pour obtenir les services voix d'un utilisateur
const getVoiceServices = async (token, userId) => {
  try {
    console.log(`Fetching voice services for userId: ${userId}`);
    const response = await fetch(
      `${API_URL}/confd/1.1/users/${userId}/services`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": token,
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${
          errorDetails || "Erreur lors de la récupération des services voix"
        }`
      );
    }

    const data = await response.json();
    console.log("Voice services fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Erreur dans getVoiceServices :", error.message);
    throw error;
  }
};

const updateVoiceServices = async (token, userId, voiceServicesData) => {
  try {
    const response = await fetch(
      `${API_URL}/confd/1.1/users/${userId}/services`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": token,
          accept: "application/json",
        },
        body: JSON.stringify(voiceServicesData),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `Erreur HTTP ${response.status} : ${response.statusText}. ${errorDetails}`
      );
    }

    const resultText = await response.text();
    return resultText ? JSON.parse(resultText) : {};
  } catch (error) {
    console.error("Erreur dans updateVoiceServices :", error.message);
    throw error;
  }
};

// Fonction pour obtenir la liste des utilisateurs
const listUsers = async (token) => {
  try {
    console.log("Fetching list of users...");
    const response = await fetch(`${API_URL}/confd/1.1/users?recurse=false`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${
          errorDetails ||
          "Erreur lors de la récupération de la liste des utilisateurs"
        }`
      );
    }

    const data = await response.json();
    console.log("User list fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Erreur dans listUsers :", error.message);
    throw error;
  }
};

// Fonction pour obtenir la liste des lignes
const listLines = async (token) => {
  try {
    console.log("Fetching list of lines...");
    const response = await fetch(`${API_URL}/confd/1.1/lines?recurse=false`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${
          errorDetails || "Erreur lors de la récupération des lignes"
        }`
      );
    }

    const data = await response.json();
    console.log("Lines list fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Erreur dans listLines :", error.message);
    throw error;
  }
};

// Fonction pour obtenir les détails d'une ligne avec son ID
const getLineById = async (token, lineId) => {
  try {
    console.log(`Fetching line details for lineId: ${lineId}`);
    const response = await fetch(`${API_URL}/confd/1.1/lines/${lineId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${
          errorDetails || "Erreur lors de la récupération de la ligne"
        }`
      );
    }

    const data = await response.json();
    console.log("Line details fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Erreur dans getLineById :", error.message);
    throw error;
  }
};

// Fonction pour obtenir la liste des groupes
const fetchGroups = async (token) => {
  try {
    console.log("Fetching groups...");
    const response = await fetch(`${API_URL}/confd/1.1/groups?recurse=false`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${
          errorDetails || "Erreur lors de la récupération des groupes"
        }`
      );
    }

    const data = await response.json();
    console.log("Groups fetched successfully:", data);
    return data.items; // Retourne uniquement les éléments
  } catch (error) {
    console.error("Erreur dans getGroups :", error.message);
    throw error;
  }
};

const getGroupDetails = async (token, groupId) => {
  try {
    console.log(`Fetching details for group ID: ${groupId}`);
    const response = await fetch(`${API_URL}/confd/1.1/groups/${groupId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${
          errorDetails || "Erreur lors de la récupération des détails du groupe"
        }`
      );
    }

    const data = await response.json();
    console.log("Group details fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Erreur dans getGroupDetails :", error.message);
    throw error;
  }
};

const updateGroupDetails = async (token, groupId, groupData) => {
  try {
    console.log(`Mise à jour du groupe avec ID : ${groupId}`);
    console.log("Données envoyées :", groupData);

    const response = await fetch(`${API_URL}/confd/1.1/groups/${groupId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
      },
      body: JSON.stringify(groupData),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `Erreur HTTP ${response.status} : ${response.statusText}. ${errorDetails}`
      );
    }

    const resultText = await response.text();
    const result = resultText ? JSON.parse(resultText) : {};

    console.log("Réponse de l'API :", result);
    return result;
  } catch (error) {
    console.error("Erreur dans updateGroupDetails :", error.message);
    throw error;
  }
};

// Fonction pour récupérer la liste des CDR
const listCallReports = async (token) => {
  try {
    console.log("Fetching call reports...");
    const response = await fetch(`${API_URL}/call-logd/1.0/cdr?recurse=false`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${response.statusText}. ${errorDetails}`
      );
    }

    const data = await response.json();
    console.log("Call reports fetched successfully (Full data):", data);
    return data.items; // Vérifiez que `data.items` contient bien un tableau avec les données.
  } catch (error) {
    console.error("Erreur dans listCallReports :", error.message);
    throw error;
  }
};

// Fonction pour récupérer la liste des voicemails
const listVoicemails = async (token) => {
  try {
    const response = await fetch(
      `${API_URL}/confd/1.1/voicemails?recurse=false`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": token,
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${response.statusText}. ${errorDetails}`
      );
    }

    const data = await response.json();
    console.log("Voicemails fetched successfully:", data.items);
    return data.items;
  } catch (error) {
    console.error("Erreur dans listVoicemails :", error.message);
    throw error;
  }
};

const getVoicemailDetails = async (token, voicemailId) => {
  try {
    const response = await fetch(
      `${API_URL}/confd/1.1/voicemails/${voicemailId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": token,
        },
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${response.statusText}. ${errorDetails}`
      );
    }

    const data = await response.json();
    console.log("Voicemail details fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Erreur dans getVoicemailDetails :", error.message);
    throw error;
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getVoiceServices,
  updateVoiceServices,
  listUsers,
  listLines,
  getLineById,
  fetchGroups,
  getGroupDetails,
  updateGroupDetails,
  listCallReports,
  listVoicemails,
  getVoicemailDetails,
};
