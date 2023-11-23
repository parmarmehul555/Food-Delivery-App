import { useDispatch, useSelector } from "react-redux";
import useGetAllFood from "../hooks/useGetAllFood";
import { getAllFood } from "../features/foodSlice";

export default function Food() {
    const [allFood] = useGetAllFood();
    const dispatch = useDispatch();
    dispatch(getAllFood(allFood));  

    const food = useSelector(state => state.food.foods);
        let formattedData = food.map((item) => {
            return (
                <>
                    <div className="col-3">
                        <div class="card" style={{ width: "17rem", height: "58vh" }}>
                            <img style={{ height: "225px" }} src={item.foodImg} class="card-img-top" alt="Food Img" />
                            <div class="card-body">
                                <h5 class="card-title">{item.sellerName}</h5>
                                <p class="card-text">Rs. {item.foodPrice}/-</p>
                                <div class="card-text" style={{ height: "29px", overflow: "hidden" }}>{item.foodDescription}</div>
                                <a href="#" class="btn btn-primary">Add</a>
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