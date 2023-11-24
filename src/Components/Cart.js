import { useDispatch, useSelector } from "react-redux";
import { decrementCartCount } from "../features/cartCountSlice";
import { addCartItemList, removeCartItemList } from "../features/cartItemSlice";

export default function Cart() {
    const dispatch = useDispatch();
    const foodList = useSelector(state => state.cartItem.cartItems);
    const count = useSelector(state => state.cartCount.count);

    const formattedCartList = foodList.map((item, index) => {
        return (
            <div class="card" style={{ marginTop: "2vh" }}>
                <h5 class="card-header">{item.sellerName}</h5>
                <div class="card-body" id="foodIdCard">
                    <div><img src={item.foodImg} /></div>
                    <div>
                        <h5 class="card-title">{item.foodName}</h5>
                        <p class="card-text">{item.foodDescription}</p>
                        <p class="card-text">Rs. {item.foodPrice}/-</p>
                        <button class="btn btn-danger" onClick={() => {
                            count > 0 ? dispatch(decrementCartCount(1)) : dispatch(decrementCartCount(0));
                            dispatch(removeCartItemList(index));
                        }}>Remove</button>
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
                <h1>Your cart is empty!!!</h1>
            }
        </>
    )
}