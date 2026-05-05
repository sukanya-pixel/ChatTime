let ws;
let username = "";

function joinChat() {
    username = document.getElementById("username").value;

    if (!username) {
        alert("Enter a username");
        return;
    }

    ws = new WebSocket("ws://127.0.0.1:8000/ws");

    ws.onopen = () => {
    console.log("Connected to server");

    // Enable send button
    document.getElementById("sendBtn").disabled = false;
    };

    ws.onmessage = function(event) {
        const messages = document.getElementById("messages");
        const message = document.createElement("div");
        message.textContent = event.data;
        messages.appendChild(message);
    };

    ws.onerror = (err) => {
        console.log("WebSocket error:", err);
    };

    document.querySelector(".login").style.display = "none";
    document.querySelector(".chat-container").style.display = "block";
}

function sendMessage() {
    const input = document.getElementById("messageInput");

    if (!input.value.trim()) return;

    const message = username + ": " + input.value;

    ws.send(message);
    input.value = "";
}