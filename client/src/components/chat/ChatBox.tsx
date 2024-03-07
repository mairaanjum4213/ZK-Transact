import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useRef,
  useState,
} from "react";
import InputEmoji from "react-input-emoji";
import { BsFillSendFill } from "react-icons/bs";
import "./chatCss/ChatBox.css";
import axios from "axios";
import { addMessage, getMessages } from "../../helper/helper";
import toast, { Toaster } from "react-hot-toast";
import { format } from "timeago.js";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

interface Chat {
  _id: string;
  members: string[];
}

interface ChatBoxProps {
  chat: Chat | null;
  currentUser: string;
  setSendMessage: any;
  receiveMessage: any;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  chat,
  currentUser,
  setSendMessage,
  receiveMessage,
}) => {

  const [userData, setUserData] = useState<any>(null);

  const [messages, setMessages] = useState<any[]>([]);

  const [newMessage, setNewMessage] = useState<any>(" ");

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    if (chat !== null) {  
      getUserData(userId);
    }
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!chat) return;
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        toast.error("Error fetching Messages");
      }
    };
    if(chat !== null) {
      fetchMessages();
    } 
  }, [chat]);

 

  const getUserData = async (id:any) => {
    try {
      const result = await axios.get(`/api/getUserById/${id}`);
      setUserData(result);
    } catch (error) {
      console.error("Error fetching User Data:", error);
    }
  };

  const handleChange = (newMessage: any) => {
    setNewMessage(newMessage);
  };

// Always scroll to last Message
useEffect(() => {
  scroll.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

const scroll = useRef<HTMLDivElement>(null);

  // Send Message
const handleSend = async (e: React.FormEvent) => {
  e.preventDefault();
  const message = {
    senderId: currentUser,
    text: newMessage,
    chatId: chat?._id,
  };
  
  const receiverId = chat?.members?.find((id: string) => id !== currentUser);
  //send message to socket server
  setSendMessage({ ...message, receiverId });
  // send message to database
  try {
    const { data } = await addMessage(message);
    setMessages([...messages, data]);
    setNewMessage("");
  } catch {
    console.log("error");
  }
};

 // Receive Message from parent component
 useEffect(() => {
  if (receiveMessage !== null && receiveMessage.chatId === chat?._id) {
    setMessages([...messages, receiveMessage]);
  }
}, [receiveMessage]);

const imageRef = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="ChatBox-container  ">
        {chat ? (
          <>
            <div className="chat-header ">
              <div className="follower">
                <div className="mx-3 mt-2">
                  <img
                    alt="Profile"
                    className="followerImage mt-2"
                    src="
    https://avatar.iran.liara.run/public/job/police/female"
                  />
                  <div className="name mt-4">
                    <h3>{userData?.data.fullName}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="chat-body">
              {messages &&
                messages.map(
                  (message: {
                    _id: Key | null | undefined;
                    senderId: string;
                    text:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | null
                      | undefined;
                    createdAt:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | null
                      | undefined;
                  }) => (
                    <div
                      ref={scroll}
                      key={message?._id}
                      className={
                        message?.senderId === currentUser
                          ? "message own"
                          : "message"
                      }
                    >
                      <span>{message?.text}</span>{" "}
                      <span>{format(message?.createdAt)}</span>
                    </div>
                  )
                )}
            </div>

            {/* chat-sender */}
            <div className="chat-sender  px-3 ">
              <div onClick={() => imageRef.current?.click()}>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button  mt-4 ">
                <BsFillSendFill
                  onClick={handleSend}
                  className="iconSend"
                  style={{ fontSize: "x-large", display: "block" }}
                />
              </div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>{" "}
            <div className="container"></div>
          </>
        ) : (
          <div className="chatbox-empty-message">
            <p className="chatbox-empty-message-text">
              Tap on a chat to start conversation...
            </p>
          </div>
        )}
      </div>
    </>
  );
};
export default ChatBox;
