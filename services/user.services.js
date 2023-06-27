import { users } from "../models/user.js";
import { courses } from "../models/courses.js";
import { User } from "../models/user.js";
import { Course } from "../models/courses.js";
import { hashPassword, comparePasswords } from "../utils/bcrypt.js";
import { generateUserToken } from "../utils/auth.js";

const signup = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("User already exists");
    } else {
      const token = generateUserToken(username);
      const user = new User({
        username,
        password: await hashPassword(password),
        token,
      });
      await user.save();
      return token;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (user && (await comparePasswords(password, user.password))) {
      const token = generateUserToken(username);
      await User.findOneAndUpdate({ username }, { token });
      return token;
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllCourses = async () => {
  try {
    const courses = await Course.find();
    return courses;
  } catch (error) {
    throw new Error(error.message);
  }
};

const purchaseCourse = async (courseId, username) => {
  try {
    const course = await Course.findOne({ id: courseId });
    if (course) {
      const user = await User.findOneAndUpdate(
        { username },
        { $push: { courses: course } },
        { new: true }
      );
      return user;
    } else {
      throw new Error("Course not found.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const purchasedCourse = async (username) => {
  try {
    const user = await User.findOne({ username }).populate("courses");
    return user.courses;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  signup,
  login,
  getAllCourses,
  purchaseCourse,
  purchasedCourse,
};
