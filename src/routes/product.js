import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/product";
import { userById } from "../controllers/user";
import { requireSignin, isAuth , isAdmin} from "../middlewares/checkAuth";

const router = Router();

router.get("/products", list);
router.get("/products/:id", read);
router.post("/products/:userId", requireSignin, isAuth, isAdmin, create);
router.put("/products/:id/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/products/:id/:userId", requireSignin, isAuth, isAdmin, remove);

router.param("userId", userById);
export default router;
