import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SellerModelProvider(props) {
    const [seller, setSeller] = useState({});
    const [emailValid, setEmailValid] = useState(false);
    const [passValid, setPassValid] = useState(false);
    const navigate = useNavigate();

    function login() {
        fetch("http://localhost:3030/restorent/seller/login", {
            method: 'POST',
            body: JSON.stringify(seller),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    throw new Error("can not login");
                }
            })
            .then(async (res) => {
                const token = await res.token;
                localStorage.setItem("seller-token", token);
                localStorage.getItem("seller-token") ? navigate('/seller') : navigate('/seller/signup');
            })
            .catch((err) => {
                console.log("Can not login seller ", err);
            })
    }

    function signup() {
        fetch("http://localhost:3030/restorent/seller/signup", {
            method: 'POST',
            body: JSON.stringify(seller),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    throw new Error("can not signup");
                }
            })
            .then(async (res) => {
                const token = await res.token;
                localStorage.setItem("seller-token", token);
                localStorage.getItem("seller-token") ? navigate('/seller/login') : navigate('/seller/signup');
            })
            .catch((err) => {
                console.log("Can not login seller ", err);
            })
            console.log(seller);
    }

    function sendModel() {
        if (props.isLogin) {
            login();
        }
        else {
            signup();
        }
    }

    return (
        <div id="img">
            <img src="https://www.svapinfotech.com/data/media/orginal/food-delivery-2-5459.jpg" alt="img" />
            {
                props.isLogin ?
                    <>
                        <div className='login' id='login'>
                            <h2>Log in</h2>
                            <p id="wrongInputMsg">Invalid email or password</p>
                            <i class="fa-solid fa-envelope" style={{ color: "white",marginRight:"2vh"}}></i>
                            <input type="text" id="email" className='ip' style={{ marginBottom: "3vh" }} placeholder="email" onChange={(e) => {
                                const pattern = "^[A-Za-z]+[0-9]+@+gmail+[\.]+com$"
                                const emailvalue = document.getElementById('email').value;
                                const regEx = new RegExp(pattern);
                                if (!regEx.test(emailvalue)) {
                                    setEmailValid(false);
                                } else {
                                    setEmailValid(true);
                                    setSeller({ ...seller, email: e.target.value });
                                }
                                if (e.target.value === "") {
                                    setEmailValid(false);
                                }
                            }} /><br/>
                            <div id="ip-box" className="ms-2">
                            <i class="fa-solid fa-lock" style={{ color: "white",marginRight:"2vh"}}></i>
                            <input type="password" id="password" className='ip' style={{ marginBottom: "5vh"}} placeholder="password" onChange={(e) => {
                                const pass = document.getElementById("password").value;
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
                                    setSeller({ ...seller, password: e.target.value });
                                }
                                // }
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
                            </div>
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
                            <p style={{ color: "white" }}>Don't have an account?<Link to={'/seller/signup'}>Sign up</Link></p>
                        </div>

                    </> :
                    <>
                        <div className='signup' id='sigup'>
                            <h2>Sign up</h2>
                            <input type="text" className='ip' placeholder="seller Name" onChange={(e) => {
                                e.preventDefault();
                                setSeller({ ...seller, name: e.target.value });
                            }} /><i class="fa-solid fa-seller" style={{ color: "white", marginLeft: "-2vh" }}></i><br />
                            <input type="text" className='ip' placeholder="email" onChange={(e) => {
                                e.preventDefault();
                                setSeller({ ...seller, email: e.target.value });
                            }} /><i class="fa-solid fa-envelope" style={{ color: "white", marginLeft: "-2vh" }}></i><br />
                            <input type="text" className='ip' style={{ marginBottom: "4vh" }} placeholder="password" onChange={(e) => {
                                e.preventDefault();
                                setSeller({ ...seller, password: e.target.value });
                            }} /><i class="fa-solid fa-lock" style={{ color: "white", marginLeft: "-2vh" }}></i><br />
                            <input type="text" className='ip' style={{ marginBottom: "4vh" }} placeholder="mobile number" onChange={(e) => {
                                e.preventDefault();
                                setSeller({ ...seller, phno: e.target.value });
                                
                            }} /><i class="fa-solid fa-lock" style={{ color: "white", marginLeft: "-2vh" }}></i><br />
                            <button className="btn btn-primary" onClick={sendModel} style={{ width: "70%", borderRadius: "50px", marginBottom: "2vh" }}>sign up</button>
                            <p style={{ color: "white" }}>already have an account? <Link to={'/seller/login'}>log in</Link></p>
                        </div>
                    </>

            }
        </div>
    )
}