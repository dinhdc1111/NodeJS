import User from "../models/user";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const {email, password, name, role} = req.body;
        const existUser = await User.findOne({email}).exec();
        if(existUser) return res.status(400).json({message: "Email đã tồn tại trong hệ thống"});
        const user = await new User({email, password, name, role}).save();
        res.json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })
    } catch (error) {
        res.status(400).json({
            message: "Đăng ký không thành công",error
        })
    }
}
export const signin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}).exec();
        if(!user){
            // Check exist email
            res.status(400).json(
                {message: "Người dùng không tồn tại"}
            );
            // Check password
        }else if(!user.authenticate(password)){
            res.status(400).json({message: "Mật khẩu không trùng khớp"});
        }else{
            const token = jwt.sign({_id:user._id}, "Congdinh", {expiresIn: "1h"});
            return res.json({
                token,
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "Đăng nhập không thành công"
        })
    }
}