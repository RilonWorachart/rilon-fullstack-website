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
      const token = jwt.sign(
        { fname: users[0].fname },  // Changed from email to fname (if needed)
        process.env.SECRET_KEY,
        { expiresIn: "9h" }
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


export const authen = async (req, res, next) => {
  try {
    // Check if the Authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).json({
        status: "error",
        message: "Authorization header missing"
      });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        status: "error",
        message: "Token missing in Authorization header"
      });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the decoded data (user info) to the request for use in subsequent handlers
    req.user = decoded;

    // Respond with success and the decoded user info
    return res.status(200).json({
      status: "ok",
      message: "Authentication successful",
      user: req.user
    });

  } catch (err) {
    console.log("Auth error: ", err); // Log error for debugging

    // Send error response if the token verification fails
    return res.status(401).json({
      status: "error",
      message: err.message
    });
  }
};


export const authenmiddleware = async (req, res, next) => {
  try {
    // Check if the Authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).json({
        status: "error",
        message: "Authorization header missing"
      });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];

    // If the token is missing in the header
    if (!token) {
      return res.status(400).json({
        status: "error",
        message: "Token missing in Authorization header"
      });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the decoded data (user info) to the request for use in subsequent handlers
    req.user = decoded;

    // Proceed to the next handler
    next();
  } catch (err) {
    // Handle any errors that occurred during the verification process
    return res.status(401).json({
      status: "error",
      message: err.message
    });
  }
};



// Get user function using async/await with pool
export const getUser = async (req, res, next) => {
  const id = req.query.id; // Getting id from query parameters

  try {
    const [user, fields] = await promisePool.execute("SELECT fname FROM users WHERE id = ?", [id]);
    
    if (user.length === 0) {
      return res.json({ status: "error", message: "User not found" });
    }
    
    return res.json({ status: "ok", data: user[0] });
  } catch (err) {
    return res.json({ status: "error", message: err.message });
  }
};

// Register function using async/await with pool
export const register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);  // You can replace 10 with the number of salt rounds

    const [results] = await promisePool.execute(
      "INSERT INTO users (fname, password) VALUES (?, ?)", 
      [req.body.fname, hashedPassword]
    );

    return res.json({ status: "ok", message: "User registered successfully" });
  } catch (err) {
    return res.json({ status: "error", message: err.message });
  }
};