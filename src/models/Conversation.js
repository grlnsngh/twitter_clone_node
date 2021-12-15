import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  participants: {
    type: Array,
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("conversation", ConversationSchema);
