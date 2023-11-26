import { useEffect, useState } from "react";

function useGetDeliveredFood() {
    const token = localStorage.getItem("auth-token");
    const [food, setFood] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3030/food/auth/user/orders", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': `bearer ${token}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    console.log("Can not fetch delivered food details!!");
                    throw new Error("Can not fetch delivered food");
                }
            })
            .then((res) => {
                setFood(res);
            })
            .catch((err) => {
                console.log("ERROR to fetch dellivered food is ", err);
            })
    }, []);
    return [food, setFood];
}

export default useGetDeliveredFood;