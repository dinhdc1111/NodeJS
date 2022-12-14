import User from "../models/user";

export const userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).exec();
    req.profile = user;
    req.profile.password = undefined;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Không tìm thấy người dùng",
    });
  }
};
