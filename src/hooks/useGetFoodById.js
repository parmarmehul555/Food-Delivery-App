import { useState } from "react";

function useGetFoodById(foodId) {
    const [data, setData] = useState({});

    fetch('http://localhost:3030/restorent/seller/' + foodId, {
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
    return [data, setData];
}