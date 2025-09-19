import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    pid: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;