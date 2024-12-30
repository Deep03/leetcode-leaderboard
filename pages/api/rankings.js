import fs from "fs";
import path from "path";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // Replace this with your script's logic
        const userFilePath = path.resolve(process.cwd(), "backend/user_data.json");

        // Read data from the backend
        const data = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));

        // Calculate scores dynamically
        const users = data.map((user) => ({
            username: user.username,
            score: user.easy * 1 + user.medium * 2 + user.hard * 2,
        }));

        // Sort users by score
        const sortedUsers = users.sort((a, b) => b.score - a.score);

        // Return sorted users
        return res.status(200).json(sortedUsers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to process rankings" });
    }
}
