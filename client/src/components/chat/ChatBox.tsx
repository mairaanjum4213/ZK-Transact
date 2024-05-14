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
import { Link } from "react-router-dom";
import InputEmoji from "react-input-emoji";
import { MdOutlinePermMedia } from "react-icons/md";
import { RiSendPlane2Line } from "react-icons/ri";
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
    if (chat !== null) {
      fetchMessages();
    }
  }, [chat]);
  const getUserData = async (id: any) => {
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
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]; // Access the selected file from the file input
    if (selectedFile && selectedFile.type === 'image/png') {
      setFile(selectedFile);
    } else {
      toast.error('Please select a PNG file.'); // Inform the user if the selected file is not a PNG file
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="ChatBox-container  ">
        {chat ? (
          <>
            <div className="chat-header bgHeader  "
        
            >
              <div className="follower">
                <div className="px-2  mt-2">
                  <img alt="Profile"
                    className="followerImage mt-2   bg-primaryColor p-[2px]"
                    src={`https://avatar.iran.liara.run/${userData?.data.gender === 'female' ? 'public/girl' : 'public/boy'}`}
                  />
                  <div className="my-auto ">
                    <h3 className="text-xl pt-1" >{userData?.data.fullName}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="chat-body ">
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
                    imageUrl: any;
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
            <div className="chat-sender  px-3">
              <div onClick={() => imageRef.current?.click()}>
                <MdOutlinePermMedia className="text-xl" />
              </div>
              {file && <p> {file.name}</p>}
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="cursor-pointer  button  mt-3 ">
                <RiSendPlane2Line
                  onClick={handleSend}
                  className="iconSend text-teal-700  duration-300"
                  style={{ fontSize: "x-large", display: "block" }}
                />
              </div>
              <input
                type="file"
                name="imageUrl"
                id="imageUrl"
                style={{ display: "none" }}
                ref={imageRef}
                onChange={handleFileChange}
              />
            </div>{" "}
            <div className="container"></div>
          </>
        ) : (
          <>
            <div className="flex flex-col mt-[15%]">
              <span className=" font-extrabold inset-0 text-[4rem]  w-full h-fit text-center" style={{
                backgroundImage: `linear-gradient(45deg, #FF3BFF, #FF3BFF, #5C24FF, #D94FD5)`,
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                Use Our AI Chat Bot
              </span>
              <Link to="/bot" className=" w-full h-fit text-center  text-2xl    font-normal  tracking-wide ">
                <span className="border-b border-transparent hover:border-b hover:border-gray-700 duration-700"> Chat Now</span>
              </Link>
              <span className=" w-full h-fit text-center mt-5  font-normal text-lg tracking-wide">
                Tap on a chat to start conversation...
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default ChatBox;
