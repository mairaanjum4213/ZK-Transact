import React, { useEffect, useState } from "react";
import axios from "axios";

interface Chat {
  _id:string;
  members: string[];
  // Add any other properties your chat object has
}

interface ConversationProps {
  data: Chat;
  currentUser: string;
  online: any;
}
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

const Conversation: React.FC<ConversationProps> = ({ data, currentUser, online}) => {
  const [userData, setUserData] = useState<any>(null);
  
console.log(data)
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    getUserData(userId);
  },[]);

  const getUserData = async (id: string | undefined) => {
    try {
      const result = await axios.get(`/api/getUserById/${id}`);
      setUserData(result);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  console.log("hi data",userData);

  return (
    <>
      <div className=" flex-row w-100  conversation chatCard">
        <img
          className="card-img-left example-card-img-responsive followerImage"
          src={`https://avatar.iran.liara.run/${userData?.data.gender === 'female' ? 'public/girl' : 'public/boy'}`}
          />
        <div className="card-body">
          <p
            className="card-title mt-2"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {userData?.data.fullName}
          </p>
          <p
            className="card-text"
            style={{  fontSize: "0.7rem" }}
          >
           <span className={online? 'clrgreen': 'clrred'}>{online? "Online" :"Offline"}</span>
          </p>
        </div>
      </div>
     <hr 
     className="
     mx-2" style={{ width: "95%", border: "0.1px solid #ececec" }} ></hr>
    </>
  );
};
export default Conversation;
