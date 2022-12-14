import Product from "../models/product";

export const list = async (req, res) => {
  try {
    const products = await Product.find().populate('category').exec();
    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: "Không thể tìm thấy sản phẩm",
      error,
    });
  }
};
export const read = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).exec();
    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: "Không thể tìm thấy sản phẩm",
      error,
    });
  }
};
export const create = async (req, res) => {
  try {
    const product = await new Product(req.body).save();
    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: "Thêm sản phẩm thất bại",
      error,
    });
  }
};
export const update = async (req, res) => {
  try {
    const { name, price, description, image, category } = req.body;
    const product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      { name, price, description, image, category },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: "Cập nhật sản phẩm thất bại",
      error,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete({
      _id: req.params.id,
    }).exec();
    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: "Xóa sản phẩm thất bại",
      error,
    });
  }
};
