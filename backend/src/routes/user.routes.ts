import { Router } from "express";
import { UserController } from "../modules/auth/user.controller";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/check-user", UserController.checkUserExists);
router.put("/update-password", UserController.updatePassword);
router.get("/verify-token", UserController.verifyToken);


export default router;
