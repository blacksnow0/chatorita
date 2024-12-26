import React from "react";
import Chat from "../components/Chat";

const ChatPage = () => {
  const chatId = "this-is-a-chat-id";
  const userId = "himanshu-user-id";

  return (
    <div style={{ height: "100vh", padding: "16px" }}>
      <Chat chatId={chatId} userId={userId} />
    </div>
  );
};

export default ChatPage;
