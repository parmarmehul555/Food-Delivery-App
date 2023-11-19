import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserModelProvider(props) {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);
    function login() {
        fetch('https://localhost:3030/food/auth/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${token}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                    // console.log(token);
                }
                else {
                    console.log("Some errror occured!!");
                }
            })
            .then((res) => {
                if (res.ok) {
                    setUser(user);
                    setToken(res.token);
                }
            })
            .catch((error) => {
                console.error("Error during signup:", error);
            });
    }

    function signup() {
        fetch('https://localhost:3030/food/auth/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${token}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                    // console.log(token);
                }
                else {
                    console.log("Some errror occured!!");
                }
            })
            .then((res) => {
                if (res.ok) {
                    setUser(user);
                    setToken(res.token);
                }
                else {
                    console.log("some error occured!!");
                }
            })
            .catch((error) => {
                console.error("Error during signup:", error);
            });
    }

    useEffect(() => {
        if (props.isLogin) {
            login();
        }
        else {
            signup();
        }
    }, []);

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
                            setUser({ ...user, email: e.target.value });
                        }} />
                        <input type="text" placeholder="password" onChange={(e) => {
                            setUser({ ...user, password: e.target.value });
                        }} />
                        <button className="btn btn-primary" onClick={sendModel}>Log in</button>
                        <p>Don't have an account?<Link to={'/food/auth/signup'}>Sign up</Link></p>
                    </> :
                    <>
                        <input type="text" placeholder="User Name" onChange={(e) => {
                            setUser({ ...user, userName: e.target.value });
                        }} />
                        <input type="text" placeholder="email" onChange={(e) => {
                            setUser({ ...user, email: e.target.value });
                        }} />
                        <input type="text" placeholder="password" onChange={(e) => {
                            setUser({ ...user, password: e.target.value });
                        }} />
                        <button className="btn btn-primary" onClick={sendModel}>sign up</button>
                        <p>already have an account? <Link to={'/food/auth/login'}>log in</Link></p>
                    </>
            }
        </>
    );
}