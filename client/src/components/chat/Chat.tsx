

import LogoSearch from "./LogoSearch";
import "./chatCss/Chats.css"
import ChatBox from "./ChatBox.tsx"
const Chat: React.FC = () => {
    return (
        <>

            <div className="Chat">
                <div className="Left-side-chat">
                    <LogoSearch />
                    <div className="Chat-container">
                        <h2>Chats</h2>






                        {/* <div className="Chat-list">
            {chats.map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div> */}
                    </div>
                </div>

                {/* Right Side */}

                <div className="Right-side-chat">
                  
                 
<ChatBox/>
                    {/* <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        /> */}
                </div>
            </div>

        </>
    );
};
export default Chat;

