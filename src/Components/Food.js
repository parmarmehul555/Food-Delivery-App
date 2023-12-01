import { useDispatch, useSelector } from "react-redux";
import useGetAllFood from "../hooks/useGetAllFood";
import { getAllFood } from "../features/foodSlice";
import { useNavigate } from "react-router-dom";
import useGetCartFood from "../hooks/useGetCartFood";
import '../index.css';

export default function Food() {
    const [allFood] = useGetAllFood();
    const dispatch = useDispatch();
    dispatch(getAllFood(allFood));
    const navigate = useNavigate();
    // localStorage.getItem("count");
    
    if(!localStorage.getItem("count")){
        localStorage.setItem("count",parseInt(0));
    }

    

    const food = useSelector(state => state.food.foods);
    let formattedData = food.map((item) => {
        return (
            <>
                <div className={window.innerWidth <= 756 && window.innerWidth >= 568 ? "col-6 card" :( window.innerWidth <= 479 ? "col-12" :"col-3")}>
                    <div class="card foodCard my-2" style={{ width: "17rem", height: "53vh" }} onClick={() => {
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
            <div className="container">
                <div className="row">
                    {formattedData}
                </div>
            </div>
        </>
    );
}