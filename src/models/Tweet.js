import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  author: {
    type: String,
    default: "",
    required: true,
  },
  body: {
    type: String,
    default: "",
  },
  likes_count: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_edited: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("tweets", TweetSchema);
