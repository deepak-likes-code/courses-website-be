import userServices from "../services/user.services.js";

const signup = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Please enter all fields." });
  }
  try {
    const token = await userServices.signup(username, password);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Please enter all fields." });
  }
  try {
    const token = await userServices.login(username, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const courses = async (req, res) => {
  try {
    const courses = await userServices.getAllCourses();
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const purchaseCourse = async (req, res) => {
  const { courseId } = req.params;
  const username = res.locals.user.user;
  console.log({ username });
  try {
    const purchaseCourse = await userServices.purchaseCourse(
      courseId,
      username
    );
    res.status(200).json({ purchaseCourse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const purchasedCourse = async (req, res) => {
  const username = res.locals.user.user;
  try {
    const purchasedCourses = await userServices.purchasedCourse(username);
    res.status(200).json({ purchasedCourses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { signup, login, courses, purchaseCourse, purchasedCourse };
