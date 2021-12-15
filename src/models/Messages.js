import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  conversation_id: {
    type: Object,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("messages", MessageSchema);
