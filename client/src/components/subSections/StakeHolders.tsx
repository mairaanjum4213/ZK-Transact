import React, { useState } from 'react';
import "../../css/StakeHolders.css"
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaShareAlt } from "react-icons/fa";
import Maira from "../../assets/Maira.jpg"
import Faheem from "../../assets/Faheem.png"
import Mentor from "../../assets/Shan Alam.jpg"
import Supervisor from "../../assets/Dr Imran.png"


const StakeHolders: React.FC = () => {
    return (
        <>
            <div className="container text-center mt-5 mb-5">
                <h1 style={{ fontSize: "x-large", fontWeight: "bold" }}>
                    Project Stake Holders
                </h1>
                <h1 className='mt-2 mb-4'>
                    Meet Our Team
                </h1>
                <div className="row">
                    <div  className="col-xl-3 col-lg-4 col-md-6">
                        <div className="team-card">
                            <div className="team-member-img">
                                <img src={Supervisor} alt="Image" />
                                <div className="member-social px-2 py-2 " >
                                    <FaShareAlt className="text-white " />
                                    <ul className="social-profile list-style  style1">
                                        <li >
                                            <a className='centerIcon text-white' target="_blank" href="https://facebook.com">
                                                <FaFacebookF />
                                            </a>
                                        </li>
                                        <li>
                                            <a className='centerIcon  text-white' target="_blank" href="https://twitter.com">
                                                <BsTwitterX />
                                            </a>
                                        </li>
                                        <li>
                                            <a className='centerIcon text-white' target="_blank" href="https://linkedin.com">
                                                <FaLinkedinIn />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="team-member-imfo">
                                <h3 className='text-black fw-bold'>Dr. Muhammad Imran</h3>
                                <span>Head Of Operations</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="team-card">
                            <div className="team-member-img">
                                <img src={Mentor} alt="Image" />
                                <div className="member-social px-2 py-2">
                                    <FaShareAlt className="text-white" />
                                    <ul className="social-profile list-style style1">
                                        <li>
                                            <a className='centerIcon text-white' target="_blank" href="https://facebook.com">
                                                <FaFacebookF />
                                            </a>
                                        </li>
                                        <li> 
                                            <a className='centerIcon text-white' target="_blank" href="https://twitter.com">
                                                <BsTwitterX />
                                            </a>
                                        </li>
                                        <li>
                                            <a className='centerIcon text-white' target="_blank" href="https://linkedin.com">
                                                <FaLinkedinIn />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="team-member-imfo">
                                <h3 className='text-black fw-bold'>Mr. Shan Alam</h3>
                                <span>Project Mentor</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="team-card">
                            <div className="team-member-img">
                                <img src={Maira} alt="Image" />
                                <div className="member-social px-2 py-2 ">
                                    <FaShareAlt className="text-white" />
                                    <ul className="social-profile list-style style1">
                                        <li >
                                            <a className='centerIcon text-white' target="_blank" href="https://facebook.com">
                                                <FaFacebookF />
                                            </a>
                                        </li>
                                        <li>
                                            <a className='centerIcon text-white' target="_blank" href="https://twitter.com">
                                                <BsTwitterX />
                                            </a>
                                        </li>
                                        <li>
                                            <a  className='centerIcon text-white' target="_blank" href="https://linkedin.com">
                                                <FaLinkedinIn />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="team-member-imfo">
                                <h3 className='text-black fw-bold' >Maira Anjum</h3>
                                <span>Developer</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="team-card">
                            <div className="team-member-img">
                                <img src={Faheem} alt="Image" />
                                <div className="member-social px-2 py-2 ">
                                    <FaShareAlt className="text-white" />
                                    <ul className="social-profile list-style style1">
                                        <li>
                                            <a className='centerIcon text-white'  target="_blank" href="https://facebook.com">
                                                <FaFacebookF />
                                            </a>
                                        </li>
                                        <li>
                                            <a  className='centerIcon text-white' target="_blank" href="https://twitter.com">
                                                <BsTwitterX />
                                            </a>
                                        </li>
                                        <li >
                                            <a className='centerIcon text-white'  target="_blank" href="https://linkedin.com">
                                                <FaLinkedinIn />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="team-member-imfo">
                                <h3 className='text-black fw-bold' >Faheem Siddiqi </h3>
                                <span>Developer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default StakeHolders;
