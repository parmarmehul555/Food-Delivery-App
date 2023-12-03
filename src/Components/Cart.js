import { useDispatch, useSelector } from "react-redux";
import { decrementCartCount } from "../features/cartCountSlice";
import { addCartItemList } from "../features/cartItemSlice";
import useGetCartFood from "../hooks/useGetCartFood";
import { useEffect, useState } from "react";

export default function Cart() {
    const token = localStorage.getItem("auth-token");
    const dispatch = useDispatch();
    const count = useSelector(state => state.cartCount.count);
    const [orderFood, setOrderFood] = useGetCartFood();
    dispatch(addCartItemList(orderFood));
    const foodList = useSelector(state => state.cartItem.cartItems);
    const [countItem, setCountItem] = useState(0);
    const [food, setFood] = useState([]);

    useEffect(() => {
        setCountItem(localStorage.getItem("count"));
    }, [localStorage.getItem("count")]);

    function handleDeliverdFood(data) {
        const token = localStorage.getItem("auth-token");
        fetch("http:///localhost:3030/food/auth/user/deliverdfood", {
            method: 'POST',
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
                    console.log("some error occured!!");
                    throw new Error("Some error occured!");
                }
            })
            .then((res) => {
                setFood(res);
            })
            .catch((err) => {
                console.log("ERROR is ", err);
            })
    }

    const formattedCartList = foodList.map((item) => {
        return (
            <div class="card" style={{ marginTop: "2vh" }}>
                <h5 class="card-header">{item.restorentName}</h5>
                <div class="card-body oneCard" id="foodIdCard">
                    <div><img src={item.foodImg} /></div>
                    <div>
                        <h5 class="card-title">{item.foodName}</h5>
                        <p class="card-text">{item.foodDescription}</p>
                        <p class="card-text">Rs. {item.foodPrice}/-</p>
                        <button class="btn btn-danger me-3" onClick={async () => {
                            // count > 0 ? dispatch(decrementCartCount(1)) : dispatch(decrementCartCount(0));
                            localStorage.setItem("count", count - 1);
                            count > 0 ? dispatch(decrementCartCount(1)) : localStorage.setItem("count", 0);
                            await fetch(`https://bitebuddy-rgzf.onrender.com/food/auth/deleteorder/${item._id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'authorization': `bearer ${token}`
                                }
                            })
                            setOrderFood(orderFood.filter((food) => food._id !== item._id ? food : ""));
                            dispatch(addCartItemList(orderFood));
                        }}>Remove</button>
                        <span style={{ fontSize: "20px" }}>
                            <input type="checkbox" className="mx-2" id='check' onClick={async () => {
                                const btn = document.getElementById('check');
                                if (btn.checked) {
                                    const data = {
                                        foodName: item.foodName,
                                        foodPrice: item.foodPrice,
                                        restorentName: item.restorentName,
                                        foodImg: item.foodImg
                                    }
                                    handleDeliverdFood(data);
                                    await fetch(`https://bitebuddy-rgzf.onrender.com/food/auth/deleteorder/${item._id}`, {
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'authorization': `bearer ${token}`
                                        }
                                    })
                                    setOrderFood(orderFood.filter((food) => food._id !== item._id ? food : ""));
                                    dispatch((decrementCartCount(1)));
                                    btn.checked = false;
                                }
                            }}
                            />Delivered?
                        </span>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <>
            {count != 0 ?
                <div className="container">
                    {formattedCartList}
                </div>
                :
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png" alt="empty cart img" />
                    <h1>Your cart is empty!!</h1>
                </div>
            }
        </>
    )
}