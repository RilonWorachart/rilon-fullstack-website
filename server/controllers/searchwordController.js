import { promisePool } from "../db.js";  // Corrected import

export const getallSearchword = async (req, res, next) => {
  try {
    // Execute the query using promisePool
    const [rows] = await promisePool.execute("SELECT * FROM searchwords ORDER BY name_th desc");

    if (rows.length === 0) {
      return res.json({ status: "error", message: "No searchword found" });
    }

    res.json({ status: "ok", data: rows });
  } catch (err) {
    // Handle errors
    res.json({ status: "error", message: err.message });
  }
};

export const getSearchwordbyID = async (req, res, next) => {
  const id = req.query.id; // Getting the id from query parameters

  try {
    // Query to get the product by ID
    const [rows] = await promisePool.execute(
      "SELECT * FROM searchwords WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.json({ status: "error", message: "Searchword not found" });
    }

    res.json({ status: "ok", data: rows });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};



export const deleteSearchword = async (req, res, next) => {
  const id = req.query.id;
  try {
    const [rows] = await promisePool.execute(
      "DELETE FROM searchwords WHERE id = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.json({ status: "error", message: "Searchword not found" });
    }

    res.json({ status: "ok", message: "Searchword has been deleted successfully" });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};




export const createSearchword = async (req, res, next) => {
  const {
    name_th, name_en
  } = req.body;

  try {
    // Insert the product into the products table
    await promisePool.execute(
      "INSERT INTO searchwords (name_th, name_en) VALUES (?, ?)",
      [
        name_th, name_en
      ]
    );

    res.json({ status: "ok", message: "Searchword has been created successfully" });
  } catch (err) {
    // Handle error and return a message
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to create searchword" });
  }
};


