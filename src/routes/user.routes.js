import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  toggleCycleStatus,
  getUserDetails,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authToken, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-user").get(authToken, getCurrentUser);
router.route("/toggle-cycle-status").post(authToken, toggleCycleStatus);
router.route("/:id").get(authToken, getUserDetails);

export default router;
