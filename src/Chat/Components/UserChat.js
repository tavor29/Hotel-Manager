import React, { useState, useRef, useEffect } from "react";
import { MessageList, Input } from "react-chat-elements";
import "../UserChatStyles.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  where,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase-config";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messageListRef = useRef(null);
  const [inputKey, setInputKey] = useState(0);
  const [room, setRoom] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const receivedFrom = "serviso4u@gmail.com"; // Replace this with the email of the user receiving messages

  useEffect(() => {
    setMessages(location.state?.messages || []);
    setRoom(location.state?.room || null);
    setUserEmail(location.state?.userEmail || null);
  }, [location.state?.messages]);

  const chatsRef = collection(db, "chats");

  useEffect(() => {
    if (!room) return;

    const queryMessages = query(
      chatsRef,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), _id: doc.id });
      });
      setMessages(messages);
    });

    return () => {
      unsuscribe();
    };
  }, [room]);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const GetTranslatedMessage = async () => {
    try {
      const response = await fetch(
        "http://proj.ruppin.ac.il/cgroup97/test2/api/translateMessage",
        {
          method: "POST",
          body: JSON.stringify({
            email: userEmail,
            message: newMessage,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (response.ok) {
        const responseString = await response.text();
        return responseString.substring(1, responseString.length - 1);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const handleSendMessage = async () => {
    newMessage.trim();
    if (newMessage.trim() !== "") {
      const translatedMessage = await GetTranslatedMessage();

      if (translatedMessage) {
        await addDoc(chatsRef, {
          createdAt: new Date().toISOString(),
          text: newMessage,
          translatedText: translatedMessage,
          email: "serviso4u@gmail.com",
          name: "Reception",
          room: room,
          user: {
            _id: "serviso4u@gmail.com",
            name: "Reception",
            avatar:
              "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww&w=1000&q=80",
          },
        });
        setNewMessage("");
        setInputKey((prevKey) => prevKey + 1);
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="container">
      <div className="chat-page-container">
        <div
          className="chat-page-header"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div style={{ flex: 1 }}>
            <button className="btn" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <label style={{ fontSize: 22 }}>
              Chat with Room {messages.map((obj) => obj.room)[0]}
            </label>
          </div>
          <div style={{ flex: 1 }}></div> {/* Empty div to create space */}
        </div>
        <div className="chat-page-content">
          <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={messages.map((message) => ({
              ...message,
              type: "text",
              text:
                message.email === receivedFrom
                  ? message.text
                  : message.translatedText,
              position: message.email === receivedFrom ? "right" : "left",
              title: message.email === receivedFrom ? "Me" : message.name,
              date: message.createdAt,
            }))}
            ref={messageListRef}
            messageBoxStyles={{ maxWidth: 400 }}
          />
        </div>
        <div className="chat-page-input">
          <Input
            placeholder="Type your message..."
            multiline={true}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
            value={newMessage}
            key={inputKey} // Reset the input value by updating the key
            rightButtons={[
              <button
                key="send-button"
                className="btn"
                onClick={handleSendMessage}
              >
                Send
              </button>,
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
