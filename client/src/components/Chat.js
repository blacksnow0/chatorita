import React, { useEffect, useState } from "react";
import { sendMessage, listenForMessages } from "../firebase/firebaseHelpers";
import { useAuthContext } from "../hooks/useAuthContext";

const Chat = ({ chatId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const unsubscribe = listenForMessages(chatId, setMessages);
    return () => unsubscribe(); // Clean up listener
  }, [chatId]);

  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage(chatId, newMessage, userId);
      setNewMessage(""); // Clear input
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 flex justify-between bg-indigo-600 shadow-lg">
        <h3 className=" text-white font-bold text-xl ">Chat Room</h3>
        {user && (
          <p className="text-white text-xl font-semibold">@{user.username}</p>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-6 ">
        <div className="flex flex-col space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-xs px-4 py-3 rounded-lg shadow-md ${
                msg.senderId === userId
                  ? "bg-indigo-500 text-white self-end"
                  : "bg-gray-300 text-gray-800 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex items-center p-4 bg-gray-800">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 mr-4"
        />
        <button
          onClick={handleSend}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
