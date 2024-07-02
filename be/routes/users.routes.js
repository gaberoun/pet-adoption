import { Router } from "express";
import { 
  signup, 
  signin, 
  getUser, 
  changePassword 
} from "../controllers/users.controllers.js";

const userRouter = Router();

userRouter.post("/register", signup);
userRouter.post("/login", signin);
userRouter.get("/:userId", getUser);
userRouter.put("/change", changePassword);

export default userRouter;
