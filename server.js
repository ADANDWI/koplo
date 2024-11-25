const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Route untuk menangani permintaan dari frontend
app.post('/send-message', async (req, res) => {
    const message = req.body.message;
    const API_KEY = process.env.OPENAI_API_KEY; // Ambil API Key dari .env

    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
    };

    const body = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body,
        });
        const data = await response.json();
        res.json({ response: data.choices[0].message.content }); // Kirim balik response dari OpenAI
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Oops, something went wrong!");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
