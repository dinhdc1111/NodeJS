import { Router } from "express";
import {
  createCategory,
  getCategories,
  listCategoryDetail,
  readCategory,
  removeCategory,
  updateCategory,
} from "../controllers/category";
import { userById } from "../controllers/user";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.get("/category", getCategories);
router.get("/category/:id", listCategoryDetail);
router.get("/category/get/:id", readCategory);
router.post("/category/:userId", requireSignin, isAuth, isAdmin, createCategory);
router.put("/category/:id/:userId", requireSignin, isAuth, isAdmin, updateCategory);
router.delete("/category/:id/:userId", requireSignin, isAuth, isAdmin, removeCategory);

router.param("userId", userById)

export default router;
