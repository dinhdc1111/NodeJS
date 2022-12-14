import { Router } from "express";
import {
  addOrder,
  listOrder,
  orderDetail,
  removeOrder,
  updateOrder,
} from "../controllers/order";

const router = Router();

router.get("/order", listOrder);
router.get("/order/:id", orderDetail);
router.post("/order", addOrder);
router.put("/order/:id", updateOrder);
router.delete("/order/:id", removeOrder);

export default router;
