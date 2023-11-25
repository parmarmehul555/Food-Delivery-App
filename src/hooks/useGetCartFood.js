import { useEffect, useState } from "react";

function useGetCartFood() {
    const [orderFood, setOrderFood] = useState([]);
    const [count, setCount] = useState(0);
    const token = localStorage.getItem("auth-token");
    useEffect(() => {
        fetch("http://localhost:3030/food/auth/orders", {
            method: 'GET',
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
                    console.log("Can not fetch ordered food!!");
                    throw new Error("Can not fetch cart items");
                }
            })
            .then((res) => {
                setOrderFood(res.data);
                setCount(res.count);
            })
            .catch((err) => {
                console.log("ERROR : Can not fetch order data ", err);
            })
    }, []);
    return [orderFood, setOrderFood, count, setCount];
}

export default useGetCartFood;