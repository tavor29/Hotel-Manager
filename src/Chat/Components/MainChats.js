import React, { useEffect, useState } from "react";
import { ChatList, Avatar, Input } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import logo from "../../imgs/user.png";
import { useNavigate } from "react-router-dom";
import "../MainChats.css";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase-config";

const MainMenu = () => {
  const navigate = useNavigate();

  const chatsRef = collection(db, "chats");

  const [chatsMap, setChatsMap] = useState(new Map());
  const [filteredChats, setFilteredChats] = useState(new Map());
  const [inputKey, setInputKey] = useState(0);

  const handleChatClick = (chatId) => {
    console.log("Clicked chat:", chatId);
    const messages = chatsMap.get(chatId);
    const usersEmail = messages.find(
      (obj) => obj.email != "serviso4u@gmail.com"
    )?.email;
    navigate(`/chat/${chatId}`, {
      state: { messages, room: chatId, userEmail: usersEmail },
    });
  };

  useEffect(() => {
    // Initialize the filtered chats with all chat rooms initially
    setFilteredChats(chatsMap);
  }, [chatsMap]);

  useEffect(() => {
    // Fetch all messages from Firestore
    const unsubscribe = onSnapshot(
      query(chatsRef, orderBy("createdAt")),
      (snapshot) => {
        const chatMap = new Map(); // Initialize a new map
        snapshot.forEach((doc) => {
          const messageData = doc.data();
          const message = {
            id: doc.id,
            createdAt: messageData.createdAt,
            email: messageData.email,
            name: messageData.name,
            room: messageData.room,
            text: messageData.text,
            translatedText: messageData.translatedText,
            user: { _id: messageData.user._id },
          };

          if (!chatMap.has(message.room)) {
            chatMap.set(message.room, []);
          }
          chatMap.get(message.room).push(message);
        });

        // Update the state with the chatMap
        setChatsMap(chatMap);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm === "") {
      // If the search term is empty, show all chat rooms without filtering
      setFilteredChats(chatsMap);
    } else {
      // Filter the chat rooms based on the search term
      const filteredMap = new Map(
        Array.from(chatsMap).filter(([room]) =>
          room.toString().includes(searchTerm)
        )
      );
      setFilteredChats(filteredMap);
    }
  };

  const handleSearchClear = () => {
    // Clear search results and use the original messages from the map
    const flatMessages = Array.from(chatsMap.values()).flat();
    setFilteredChats(flatMessages);
    setInputKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="container">
      <div className="main-menu-container">
        <h1>Chats</h1>
        <div className="main-menu-header"></div>
        <div className="chat-row">
          <div>
            <Input
              placeholder="Search for a chat by room number"
              onChange={handleSearchChange}
              onClear={handleSearchChange}
              leftIcon={{ type: "search" }}
              key={inputKey}
            />
          </div>
          <div>
            {Array.from(filteredChats.keys()).map((room) => {
              const messagesForRoom = filteredChats.get(room);

              const isThereUsersMessage = messagesForRoom.find(
                (obj) => obj.email != "serviso4u@gmail.com"
              );
              if (!isThereUsersMessage) return <></>;

              const lastMessage = messagesForRoom[messagesForRoom.length - 1];
              const title = `Room ${room}`;
              const subtitle =
                lastMessage?.email === "serviso4u@gmail.com"
                  ? "Me: " +
                    lastMessage?.text.slice(0, 30) +
                    (lastMessage?.text.length > 30 ? "..." : "")
                  : lastMessage.name +
                    ": " +
                    lastMessage?.translatedText.slice(0, 30) +
                    (lastMessage?.translatedText.length > 30 ? "..." : "");
              const date = lastMessage?.createdAt?.toLocaleString();

              return (
                <div
                  className="chat-list-item"
                  onClick={() => handleChatClick(room)}
                  key={room}
                >
                  <ChatList
                    dataSource={[
                      {
                        avatar: logo,
                        title,
                        subtitle,
                        date,
                        to: `/chat/${room}`,
                      },
                    ]}
                    itemProps={{
                      avatarFlexible: true,
                      avatarProps: { size: "medium", rounded: true },
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
