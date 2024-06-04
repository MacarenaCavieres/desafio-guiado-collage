import { Router } from "express";
import { imgMethod } from "../controllers/img.controller.js";

const router = Router();

router.get("/", imgMethod.getForm);
router.post("/imagen", imgMethod.postImg);
router.get("/imagen/:nombre", imgMethod.deleteOne);

export default router;
