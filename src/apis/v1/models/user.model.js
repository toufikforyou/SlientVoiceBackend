import mongoose from "mongoose";
import uidGenerator from "../../../services/uid.generator.service.js";

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      default: () => uidGenerator(),
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
