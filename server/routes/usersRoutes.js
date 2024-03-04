import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// register user route
router.post("/", registerUser);

// register login route
router.post("/login", loginUser);

export { router as usersRoutes };
