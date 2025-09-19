import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

class UserController {
  async getUserLogin(req, res) {
    try {
      const { uid } = req.body;
      const token = jwt.sign({ uid: uid }, process.env.JWT_USER_KEY_SECRET, {
        expiresIn: "7d", // token valid for 7 days
      });

      const userData = {
        uid: uid,
        token: token,
      };

      const user = await UserModel.findOne({ uid });

      if (!user) {
        const newUser = new UserModel(userData);
        const savedUser = await newUser.save();

        return res.status(201).json({
          success: true,
          message: "User created successfully",
          data: savedUser,
        });
      }

      // update this user's token if user already exists
      const updatedUser = await UserModel.findOneAndUpdate(
        { uid: uid },
        { token: token },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving user",
        error: error.message,
      });
    }
  }

  async userTokenVerify(req, res, next) {
    try {
      const { token } = req.body;
      const decoded = jwt.verify(token, process.env.JWT_USER_KEY_SECRET);
      const { uid } = decoded;
      const user = await UserModel.findOne({ uid });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error verifying user token",
        error: error.message,
      });
    }
  }
}

export default new UserController();
