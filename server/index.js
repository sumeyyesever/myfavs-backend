import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//db connaction
const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
db.connect();


//get all posts
app.get("/api/posts", async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM favorites ORDER BY id ASC");
        res.json(response.rows)
    } catch (error) {
        console.error('Error fetching data', error);
        res.status(500).json({ error: 'Database query failed' });
    }
});

//add post to db
app.post('/api/posts', async (req, res) => {
    const { title, rating, category, description } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO favorites (title, category, rating, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, category, rating, description]
        );
        console.log("Post added");
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding post:', error);
        res.status(500).json({ error: 'Failed to add post' });
    }
});

//delete post from the db
app.delete("/api/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query("DELETE FROM favorites WHERE id = $1 RETURNING *", [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post", error);
      res.status(500).json({ error: "Database deletion failed" });
    }
  });

//update post
app.put("/api/posts/:id", async (req, res) => {
    const { id } = req.params;
    const { title, rating, category, description } = req.body;

    try {
        const result = await db.query(
            "UPDATE favorites SET title = $1, rating = $2, category = $3, description = $4 WHERE id = $5 RETURNING *",
            [title, rating, category, description, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({ message: "Post updated successfully", post: result.rows[0] });
    } catch (error) {
        console.error("Error updating post", error);
        res.status(500).json({ error: "Database update failed" });
    }
});


app.listen(5000, () => {
    console.log("Server runnig on port 5000");

});
