import { useEffect, useState } from "react";

function useGetFoodById(foodId) {
    const [data, setData] = useState({});
    const token = localStorage.getItem("auth-token");
    
    useEffect(() => {
        fetch('https://bitebuddy-rgzf.onrender.com/restorent/seller/' + foodId, {
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
                    throw new Error("can not fetch data");
                }
            })
            .then((res) => {
                setData(res);
            })
            .catch((err) => {
                console.log("ERROR to fatch data ", err);
            })
    }, [])

    return [data, setData];
}

export default useGetFoodById