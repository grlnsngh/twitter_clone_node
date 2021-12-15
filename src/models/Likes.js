import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LikesSchema = new Schema({
  liked_by: {
    type: String,
    default: "",
    required: true,
  },
  tweet_id: {
    type: Object,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("likes", LikesSchema);
