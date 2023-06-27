import adminServices from "../services/admin.services.js";

const signup = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Please provide username and password" });

  try {
    const adminToken = await adminServices.signup(username, password);
    return res
      .status(201)
      .json({ token: adminToken, message: "Admin created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" });
  }
  try {
    const adminToken = await adminServices.login(username, password);
    res.status(200).json({ token: adminToken, message: "Admin logged in" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCourse = async (req, res) => {
  const { title, description, price, published, imageLink } = req.body;
  if (!title && !description && !price && !published && !imageLink) {
    return res.status(400).json({ message: "Please provide all details" });
  }
  try {
    const newCourse = await adminServices.createCourse(
      title,
      description,
      price,
      published,
      imageLink
    );
    return res
      .status(201)
      .json({ newCourse, message: "Course created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editCourse = async (req, res) => {
  const { courseId } = req.params;
  const { title, description, price, published, imageLink } = req.body;
  try {
    const editedCourse = await adminServices.editCourse(
      parseInt(courseId),
      title,
      description,
      price,
      published,
      imageLink
    );
    res
      .status(200)
      .json({ editedCourse, message: "Course edited successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const allCourses = await adminServices.getAllCourses();
    res.status(200).json({ courses: allCourses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { signup, login, createCourse, editCourse, getAllCourses };
