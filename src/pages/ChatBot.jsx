import React, { useState } from "react";
import { Card, CardContent, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi 👋 I’m Medi AI Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);

    setLoading(true); // start loading state

    // Simulated bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "This is a sample AI response  🤖",
        },
      ]);
      setLoading(false); // stop loading after response
    }, 1500);

    setInput("");
  };

  return (
    <Card className="chatbot-window">
      {/* Header with close button */}
      <div className="chatbot-header">
        <span>Medi AI Assistant</span>
        <IconButton size="small" onClick={onClose} color="inherit">
          <CloseIcon />
        </IconButton>
      </div>

      {/* Chat messages */}
      <CardContent className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.from === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="chat-message bot">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </CardContent>

      {/* Input field */}
      <div className="chatbot-input">
        <TextField
          size="small"
          fullWidth
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </div>
    </Card>
  );
}
