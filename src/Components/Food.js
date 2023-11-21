import useGetAllFood from "../hooks/useGetAllFood";

export default function Food(){
    const [food] = useGetAllFood();
    
    let formattedData = food.map((item)=>{
        return(
            <h1>{item.foodName}</h1>
        )
    })
    console.log("=========",food);
    console.log("------------",formattedData);
    
    return(
        <>
            {formattedData}
        </>
    );
}