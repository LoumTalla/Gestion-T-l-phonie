const express = require("express");
const {
  getUserProfileDataController,
  getUserProfilePageController,
  updateUserProfileController,
  listUsersController,
  getVoiceServicesController,
  updateVoiceServicesController,
  listLinesController,
  getLineByIdController,
  getGroupsController,
  getGroupDetailsController,
  updateGroupDetailsController,
  getCallReportsController,
  getVoicemailsController,
  getVoicemailDetailsController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/* ----------------------- Utilisateur ----------------------- */
// Récupérer la liste des utilisateurs
router.get("/api/users", authMiddleware, listUsersController);

// Afficher la page HTML du profil utilisateur
router.get("/profile/:userId", authMiddleware, getUserProfilePageController);

// Obtenir les données JSON du profil d'un utilisateur spécifique
router.get(
  "/api/users/:userId/profile",
  authMiddleware,
  getUserProfileDataController
);

// Mettre à jour le profil utilisateur
router.put(
  "/api/users/:userId/profile",
  authMiddleware,
  updateUserProfileController
);

/* ----------------------- Services Voix ----------------------- */
// Obtenir les services voix d'un utilisateur
router.get(
  "/api/users/:userId/services",
  authMiddleware,
  (req, res, next) => {
    if (!req.params.userId) {
      const sessionUserId = req.session.pbx_user_uuid;
      if (!sessionUserId) {
        return res.status(400).json({ message: "ID utilisateur introuvable." });
      }
      req.params.userId = sessionUserId;
    }
    next();
  },
  getVoiceServicesController
);

// Mettre à jour les services voix d'un utilisateur
router.put(
  "/api/users/:userId/services",
  authMiddleware,
  (req, res, next) => {
    if (!req.params.userId) {
      const sessionUserId = req.session.pbx_user_uuid;
      if (!sessionUserId) {
        return res.status(400).json({ message: "ID utilisateur introuvable." });
      }
      req.params.userId = sessionUserId;
    }
    next();
  },
  updateVoiceServicesController
);

/* ----------------------- Lignes ----------------------- */
// Route pour récupérer la liste des lignes
router.get("/api/lines", authMiddleware, listLinesController);

// Route pour récupérer les détails d'une ligne par son ID
router.get("/api/lines/:lineId", authMiddleware, getLineByIdController);

/* ----------------------- Groupes ----------------------- */
// Route pour récupérer la liste des groupes
router.get("/api/groups", authMiddleware, getGroupsController);

// Route pour récupérer les détails d'un groupe par son ID
router.get("/api/groups/:groupId", authMiddleware, getGroupDetailsController);
router.put(
  "/api/groups/:groupId",
  authMiddleware,
  updateGroupDetailsController
);

router.get("/api/reports", authMiddleware, getCallReportsController);

router.get("/api/voicemails", authMiddleware, getVoicemailsController);
router.get(
  "/api/voicemails/:voicemailId",
  authMiddleware,
  getVoicemailDetailsController
);

module.exports = router;
