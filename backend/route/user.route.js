import express  from "express";
import { signUp,login } from "../controller/user.controller.js";

const router = express.Router()

router.post("/signup",signUp); //"the end point jahan pe wo click ke baad jayega",konsa function chahie for this operation
router.post("/login",login);

export default router;
