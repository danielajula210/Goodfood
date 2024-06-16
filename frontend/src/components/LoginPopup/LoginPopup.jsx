import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import VerificationPopup from '../VerificationPopup/VerificationPopup'; // Import the VerificationPopup component
import emailjs from 'emailjs-com';
const LoginPopup = ({ setShowLogin }) => {
    const { setToken, url, loadCartData, setUser } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Înregistrare");
    const [verificationCode, setVerificationCode] = useState('');
    const [showVerificationPopup, setShowVerificationPopup] = useState(false); // State to control the visibility of the verification popup

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const generateVerificationCode = () => {
        // Generate a random 6-digit verification code
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const sendVerificationEmail = async (email, code) => {
        // Your EmailJS configuration for sending verification email
        const emailTemplateId = "template_wq1n437";
        const emailData = {
            to_name: data.name, // Name of the recipient
            from_email: "radubtw30@gmail.com", // Your email address
            to_email: email, // User's email address
            subject: "Verification Code for Registration", // Subject of the email
            message: `Your verification code is: ${code}` // Body of the email
        };
        try {
            await emailjs.send('service_yphi4kj', emailTemplateId, emailData, '04ri01FzTdSAzQhgP');
            console.log("Verification email sent successfully.");
        } catch (error) {
            console.error("Error sending verification email:", error);
        }
        
    };

    const handleVerification = (enteredCode) => {
        if (enteredCode === verificationCode) {
            // If entered code matches the verification code, proceed with registration
            registerUser();
        } else {
            // If entered code does not match, show error message
            toast.error("Invalid verification code. Please try again.");
        }
    };

    const registerUser = async () => {
        let new_url = url;
        if (currState === "Autentificare") {
            new_url += "/api/user/login";
        } else {
            new_url += "/api/user/register";
        }
        const response = await axios.post(new_url, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            loadCartData({ token: response.data.token });
            setShowLogin(false);
            setUser({ email: data.email });
        } else {
            toast.error(response.data.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currState === "Înregistrare") {
            // Generate verification code and show verification popup
            const code = generateVerificationCode();
            setVerificationCode(code);
            console.log(code);
            sendVerificationEmail(data.email, code);
            setShowVerificationPopup(true);
        } else {
            registerUser();
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={handleSubmit} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2> <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Înregistrare" ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Nume' required /> : <></>}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Parola' required />
                </div>
                <button>{currState === "Autentificare" ? "Autentificare" : "Creare cont"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required/>
                    <p>Continuând, accept termenii și condițiile.</p>
                </div>
                {currState === "Autentificare"
                    ? <p>Creați un cont nou? <span onClick={() => setCurrState('Înregistrare')}>Click aici</span></p>
                    : <p>Aveți deja un cont? <span onClick={() => setCurrState('Autentificare')}>Autentificați-vă</span></p>
                }
            </form>
            {showVerificationPopup && <VerificationPopup onClose={() => setShowVerificationPopup(false)} onVerify={handleVerification} />}
        </div>
    );
};

export default LoginPopup;
