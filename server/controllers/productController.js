import { promisePool } from "../db.js";  // Corrected import

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
    const id = req.query.id; // Getting the id from query parameters

    try {
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




export const editProduct = async (req, res, next) => {
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
        // Update the existing product
        await promisePool.execute(
            "UPDATE products SET rilon_id = ?, picture_1 = ?, picture_2 = ?, name_th = ?, description_th = ?, search_word_th = ?,brand_th = ?, other_th = ?, name_en = ?, description_en = ?, search_word_en = ?,brand_en = ?, other_en = ?, category_id = ? WHERE ID = ?",
            [rilon_id, picture_1, picture_2, name_th, description_th, search_word_th,
                brand_th, other_th, name_en, description_en, search_word_en,
                brand_en, other_en, category_id, ID]
        );

        res.json({ status: "ok", message: "Product has been updated successfully" });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};
