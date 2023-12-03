import { useEffect, useState } from "react";

function useGetSellerFood() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("seller-token");
        fetch("https://bitebuddy-rgzf.onrender.com/restorent/seller/seller/food", {
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
                    throw new Error("Can not fetch you data");
                }
            })
            .then((res) => {
                setData(res);
            })
            .catch((err) => {
                console.log(("ERROR to fetch your data is ", err));
            })
    }, []);
    console.log("data",data);
    return [data, setData];
}

export default useGetSellerFood;