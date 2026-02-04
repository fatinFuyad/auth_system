import express from "express";
import { deleteUser, getAllUsers, getUser } from "../controllers/usersController.js";
import { verifyAuth } from "../controllers/authController.js";

const router = express.Router();

router.use(verifyAuth);
router.route("/").get(getAllUsers);
router.route("/:userId").get(getUser).delete(deleteUser);

export const userRouter = router;
