const path = require("path");
const {
  getUserProfile,
  updateUserProfile,
  getVoiceServices,
  updateVoiceServices,
  listUsers,
  listLines,
  fetchGroups,
  getGroupDetails,
  updateGroupDetails,
  listCallReports,
  listVoicemails,
  getVoicemailDetails,
} = require("../Service/userService");

// Contrôleur pour renvoyer les données JSON du profil utilisateur
const getUserProfileDataController = async (req, res) => {
  const token = req.session.token;
  const userId = req.params.userId || req.session.pbx_user_uuid;

  try {
    const userProfile = await getUserProfile(token, userId);

    const filteredProfile = {
      uuid: userProfile.uuid,
      firstname: userProfile.firstname,
      lastname: userProfile.lastname,
      email: userProfile.email,
      subscription_type: userProfile.subscription_type,
      lines: userProfile.lines?.map((line) => ({
        name: line.name,
        caller_id_num: line.caller_id_num,
        protocol: line.protocol,
      })),
    };
    res.json(filteredProfile);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du profil utilisateur",
      error: error.message,
    });
  }
};

// Contrôleur pour afficher la page HTML du profil utilisateur
const getUserProfilePageController = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/profile.html"));
};

// Contrôleur pour mettre à jour le profil utilisateur
const updateUserProfileController = async (req, res) => {
  const token = req.session.token;
  const userId = req.params.userId || req.session.pbx_user_uuid;
  const profileData = req.body;

  try {
    const updatedProfile = await updateUserProfile(token, userId, profileData);
    res.json({ message: "Profil mis à jour avec succès", updatedProfile });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du profil utilisateur",
      error: error.message,
    });
  }
};

// Contrôleur pour obtenir les services voix de l'utilisateur
const getVoiceServicesController = async (req, res) => {
  const token = req.session.token;
  const userId = req.params.userId || req.session.pbx_user_uuid;

  try {
    const voiceServices = await getVoiceServices(token, userId);
    res.json(voiceServices);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des services voix",
      error: error.message,
    });
  }
};

// Contrôleur pour mettre à jour les services voix de l'utilisateur
const updateVoiceServicesController = async (req, res) => {
  const token = req.session.token;
  const userId = req.params.userId || req.session.pbx_user_uuid;
  const voiceServicesData = req.body;

  try {
    const updatedServices = await updateVoiceServices(
      token,
      userId,
      voiceServicesData
    );
    res.json({
      message: "Services voix mis à jour avec succès",
      updatedServices,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour des services voix",
      error: error.message,
    });
  }
};

// Contrôleur pour lister les utilisateurs
const listUsersController = async (req, res) => {
  const token = req.session.token;

  try {
    const users = await listUsers(token);
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de la liste des utilisateurs",
      error: error.message,
    });
  }
};

// Contrôleur pour lister les lignes
const listLinesController = async (req, res) => {
  const token = req.session.token;

  try {
    const lines = await listLines(token);
    res.json(lines);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des lignes",
      error: error.message,
    });
  }
};

const { getLineById } = require("../Service/userService");

// Contrôleur pour obtenir les détails d'une ligne
const getLineByIdController = async (req, res) => {
  const token = req.session.token;
  const lineId = req.params.lineId; // Récupère l'ID de la ligne depuis les paramètres de la requête

  if (!lineId) {
    return res.status(400).json({ message: "L'ID de la ligne est requis." });
  }

  try {
    const lineDetails = await getLineById(token, lineId);
    res.json(lineDetails);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des détails de la ligne",
      error: error.message,
    });
  }
};

// Contrôleur pour récupérer et renvoyer la liste des groupes
const getGroupsController = async (req, res) => {
  const token = req.session.token;

  try {
    const groups = await fetchGroups(token);
    res.json(groups);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de la liste des groupes",
      error: error.message,
    });
  }
};

const getGroupDetailsController = async (req, res) => {
  const token = req.session.token;
  const groupId = req.params.groupId;

  try {
    const groupDetails = await getGroupDetails(token, groupId);
    res.json(groupDetails);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des détails du groupe",
      error: error.message,
    });
  }
};

const updateGroupDetailsController = async (req, res) => {
  const token = req.session.token;
  const groupId = req.params.groupId;
  const groupDetails = req.body;

  try {
    const updatedGroup = await updateGroupDetails(token, groupId, groupDetails);
    res.json({ message: "Groupe mis à jour avec succès", updatedGroup });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du groupe :", error.message);
    res.status(500).json({
      message: "Erreur lors de la mise à jour du groupe",
      error: error.message,
    });
  }
};

// Contrôleur pour récupérer les rapports d'appels
const getCallReportsController = async (req, res) => {
  const token = req.session.token;

  try {
    const callReports = await listCallReports(token);
    console.log("Données renvoyées au frontend :", callReports);
    res.json(callReports);
  } catch (error) {
    console.error("Erreur dans getCallReportsController :", error.message);
    res.status(500).json({
      message: "Erreur lors de la récupération des rapports d'appels",
      error: error.message,
    });
  }
};

// Contrôleur pour récupérer la liste des voicemails
const getVoicemailsController = async (req, res) => {
  const token = req.session.token; // Jeton d'authentification

  try {
    const voicemails = await listVoicemails(token);
    res.json(voicemails);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des voicemails",
      error: error.message,
    });
  }
};

const getVoicemailDetailsController = async (req, res) => {
  const token = req.session.token;
  const { voicemailId } = req.params;

  try {
    const voicemailDetails = await getVoicemailDetails(token, voicemailId);
    res.json(voicemailDetails);
  } catch (error) {
    res.status(500).json({
      message:
        "Erreur lors de la récupération des détails de la messagerie vocale",
      error: error.message,
    });
  }
};

module.exports = {
  getUserProfileDataController,
  getUserProfilePageController,
  updateUserProfileController,
  listUsersController,
  listLinesController, // Export du contrôleur des lignes
  getVoiceServicesController,
  updateVoiceServicesController,
  getLineByIdController,
  getGroupsController,
  getGroupDetailsController,
  updateGroupDetailsController,
  getCallReportsController,
  getVoicemailsController,
  getVoicemailDetailsController,
};
