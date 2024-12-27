import React from "react";
import Chat from "../components/Chat";
import { useAuthContext } from "../hooks/useAuthContext";

const ChatPage = () => {
  const { user } = useAuthContext();
  const chatId = "this-is-a-chat-id";
  const userId = user?.username;

  return (
    <div style={{ height: "100vh", padding: "16px" }}>
      <Chat chatId={chatId} userId={userId} />
    </div>
  );
};

export default ChatPage;
