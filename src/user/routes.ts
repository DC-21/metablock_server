import { Router } from "express";
import { UsersCollection } from "./collections";

const userRouter = Router();
const userCollection = new UsersCollection();

userRouter.post("/signup", userCollection.Add);
userRouter.post("/login", userCollection.Login);

export default userRouter;
