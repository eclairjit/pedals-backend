import { Router } from "express";
import { createLease } from "../controllers/lease.controller.js";

const router = Router();

router.route("/create-lease").post(createLease);
