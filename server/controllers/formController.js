import { promisePool } from "../db.js";

export const createForm = async (req, res, next) => {
    const {
        product, name, tel, line,
        email, fax, company, position, province,
        time, requirement, message, accepted_terms
    } = req.body;

    // Validate required fields
    if (!email || !name || !accepted_terms) {
        return res.status(400).json({ status: "error", message: "Missing required fields" });
    }

    try {
        await promisePool.execute(
            "INSERT INTO forms (product, name, tel, line, email, fax, company, position, province, time, requirement, message, accepted_terms) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                product, name, tel, line, email, fax, company, position, province, time, requirement, message, accepted_terms
            ]
        );
        res.json({ status: "ok", message: "Form has been created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Failed to create Form" });
    }
};