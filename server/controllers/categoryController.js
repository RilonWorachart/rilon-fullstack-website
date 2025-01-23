import { promisePool } from "../db.js";  // Corrected import

export const getallCategory = async (req, res, next) => {
  try {
    // Execute the query using promisePool
    const [rows] = await promisePool.execute("SELECT * FROM categories");

    // Check if there are any categories
    if (rows.length === 0) {
      return res.json({ status: "error", message: "No categories found" });
    }

    // Return the categories
    res.json({ status: "ok", data: rows });
  } catch (err) {
    // Handle errors
    res.json({ status: "error", message: err.message });
  }
};
