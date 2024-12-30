import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// Function to send a message
export const sendMessage = async (chatId, message, senderId) => {
  try {
    const messagesRef = collection(db, "chats", chatId, "messages");
    console.log(messagesRef);
    await addDoc(messagesRef, {
      text: message,
      senderId,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

// Function to listen for real-time updates
export const listenForMessages = (chatId, callback) => {
  const messagesRef = collection(db, "chats", chatId, "messages");
  const q = query(messagesRef, orderBy("timestamp", "asc"));

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(messages); // Pass messages to callback
  });
};

export const addReaction = async (chatId, messageId, senderId, reaction) => {
  try {
    const messageRef = doc(db, `chats/${chatId}/messages`, messageId);

    await updateDoc(messageRef, {
      [`reactions.${senderId}`]: reaction, // Update or add the user's reaction
    });
  } catch (error) {
    console.error("Error adding reaction:", error);
  }
};
