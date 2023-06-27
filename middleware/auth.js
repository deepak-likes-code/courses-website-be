import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  token
    ? jwt.verify(token, process.env.ADMIN_JWT_TOKEN, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        req.user = decoded;
        next();
      })
    : res.status(401).json({ message: "Unauthorized" });
};

const userAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  token
    ? jwt.verify(token, process.env.USER_JWT_TOKEN, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        req.user = decoded;
        res.locals.user = decoded;
        next();
      })
    : res.status(401).json({ message: "Unauthorized" });
};

export { adminAuth, userAuth };
