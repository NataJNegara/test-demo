import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
// --------------------------CREATING JWT TOKEN--------------------------------
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
};
// --------------------------REGISTER USER--------------------------------

const registerUser = async (req, res) => {
  // grab data from request body
  const { email, password } = req.body;
  //   check if field is not empty
  if (!email || !password) {
    return res.status(400).json({ error: "all field are required" });
  }
  //   check if user is already exist
  const isExist = await User.findOne({ email });
  if (isExist) {
    return res.status(400).json({ error: "email is already registered" });
  }

  //   hash password
  const salt = bcrypt.genSaltSync();
  const hashed = bcrypt.hashSync(password, salt);

  try {
    // creating user
    const user = await User.create({ email, password: hashed });
    // create jwt
    const token = createToken(user._id);
    // send the response
    return res.status(200).json({ email, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// --------------------------LOGIN USER--------------------------------

const loginUser = async (req, res) => {
  // grab data from request body
  const { email, password } = req.body;
  //   check if field is not empty
  if (!email || !password) {
    return res.status(400).json({ error: "all field are required" });
  }
  //   check if user is exist
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "email is incorrect" });
  }
  //   check password
  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "password is incorrect" });
  }

  try {
    // create jwt
    const token = createToken(user._id);
    // sending response
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser };
