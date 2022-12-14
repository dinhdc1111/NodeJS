import { expressjwt } from "express-jwt";

export const requireSignin = expressjwt({
  secret: "Congdinh",
  algorithms: ["HS256"],
  requestProperty: "auth",
});

export const isAuth = (req, res, next) => {
  // id in token == id when logging in
  const user = req.profile._id == req.auth._id;
  if (!user) {
    return res.status(400).json({
      message: "Bạn không có quyền  truy cập",
    });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(400).json({
      message: "Bạn không phải là admin",
    });
  }
  next();
};

export const checkAuth = (req, res, next) => {
  const isAdmin = true ? next() : console.log("Bạn không có quyền truy cập");
}