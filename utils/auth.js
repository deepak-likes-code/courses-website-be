import jwt from "jsonwebtoken";

export const generateAdminToken = (admin) =>
  jwt.sign({ admin }, process.env.ADMIN_JWT_TOKEN, { expiresIn: "15m" });

export const generateUserToken = (user) =>
  jwt.sign({ user }, process.env.USER_JWT_TOKEN, { expiresIn: "15m" });
