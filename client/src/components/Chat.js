import React, { useEffect, useState, useRef } from "react";
import { sendMessage, listenForMessages } from "../firebase/firebaseHelpers";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Chat = ({ chatId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuthContext();
  const messagesEndRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = listenForMessages(chatId, setMessages);
    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage(chatId, newMessage, userId);
      console.log(messages);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleClose = (e) => {
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen ">
      {/* Header */}
      <header className="p-4 flex justify-between bg-indigo-600 shadow-lg">
        <h3 className="text-white font-bold text-xl">Chat Room</h3>
        {user && (
          <p className="text-white text-lg font-semibold">@{user.username}</p>
        )}
        <button onClick={handleClose}>close</button>
      </header>

      {/* Chat Messages */}
      <main className="flex-grow overflow-y-auto p-6">
        {messages.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-xs px-4 py-3 rounded-lg shadow ${
                  msg.senderId === userId
                    ? "bg-indigo-500 text-white self-end"
                    : "bg-gray-300 text-gray-800 self-start"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs font-semibold">{msg.senderId} </span>
                <span className="text-xs ">
                  {msg.timestamp && msg.timestamp.toDate
                    ? new Date(msg.timestamp.toDate()).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "Unknown Time"}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No messages yet. Start chatting!
          </p>
        )}
      </main>

      {/* Input Area */}
      <footer className="flex items-center p-4 ">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-grow px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 mr-4"
          aria-label="Message input"
        />
        <button
          onClick={handleSend}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          aria-label="Send message"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default Chat;
