import { useState, useEffect } from "react";
import { BsStars } from "react-icons/bs";
import "../chat/chatCss/ChatBox.css";
import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import BreadCrumb from "../BreadCrumb";
import ChatBreadCrumb from "../../assets/BreadCrumbs/chatBread.png";
import toast, { Toaster } from "react-hot-toast";
import { getUser } from "../../helper/helper";
const ChatBotFrontend: React.FC = () => {
  const token = localStorage.getItem("token");
  const decodedToken: any = token ? jwtDecode(token) : {};
  const username = decodedToken.username || "";
  const [userData, setUserData] = useState<any>("");
  const [query, setQuery] = useState("");
  const [responseAI, setresponseAI] = useState<any>("");
  const [userInput, setUserInput] = useState<any>("");
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
  const handleSend = async () => {
    if (!query.trim()) {
      toast.error("Input field can't be empty");
    }
    const data = {
      input: query,
      session: username,
    };
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:8000/chat",
        data
      );
      if (response.data !== null) {
        setresponseAI(response.data);
        setUserInput(query);
        setQuery("");
      } else {
        setresponseAI("Chatbot is not currently available");
        setUserInput(query);
        setQuery("");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <>
      <BreadCrumb parentPageLink='/chats' ParentPage="Chats" pageName="Zeeku" ChildPage="AI Chatbot" imageUrl={ChatBreadCrumb} />
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="chatAi-container  container px-11">
        {/* Header content */}
        <div className="chat-sender px-3">
          <input
            className="px-2 text-xl"
            type="text"
            placeholder="Write your query here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="send-button button mt-1 mx-2">
            <BsStars
              className="iconSend hover:text-teal-600  transition-all duration-700"
              style={{ fontSize: "x-large" }}
              onClick={handleSend}
            />
          </div>
        </div>
        <div className="chat-body chatBg min-[150px]  mt-2 overflow-auto ">
          <div className="my-3 message own">
            <span id="userInput">{userInput}</span>
          </div>
          <div className="my-3 message">
            <span>{responseAI}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatBotFrontend;
