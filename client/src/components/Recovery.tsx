import "../css/Registration.css";
import BreadCrumb from './BreadCrumb';
import React, { useState, useEffect, ChangeEvent } from 'react';
import otp from "../assets/BreadCrumbs/OTP.png";
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import toast, { Toaster } from 'react-hot-toast';
const Recovery: React.FC = () => {
    const { username } = useAuthStore(state => state.auth);
    const [OTP, setOTP] = useState('');
    const navigate = useNavigate();
    const [countdownValue, setCountdownValue] = useState<number | null>(null);
    const setIsRecovery = useAuthStore(state => state.setIsRecovery);
    const [initialMount, setInitialMount] = useState(true);
    const startCountdown = () => {
        setCountdownValue(60);
        const interval = setInterval(() => {
            setCountdownValue((prevValue) => {
                if (prevValue && prevValue > 0) {
                    return prevValue - 1;
                } else {
                    clearInterval(interval);
                    return null;
                }
            });
        }, 1000);
    };
    const resendOTP = () => {
        const sentPromise: Promise<string> = generateOTP(username);
        toast.promise(
            sentPromise as Promise<string>, // Using Promise<string> as a fallback
            {
                loading: 'Sending...',
                success: <b>OTP has been sent to your email!</b>,
                error: <b>Could not Send it!</b>,
            }
        );
        sentPromise.then((response) => {
            if (typeof response === 'string') {
                // Handle the case when a string is received
                console.log(response);
            } else {
                // Handle other cases if needed
                //console.log(response);
            }
        });
    };
    const resendOTPAndStartCountdown = async () => {
        try {
            await resendOTP();
            startCountdown();
        } catch (error) {
        }
    };
    useEffect(() => {
        if (initialMount) {
            setInitialMount(false); // Set the flag to false after the initial mount
            return; // Prevent generating OTP on initial mount
        }
        generateOTP(username).then((OTP) => {
            // console.log(OTP)
            if (OTP) return toast.success('OTP has been sent to your email!');
            return toast.error('Problem while generating OTP!')
        })
    }, [username, initialMount]); // Use useEffect to update the countdown value in the DOM
    useEffect(() => {
        const resendOtpElement = document.getElementById('resendOtp');
        if (resendOtpElement) {
            resendOtpElement.textContent = countdownValue?.toString() || '';
        }
    }, [countdownValue]);
    interface FormSubmitEvent extends React.FormEvent<HTMLFormElement> {
        preventDefault(): void;
    }
    const onSubmit = async (e: FormSubmitEvent) => {
        e.preventDefault();
        try {
            const { status } = await verifyOTP({ username, code: OTP });
            if (status === 201) {
                toast.success('Verify Successfully!');   
                navigate('/reset');
                setIsRecovery(true);
                // Save to localStorage
                localStorage.setItem('isRecovery', 'true');
            }
        } catch (error) {
            toast.error('Wrong OTP! Check email again!');
        }
    };
    const handleOTPChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOTP(e.target.value);
    };
    return (
        <>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <BreadCrumb parentPageLink="/login" ParentPage="Login" pageName="Forgot Password" ChildPage="Forgot Password" imageUrl={otp} />
            <div className="container mt-5">
                <div className="row ">
                    <p className="text-center" style={{ fontSize: "x-large" }}>
                        Forgot Password
                    </p>
                    <p className="mt-2 mb-2 text-secondary text-center" style={{ fontSize: "medium" }}>
                        Check you inbox for OTP to recover password
                    </p>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 otpBody">
                        <form onSubmit={onSubmit}>
                            <input
                                name="password" // Add the name attribute
                                className="InputReg text-center"
                                type="text"
                                placeholder="Enter OTP"
                                onChange={handleOTPChange}
                            />
                            <br />
                            <p className="error  text-danger" id="nameError" style={{ opacity: 0 }}>
                                **  Error in case to write
                            </p>
                            <div className="d-flex justify-content-center">
                                <button className="standarButton-1 mt-3 mb-1" type="submit" style={{ minWidth: "100%" }}   >
                                    Verify OTP
                                </button>
                            </div>
                        </form>
                        <div className="row mt-2 mb-5 d-flex justify-content-center ">
                            <span className="text-secondary">Can't get OTP? {" "}
                                <b className="link-wrapper ">
                                    <span className="resendOtp ">{countdownValue !== null ? `${countdownValue}s` : ''}</span>
                                    <button
                                        className="LinkInput link hover-2 otpBtn"
                                        style={{ backgroundColor: "transparent" }}
                                        disabled={countdownValue !== null && countdownValue <= 60}
                                        onClick={resendOTPAndStartCountdown} // Using the combined function as onClick
                                    >
                                        Resend
                                    </button></b>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Recovery;
