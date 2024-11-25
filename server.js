const express = require('express');
const app = express();
const fetch = require('node-fetch');  // Gunakan node-fetch atau axios untuk memanggil API OpenAI
const port = 5500;

// Middleware untuk parsing JSON
app.use(express.json());

// Endpoint untuk menerima pesan dan mengirimkan respons dari OpenAI
app.post('/send-message', async (req, res) => {
    const userMessage = req.body.message;

    // Panggil OpenAI API
    const openAIResponse = await sendToOpenAI(userMessage);

    // Kirim respons ke frontend
    res.json({ response: openAIResponse });
});

// Fungsi untuk mengirim pesan ke OpenAI API
async function sendToOpenAI(message) {
    const API_KEY = process.env.OPENAI_API_KEY;  // Pastikan Anda sudah mengonfigurasi API Key di .env
    const url = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
        }),
    });

    const data = await response.json();
    return data.choices[0].message.content;  // Ambil pesan respons dari OpenAI
}

// Menjalankan server pada port yang telah ditentukan
app.listen(port, () => {
    console.log(`Server berjalan pada http://localhost:${port}`);
});
