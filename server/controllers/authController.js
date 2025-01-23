import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { promisePool } from "../db.js";

// Login function
export const login = async (req, res, next) => {
  const { fname, password } = req.body;

  try {
    // Query to find user by fname (using fname to authenticate)
    const [users] = await promisePool.execute("SELECT * FROM users WHERE fname = ?", [fname]);

    if (users.length === 0) {
      return res.json({ status: "error", message: "No user found" });
    }

    // Compare the password with the hashed password in the database
    const isLogin = await bcrypt.compare(password, users[0].password);

    if (isLogin) {
      // Use fname (or email if needed) in the JWT token
      const token = jwt.sign(
        { fname: users[0].fname },  // Changed from email to fname (if needed)
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res.json({
        status: "ok",
        message: "Login success",
        token,
        id: users[0].id,
      });
    } else {
      return res.json({ status: "error", message: "Login failed" });
    }
  } catch (err) {
    return res.json({ status: "error", message: err.message });
  }
};

// Authentication function
export const authen = async (req, res, next) => {
  try {
    // Extract the token from the authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    return res.json({ status: "ok", decoded });
  } catch (err) {
    return res.json({ status: "error", message: err.message });
  }
};
