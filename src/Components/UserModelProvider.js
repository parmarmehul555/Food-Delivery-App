import { useContext, } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import '../index.css';
import { useState } from "react";
import Swal from "sweetalert2";
import useGetUserDetail from "../hooks/useGetUserDetail";

export default function UserModelProvider(props) {
    const { user, setUser } = useContext(userContext);
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const [emailValid, setEmailValid] = useState(false);
    const [passValid, setPassValid] = useState(false);

    function login() {
        fetch('https://bitebuddy-rgzf.onrender.com/food/auth/login', {
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
                const data = await res.isUser
                setUser(data);

                localStorage.setItem("auth-token", token);
                localStorage.getItem("auth-token") ? navigate('/user') : navigate('/food/auth/signup');
            })
            .catch((error) => {
                console.error("Error during login:", error);
            });
        setToken(localStorage.getItem("auth-token"));
        console.log("user from event is ", user);
    }

    function signup() {
        fetch('https://bitebuddy-rgzf.onrender.com/food/auth/signup', {
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
        <div className="img">
            {
                props.isLogin ?
                    <div className="login-box">
                        <h2 >Log in</h2>
                        <p id="wrongInputMsg" style={{ color: "red" }}>Invalid email or password</p>
                        <div className="ip-box">
                            <i class="fa-solid fa-envelope" style={{ color: "white" }}></i>
                            <input type="text" id="email" placeholder="email" className="ip-style" onChange={(e) => {
                                const msg = document.getElementById('wrongInputMsg');
                                msg.style.display = "none";
                                const icon = document.getElementById("check");
                                const pattern = "^[A-Za-z]+[0-9]+@+gmail+[\.]+com$"
                                const emailvalue = document.getElementById('email').value;
                                const regEx = new RegExp(pattern);
                                if (!regEx.test(emailvalue)) {
                                    setEmailValid(false);
                                    icon.style.color = "red";
                                } else {
                                    setEmailValid(true);
                                    setUser({ ...user, email: e.target.value });
                                    icon.style.color = "green";
                                }
                                if (e.target.value === "") {
                                    setEmailValid(false);
                                    icon.style.color = "white";
                                }
                            }} />
                            <i class="fa-solid fa-circle-check" id="check" style={{ color: "white" }}></i>
                        </div>

                        <div className="ip-box" id="password-box">
                            <i class="fa-solid fa-lock" style={{ color: "white" }}></i>
                            <input type="password" id="password" placeholder="password" className="ip-style" onChange={(e) => {
                                const pass = document.getElementById("password").value;
                                const msg = document.getElementById('wrongInputMsg');
                                msg.style.display = "none";
                                const capitalLetter = "[A-Z]";
                                const smallLetter = "[a-z]";
                                const specialLettre = "[~!@#$%^&*()_+=-{}]";
                                const number = "[0-9]";
                                const regExCap = new RegExp(capitalLetter);
                                const regexSmall = new RegExp(smallLetter);
                                const regExSpLett = new RegExp(specialLettre);
                                const regExNum = new RegExp(number);
                                const msg_list = document.getElementById('list-msg');
                                if (pass.length >= 8) {
                                    if (!regExCap.test(pass) || !regexSmall.test(pass) || !regExSpLett.test(pass) || !regExNum.test(pass)) {
                                        msg_list.style.display = "block";
                                        setPassValid(false);
                                    }
                                    else {
                                        setPassValid(true);
                                    }
                                    if (e.target.value === "") {
                                        msg_list.style.display = "none";
                                        setPassValid(false);
                                    }
                                    if (regExCap.test(pass) && regexSmall.test(pass) && regExSpLett.test(pass) && regExNum.test(pass)) {
                                        msg_list.style.display = "none";
                                        setPassValid(true);
                                        setUser({ ...user, password: e.target.value });
                                    }
                                }
                                else {
                                    msg_list.style.display = "block";
                                    setPassValid(false);
                                    if (e.target.value === "") {
                                        msg_list.style.display = "none";
                                        setPassValid(false);
                                    }
                                }
                            }} />

                            <i class="fa-solid fa-eye" style={{ color: "white" }} id="eye-open" onClick={() => {
                                const eyeClose = document.getElementById("eye-close");
                                const eyeOpen = document.getElementById("eye-open");
                                const pass = document.getElementById("password");

                                eyeOpen.style.display = "none";
                                pass.type = "password";
                                eyeClose.style.display = "inline";
                            }}></i>

                            <i class="fa-solid fa-eye-slash" style={{ color: "white" }} id="eye-close" onClick={() => {
                                const eyeClose = document.getElementById("eye-close");
                                const eyeOpen = document.getElementById("eye-open");
                                const pass = document.getElementById("password");

                                eyeOpen.style.display = "inline";
                                pass.type = "text";
                                eyeClose.style.display = "none";
                            }}></i>
                        </div>
                        <ul id="list-msg">
                            <li>Password must contain atleast 1 capital letter</li>
                            <li>Password must contain atleast 1 small letter</li>
                            <li>Password must contain atleast 1 number</li>
                            <li>Password must contain atleast 1 special charcter</li>
                            <li>Password length must be more then 8</li>
                        </ul>
                        <div className="btn " style={{ backgroundColor: "#e6b36c" }} id="login-btn" onClick={async () => {
                            if (emailValid && passValid) {
                                sendModel();
                                const username = await user.username
                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: "top-end",
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                        toast.onmouseenter = Swal.stopTimer;
                                        toast.onmouseleave = Swal.resumeTimer;
                                    }
                                });
                                Toast.fire({
                                    icon: "success",
                                    title: `Welcomeback ${username}`
                                });
                            }
                            else {
                                const msg = document.getElementById('wrongInputMsg');
                                msg.style.display = "block";
                            }
                        }}>Log in</div>
                        <p id="suggetion" style={{ color: "white" }}>Don't have an account?<Link to={'/seller/signup'}>Sign up</Link></p>
                    </div> :
                    <div className="signup-box">
                        <h2 >Sign up</h2>
                        <p id="wrongInputMsg">Invalid email or password</p>

                        <div className="ip-box">
                            <i class="fa-solid fa-user"></i>
                            <input type="text" id="userUser" placeholder="User Name" className="ip-style" onChange={(e) => {
                                const icon = document.getElementById("checkIcon");
                                icon.style.color = "green";
                                setUser({ ...user, userName: e.target.value })
                                if (e.target.value === "") {
                                    icon.style.color = "white";
                                }
                            }} />
                            <i class="fa-solid fa-circle-check" id="checkIcon" style={{ color: "white" }}></i>
                        </div>

                        <div className="ip-box">
                            <i class="fa-solid fa-phone"></i>
                            <input type="text" id="numberUser" placeholder="Phone number" className="ip-style" onChange={(e) => {
                                const number = document.getElementById('numberUser').value;
                                const icon = document.getElementById("check");
                                if (number.length > 0 && number.length == 10) {
                                    icon.style.color = "green";
                                }
                                else {
                                    icon.style.color = "red";
                                }
                                if (e.target.value === "") {
                                    icon.style.color = "white";
                                }
                                setUser({ ...user, number: e.target.value });
                            }} />
                            <i class="fa-solid fa-circle-check" id="check" style={{ color: "white" }}></i>
                        </div>

                        <div className="ip-box">
                            <i class="fa-solid fa-envelope" style={{ color: "white" }}></i>
                            <input type="text" id="email" placeholder="email" className="ip-style" onChange={(e) => {
                                const msg = document.getElementById('wrongInputMsg');
                                msg.style.display = "none";
                                const icon = document.getElementById("checkEmail");
                                const pattern = "^[A-Za-z]+[0-9]+@+gmail+[\.]+com$"
                                const emailvalue = document.getElementById('email').value;
                                const regEx = new RegExp(pattern);
                                if (!regEx.test(emailvalue)) {
                                    setEmailValid(false);
                                    icon.style.color = "red";
                                } else {
                                    setEmailValid(true);
                                    setUser({ ...user, email: e.target.value });
                                    icon.style.color = "green";
                                }
                                if (e.target.value === "") {
                                    setEmailValid(false);
                                    icon.style.color = "white";
                                }
                            }} />
                            <i class="fa-solid fa-circle-check" id="checkEmail" style={{ color: "white" }}></i>
                        </div>

                        <div className="ip-box" id="password-box">
                            <i class="fa-solid fa-lock" style={{ color: "white" }}></i>
                            <input type="password" id="password" placeholder="password" className="ip-style" onChange={(e) => {
                                const pass = document.getElementById("password").value;
                                const msg = document.getElementById('wrongInputMsg');
                                msg.style.display = "none";
                                const capitalLetter = "[A-Z]";
                                const smallLetter = "[a-z]";
                                const specialLettre = "[~!@#$%^&*()_+=-{}]";
                                const number = "[0-9]";
                                const regExCap = new RegExp(capitalLetter);
                                const regexSmall = new RegExp(smallLetter);
                                const regExSpLett = new RegExp(specialLettre);
                                const regExNum = new RegExp(number);
                                const msg_list = document.getElementById('list-msg');
                                if (pass.length >= 8) {
                                    if (!regExCap.test(pass) || !regexSmall.test(pass) || !regExSpLett.test(pass) || !regExNum.test(pass)) {
                                        msg_list.style.display = "block";
                                        setPassValid(false);
                                    }
                                    else {
                                        setPassValid(true);
                                    }
                                    if (e.target.value === "") {
                                        msg_list.style.display = "none";
                                        setPassValid(false);
                                    }
                                    if (regExCap.test(pass) && regexSmall.test(pass) && regExSpLett.test(pass) && regExNum.test(pass)) {
                                        msg_list.style.display = "none";
                                        setPassValid(true);
                                        setUser({ ...user, password: e.target.value });
                                    }
                                }
                                else {
                                    msg_list.style.display = "block";
                                    setPassValid(false);
                                    if (e.target.value === "") {
                                        msg_list.style.display = "none";
                                        setPassValid(false);
                                    }
                                }
                            }} />

                            <i class="fa-solid fa-eye" style={{ color: "white" }} id="eye-open" onClick={() => {
                                const eyeClose = document.getElementById("eye-close");
                                const eyeOpen = document.getElementById("eye-open");
                                const pass = document.getElementById("password");

                                eyeOpen.style.display = "none";
                                pass.type = "password";
                                eyeClose.style.display = "inline";
                            }}></i>

                            <i class="fa-solid fa-eye-slash" style={{ color: "white" }} id="eye-close" onClick={() => {
                                const eyeClose = document.getElementById("eye-close");
                                const eyeOpen = document.getElementById("eye-open");
                                const pass = document.getElementById("password");

                                eyeOpen.style.display = "inline";
                                pass.type = "text";
                                eyeClose.style.display = "none";
                            }}></i>
                        </div>

                        <div className="ip-box">
                            <i class="fa-solid fa-house"></i>
                            <input type="text" id="address" placeholder="Address" className="ip-style" onChange={(e) => {
                                const icon = document.getElementById("checkAddress");
                                icon.style.color = "green";
                                if (e.target.value === "") {
                                    icon.style.color = "white";
                                }
                                setUser({ ...user, address: e.target.value });
                            }} />
                            <i class="fa-solid fa-circle-check" id="checkAddress" style={{ color: "white" }}></i>
                        </div>
                        <ul id="list-msg">
                            <li>Password must contain atleast 1 capital letter</li>
                            <li>Password must contain atleast 1 small letter</li>
                            <li>Password must contain atleast 1 number</li>
                            <li>Password must contain atleast 1 special charcter</li>
                            <li>Password length must be more then 8</li>
                        </ul>
                        <div className="btn " style={{ backgroundColor: "#e6b36c" }} id="login-btn" onClick={async () => {
                            console.log("data is ", user);
                            if (emailValid && passValid) {
                                sendModel();
                            }
                            else {
                                const msg = document.getElementById('wrongInputMsg');
                                msg.style.display = "block";
                            }
                        }}>sign up</div>
                        <p id="suggetion" style={{ color: "white" }}>Don't have an account?<Link to={'/seller/login'}>log in</Link></p>
                    </div>
            }
        </div >
    )
}
