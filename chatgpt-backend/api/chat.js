const express = require("express");
const fetch = require("node-fetch"); // Untuk OpenAI API

const app = express();
app.use(express.json());

app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    const API_KEY = process.env.OPENAI_API_KEY;
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
    };

    const body = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
    });

    try {
        const response = await fetch(apiUrl, { method: "POST", headers, body });
        const data = await response.json();
        res.status(200).json(data.choices[0].message.content);
    } catch (error) {
        console.error("Error communicating with OpenAI API:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = app;
