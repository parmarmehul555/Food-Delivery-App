import { useState } from "react";
import { useEffect } from "react";

function useGetUserDetail() {
    const token = localStorage.getItem("auth-token");
    const [user, setUser] = useState({});
    useEffect(() => {
    fetch('https://bitebuddy-rgzf.onrender.com/food/auth/user', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': `bearer ${token}`
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                console.log("can not fetch user details");
                throw new Error("Can not fetch user details");
            }
        })
        .then((res) => {
            setUser(res);
        })
        .catch((err)=>{
            console.log("Failed fo fatech userdata",err);
        })
    }, []);
    return [user, setUser];
}

export default useGetUserDetail;