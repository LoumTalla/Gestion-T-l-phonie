const express = require("express");
const { loginUser, logoutUser } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Route pour afficher la page de connexion
router.get("/login", (req, res) => {
  if (req.session.token) {
    // Si l'utilisateur est authentifié, redirige vers la page d'accueil
    return res.redirect("/home");
  }
  res.sendFile(path.join(__dirname, "../views", "login.html"));
});

// Route de connexion (publique)
router.post("/login", loginUser);

// Route de déconnexion (protégée)
router.get("/logout", authMiddleware, logoutUser);

module.exports = router;
