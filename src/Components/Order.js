import { useEffect, useState } from "react";
import useGetDeliveredFood from "../hooks/useGetDeliverdFood";

export default function Order() {
    const [food] = useGetDeliveredFood();

    const formatterFood = food.map((item) => {
        return (
            <div key={item._id} class="card" style={{ marginTop: "2vh" }}>
                <h5 class="card-header">{item.restorentName}</h5>
                <div class="card-body orderFoodCardBody" id="foodIdCard">
                    <div><img src={item.foodImg} alt="food img" /></div>
                    <div>
                        <h5 class="card-title">{item.foodName}</h5>
                        <p class="card-text">{item.foodDescription}</p>
                        <p className="cart-text">Delivery Date : {(item.createdAt).split('T')[0]}</p>
                        <p class="card-text">Rs. {item.foodPrice}/-</p>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <>
            {food.length != 0 ?
                <div className="container">
                    {formatterFood}
                </div>
                :
                <div className="img-order">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc01EsWzpXeIIX-DZ_IBSqItwAzmC7zZoPC-abxDZ_5_nItiAI9A5BcSf2XE_oflO9od8&usqp=CAU" alt="no orders yet img" />
                    <h1>No orders yet</h1>
                </div>
            }
        </>
    )
}