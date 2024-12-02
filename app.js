const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

// Configurer les sessions
app.use(
  session({
    secret: "LoumTalla123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Middleware pour traiter les requêtes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Utiliser les routes d'authentification et les routes des utilisateurs
app.use(authRoutes);
app.use(userRoutes);

// Servir les fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Route par défaut pour rediriger vers la connexion
app.get("/", (req, res) => {
  if (req.session.token) {
    // Si l'utilisateur est déjà authentifié, le rediriger vers la page d'accueil
    return res.redirect("/home");
  }
  res.sendFile(path.join(__dirname, "views", "login.html")); // Sinon, afficher la page de connexion
});

// Pages principales (protégées)
app.get("/home", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// Profil utilisateur
app.get("/profile", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "profile.html"));
});

app.get("/profile/:userId", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "profile.html"));
});
// Route pour afficher la liste des utilisateurs (protégée)
app.get("/users", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "user.html"));
});

// Services Voix
app.get("/services/:userId", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "Services.html"));
});

// Lignes
app.get("/lines", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "lines.html"));
});

app.get("/lines/:lineId", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "lineDetails.html"));
});

// Route pour afficher les groupes
app.get("/groups", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "groupe.html"));
});

// Route pour afficher les détails d'un groupe
app.get("/group-details/:groupId", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "groupeDetails.html"));
});
// Gérer les erreurs pour les routes inexistantes
app.use((req, res) => {
  res.status(404).send("Page introuvable !");
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
