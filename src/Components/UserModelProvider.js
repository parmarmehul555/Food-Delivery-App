import { useContext, } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import '../index.css';
import { useState } from "react";

export default function UserModelProvider(props) {
    const { user, setUser } = useContext(userContext);
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const [emailValid, setEmailValid] = useState(false);
    const [passValid, setPassValid] = useState(false);

    function login() {
        fetch('http://localhost:3030/food/auth/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    console.log("Some errror occured!!");
                    throw new Error("login faild");
                }
            })
            .then(async (res) => {
                const token = await res.token;
                localStorage.setItem("auth-token", token);
                localStorage.getItem("auth-token") ? navigate('/user') : navigate('/food/auth/signup');
            })
            .catch((error) => {
                console.error("Error during login:", error);
            });
        setToken(localStorage.getItem("auth-token"))
    }

    function signup() {
        fetch('http://localhost:3030/food/auth/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    console.log("Some errror occured!!");
                    throw new Error("signup faild!!");
                }
            })
            .then((res) => {
                navigate('/food/auth/login');
            })
            .catch((error) => {
                console.error("Error during signup:", error);
            });
    }

    const sendModel = () => {
        if (props.isLogin) {
            login();
        }
        else {
            signup();
        }
    }

    return (
        <>
            <div id="img">
                <img src="https://www.svapinfotech.com/data/media/orginal/food-delivery-2-5459.jpg" alt="img" />
                {
                    props.isLogin ?
                        <>
                            <div className='login' id='login'>
                                <h2>Log in</h2>
                                <p id="wrongInputMsg">Invalid email or password</p>
                                <i class="fa-solid fa-envelope" style={{ color: "white" }} ></i>
                                <input type="text" id="email" className='ip' style={{ marginBottom: "5vh" }} placeholder="email" onChange={(e) => {
                                    const pattern = "^[A-Za-z]+[0-9]+@+gmail+[\.]+com"
                                    const emailvalue = document.getElementById('email').value;
                                    const icon = document.getElementById('icon');
                                    const regEx = new RegExp(pattern);
                                    if (!regEx.test(emailvalue)) {
                                        icon.style.color = "red";
                                        setEmailValid(false);
                                    } else {
                                        icon.style.color = "green";
                                        setEmailValid(true);
                                        setUser({ ...user, email: e.target.value });
                                    }
                                    if (e.target.value === "") {
                                        setEmailValid(false);
                                        icon.style.color = "white";
                                    }
                                }} /><i class="fa-regular fa-circle-check" id="icon"></i><br />
                                <div id="all-box">
                                <i class="fa-solid fa-lock" style={{ color: "white" }}></i>
                                <input type="password" id="password" className='ip' style={{ marginBottom: "8vh" }} placeholder="password" onChange={(e) => {
                                    const msg = document.getElementById('wrongInputMsg');
                                    msg.style.display = "none";
                                    const pass = document.getElementById("password").value;
                                    const icon = document.getElementById('icon-right');
                                    const capitalLetter = "[A-Z]";
                                    const smallLetter = "[a-z]";
                                    const specialLettre = "[~!@#$%^&*()_+=-{}]";
                                    const number = "[0-9]";
                                    const regExCap = new RegExp(capitalLetter);
                                    const regexSmall = new RegExp(smallLetter);
                                    const regExSpLett = new RegExp(specialLettre);
                                    const regExNum = new RegExp(number);
                                    const msg_list = document.getElementById('list-msg');
                                    // if(pass.length() >= 8){
                                    if (!regExCap.test(pass) || !regexSmall.test(pass) || !regExSpLett.test(pass) || !regExNum.test(pass)) {
                                        icon.style.color = "red";
                                        msg_list.style.display = "block";
                                        setPassValid(false);
                                    }
                                    else {
                                        icon.style.color = "green";
                                        setPassValid(true);
                                    }
                                    if (e.target.value === "") {
                                        msg_list.style.display = "none";
                                        icon.style.color = "white";
                                        setPassValid(false);
                                    }
                                    if (regExCap.test(pass) && regexSmall.test(pass) && regExSpLett.test(pass) && regExNum.test(pass)) {
                                        msg_list.style.display = "none";
                                        setPassValid(true);
                                        setUser({ ...user, password: e.target.value });
                                    }
                                    // }
                                    setUser({ ...user, password: e.target.value });
                                }} />
                                <i class="fa-solid fa-eye" style={{ color: "white" }} id="eye-icon" onClick={() => {
                                    const pass = document.getElementById("password");
                                    const eye_open = document.getElementById('eye-icon');
                                    const btn = document.getElementById('eye-close');
                                    btn.classList.toggle('active');
                                    if (btn.classList.contains('active')) {
                                        eye_open.style.display = "none";
                                        pass.type = "text";
                                    }
                                }}></i>
                                <i class="fa-solid fa-eye-slash" id="eye-close" onClick={() => {
                                    const pass = document.getElementById("password");
                                    const btn = document.getElementById('eye-close');
                                    const eye_open = document.getElementById('eye-icon');
                                    btn.classList.toggle('active');
                                    if (!btn.classList.contains('active')) {
                                        eye_open.style.display = "inline";
                                        pass.type = "password";
                                    }
                                }}></i>
                                <i id='icon-right' class="fa-regular fa-circle-check" style={{ color: "white" }}></i>
                                <ul id="list-msg">
                                    <li>Password must contain atleast 1 capital letter</li>
                                    <li>Password must contain atleast 1 small letter</li>
                                    <li>Password must contain atleast 1 number</li>
                                    <li>Password must contain atleast 1 special charcter</li>
                                </ul>

                                <button type="submit" className="btn btn-primary" style={{ width: "70%", borderRadius: "50px", marginBottom: "2vh" }} onClick={() => {
                                    if (emailValid && passValid) {
                                        sendModel();
                                    }
                                    else {
                                        const msg = document.getElementById('wrongInputMsg');
                                        msg.style.display = "block";
                                    }
                                }}>Log in</button>
                                <p style={{ color: "white" }}>Don't have an account?<Link to={'/food/auth/signup'}>Sign up</Link></p>
                            </div>
                            </div>

                        </> :
                        <>
                            <div className='signup' id='sigup'>
                                <h2>Sign up</h2>
                                <input type="text" className='ip' placeholder="User Name" onChange={(e) => {
                                    e.preventDefault();
                                    setUser({ ...user, userName: e.target.value });
                                }} /><i class="fa-solid fa-user" style={{ color: "white", marginLeft: "-2vh" }}></i><br />
                                <input type="text" className='ip' placeholder="email" onChange={(e) => {
                                    e.preventDefault();
                                    setUser({ ...user, email: e.target.value });
                                }} /><i class="fa-solid fa-envelope" style={{ color: "white", marginLeft: "-2vh" }}></i><br />
                                <input type="text" className='ip' style={{ marginBottom: "4vh" }} placeholder="password" onChange={(e) => {
                                    e.preventDefault();
                                    setUser({ ...user, password: e.target.value });
                                }} /><i class="fa-solid fa-lock" style={{ color: "white", marginLeft: "-2vh" }}></i><br />
                                <button className="btn btn-primary" onClick={sendModel} style={{ width: "70%", borderRadius: "50px", marginBottom: "2vh" }}>sign up</button>
                                <p style={{ color: "white" }}>already have an account? <Link to={'/food/auth/login'}>log in</Link></p>
                            </div>
                        </>
                }
            </div>
        </>
    );
}
