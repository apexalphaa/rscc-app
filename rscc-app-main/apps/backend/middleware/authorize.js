const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // "viewer" was used by earlier RSCC builds. Treat it as the new
    // player role so existing accounts do not become inaccessible.
    const effectiveRole = req.user.role === "viewer" ? "player" : req.user.role;

    if (!roles.includes(effectiveRole)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource",
      });
    }

    next();
  };
};

export default authorize;
