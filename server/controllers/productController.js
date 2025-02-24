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
    const limit = 10

    try {
        // Query to get products by category
        const [rows] = await promisePool.execute(
            "SELECT * FROM products WHERE category_id = ? LIMIT ?",
            [id, limit]
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
            // const picture_1_Path = path.join(__dirname, '..', productData.picture_1);

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
            // const picture_2_Path = path.join(__dirname, '..', productData.picture_2); 

            // Check if the image file exists and delete it
            fs.unlink(picture_2_Path, (err) => {
                if (err) {
                    console.error("Error deleting picture_2:", err);
                } else {
                    console.log("picture_2 deleted successfully");
                }
            });
        }


        if (productData.model) {
            const model_Path = path.join(__dirname, '..', 'public', productData.model); // Adjust path as needed
            // const model_Path = path.join(__dirname, '..', productData.model);

            // Check if the image file exists and delete it
            fs.unlink(model_Path, (err) => {
                if (err) {
                    console.error("Error deleting Model:", err);
                } else {
                    console.log("Model deleted successfully");
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
        rilon_id, name_th, description_th, other_th, name_en, description_en, other_en, category_id, searchword_id, brand_id
    } = req.body;

    // Access the uploaded files using req.files
    const picture_1 = req.files && req.files.picture_1 ? `/uploads/${req.files.picture_1[0].filename}` : null;
    const picture_2 = req.files && req.files.picture_2 ? `/uploads/${req.files.picture_2[0].filename}` : null;
    const model = req.files && req.files.model ? `/uploads/${req.files.model[0].filename}` : null;

    // Check if the category_id exists in the categories table
    const [category] = await promisePool.execute("SELECT * FROM categories WHERE id = ?", [category_id]);

    if (!category.length) {
        return res.status(400).json({
            status: "error",
            message: "Category with the provided category_id does not exist"
        });
    }

    const [brand] = await promisePool.execute("SELECT * FROM brands WHERE id = ?", [brand_id]);

    if (!brand.length) {
        return res.status(400).json({
            status: "error",
            message: "Brand with the provided brand_id does not exist"
        });
    }

    // If searchword_id is provided, check if it exists in the searchwords table
    let searchwordQuery = '';
    let searchwordParams = [];

    if (searchword_id) {
        searchwordQuery = "SELECT * FROM searchwords WHERE id = ?";
        searchwordParams = [searchword_id];
    }

    const [searchword] = searchwordQuery ? await promisePool.execute(searchwordQuery, searchwordParams) : [];

    // If searchword_id is provided and not found, return error
    if (searchword_id && !searchword.length) {
        return res.status(400).json({
            status: "error",
            message: "Searchword with the provided searchword_id does not exist"
        });
    }

    try {
        // Insert the product into the products table (searchword_id can be null if not provided)
        await promisePool.execute(
            "INSERT INTO products (rilon_id, picture_1, picture_2, name_th, description_th, other_th, name_en, description_en, other_en, model, category_id, searchword_id, brand_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                rilon_id, picture_1, picture_2, name_th, description_th, other_th, name_en, description_en, other_en, model, category_id, searchword_id || null, brand_id
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
        rilon_id, name_th, description_th, other_th, name_en, description_en, other_en, category_id, searchword_id, brand_id, ID
    } = req.body;

    // Access the uploaded files using req.files
    const picture_1 = req.files && req.files.picture_1 ? `/uploads/${req.files.picture_1[0].filename}` : null;
    const picture_2 = req.files && req.files.picture_2 ? `/uploads/${req.files.picture_2[0].filename}` : null;
    const model = req.files && req.files.model ? `/uploads/${req.files.model[0].filename}` : null;


    // Check if the category_id exists in the categories table
    const [category] = await promisePool.execute("SELECT * FROM categories WHERE id = ?", [category_id]);

    if (!category.length) {
        return res.status(400).json({
            status: "error",
            message: "Category with the provided category_id does not exist"
        });
    }

    const [brand] = await promisePool.execute("SELECT * FROM brands WHERE id = ?", [brand_id]);

    if (!brand.length) {
        return res.status(400).json({
            status: "error",
            message: "Brand with the provided brand_id does not exist"
        });
    }

    // If searchword_id is provided, check if it exists in the searchwords table
    let searchwordQuery = '';
    let searchwordParams = [];

    if (searchword_id) {
        searchwordQuery = "SELECT * FROM searchwords WHERE id = ?";
        searchwordParams = [searchword_id];
    }

    const [searchword] = searchwordQuery ? await promisePool.execute(searchwordQuery, searchwordParams) : [];

    // If searchword_id is provided and not found, return error
    if (searchword_id && !searchword.length) {
        return res.status(400).json({
            status: "error",
            message: "Searchword with the provided searchword_id does not exist"
        });
    }

    try {
        // Fetch the current pictures from the product before updating
        const [product] = await promisePool.execute("SELECT picture_1, picture_2, model FROM products WHERE ID = ?", [ID]);

        if (product.length > 0) {
            const oldPicture1 = product[0].picture_1; // Define oldPicture1 and oldPicture2
            const oldPicture2 = product[0].picture_2;
            const oldModel = product[0].model;

            // Log current picture paths to check what's being deleted
            console.log('Current Picture 1:', oldPicture1);
            console.log('Current Picture 2:', oldPicture2);
            console.log('Current Model:', oldModel);

            // Delete old picture 1 only if a new one is provided
            if (picture_1 && oldPicture1) {
                const oldPicturePath1 = path.join(__dirname, '..', 'public', oldPicture1); // Correct path for deletion
                // const oldPicturePath1 = path.join(__dirname, '..', oldPicture1);
                console.log('Attempting to delete old Picture 1 at:', oldPicturePath1);
                try {
                    await deleteFileWithRetry(oldPicturePath1);
                    console.log('Old Picture 1 deleted successfully');
                } catch (err) {
                    console.log('Failed to delete Old Picture 1:', err.message);
                }
            }

            // If no new picture_1 uploaded, leave the old picture in place
            if (!picture_1 && oldPicture1) {
                console.log('No new Picture 1 uploaded. Old Picture 1 remains unchanged');
            }

            // Delete old picture 2 only if a new one is provided
            if (picture_2 && oldPicture2) {
                const oldPicturePath2 = path.join(__dirname, '..', 'public', oldPicture2); // Correct path for deletion
                // const oldPicturePath2 = path.join(__dirname, '..', oldPicture2);
                console.log('Attempting to delete old Picture 2 at:', oldPicturePath2);
                try {
                    await deleteFileWithRetry(oldPicturePath2);
                    console.log('Old Picture 2 deleted successfully');
                } catch (err) {
                    console.log('Failed to delete Old Picture 2:', err.message);
                }
            }

            // If no new picture_2 uploaded, leave the old picture in place
            if (!picture_2 && oldPicture2) {
                console.log('No new Picture 2 uploaded. Old Picture 2 remains unchanged');
            }

            // Delete old model only if a new one is provided
            if (model && oldModel) {
                const oldModelPath = path.join(__dirname, '..', 'public', oldModel); // Correct path for deletion
                // const oldModelPath = path.join(__dirname, '..', oldModel);
                console.log('Attempting to delete old Model at:', oldModelPath);
                try {
                    await deleteFileWithRetry(oldModelPath);
                    console.log('Old Model deleted successfully');
                } catch (err) {
                    console.log('Failed to delete Old Model:', err.message);
                }
            }

            // If no new model uploaded, leave the old model in place
            if (!model && oldModel) {
                console.log('No new Model uploaded. Old Model remains unchanged');
            }
        }

        // Update the product with new values, keeping the old picture if no new picture is uploaded
        await promisePool.execute(
            "UPDATE products SET rilon_id = ?, picture_1 = ?, picture_2 = ?, name_th = ?, description_th = ?, other_th = ?, name_en = ?, description_en = ?, other_en = ?, model = ?, category_id = ?, searchword_id = ?, brand_id = ? WHERE ID = ?",
            [
                rilon_id,
                picture_1 || product[0].picture_1,  // Use the new picture_1 or keep the old one if no new picture is uploaded
                picture_2 || product[0].picture_2,  // Use the new picture_2 or keep the old one if no new picture is uploaded
                name_th,
                description_th,
                other_th,
                name_en,
                description_en,
                other_en,
                model || product[0].model,  // Use the new model or keep the old one if no new model is uploaded
                category_id,
                searchword_id || null,  // If searchword_id is not provided, set it to null
                brand_id,
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
            query += " AND brand_id = ?";
            queryParams.push(brand);
        }

        query += ` ORDER BY name_th asc`;

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
            countQuery += " AND brand_id = ?";
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



export const getallCatelogProduct = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const key = req.query.key ? req.query.key.toLowerCase() : ''; // Get the search term from query params

        // Query to get all products, joining with brands and searchwords
        const [allRows] = await promisePool.execute(`
            SELECT 
                p.*, 
                b.name_th AS brand_name_th,
                b.name_en AS brand_name_en,
                s.name_th AS searchword_name_th,
                s.name_en AS searchword_name_en
            FROM products p
            LEFT JOIN brands b ON p.brand_id = b.id
            LEFT JOIN searchwords s ON p.searchword_id = s.id
        `);

        // Filter products based on the 'key' parameter
        const filteredRows = allRows.filter(item => {
            return (
                (item.name_th && item.name_th.toLowerCase().includes(key)) ||
                (item.name_en && item.name_en.toLowerCase().includes(key)) ||
                (item.brand_name_th && item.brand_name_th.toLowerCase().includes(key)) ||
                (item.brand_name_en && item.brand_name_en.toLowerCase().includes(key)) ||
                (item.searchword_name_th && item.searchword_name_th.toLowerCase().includes(key)) ||
                (item.searchword_name_en && item.searchword_name_en.toLowerCase().includes(key))
            );
        });

        const totalFilteredProducts = filteredRows.length;

        // Apply pagination to the filtered rows
        const paginatedRows = filteredRows.slice(offset, offset + limit);

        // Calculate the total pages based on filtered data
        const totalPages = Math.ceil(totalFilteredProducts / limit);

        // Send the response with filtered and paginated data
        res.json({
            status: "ok",
            data: paginatedRows,
            pagination: {
                totalProducts: totalFilteredProducts,
                totalPages,
                currentPage: page,
                itemsPerPage: limit,
            },
        });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};




export const deleteProductPicture2 = async (req, res, next) => {
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

        if (productData.picture_2) {
            const picture_2_Path = path.join(__dirname, '..', 'public', productData.picture_2); // Adjust path as needed
            // const picture_2_Path = path.join(__dirname, '..', productData.picture_2);

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
            "UPDATE products SET picture_2 = NULL WHERE ID = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.json({ status: "error", message: "Product Picture 2 not found" });
        }

        res.json({ status: "ok", message: "Product Picture 2 has been delete successfully" });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};



export const deleteProductModel = async (req, res, next) => {
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


        if (productData.model) {
            const model_Path = path.join(__dirname, '..', 'public', productData.model); // Adjust path as needed
            // const model_Path = path.join(__dirname, '..', productData.model);

            // Check if the image file exists and delete it
            fs.unlink(model_Path, (err) => {
                if (err) {
                    console.error("Error deleting Model:", err);
                } else {
                    console.log("Model deleted successfully");
                }
            });
        }

        // Query to get the product by ID
        const [rows] = await promisePool.execute(
            "UPDATE products SET model = NULL WHERE ID = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.json({ status: "error", message: "Product Model not found" });
        }

        res.json({ status: "ok", message: "Product Model has been delete successfully" });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};
