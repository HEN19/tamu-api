//@ts-ignore
import { Router } from "https://deno.land/x/oak/mod.ts"
import * as userController from "../controllers/userController.ts"
import * as authMiddleware from "../middlewares/authMiddleware.ts"

const router = new Router();

router
  .get("/users", authMiddleware, userController.getAllUsers)
  .get("/users/:id", authMiddleware, userController.getUser)
  .post("/users", authMiddleware,userController.createUser)
  .put("/users/:id",authMiddleware, userController.updateUser)
  .delete("/users/:id",authMiddleware, userController.deleteUser)

export default router;
