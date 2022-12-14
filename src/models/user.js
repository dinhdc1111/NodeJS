import mongoose from "mongoose";
import { createHmac } from "crypto";
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: Number,
      default: 0,
    },
  },{ timestamps: true });

userSchema.methods = {
  //password authentication
  authenticate(password){
    return this.password === this.encryptPassword(password);
  },
  encryptPassword(password) {
    if (!password) return;
    try {
      return createHmac("sha256", "Congdinh").update(password).digest("hex");
    } catch (error) {
      console.log(error);
    }
  },
};
userSchema.pre("save", function(next){
  this.password = this.encryptPassword(this.password);
  next();
})
export default mongoose.model("User", userSchema);
