import { useEffect, useRef, useState } from "react";
import "./chatCss/Chats.css";
import ChatBox from "./ChatBox.tsx";
import Conversation from "./Conversation.tsx";
import { jwtDecode } from "jwt-decode";
import {
  createChat,
  getAllUsers,
  getUser,
  userChats,
} from "../../helper/helper";
import toast, { Toaster } from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import "./chatCss/LogoSearch.css";

interface Chat {
  _id: string;
  members: string[];
  // Add any other properties your chat object has
}

const Chat: React.FC = () => {
  const token = localStorage.getItem("token");
  const decodedToken: any = token ? jwtDecode(token) : {};
  const username = decodedToken.username || "";
  const socket = useRef<Socket | null>(null);

  const [userData, setUserData] = useState<any>("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [sendMessage, setSendMessage] = useState<any>(null);
  const [receivedMessage, setReceivedMessage] = useState<any>(null);

  // -----User Data
  useEffect(() => {
    // Fetching User Data for Id
    async function fetchUserData() {
      try {
        const response = await getUser({ username });
        if (response.data) {
          setUserData(response.data);
          // To Access Id or other data of user from db just use userData._id
        }
      } catch (error) {
        toast.error("Error fetching user data");
      }
    }
    fetchUserData();
  }, [username]);

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(userData._id);
        setChats(data);
      } catch (error) {
        toast.error("Error fetching chats");
      }
    };
    getChats();
  }, [userData]);

  const [allUsers, setAllUsers] = useState<any>();
  useEffect(() => {
    // Fetch all users when component mounts
    const fetchAllUsers = async () => {
      try {
        const response = await getAllUsers();
        if (response) {
          setAllUsers(response);
        }
      } catch (error) {
        console.error("Error fetching all users:", error);
        // Optionally, show an error message to the user
        toast.error("Error fetching all users");
      }
    };

    fetchAllUsers();
  }, []);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", userData._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [userData]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket?.current?.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket?.current?.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat: any): boolean => {
    const chatMember = chat.members.find(
      (member: string) => member !== userData._id
    );
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  const [searchUsername, setSearchUsername] = useState<any>("");

  const handleSearch = async () => {
    try {
      const trimmedUsername = searchUsername.trim();
      if (!trimmedUsername) {
        toast.error("Please enter a valid username");
        return;
      }
      // Find the user with the searched username from the list of all users
      const user = allUsers.find(
        (user: any) => user.username === trimmedUsername
      );
      if (user) {
        // Create a chat with the user's ID as the receiver ID

        
        const response = await createChat({
          senderId: userData._id,
          receiverId: user._id,
        });
        const newChat = response.data;
        setChats([...chats, newChat])
        setSearchUsername("");
        toast.success("Chat created successfully");
      } else {
        toast.error("User not found");
      }
    } catch (error) {
      console.error("Error creating chat:", error);
      toast.error("Error creating chat");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="mb-5">
        <div className="LogoSearch  px-4 py-4">
          <div className="Search">
            <input
              type="text"
              placeholder="User Name"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
            />
            <div className="simpleButton1 p-1" onClick={handleSearch}>
              Search
            </div>
          </div>
        </div>

        <div className="Chat">
          <div className="Left-side-chat">
            <div className="Chat-container">
              <h2 className="fs-4" style={{ letterSpacing: "2px" }}>
                Chats
              </h2>

              <div className="Chat-list">
                {chats.map((chat, index) => (
                  <div key={index} onClick={() => setCurrentChat(chat)}>
                    <Conversation
                      data={chat}
                      currentUser={userData._id}
                      online={checkOnlineStatus(chat)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}

          <div className="Right-side-chat  ">
            <ChatBox
              chat={currentChat}
              currentUser={userData?._id}
              setSendMessage={setSendMessage}
              receiveMessage={receivedMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;
