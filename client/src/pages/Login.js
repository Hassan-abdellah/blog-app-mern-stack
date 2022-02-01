import React, { useState, useRef, useEffect } from 'react';
import Facebook from './facebook.png';
import Google from './google.png';
import Github from './github.png';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(true);
    const [toggle, setToggle] = useState(false);
    const passwordRef = useRef();
    const changeHandle = (e) => {
        if(e.target.value.length > 0){
            e.target.classList.add('valid');
        }else{
            e.target.classList.remove('valid');
        }
        if(e.target.id === 'username'){
            setUsername(e.target.value);
        }
        if(e.target.id === 'password'){
            setPassword(e.target.value);
            if(e.target.value.length > 0) {
                setToggle(true);
            }else{
                setToggle(false)
            }
        }

    }

    const togglePassword = () => {
        if(passwordRef.current.type === 'password'){
            passwordRef.current.type = 'text';
            setShow(false);
        }
        else if(passwordRef.current.type === 'text'){
            passwordRef.current.type = 'password';
            setShow(true);
        }
    }

    const googleSignIn = () => {
        window.open('http://localhost:5000/auth/google','_self')
    }

    useEffect(() => {
        document.title = 'Blog APP | Login';
    },[]);
    return (
        <div className="login">
            <div className="wrapper">
                <div className="left">
                    <div className="social-button google" onClick={googleSignIn}>
                        <img src={Google} alt="google-icon" className="social-icon"  />
                        Google
                    </div>
                    <div className="social-button facebook">
                        <img src={Facebook} alt="facebook-icon" className="social-icon" />
                        Facebook
                    </div>
                    <div className="social-button github">
                        <img src={Github} alt="github-icon" className="social-icon" />
                        Github
                    </div>
                </div>
                <div className="center">
                    <div className="line"/>
                    <div className="or">OR</div>
                </div>
                <div className="right">
                    <form>
                        <div className="input-container">
                            <input type="text" id="username" onChange={e => changeHandle(e)}/>
                            <label htmlFor="username">
                                <span>Username,phone or email</span>    
                            </label>
                        </div>
                        <div className="input-container">
                            <input type="password" id="password" ref={passwordRef} onChange={e => changeHandle(e)}/>
                            <label htmlFor="password">
                                <span>Password</span>    
                            </label>
                            {toggle && 
                                <span className="toggle-password" onClick={togglePassword}>
                                    {show ? 'Show' : 'Hide'}
                                </span>
                            }
                            
                        </div>
                        <button className="btn">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
