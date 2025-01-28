import { promisePool } from "../db.js";
import nodemailer from 'nodemailer'; // Use ES module import



export const getallForm = async (req, res, next) => {
    try {
        const [rows] = await promisePool.execute("SELECT * FROM forms");

        res.json({ status: "ok", data: rows });
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
};


export const createForm = async (req, res, next) => {
    const {
        product, name, tel, line,
        email, fax, company, position, province,
        time, requirement, message
    } = req.body;

    try {
        await promisePool.execute(
            "INSERT INTO forms (product, name, tel, line, email, fax, company, position, province, time, requirement, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                product, name, tel, line, email, fax, company, position, province, time, requirement, message
            ]
        );
        res.json({ status: "ok", message: "Product has been created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Failed to create product" });
    }
};


const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services like SendGrid, etc.
    auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PW   // Your email password or app password
    }
});



export const sendMail = async (req, res) => {
    const {
        name, email, message, product, company, tel, line, fax, position, province, time, requirement
    } = req.body;

    // Set up email options
    const mailOptions = {
        from: process.env.EMAIL,   // Sender's email
        to: process.env.EMAIL,    // Recipient's email
        subject: `New Form Submission from customer:${name} email:${email}`,
        text: `Product: ${product}\nName: ${name}\nEmail: ${email}\nMessage: ${message}\nPhone: ${tel}\nCompany: ${company}\nLine ID: ${line}\nFax: ${fax}\nPosition: ${position}\nProvince: ${province}\nTime: ${time}\nRequirements: ${requirement}`,
        html: `
          <p><strong>Product:</strong> ${product}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p><strong>Phone:</strong> ${tel}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Line ID:</strong> ${line}</p>
          <p><strong>Fax:</strong> ${fax}</p>
          <p><strong>Position:</strong> ${position}</p>
          <p><strong>Province:</strong> ${province}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Requirements:</strong> ${requirement}</p>
        `,
    };

    try {
        // Send email
        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    reject('Error sending email');
                } else {
                    console.log('Email sent:', info);
                    resolve(info);
                }
            });
        });

        // Insert form data into the database
        await promisePool.execute(
            "INSERT INTO forms (product, name, tel, line, email, fax, company, position, province, time, requirement, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                product, name, tel, line, email, fax, company, position, province, time, requirement, message
            ]
        );

        // Send a success response
        res.status(200).json({ status: "ok", message: "Form submitted successfully and email sent" });
    } catch (err) {
        console.error('Error during the process:', err);
        res.status(500).json({ status: "error", message: "Failed to submit form or send email" });
    }
};