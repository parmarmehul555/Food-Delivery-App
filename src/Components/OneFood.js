import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { incrementCartCount } from "../features/cartCountSlice";
import {addCartItemList, removeCartItemList } from "../features/cartItemSlice";

export default function OneFood() {
    const { restoName } = useParams();
    const food = useSelector(state => state.food.foods);
    const [newFood, setNewFood] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const filteredFood = food.filter(item => item.sellerName === restoName);
        setNewFood(filteredFood);
    }, [food,restoName]);

    const formattedRestoFood = newFood.map((item) => {
        return (
            <div key={item._id} class="card" style={{ marginTop: "2vh" }}>
                <h5 class="card-header">{item.sellerName}</h5>
                <div class="card-body" id="foodIdCard">
                    <div><img src={item.foodImg} alt="food img"/></div>
                    <div>
                        <h5 class="card-title">{item.foodName}</h5>
                        <p class="card-text">{item.foodDescription}</p>
                        <p class="card-text">Rs. {item.foodPrice}/-</p>
                        <button class="btn btn-primary" onClick={() => {
                            dispatch(incrementCartCount(1));
                            dispatch(addCartItemList(item));
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