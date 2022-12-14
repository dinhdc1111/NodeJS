import Category from "../models/category";
import Product from "../models/product";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().exec();
    res.json(categories);
  } catch (error) {
    res.status(400).json({
      message: "Không thể tìm thấy danh mục",
    });
  }
};
export const readCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id }).exec();
    res.json(category);
  } catch (error) {
    res.status(400).json({
      message: "Không thể tìm thấy danh mục",
    });
  }
};
export const listCategoryDetail = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id }).exec();
    const product = await Product.find({category}).exec();
    res.json({category, product})
  } catch (error) {
    res.status(400).json({
      message: "Không thể tìm thấy",
    });
  }
};
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryExist = await Category.findOne({ name });
    if (categoryExist)
      return res.status(400).json({ message: "This category already exists." });
    const category = await new Category(req.body).save();
    res.json(category);
  } catch (error) {
    res.status(400).json({
      message: "Thêm danh mục thất bại",
      error,
    });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      { name },
      { new: true }
    );
    res.json(category);
  } catch (error) {
    res.status(400).json({
      message: "Cập nhật sản phẩm thất bại",
    });
  }
};
export const removeCategory = async (req, res) => {
  try {
    const products = await Product.findOne({ category: req.params.id });
    if (products) {
      return res.status(400).json({
        message: "Please delete all products in this category",
      });
    }
    const category = await Category.findByIdAndDelete(req.params.id).exec();
    res.json(category);
  } catch (error) {
    res.status(400).json({
      message: "Xóa danh mục thất bại",
      error,
    });
  }
};
