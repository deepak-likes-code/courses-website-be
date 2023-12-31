import mongoose from "mongoose";

const { Schema } = mongoose;

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
  },
});

export const Admin = mongoose.model("Admin", adminSchema);
