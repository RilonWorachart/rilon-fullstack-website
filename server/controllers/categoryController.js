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


export const deleteCategory = async (req, res, next) => {
  const id = req.query.id; // Getting the id from query parameters

  try {
      // Query to get the product by ID
      const [rows] = await promisePool.execute(
          "DELETE FROM categories WHERE ID = ?",
          [id]
      );

      if (rows.length === 0) {
          return res.json({ status: "error", message: "Category not found" });
      }

      res.json({ status: "ok", message: "Category has been delete successfully" });
  } catch (err) {
      res.json({ status: "error", message: err.message });
  }
};



export const createCategory = async (req, res, next) => {
  const {
      picture_1, name_th, description_th, name_en, description_en
  } = req.body;


  try {
      // Insert the product into the products table
      await promisePool.execute(
          "INSERT INTO categories (picture_1, name_th, description_th, name_en, description_en) VALUES (?, ?, ?, ?, ?)",
          [
            picture_1, name_th, description_th, name_en, description_en
          ]
      );

      res.json({ status: "ok", message: "Category has been created successfully" });
  } catch (err) {
      // Handle error and return a message
      console.error(err);
      res.status(500).json({ status: "error", message: "Failed to create category" });
  }
};

export const editCategory = async (req, res, next) => {
  const { picture_1, name_th, description_th, name_en, description_en, ID } = req.body;

  try {
      // Update the existing product
      await promisePool.execute(
          "UPDATE categories SET picture_1 = ?, name_th = ?, description_th = ?, name_en = ?, description_en = ? WHERE ID = ?",
              [picture_1, name_th, description_th, name_en, description_en, ID]
      );

      res.json({ status: "ok", message: "Category has been updated successfully" });
  } catch (err) {
      res.json({ status: "error", message: err.message });
  }
};
