import { Router } from "express";
import {
  uploadCycleDetails,
  getCycles,
  getCycleById,
} from "../controllers/cycle.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authToken } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/upload-cycle-details")
  .post(authToken, upload.single("cycleImage"), uploadCycleDetails);
router.route("/get-cycles").post(authToken, getCycles);
router.route("/:cycleId").get(getCycleById);

export default router;
