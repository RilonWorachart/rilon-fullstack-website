import { promisePool } from "../db.js";  // Corrected import
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

export const getCategorybyID = async (req, res, next) => {
  const id = req.query.id; // Getting the id from query parameters

  try {
    // Query to get the product by ID
    const [rows] = await promisePool.execute(
      "SELECT * FROM categories WHERE ID = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.json({ status: "error", message: "Category not found" });
    }

    res.json({ status: "ok", data: rows });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};



export const deleteCategory = async (req, res, next) => {
  const id = req.query.id; // Getting the id from query parameters
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  try {
    // Retrieve category data before deletion
    const [categoryData] = await promisePool.execute(
      "SELECT * FROM categories WHERE ID = ?",
      [id]
    );

    // If no category is found, return an error
    if (categoryData.length === 0) {
      return res.json({ status: "error", message: "Category not found" });
    }

    const productData = categoryData[0]; // Assuming your category data is in this array

    if (productData.picture_1) {
      const picture_1_Path = path.join(__dirname, '..', 'public', productData.picture_1); // Adjust path as needed

      // Check if the image file exists and delete it
      fs.unlink(picture_1_Path, (err) => {
        if (err) {
          console.error("Error deleting category picture:", err);
        } else {
          console.log("category picture deleted successfully");
        }
      });
    }

    // Proceed to delete the category from the database
    const [rows] = await promisePool.execute(
      "DELETE FROM categories WHERE ID = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.json({ status: "error", message: "Category not found" });
    }

    res.json({ status: "ok", message: "Category has been deleted successfully" });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};




export const createCategory = async (req, res, next) => {
  const {
    name_th, description_th, name_en, description_en
  } = req.body;


  const picture_1 = req.files && req.files.picture_1 ? `/uploads/${req.files.picture_1[0].filename}` : null;


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

const deleteFileWithRetry = (filePath, retries = 3, delay = 1000) => {
  return new Promise((resolve, reject) => {
    const attemptDelete = (retryCount) => {
      fs.exists(filePath, (exists) => {
        if (!exists) {
          console.log(`File does not exist at ${filePath}. Skipping delete.`);
          return resolve();  // File doesn't exist, so resolve immediately
        }

        fs.unlink(filePath, (err) => {
          if (err) {
            if (retryCount < retries) {
              console.log(`Retrying to delete file at ${filePath}... Attempt #${retryCount + 1}`);
              setTimeout(() => attemptDelete(retryCount + 1), delay);
            } else {
              reject(err);
            }
          } else {
            resolve();
          }
        });
      });
    };
    attemptDelete(0);
  });
};



export const editCategory = async (req, res, next) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Extract body data and file data
  const { name_th, description_th, name_en, description_en, ID } = req.body;
  const picture_1 = req.files && req.files.picture_1 ? `/uploads/${req.files.picture_1[0].filename}` : null;

  try {
    // Fetch current product data (including picture)
    const [product] = await promisePool.execute("SELECT picture_1 FROM categories WHERE ID = ?", [ID]);

    if (product.length === 0) {
      return res.status(404).json({ status: "error", message: "Category not found" });
    }

    const oldPicture1 = product[0].picture_1;

    // Only delete the old picture if there's a new one uploaded
    if (picture_1 && oldPicture1) {
      const oldPicturePath1 = path.join(__dirname, '..', 'public', oldPicture1); // Ensure correct path
      console.log('Attempting to delete old Picture 1 at:', oldPicturePath1);

      try {
        // Call the deleteFileWithRetry function to delete the old image if it exists
        await deleteFileWithRetry(oldPicturePath1);
        console.log('Old Picture 1 deleted successfully');
      } catch (err) {
        console.log('Failed to delete Old Picture 1:', err.message);
      }
    }

    // Update category details, ensuring the picture is handled correctly
    await promisePool.execute(
      "UPDATE categories SET picture_1 = ?, name_th = ?, description_th = ?, name_en = ?, description_en = ? WHERE ID = ?",
      [
        picture_1 || oldPicture1,  // If no new picture is uploaded, keep the old one
        name_th,
        description_th,
        name_en,
        description_en,
        ID
      ]
    );

    // Send success response
    res.json({ status: "ok", message: "Category has been updated successfully" });

  } catch (err) {
    // Handle any errors and send the appropriate response
    console.error("Error updating category:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};