import React, { useState } from 'react';

export default function kycForm() {
    const [fullName, setFullName] = useState('');
    const [nationality, setNationality] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [rejection, setRejection] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');

    return (
        <>
            <div className='p-5'>
                <h2>KYC Requests</h2>

                
                <div className="mx-auto flex w-full lg:w-6/12">
                    <div className="w-full my-8 p-4 bgLightGret bdr rounded-lg">
                        <div className="mb-4">

                            <h2>Full Name</h2>
                          
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Nationality:</label>
                            <input
                                required
                                type="text"
                                value={nationality}
                            
                                name="accNumber"
                                className="w-full borderStandard rounded-[0.3rem] bg-transparent py-[0.7rem] px-2 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Date of Birth:</label>
                            <input
                                type="text"
                                value={dateOfBirth}
                            
                                name="accComment"
                                className="w-full py-[0.7rem] borderStandard rounded-[0.3rem] bg-transparent px-2 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Gender:</label>
                            <input
                                type="text"
                                value={gender}
                               
                                name="accComment"
                                className="w-full py-[0.7rem] borderStandard rounded-[0.3rem] bg-transparent px-2 focus:outline-none"
                            />
                        </div>
                        <a href="#" className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-right">
                            View Identity
                        </a>
                        <div className='flex gap-2 my-2'>
                            <button
                                type="submit"
                                // onClick={handleAddAccount}
                                className="simpleButton1"
                            >
                                Approve
                            </button>
                            <button
                                type="submit"
                                onClick={() => setRejection(true)} // Fixed the function call
                                className="simpleButton2 px-3"
                            >
                                Reject
                            </button>
                        </div>
                        {/* Show textarea only if rejection state is true */}
                        {rejection && (
                            <textarea

                                placeholder='Enter Reason For Rejection '
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                className='w-full py-[0.7rem] borderStandard rounded-[0.3rem] bg-transparent my-2 px-2 focus:outline-none'
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
