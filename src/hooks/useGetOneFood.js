const { useState } = require("react");
const { useEffect } = require("react");

function useGetOneFood(sellerName) {
    const token = localStorage.getItem("auth-token");
    const [order, setOrder] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3030/restorent/seller/food/${sellerName}`, {
            method: "GET",
            headers: {
                'Cntent-Type': 'application/json',
                'authorization': `bearear ${token}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    console.log("Some error occured!");
                    throw new Error("Some can not fetch data");
                }
            })
            .then(async (res) => {
                await setOrder(res);
            })
            .catch((err) => {
                console.log("can not order food ", err)
            })
    }, []);
    return [order, setOrder];
}

export default useGetOneFood;