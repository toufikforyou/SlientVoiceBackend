import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
