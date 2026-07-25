import mongoose from "mongoose";

export default function validateObjectId(param = "id") {
  return (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
      return res.status(400).json({
        success: false,
        message: "Invalid ObjectId.",
      });
    }

    next();
  };
}
