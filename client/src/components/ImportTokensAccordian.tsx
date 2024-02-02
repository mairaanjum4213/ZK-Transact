import React, { useState } from 'react';
import InstructionModal from "./subSections/ImportingTokensModal.tsx"
import "../css/ImportTokens.css";
import { MdOutlinePlaylistRemove } from 'react-icons/md';
interface ImportTokens {
    text: string;
}
const ImportTokensAccordian: React.FC<ImportTokens> = (props) => {
    const [isVisible, setIsVisible] = useState(true);
    const handleHideClick = () => {
        setIsVisible(false);
    };
    return (
        <>
            {isVisible && (
                <div className="row mx-1 mt-5 bg">
                    <div className="alert alert-warning alert-dark fade show" role="alert">
                        {props.text}
                        <InstructionModal/>
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
export default ImportTokensAccordian;
