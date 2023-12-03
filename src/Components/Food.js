import { useDispatch, useSelector } from "react-redux";
import useGetAllFood from "../hooks/useGetAllFood";
import { getAllFood } from "../features/foodSlice";
import { useNavigate } from "react-router-dom";
import useGetCartFood from "../hooks/useGetCartFood";
import '../index.css';
import { useEffect } from "react";

export default function Food() {

    const [allFood] = useGetAllFood();
    const navigate = useNavigate();
    const [orderFood, setOrderFood, count, setCount] = useGetCartFood();

    useEffect(() => {
        localStorage.setItem("count", count);
    }, [count])

    const food = useSelector(state => state.food.foods);
    let formattedData = food.map((item) => {
        return (
            <>
                <div className={window.innerWidth <= 756 && window.innerWidth >= 568 ? "col-6 foodCard" : (window.innerWidth <= 479 ? "col-12 foodCard" : "col-3 foodCard")}>
                    <div class="card foodCardDetails my-2" style={{ width: "17rem", height: "53vh" }} onClick={() => {
                        navigate(`/food/${item.sellerName}`)
                    }}>
                        <img style={{ height: "225px" }} src={item.foodImg} class="card-img-top" alt="Food Img" />
                        <div class="card-body">
                            <h5 class="card-title">{item.sellerName}</h5>
                            <p class="card-text">Rs. {item.foodPrice}/-</p>
                            <div class="card-text" style={{ height: "29px", overflow: "hidden" }}>{item.foodDescription}</div>
                        </div>
                    </div>
                </div>
            </>
        )
    })

    return (
        <>
            <div className="container foodContainer">
                <div className="row">
                    {formattedData}
                </div>
            </div>
        </>
    );
}