import { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetSellerFood from "../../hooks/useGetSellerFood";

export default function Home() {
    const [data, setData] = useGetSellerFood();
    const navigate = useNavigate();

    const formattedData = data.map((item) => {
        return (
            <>
                <div className="row" onClick={(e) => {
                    console.log("id ", item._id)
                }}>
                    <div className="col text">
                        <p>{item.foodName}</p>
                    </div>
                    <div className="col text">
                        <p>{item.foodDescription}</p>
                    </div>
                    <div className="col text">
                        <p>{item.foodType}</p>
                    </div>
                    <div className="col text">
                        <p>{item.foodPrice}</p>
                    </div>
                    <div className="col">
                    <h5><i class="fa-solid fa-pen text-success cursor" onClick={() => {
                            navigate(`/seller/${item._id}`);
                        }}></i></h5>
                    </div>
                    <div className="col ">
                        <h5><i class="fa-solid fa-trash text-danger cursor" onClick={(e) => {
                            const token = localStorage.getItem("seller-token");
                            fetch('http://localhost:3030/restorent/seller/deletefood', {
                                method: "DELETE",
                                headers: {
                                    'Content-Type': 'application/json',
                                    'authorization': `bearer ${token}`
                                }
                            }).then((res) => {
                                setData(data.filter((obj) => obj._id !== item._id));
                            });
                        }}></i></h5>
                    </div>
                </div>
            </>
        )
    })

    return (
        <div className="" >
        <div className="container text-center border " style={{backgroundImage:"linear-gradient(45deg,#D1916D,#F5D7DB,#BD8388)"}}>
            <div className="row">
                <div className="col text-light">
                    <h4>Food Name</h4>
                </div>
                <div className="col text-light">
                    <h4>Food Description</h4>
                </div>
                <div className="col text-light">
                    <h4>Food Type</h4>
                </div>
                <div className="col text-light">
                    <h4>Food Price</h4>
                </div>
                <div className="col text-light">
                    <h4>Edit Food Data</h4>
                </div><div className="col text-light">
                    <h4>Remove Food</h4>
                </div>
            </div>
            {formattedData}
        </div>
        </div>
    )
}