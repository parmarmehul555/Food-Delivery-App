import useGetSellerFood from "../hooks/useGetSellerFood"
import SellerFoodContext from "./SellerFoodContext"

const SellerFoodContextProvider = ({ children }) => {
    const [food, setFood] = useGetSellerFood();
    <SellerFoodContext.Provider value={{ food, setFood }}>
        {children}
    </SellerFoodContext.Provider>
}

export default SellerFoodContextProvider;