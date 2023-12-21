import foodContext from "./foodContext";
import useGetAllFood from "../hooks/useGetAllFood";
import { useParams } from "react-router-dom";
import useGetFoodById from "../hooks/useGetFoodById";
import { useEffect, useState } from "react";


const FoodContextProvider = ({ children }) => {
    const {foodId} = useParams();
    const [data, setData] = useState({});
    const [food] = useGetFoodById(foodId);
    
        setData(food);
    return (
        <foodContext.Provider value={{ data, setData }}>
            {children}
        </foodContext.Provider>)
}

export default FoodContextProvider;