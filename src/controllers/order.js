import Order from "../models/order";

export const listOrder = async (req, res) => {
  try {
    const orders = await Order.find().exec();
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: "Không tìm thấy danh sách đơn hàng" });
  }
};
export const orderDetail = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id }).exec();
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: "Không tìm thấy chi tiết đơn hàng" });
  }
};
export const addOrder = async (req, res) => {
  try {
    const order = await new Order(req.body).save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: "Không thể thêm mới đơn hàng" });
  }
};
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: "Không thể cập nhật đơn hàng" });
  }
};
export const removeOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete({ _id: req.params.id }).exec();
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: "Không thể xóa đơn hàng" });
  }
};