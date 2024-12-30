import React, { useEffect, useState, useRef } from "react";
import {
  sendMessage,
  listenForMessages,
  addReaction,
} from "../firebase/firebaseHelpers";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faTimesCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import EmojiPicker from "emoji-picker-react";
import { useSwipeable } from "react-swipeable";

const Chat = ({ chatId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const { user } = useAuthContext();
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const swipeHandlers = useSwipeable({
    onSwiped: (eventData) => {
      const { dir, event } = eventData;
      if (dir === "Left" || dir === "Right") {
        const messageId =
          event.target.closest("[data-message-id]")?.dataset.messageId;
        if (messageId) {
          setSelectedMessageId(messageId);
          setShowEmojiPicker(true);
        }
      }
    },
  });

  useEffect(() => {
    try {
      const unsubscribe = listenForMessages(chatId, setMessages);
      return () => unsubscribe();
    } catch (error) {
      console.error("Error listening for messages", error);
    }
  }, [chatId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      try {
        sendMessage(chatId, newMessage, userId);
        setNewMessage("");
      } catch (error) {
        console.error("Failed to send message", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleReaction = (emoji) => {
    if (selectedMessageId) {
      addReaction(chatId, selectedMessageId, userId, emoji);
      setShowEmojiPicker(false);
      setSelectedMessageId(null);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      return new Date(timestamp.toDate()).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
    return "Unknown Time";
  };

  return (
    <div className="flex flex-col h-[calc(80vh)]" {...swipeHandlers}>
      {/* Header */}
      <header className="p-4 flex justify-between bg-indigo-600 shadow-lg">
        <h3 className="text-white font-bold text-xl">Chat Room</h3>
        {user && (
          <p className="text-white text-lg font-semibold">@{user.username}</p>
        )}
        <button onClick={handleClose}>
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="text-white text-2xl"
          />
        </button>
      </header>

      {/* Chat Messages */}
      <main className="flex-grow overflow-y-auto p-6">
        {messages.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                data-message-id={msg.id}
                className={`max-w-xs px-4 py-3 rounded-lg shadow ${
                  msg.senderId === userId
                    ? "bg-indigo-500 text-white self-end"
                    : "bg-gray-300 text-gray-800 self-start"
                }`}
              >
                <span className="text-xs font-semibold">{msg.senderId}</span>
                <p>{msg.text}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs ">
                    {formatTimestamp(msg.timestamp)}
                  </span>
                  {/* Display Reactions */}
                  {(msg.reactions ? Object.entries(msg.reactions) : []).map(
                    ([userId, emoji]) => (
                      <span key={userId} className="reaction">
                        {emoji}
                      </span>
                    )
                  )}
                </div>
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

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-0 right-0 flex justify-center">
          <button
            onClick={() => setShowEmojiPicker(false)}
            className="z-50 absolute top-4 right-20 text-indigo-500 text-3xl"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <EmojiPicker
            onEmojiClick={(event) => {
              handleReaction(event.emoji);
            }}
          />
        </div>
      )}

      {/* Input Area */}
      <footer className="flex items-center p-4">
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
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="text-2xl text-white"
          />
        </button>
      </footer>
    </div>
  );
};

export default Chat;
