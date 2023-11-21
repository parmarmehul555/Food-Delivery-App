import useGetAllFood from "../hooks/useGetAllFood";

export default function Food(){
    const [food] = useGetAllFood();
    
    let formattedData = food.map((item)=>{
        return(
            <>
            <h1>{item.foodName}</h1>
            <img src={item.foodImg}/>
            </>
        )
    })
    
    return(
        <>
            {formattedData}
        </>
    );
}