import { FaRegBell } from "react-icons/fa6";
const Notice: React.FC = () => {
    return (
        <>
            <div className="d-flex justify-center align-items-center my-[25%]">
                <span className=" flex gap-2  justify-center align-items-center font-extrabold inset-0 text-xl  w-full h-fit text-center" style={{
                    backgroundImage: `linear-gradient(45deg, #FF3BFF, #FF3BFF, #5C24FF, #D94FD5)`,
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                }}>
               <FaRegBell className="text-gray-500"/> <p> Select the Notification To Access Data </p>
                </span>
            </div>
        </>
    );
};
export default Notice;
