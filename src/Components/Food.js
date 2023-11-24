import { useDispatch, useSelector } from "react-redux";
import useGetAllFood from "../hooks/useGetAllFood";
import { getAllFood } from "../features/foodSlice";
import { useNavigate } from "react-router-dom";

export default function Food() {
    const [allFood] = useGetAllFood();
    const dispatch = useDispatch();
    dispatch(getAllFood(allFood));
    const navigate = useNavigate();

    const food = useSelector(state => state.food.foods);
    let formattedData = food.map((item) => {
        return (
            <>
                <div className="col-3">
                    <div class="card my-2" style={{ width: "17rem", height: "53vh" }} onClick={() => {
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