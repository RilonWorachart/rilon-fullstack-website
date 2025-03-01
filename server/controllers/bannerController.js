import { promisePool } from "../db.js";  // Corrected import
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';



export const getallBannerTop = async (req, res, next) => {
    try {
        // Query to get all products
        const [rows] = await promisePool.execute("SELECT * FROM banner_top");

        res.json({ status: "ok", data: rows });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};


export const deleteBannerTop = async (req, res, next) => {
    const id = req.query.id;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    try {
        const [banner] = await promisePool.execute(
            "SELECT * FROM banner_top WHERE id = ?",
            [id]
        );
        if (banner.length === 0) {
            return res.json({ status: "error", message: "Banner top not found" });
        }

        const bannerData = banner[0];
        if (bannerData.banner_path) {
            const image_Path = path.join(__dirname, '..', bannerData.banner_path); 

            // Check if the image file exists and delete it
            fs.unlink(image_Path, (err) => {
                if (err) {
                    console.error("Error deleting image:", err);
                } else {
                    console.log("Delete image successfully");
                }
            });
        }

        // Query to get the product by ID
        const [rows] = await promisePool.execute(
            "DELETE FROM banner_top WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.json({ status: "error", message: "Banner Top not found" });
        }

        res.json({ status: "ok", message: "Banner Top has been delete successfully" });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};



export const createBannerTop = async (req, res, next) => {

    // Access the uploaded files using req.files
    const banner_path = req.files && req.files.image ? `/uploads/${req.files.image[0].filename}` : null;

    try {
        // Insert the product into the products table
        await promisePool.execute(
            "INSERT INTO banner_top (banner_path) VALUES (?)",
            [
                banner_path
            ]
        );

        res.json({ status: "ok", message: "Banner Top has been created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Failed to create a Banner Top" });
    }
};



export const getallBannerRilon = async (req, res, next) => {
    try {
        // Query to get all products
        const [rows] = await promisePool.execute("SELECT * FROM banner_rilon");

        res.json({ status: "ok", data: rows });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};


export const deleteBannerRilon = async (req, res, next) => {
    const id = req.query.id;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    try {
        const [banner] = await promisePool.execute(
            "SELECT * FROM banner_rilon WHERE id = ?",
            [id]
        );
        if (banner.length === 0) {
            return res.json({ status: "error", message: "Banner rilon not found" });
        }

        const bannerData = banner[0];
        if (bannerData.banner_path) {
            const image_Path = path.join(__dirname, '..', bannerData.banner_path); 

            // Check if the image file exists and delete it
            fs.unlink(image_Path, (err) => {
                if (err) {
                    console.error("Error deleting image:", err);
                } else {
                    console.log("Delete image successfully");
                }
            });
        }

        // Query to get the product by ID
        const [rows] = await promisePool.execute(
            "DELETE FROM banner_rilon WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.json({ status: "error", message: "Banner Top not found" });
        }

        res.json({ status: "ok", message: "Banner Rilon has been delete successfully" });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};



export const createBannerRilon = async (req, res, next) => {

    // Access the uploaded files using req.files
    const banner_path = req.files && req.files.image ? `/uploads/${req.files.image[0].filename}` : null;

    try {
        // Insert the product into the products table
        await promisePool.execute(
            "INSERT INTO banner_rilon (banner_path) VALUES (?)",
            [
                banner_path
            ]
        );

        res.json({ status: "ok", message: "Banner Rilon has been created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Failed to create a Banner Rilon" });
    }
};


export const getallBannerJW = async (req, res, next) => {
    try {
        // Query to get all products
        const [rows] = await promisePool.execute("SELECT * FROM banner_jw");

        res.json({ status: "ok", data: rows });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};


export const deleteBannerJW = async (req, res, next) => {
    const id = req.query.id;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    try {
        const [banner] = await promisePool.execute(
            "SELECT * FROM banner_jw WHERE id = ?",
            [id]
        );
        if (banner.length === 0) {
            return res.json({ status: "error", message: "Banner JW not found" });
        }

        const bannerData = banner[0];
        if (bannerData.banner_path) {
            const image_Path = path.join(__dirname, '..', bannerData.banner_path); 

            // Check if the image file exists and delete it
            fs.unlink(image_Path, (err) => {
                if (err) {
                    console.error("Error deleting image:", err);
                } else {
                    console.log("Delete image successfully");
                }
            });
        }

        // Query to get the product by ID
        const [rows] = await promisePool.execute(
            "DELETE FROM banner_jw WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.json({ status: "error", message: "Banner JW not found" });
        }

        res.json({ status: "ok", message: "Banner Top has been delete successfully" });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};



export const createBannerJW = async (req, res, next) => {

    // Access the uploaded files using req.files
    const banner_path = req.files && req.files.image ? `/uploads/${req.files.image[0].filename}` : null;

    try {
        // Insert the product into the products table
        await promisePool.execute(
            "INSERT INTO banner_jw (banner_path) VALUES (?)",
            [
                banner_path
            ]
        );

        res.json({ status: "ok", message: "Banner JW has been created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Failed to create a Banner JW" });
    }
};