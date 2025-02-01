import { promisePool } from "../db.js";  // Corrected import
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const getproductbyId = async (req, res, next) => {
    const id = req.query.id; // Getting the id from query parameters

    try {
        // Query to get the product by ID
        const [rows] = await promisePool.execute(
            "SELECT * FROM products WHERE ID = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.json({ status: "error", message: "Product not found" });
        }

        res.json({ status: "ok", data: rows[0] });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};

export const getproductbyCategory = async (req, res, next) => {
    const id = req.query.category_id; // Getting id from query parameters

    try {
        // Query to get products by category
        const [rows] = await promisePool.execute(
            "SELECT * FROM products WHERE category_id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.json({ status: "error", message: "No products found in this category" });
        }

        res.json({ status: "ok", data: rows });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};

export const getallProduct = async (req, res, next) => {
    try {
        // Query to get all products
        const [rows] = await promisePool.execute("SELECT * FROM products");

        res.json({ status: "ok", data: rows });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};


export const deleteProduct = async (req, res, next) => {
    const id = req.query.id;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    try {

        const [product] = await promisePool.execute(
            "SELECT * FROM products WHERE ID = ?",
            [id]
        );

        if (product.length === 0) {
            return res.json({ status: "error", message: "Product not found" });
        }

        const productData = product[0];


        if (productData.picture_1) {
            const picture_1_Path = path.join(__dirname, '..', 'public', productData.picture_1); // Adjust path as needed

            // Check if the image file exists and delete it
            fs.unlink(picture_1_Path, (err) => {
                if (err) {
                    console.error("Error deleting picture_1:", err);
                } else {
                    console.log("picture_1 deleted successfully");
                }
            });
        }

        if (productData.picture_2) {
            const picture_2_Path = path.join(__dirname, '..', 'public', productData.picture_2); // Adjust path as needed

            // Check if the image file exists and delete it
            fs.unlink(picture_2_Path, (err) => {
                if (err) {
                    console.error("Error deleting picture_2:", err);
                } else {
                    console.log("picture_2 deleted successfully");
                }
            });
        }

        // Query to get the product by ID
        const [rows] = await promisePool.execute(
            "DELETE FROM products WHERE ID = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.json({ status: "error", message: "Product not found" });
        }

        res.json({ status: "ok", message: "Product has been delete successfully" });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};



export const createProduct = async (req, res, next) => {
    const {
        rilon_id, name_th, description_th, search_word_th,
        brand_th, other_th, name_en, description_en, search_word_en,
        brand_en, other_en, category_id
    } = req.body;

    // Access the uploaded files using req.files
    const picture_1 = req.files && req.files.picture_1 ? `/uploads/${req.files.picture_1[0].filename}` : null;
    const picture_2 = req.files && req.files.picture_2 ? `/uploads/${req.files.picture_2[0].filename}` : null;

    // Check if the category_id exists in the categories table
    const [category] = await promisePool.execute("SELECT * FROM categories WHERE id = ?", [category_id]);

    if (!category.length) {
        return res.status(400).json({
            status: "error",
            message: "Category with the provided category_id does not exist"
        });
    }

    try {
        // Insert the product into the products table
        await promisePool.execute(
            "INSERT INTO products (rilon_id, picture_1, picture_2, name_th, description_th, search_word_th, brand_th, other_th, name_en, description_en, search_word_en, brand_en, other_en, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                rilon_id, picture_1, picture_2, name_th, description_th, search_word_th,
                brand_th, other_th, name_en, description_en, search_word_en,
                brand_en, other_en, category_id
            ]
        );

        res.json({ status: "ok", message: "Product has been created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Failed to create product" });
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


export const editProduct = async (req, res, next) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const {
        rilon_id, name_th, description_th, search_word_th,
        brand_th, other_th, name_en, description_en, search_word_en,
        brand_en, other_en, category_id, ID
    } = req.body;

    // Access the uploaded files using req.files
    const picture_1 = req.files && req.files.picture_1 ? `/uploads/${req.files.picture_1[0].filename}` : null;
    const picture_2 = req.files && req.files.picture_2 ? `/uploads/${req.files.picture_2[0].filename}` : null;

    // Check if the category_id exists in the categories table
    const [category] = await promisePool.execute("SELECT * FROM categories WHERE id = ?", [category_id]);

    if (!category.length) {
        return res.status(400).json({
            status: "error",
            message: "Category with the provided category_id does not exist"
        });
    }

    try {
        // Fetch the current pictures from the product before updating
        const [product] = await promisePool.execute("SELECT picture_1, picture_2 FROM products WHERE ID = ?", [ID]);

        if (product.length > 0) {
            const oldPicture1 = product[0].picture_1; // Define oldPicture1 and oldPicture2
            const oldPicture2 = product[0].picture_2;

            // Log current picture paths to check what's being deleted
            console.log('Current Picture 1:', oldPicture1);
            console.log('Current Picture 2:', oldPicture2);

            // Delete old picture 1 only if a new one is provided
            if (picture_1 && oldPicture1) {
                const oldPicturePath1 = path.join(__dirname, '..', 'public', oldPicture1); // Correct path for deletion
                console.log('Attempting to delete old Picture 1 at:', oldPicturePath1);

                try {
                    await deleteFileWithRetry(oldPicturePath1);
                    console.log('Old Picture 1 deleted successfully');
                } catch (err) {
                    console.log('Failed to delete Old Picture 1:', err.message);
                }
            }

            // Delete old picture 2 only if a new one is provided
            if (picture_2 && oldPicture2) {
                const oldPicturePath2 = path.join(__dirname, '..', 'public', oldPicture2); // Correct path for deletion
                console.log('Attempting to delete old Picture 2 at:', oldPicturePath2);

                try {
                    await deleteFileWithRetry(oldPicturePath2);
                    console.log('Old Picture 2 deleted successfully');
                } catch (err) {
                    console.log('Failed to delete Old Picture 2:', err.message);
                }
            }
        }

        // Update the product with new values, keeping the old picture if no new picture is uploaded
        await promisePool.execute(
            "UPDATE products SET rilon_id = ?, picture_1 = ?, picture_2 = ?, name_th = ?, description_th = ?, search_word_th = ?, brand_th = ?, other_th = ?, name_en = ?, description_en = ?, search_word_en = ?, brand_en = ?, other_en = ?, category_id = ? WHERE ID = ?",
            [
                rilon_id,
                picture_1 || product[0].picture_1,  // Use the new picture_1 or keep the old one if no new picture is uploaded
                picture_2 || product[0].picture_2,  // Use the new picture_2 or keep the old one if no new picture is uploaded
                name_th,
                description_th,
                search_word_th,
                brand_th,
                other_th,
                name_en,
                description_en,
                search_word_en,
                brand_en,
                other_en,
                category_id,
                ID
            ]
        );

        res.json({ status: "ok", message: "Product has been updated successfully" });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};


export const getFilteredProducts = async (req, res) => {
    try {
      const { searchTerm = "", category = "", brand = "", page = 1, limit = 20 } = req.query;
  
      // Calculate the offset based on the page number
      const offset = (page - 1) * limit;
      
      // Base SQL query for fetching products with filters
      let query = "SELECT * FROM products WHERE 1=1";
      let queryParams = [];
  
      // Apply search term filter
      if (searchTerm) {
        query += " AND (name_th LIKE ? OR name_en LIKE ?)";
        queryParams.push(`%${searchTerm}%`, `%${searchTerm}%`);
      }
  
      // Apply category filter
      if (category) {
        query += " AND category_id = ?";
        queryParams.push(category);
      }
  
      // Apply brand filter
      if (brand) {
        query += " AND brand_th = ?";
        queryParams.push(brand);
      }
  
      // Add pagination (LIMIT and OFFSET) to the query
      query += " LIMIT ? OFFSET ?";
      queryParams.push(parseInt(limit), parseInt(offset));
  
      // Fetch filtered products
      const [products] = await promisePool.execute(query, queryParams);
  
      // Get the total count of filtered products for pagination
      let countQuery = "SELECT COUNT(*) AS total FROM products WHERE 1=1";
      let countQueryParams = [];
  
      // Apply filters to count query as well
      if (searchTerm) {
        countQuery += " AND (name_th LIKE ? OR name_en LIKE ?)";
        countQueryParams.push(`%${searchTerm}%`, `%${searchTerm}%`);
      }
  
      if (category) {
        countQuery += " AND category_id = ?";
        countQueryParams.push(category);
      }
  
      if (brand) {
        countQuery += " AND brand_th = ?";
        countQueryParams.push(brand);
      }
  
      // Fetch the total count of filtered products
      const [totalRows] = await promisePool.execute(countQuery, countQueryParams);
      const totalProducts = totalRows[0].total;
  
      // Calculate the total number of pages
      const totalPages = Math.ceil(totalProducts / limit);
  
      // Send the filtered products along with pagination data
      res.json({
        status: 'ok',
        data: products,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalProducts: totalProducts,
        },
      });
    } catch (error) {
      // Handle any errors and return a proper response
      console.error('Error fetching filtered products:', error);
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  };
  
