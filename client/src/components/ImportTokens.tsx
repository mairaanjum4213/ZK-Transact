import React, { useState } from 'react';

import "../css/ImportTokens.css";
import { MdOutlinePlaylistRemove } from 'react-icons/md';
interface ImportTokens {
    text: string;
}
const ImportTokens: React.FC<ImportTokens> = (props) => {
    const [isVisible, setIsVisible] = useState(true);
    const handleHideClick = () => {
        setIsVisible(false);
    };
    return (
        <>  
            {isVisible && (
                <div className="row mx-1">
                    <div className="alert alert-warning alert-dark fade show" role="alert">
                        {props.text}
                        <button
                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                            className="mx-2 textBtn">
                            <p >learn More</p>
                        </button>
                        <button
                            className="float-end d-flex justify-content-center align-items-center"
                            onClick={handleHideClick}
                        >
                            <span>
                                <MdOutlinePlaylistRemove style={{ fontSize: '25px' }} />
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
export default ImportTokens;
