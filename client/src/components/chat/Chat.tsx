import LogoSearch from "./LogoSearch";
import { useEffect, useRef, useState } from "react";
import "./chatCss/Chats.css";
import ChatBox from "./ChatBox.tsx";
import Conversation from "./Conversation.tsx";
import { jwtDecode } from "jwt-decode";
import { getUser, userChats } from "../../helper/helper";
import toast, { Toaster } from "react-hot-toast";
import { io, Socket } from "socket.io-client";

interface Chat {
  _id: string;
  members: string[];
  // Add any other properties your chat object has
}

interface MessageData {
  senderId: string;
  text: string;
  chatId:string;
  receiverId:string;
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

   // Connect to Socket.io
   useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", userData._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      console.log(onlineUsers);
    });
  }, [userData]);

 
  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket?.current?.emit("send-message", sendMessage);}
  }, [sendMessage]);

 // Get the message from socket server
 useEffect(() => {
  socket?.current?.on("recieve-message", (data) => {
    setReceivedMessage(data);
  });
  }, []);


  const checkOnlineStatus = (chat: any): boolean => {
    const chatMember = chat.members.find((member: string) => member !== userData._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
};

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="mb-5">
        <LogoSearch />

        <div className="Chat">
          <div className="Left-side-chat">
            <div className="Chat-container">
              <h2 className="fs-4" style={{ letterSpacing: "2px" }}>
                Chats
              </h2>

              <div className="Chat-list">
                {chats.map((chat, index) => (
                  <div key={index} onClick={() => setCurrentChat(chat)}>
                    <Conversation data={chat} currentUser={userData._id} online={checkOnlineStatus(chat)} />
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
