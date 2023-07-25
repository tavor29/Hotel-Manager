import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar.js";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchMessages();
    fetchUsers();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        "https://proj.ruppin.ac.il/cgroup97/prod/api/GetMessages"
      );
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://proj.ruppin.ac.il/cgroup97/prod/api/GetUsers"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
      };

      try {
        const response = await fetch("YOUR_API_ENDPOINT", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        });

        if (response.ok) {
          setMessages([...messages, newMessage]);
          setInputText("");
        } else {
          console.log("Error sending message:", response.status);
        }
      } catch (error) {
        console.log("Error sending message:", error);
      }
    }
  };

  return (
    <div className="chat-container">
      <Sidebar users={users} />
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className="message">
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
