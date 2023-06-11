import React, { useState, useRef, useEffect } from "react";
import { MessageList, Input } from "react-chat-elements";
import "../UserChatStyles.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messageListRef = useRef(null);
  const [inputKey, setInputKey] = useState(0);

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    console.log(newMessage.trim());
    if (newMessage.trim() !== "") {
      const message = {
        position: "right",
        type: "text",
        text: newMessage,
        date: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage(""); // Clear the new message state
      setInputKey((prevKey) => prevKey + 1); // Reset the input value by updating the key
    }
  };

  const handleReceiveMessage = () => {
    const receivedMessage = {
      position: "left",
      type: "text",
      text: "This is a fake message",
      date: new Date(),
    };
    setMessages([...messages, receivedMessage]);
  };

  return (
    <div className="container1">
      <div className="chat-page-container">
        <div className="chat-page-header">Chat Page</div>
        <div className="chat-page-content">
          <MessageList
            className="message-list"
            lockable={true}
            dataSource={messages}
            ref={messageListRef}
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
              <button
                key="receive-button"
                className="btn"
                onClick={handleReceiveMessage}
              >
                Receive fake Message
              </button>,
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
