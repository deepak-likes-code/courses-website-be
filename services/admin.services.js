import { hashPassword, comparePasswords } from "../utils/bcrypt.js";
import { generateAdminToken } from "../utils/auth.js";
import { Admin } from "../models/admin.js";
import { Course } from "../models/courses.js";

const signup = async (username, password) => {
  console.log({ username, password });

  try {
    const admin = await Admin.findOne({ username });
    if (admin) {
      throw new Error("Admin already exists");
    } else {
      const token = generateAdminToken(username);
      const admin = new Admin({
        username,
        password: await hashPassword(password),
        token,
      });
      await admin.save();
      return token;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = async (username, password) => {
  try {
    const admin = await Admin.findOne({ username });
    if (admin) {
      if (await comparePasswords(password, admin.password)) {
        const token = generateAdminToken(username);
        await Admin.findOneAndUpdate({ username }, { token });
        return token;
      } else {
        throw new Error("Invalid username or password");
      }
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const createCourse = async (
  title,
  description,
  price,
  published,
  imageLink
) => {
  try {
    const newCourse = new Course({
      id: (await Course.count()) + 1,
      title,
      description,
      price,
      published,
      imageLink,
    });
    newCourse.save();
    return newCourse;
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

const editCourse = async (
  courseId,
  title,
  description,
  price,
  published,
  imageLink
) => {
  try {
    const updatedCourse = await Course.findOneAndUpdate(
      { id: courseId },
      {
        title,
        description,
        price,
        published,
        imageLink,
      },
      { new: true }
    );
    return updatedCourse;
  } catch (error) {}
};

export default {
  signup,
  login,
  createCourse,
  getAllCourses,
  editCourse,
};
