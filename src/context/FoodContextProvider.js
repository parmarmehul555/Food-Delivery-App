import foodContext from "./foodContext";
import useGetAllFood from "../hooks/useGetAllFood";

const FoodContextProvider = ({ children }) => {
    const [food, setFood] = useGetAllFood();
    return (
        <foodContext.Provider value={{ food, setFood }}>
            {children}
        </foodContext.Provider>)
}

export default FoodContextProvider;