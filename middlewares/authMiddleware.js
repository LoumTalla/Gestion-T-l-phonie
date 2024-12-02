// Middleware pour vérifier l'authentification
const authMiddleware = (req, res, next) => {
  if (req.session && req.session.token) {
    // Si le token existe dans la session, l'utilisateur est authentifié
    return next(); // Passe à l'étape suivante du middleware ou de la route
  } else {
    // Si le token n'est pas présent, redirige l'utilisateur vers la page de connexion
    console.log("Utilisateur non authentifié, redirection vers /login");
    return res.redirect("/login");
  }
};

module.exports = authMiddleware;
