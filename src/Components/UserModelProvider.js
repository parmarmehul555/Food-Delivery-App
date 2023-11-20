import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserModelProvider(props) {
    const [user, setUser] = useState({});
    const [authToken, setAuthToken] = useState("");
    console.log(user);
    function login() {
        fetch('http://localhost:3030/food/auth/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
                // 'authorization': `bearer ${token}`
            }
        })
            .then((res) => {
                if (res.status == 200) {
                    return res.json();
                }
                else {
                    console.log("Some errror occured!!");
                    throw new Error("login faild");
                }
            })
            .then((res) => {
                try {
                    if (res.status == 200) {
                        const { token } = res;
                        // setUser(res);
                        setAuthToken(token);
                    }
                } catch (err) {
                    console.log("Error is while setting token  " + err)
                }
            })
            .catch((error) => {
                console.error("Error during login:", error);
            });
        console.log("fsd", user);
        console.log("Token ", authToken);
    }

    function signup() {
        fetch('http://localhost:3030/food/auth/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
                // 'authorization': `bearer ${token}`
            }
        })
            .then((res) => {
                if (res.status == 200) {
                    return res.json();
                }
                else {
                    console.log("Some errror occured!!");
                }
            })
            .then((res) => {
                if (res.status == 200) {
                    const { token } = res;
                    // setUser(user);
                    setAuthToken(token);
                }
                else {
                    console.log("some error occured!!");
                }
            })
            .catch((error) => {
                console.error("Error during signup:", error);
            });
        console.log("fsd", user);
        console.log("Token ", authToken);
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
            {
                props.isLogin ?
                    <>
                        <input type="text" placeholder="email" onChange={(e) => {
                            e.preventDefault();
                            setUser({ ...user, email: e.target.value });
                        }} />
                        <input type="text" placeholder="password" onChange={(e) => {
                            e.preventDefault();
                            setUser({ ...user, password: e.target.value });
                        }} />
                        <button type="submit" className="btn btn-primary" onClick={sendModel}>Log in</button>
                        <p>Don't have an account?<Link to={'/food/auth/signup'}>Sign up</Link></p>

                    </> :
                    <>
                        <input type="text" placeholder="User Name" onChange={(e) => {
                            e.preventDefault();
                            setUser({ ...user, userName: e.target.value });
                        }} />
                        <input type="text" placeholder="email" onChange={(e) => {
                            e.preventDefault();
                            setUser({ ...user, email: e.target.value });
                        }} />
                        <input type="text" placeholder="password" onChange={(e) => {
                            e.preventDefault();
                            setUser({ ...user, password: e.target.value });
                        }} />
                        <button className="btn btn-primary" onClick={sendModel}>sign up</button>
                        <p>already have an account? <Link to={'/food/auth/login'}>log in</Link></p>
                    </>
            }
        </>
    );
}