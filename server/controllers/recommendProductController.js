import { promisePool } from "../db.js";  // Corrected import
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';



export const getallrecommendProduct = async (req, res, next) => {
    try {
        // Query to get all products
        const [rows] = await promisePool.execute("SELECT * FROM recommendproducts");

        res.json({ status: "ok", data: rows });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};


export const deleterecommendProduct = async (req, res, next) => {
    const id = req.query.id;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    try {
        const [product] = await promisePool.execute(
            "SELECT * FROM recommendproducts WHERE ID = ?",
            [id]
        );
        if (product.length === 0) {
            return res.json({ status: "error", message: "Recommend Product not found" });
        }

        const productData = product[0];
        if (productData.image) {
            const image_Path = path.join(__dirname, '..', 'public', productData.image); // Adjust path as needed

            // Check if the image file exists and delete it
            fs.unlink(image_Path, (err) => {
                if (err) {
                    console.error("Error deleting image:", err);
                } else {
                    console.log("image deleted successfully");
                }
            });
        }

        // Query to get the product by ID
        const [rows] = await promisePool.execute(
            "DELETE FROM recommendproducts WHERE ID = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.json({ status: "error", message: "Recommend product not found" });
        }

        res.json({ status: "ok", message: "Recommend product has been delete successfully" });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};



export const createrecommendProduct = async (req, res, next) => {
    const {
        name
    } = req.body;

    // Access the uploaded files using req.files
    const image = req.files && req.files.image ? `/uploads/${req.files.image[0].filename}` : null;

    try {
        // Insert the product into the products table
        await promisePool.execute(
            "INSERT INTO recommendproducts (name, image) VALUES (?, ?)",
            [
                name, image
            ]
        );

        res.json({ status: "ok", message: "Recommend product has been created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Failed to create a recommend product" });
    }
};


