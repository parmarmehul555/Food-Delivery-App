import { useContext, } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import '../index.css';
import { useState } from "react";

export default function UserModelProvider(props) {
    const { user, setUser } = useContext(userContext);
    const [token, setToken] = useState("");
    const navigate = useNavigate();

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
                localStorage.getItem("auth-token") ? navigate('/user') : navigate('//food/auth/signup');
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
                                <input type="text" className='ip' style={{ marginBottom: "3vh" }} placeholder="email" onChange={(e) => {
                                    e.preventDefault();
                                    setUser({ ...user, email: e.target.value });
                                }} />
                                <i class="fa-solid fa-envelope" style={{ color: "white", marginLeft: "-2vh" }}></i><br />
                                <input type="password" className='ip' style={{ marginBottom: "5vh" }} placeholder="password" onChange={(e) => {
                                    e.preventDefault();
                                    setUser({ ...user, password: e.target.value });
                                }} /><i class="fa-solid fa-lock" style={{ color: "white", marginLeft: "-2vh" }}></i><br />
                                <button type="submit" className="btn btn-primary" onClick={sendModel} style={{ width: "70%", borderRadius: "50px", marginBottom: "2vh" }}>Log in</button>
                                <p style={{ color: "white" }}>Don't have an account?<Link to={'/food/auth/signup'}>Sign up</Link></p>
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
