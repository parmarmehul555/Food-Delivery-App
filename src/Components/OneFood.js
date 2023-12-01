import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { cartCount } from "../features/cartCountSlice";
import useGetOneFood from "../hooks/useGetOneFood";
import useGetCartFood from "../hooks/useGetCartFood";

export default function OneFood() {
    const dispatch = useDispatch();
    const { restoName } = useParams();
    const [allfood] = useGetOneFood(restoName);
    const count = useSelector(state => state.cartCount.count);
    const [orderFood, setOrderFood, countF, setCountF] = useGetCartFood();
    const [order, setOrder] = useState({});
    if(!localStorage.getItem("count")){
        localStorage.setItem("count",parseInt(0));
    }

    function handleOrder(data) {
        const token = localStorage.getItem("auth-token");
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
            }).catch((err) => {
                console.log("ERROR is (failed to order) ", err)
            })
    }

    const formattedRestoFood = allfood.map((item) => {
        return (
            <div key={item._id} class="card" style={{ marginTop: "2vh" }}>
                <h5 class="card-header">{item.sellerName}</h5>
                <div class="card-body oneCard" id="foodIdCard">
                    <div><img src={item.foodImg} alt="food img" /></div>
                    <div>
                        <h5 class="card-title">{item.foodName}</h5>
                        <p class="card-text">{item.foodDescription}</p>
                        <p class="card-text">Rs. {item.foodPrice}/-</p>
                        <button class="btn btn-primary" onClick={() => {
                            console.log(item.foodName);
                            console.log(item.foodPrice);
                            console.log(restoName);
                            const data = {
                                foodName: item.foodName,
                                foodPrice: item.foodPrice,
                                restorentName: restoName,
                                foodImg: item.foodImg
                            }
                            handleOrder(data);
                            // setFood({ foodName: item.foodName, foodPrice: item.foodPrice, restorentName: restoName });
                            // dispatch(incrementCartCount(1));
                            localStorage.setItem("count", parseInt(count) + 1);
                            setCountF(localStorage.getItem("count"));
                            dispatch(cartCount(localStorage.getItem("count")));
                        }}>Add</button>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="container">
            {formattedRestoFood}
        </div>
    )
} 