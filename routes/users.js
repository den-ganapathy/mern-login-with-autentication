import { signin, signup } from "./../controllers/user.js";
import { changePassword, checkEmail } from "./../controllers/changePassword.js";
import express from "express";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/check-email", checkEmail);
router.put("/change-password", changePassword);

export default router;
