import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { incrementCartCount } from "../features/cartCountSlice";
import useGetOneFood from "../hooks/useGetOneFood";
import useGetCartFood from "../hooks/useGetCartFood";
import foodContext from "../context/foodContext";

export default function OneFood() {
    let [tempCount,setTempCount] = useState(0);
    const dispatch = useDispatch();
    const { restoName } = useParams();
    const [allfood] = useGetOneFood(restoName);
    const count = useSelector(state => state.cartCount.count);
    const [orderFood, setOrderFood, countF, setCountF] = useGetCartFood();
    const [order, setOrder] = useState({});

    function displayCount(id){
        const ele = document.getElementById(`${id}`);
        setTempCount(tempCount+1);
        ele.innterText = tempCount;
    }

    function handleOrder(data) {
        const token = localStorage.getItem("auth-token");
        fetch("https://bitebuddy-rgzf.onrender.com/food/auth/orderfood", {
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
            <div key={item._id} class="card oneCardFood" style={{ marginTop: "2vh" }}>
                <h5 class="card-header">{item.sellerName}</h5>
                <div class="card-body oneCard" id="foodIdCard">
                    <div><img src={item.foodImg} alt="food img" /></div>
                    <div id="oneCardDetails">
                        <h5 class="card-title">{item.foodName}</h5>
                        <p class="card-text">{item.foodDescription}</p>
                        <p class="card-text">Rs. {item.foodPrice}/-</p>
                        <button class="btn btn-primary" onClick={() => {
                            const data = {
                                foodName: item.foodName,
                                foodPrice: item.foodPrice,
                                restorentName: restoName,
                                foodImg: item.foodImg,
                            }
                            handleOrder(data);
                            localStorage.setItem("count", parseInt(count) + 1);
                            setCountF(localStorage.getItem("count"));
                            dispatch(incrementCartCount(1));
                        }} id={`${item._id}`}>Add</button>
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