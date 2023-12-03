import { toHaveDescription } from "@testing-library/jest-dom/matchers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function ChangeFood() {
    const { foodId } = useParams();
    const [food,setFood] = useState({});

    useEffect(()=>{
        const token = localStorage.getItem("seller-token");
        fetch("https://bitebuddy-rgzf.onrender.com/restorent/seller/seller/"+foodId,{
            headers:{
                'Content-Type':'application/json',
                'authorization':`bearer ${token}`
            }
        })
        .then((res)=>{
            if(res.ok){
                return res.json();
            }
            else{
                throw new Error("Can not get food");
            }
        })
        .then((res)=>{
            setFood(res);
        })
    })

    return (
        <></>
    )
}