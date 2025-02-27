import { promisePool } from "../db.js";  // Corrected import

export const getVideo = async (req, res, next) => {
  try {
    // Execute the query using promisePool
    const [rows] = await promisePool.execute("SELECT * FROM videos");

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


export const editVideo = async (req, res, next) => {
  const { youtube_url } = req.body;

  try {
    // Update category details, ensuring the picture is handled correctly
    await promisePool.execute(
      "UPDATE videos SET youtube_url = ? WHERE id = 1",
      [youtube_url]
    );

    // Send success response
    res.json({ status: "ok", message: "Video has been updated successfully"});

  } catch (err) {
    // Handle any errors and send the appropriate response
    console.error("Error updating a video:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
}




