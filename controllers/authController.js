const { login, logout } = require("../Service/authService");

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const data = await login(username, password);
    console.log("Réponse du serveur :", data);

    // Stocke le token et pbx_user_uuid (ou xivo_user_uuid) dans la session
    req.session.token = data.data.token;
    req.session.pbx_user_uuid =
      data.data.pbx_user_uuid || data.data.xivo_user_uuid;

    console.log("Session Token:", req.session.token);
    console.log("Session UUID (pbx_user_uuid):", req.session.pbx_user_uuid);

    // Renvoie une réponse JSON avec l'ID utilisateur
    return res.json({ userId: req.session.pbx_user_uuid });
  } catch (error) {
    return res.status(401).json({
      message: "Échec de l'authentification",
      error: error.message || "Erreur inconnue",
    });
  }
};
const logoutUser = async (req, res) => {
  const token = req.session.token;
  try {
    await logout(token);
    req.session.destroy(() => {
      return res.redirect("/");
    });
  } catch (error) {
    return res.status(500).json({
      message: "Échec de la déconnexion",
      error: error.message || "Erreur inconnue",
    });
  }
};

module.exports = { loginUser, logoutUser };
