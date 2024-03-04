import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const auth = async (req, res, next) => {
  // check if headers contain authorization key
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "Authorization token is not found" });
  }
  // grab the token from header (taking the "Bearer " string away)
  const token = authorization.split(" ")[1];

  try {
    // deconded and exract user id from token
    const { _id } = jwt.verify(token, process.env.SECRET);
    // save the user in request || check the user is exist
    req.user = await User.findById(_id).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export default auth;
