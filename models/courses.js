import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
  },
  imageLink: {
    type: String,
    required: false,
  },
});

export const Course = mongoose.model("Course", courseSchema);

export const courses = [];
