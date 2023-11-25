import { useDispatch, useSelector } from "react-redux";
import { decrementCartCount } from "../features/cartCountSlice";
import { addCartItemList } from "../features/cartItemSlice";
import useGetCartFood from "../hooks/useGetCartFood";

export default function Cart() {
    const token = localStorage.getItem("auth-token");
    const dispatch = useDispatch();
    const count = useSelector(state => state.cartCount.count);
    const [orderFood, setOrderFood] = useGetCartFood();
    console.log("'''''''''''''''''''''''''''''''", orderFood)
    dispatch(addCartItemList(orderFood));
    const foodList = useSelector(state => state.cartItem.cartItems);

    const formattedCartList = foodList.map((item) => {
        return (
            <div class="card" style={{ marginTop: "2vh" }}>
                <h5 class="card-header">{item.sellerName}</h5>
                <div class="card-body" id="foodIdCard">
                    <div><img src={item.foodImg} /></div>
                    <div>
                        <h5 class="card-title">{item.foodName}</h5>
                        <p class="card-text">{item.foodDescription}</p>
                        <p class="card-text">Rs. {item.foodPrice}/-</p>
                        <button class="btn btn-danger" onClick={async () => {
                            count > 0 ? dispatch(decrementCartCount(1)) : dispatch(decrementCartCount(0));
                            localStorage.setItem("count", count - 1);
                            await fetch(`http://localhost:3030/food/auth/deleteorder/${item._id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'authorization': `bearer ${token}`
                                }
                            })
                            setOrderFood(orderFood.filter((food) => food._id !== item._id ? food : ""));
                            dispatch(addCartItemList(orderFood));
                        }}>Remove</button>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <>
            {/* count != 0 ? */}
            <div className="container">
                {formattedCartList}
            </div>
            {/* // :
            // <h1>Your cart is empty!!!</h1>
            //  */}
        </>
    )
}