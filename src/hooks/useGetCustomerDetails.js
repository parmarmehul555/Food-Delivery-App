import { useEffect, useState } from "react";

function useGetCustomerDetails() {
    const [customers, setCustomers] = useState([]);
    const token = localStorage.getItem("seller-token");
    useEffect(() => {
        fetch("http://localhost:3030/food/auth/yourcustomers", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error("Can not fetch your customer");
            }
        }).then((res) => {
            setCustomers(res);
        })
    }, []);
    return [customers, setCustomers];
}

export default useGetCustomerDetails;