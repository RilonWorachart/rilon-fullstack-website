import { promisePool } from "../db.js";  // Corrected import

export const getallBrand = async (req, res, next) => {
  try {
    // Execute the query using promisePool
    const [rows] = await promisePool.execute("SELECT * FROM brands");

    // Check if there are any categories
    if (rows.length === 0) {
      return res.json({ status: "error", message: "No brands found" });
    }

    // Return the categories
    res.json({ status: "ok", data: rows });
  } catch (err) {
    // Handle errors
    res.json({ status: "error", message: err.message });
  }
};

export const getBrandbyID = async (req, res, next) => {
  const id = req.query.id; // Getting the id from query parameters

  try {
    // Query to get the product by ID
    const [rows] = await promisePool.execute(
      "SELECT * FROM brands WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.json({ status: "error", message: "Brand not found" });
    }

    res.json({ status: "ok", data: rows });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};



export const deleteBrand = async (req, res, next) => {
  const id = req.query.id;
  try {
    const [rows] = await promisePool.execute(
      "DELETE FROM brands WHERE id = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.json({ status: "error", message: "Brand not found" });
    }

    res.json({ status: "ok", message: "Brand has been deleted successfully" });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};




export const createBrand = async (req, res, next) => {
  const {
    name_th, name_en
  } = req.body;



  try {
    // Insert the product into the products table
    await promisePool.execute(
      "INSERT INTO brands (name_th, name_en) VALUES (?, ?)",
      [
        name_th, name_en
      ]
    );

    res.json({ status: "ok", message: "Brand has been created successfully" });
  } catch (err) {
    // Handle error and return a message
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to create brand" });
  }
};


