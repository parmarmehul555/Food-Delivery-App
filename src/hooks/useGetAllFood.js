import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

function useGetAllFood() {
    const [food, setFood] = useState([]);
    const token = localStorage.getItem("auth-token");
    const dispatch = useDispatch();
    useEffect(() => {
        fetch("http://localhost:3030/restorent/seller/foods", {
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
                    console.log(("Some error occured!"));
                    throw new Error("Faild to fetch");
                }
            })
            .then((res) => {
                setFood(res);
            })
            .catch((err) => {
                console.log("ERROR in fetching food ", err);
            })
    }, []);
    return [food, setFood];
}


export default useGetAllFood;