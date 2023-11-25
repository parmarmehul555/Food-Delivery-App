import { useEffect, useState } from "react";

function useOrderFood(data) {
    const [order, setOrder] = useState({});
    const token = localStorage.getItem("auth-token");
    useEffect(() => {
        fetch("http://localhost:3030/food/auth/orderfood", {
            method: "POST",
            body: JSON.stringify(data),
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
                    console.log("Can not order food!!");
                    throw new Error("Can not order food!!");
                }
            })
            .then((res) => {
                setOrder(res);
            }).catch((err)=>{
                console.log("ERROR is (failed to order) ",err)
            })
    }, [data]);
    return [order, setOrder];
}

export default useOrderFood;