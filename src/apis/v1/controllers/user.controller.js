import UserModel from "../models/user.model.js";

class UserController {
  async createUser(req, res) {
    try {
      const { uid, username } = req.body;
      
      const existingUser = await UserModel.findOne({
        $or: [
          { uid: uid },
          { username: username },
        ]
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "User already exists",
          error: "A user with this UID, username already exists"
        });
      }

      const userData = {
        uid: uid,
      };

      const newUser = new UserModel(userData);
      const savedUser = await newUser.save();

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: savedUser,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error creating user",
        error: error.message,
      });
    }
  }

  async getUserByUid(req, res) {
    try {
      const { uid } = req.params;
      const user = await UserModel.findOne({ uid });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving user",
        error: error.message,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const { uid } = req.params;
      const deletedUser = await UserModel.findOneAndDelete({ uid });

      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting user",
        error: error.message,
      });
    }
  }
}

export default new UserController();
