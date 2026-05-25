import supabase from "../config/supabaseAdmin.config.js";

const authenticateToken = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  try {
    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error || !data.user) {
      return res.status(403).json({
        error: "Invalid token",
      });
    }

    req.user = data.user;
    next();
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export default authenticateToken;
