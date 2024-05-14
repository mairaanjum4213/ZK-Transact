
import { Link } from 'react-router-dom';
import { IoChatboxEllipses } from "react-icons/io5";
const NavChats: React.FC = () => {
  return (
    <>
      <Link to="chats" className="btn-group mx-1 ">
        <button
          type="button"
          className="btn chatIcon rounded-circle p-2 "
        >
            <span
            className="position-absolute top-1 left-7 translate-middle p-1 bg-danger border border-light rounded-circle"
            style={{ opacity: 1 }}
          >
            <span className="visually-hidden">New alerts</span>
          </span>
          <IoChatboxEllipses />
        </button>
      </Link>
    </>
  );
};
// 
export default NavChats;
