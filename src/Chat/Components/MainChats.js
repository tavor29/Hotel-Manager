import React, { useState } from "react";
import { ChatList, Avatar, Input } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import logo from "../../imgs/user.png";
import { useNavigate } from "react-router-dom";
import "../MainChats.css";

const MainMenu = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([
    {
      id: 1,
      avatar: logo,
      title: "Room Number 1",
      subtitle: "This is chat 1",
      date: new Date(),
      unread: 3,
    },
    {
      id: 2,
      avatar: logo,
      title: "Room Number 2",
      subtitle: "This is chat 2",
      date: new Date(),
      unread: 0,
    },
    {
      id: 3,
      avatar: logo,
      title: "Room Number 3",
      subtitle: "This is chat 3",
      date: new Date(),
      unread: 1,
    },
  ]);

  const [filteredChats, setFilteredChats] = useState(chats);

  const handleChatClick = (chatId) => {
    console.log("Clicked chat:", chatId);
    navigate(`/chat/${chatId}`);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    // Filter chats based on the search term
    const filteredChats = chats.filter(
      (chat) =>
        chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChats(filteredChats);
  };

  const handleSearchClear = () => {
    setFilteredChats(chats);
  };

  return (
    <div className="container">
      <div className="main-menu-container">
        <div className="main-menu-header">Main Menu</div>
        <div className="main-menu-search">
          <Input
            placeholder="Search chats..."
            onChange={handleSearchChange}
            onClear={handleSearchClear}
            leftIcon={{ type: "search" }}
          />
        </div>
        <div className="main-menu-content">
          <ChatList
            className="chat-list"
            dataSource={filteredChats.map((chat) => ({
              ...chat,
              avatar: <Avatar src={chat.avatar} alt="Avatar" />,
              date: chat.date.toLocaleString(),
              unread:
                chat.unread > 0 ? (
                  <span className="unread-badge">{chat.unread}</span>
                ) : null,

              to: `/chat/${chat.id}`, // Use 'to' instead of 'href' for navigation
            }))}
            itemProps={{
              avatarFlexible: true,
              avatarProps: { size: "medium", rounded: true },
            }}
          >
            {filteredChats.map((chat) => (
              <div
                className="chat-list-item"
                onClick={() => handleChatClick(chat.id)}
              >
                <Avatar src={chat.avatar} alt="Avatar" />
                <div className="chat-list-item-content">
                  <div className="chat-list-item-title">{chat.title}</div>
                  <div className="chat-list-item-subtitle">{chat.subtitle}</div>
                  {chat.unread > 0 && (
                    <span className="unread-badge">{chat.unread}</span>
                  )}
                </div>
              </div>
            ))}
          </ChatList>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
