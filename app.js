const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// Daftar respons otomatis untuk kata kunci tertentu
const predefinedResponses = {
    "halo": "Halo! Selamat datang di ChatGPT versi lokal.",
    "apa kabar": "Saya baik! Bagaimana dengan Anda?",
    "help": "Anda bisa mencoba kata kunci seperti 'halo', 'apa kabar', atau lainnya."
};

// Fungsi untuk menambahkan pesan ke antarmuka
function addMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    const messageContent = document.createElement("span");
    messageContent.textContent = text;
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll otomatis ke bawah
}

// Fungsi untuk mengelola pesan pengguna
function handleUserMessage() {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        addMessage("user", userMessage);
        chatInput.value = "";

        // Respon bot
        const botResponse = predefinedResponses[userMessage.toLowerCase()] || "Maaf, saya belum mengerti itu.";
        addMessage("bot", botResponse);
    }
}

// Event listener untuk tombol "Send"
sendBtn.addEventListener("click", handleUserMessage);

// Event listener untuk tombol "Enter"
chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleUserMessage();
    }
});
