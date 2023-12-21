import { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetSellerFood from "../../hooks/useGetSellerFood";
import Swal from "sweetalert2";

export default function Home() {
    const [data, setData] = useGetSellerFood();
    const navigate = useNavigate();

    const formattedData = data.map((item) => {
        return (
            <>
                <div className="row" onClick={(e) => {
                    console.log("id ", item._id)
                }}>
                    <div className="col">
                        <text id="food-product">{item.foodName}</text>
                    </div>
                    <div className="col">
                        <text id="food-product"><img src={item.foodImg} style={{width:"150px"}}/></text>
                    </div>
                    <div className="col">
                        <text id="food-product">{item.foodDescription}</text>
                    </div>
                    <div className="col">
                        <text id="food-product">{item.foodType}</text>
                    </div>
                    <div className="col">
                        <text id="food-product"><i class="fa-solid fa-indian-rupee-sign"></i> {item.foodPrice} /-</text>
                    </div>
                    <div className="col">
                        <h5><i class="fa-solid fa-pen text-success cursor" onClick={() => {
                            navigate(`/seller/${item._id}`);
                        }}></i></h5>
                    </div>
                    <div className="col ">
                        <h5><i class="fa-solid fa-trash text-danger cursor" onClick={(e) => {
                            Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!"
                            }).then(async (result) => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success"
                                    });
                                    const token = localStorage.getItem("seller-token");
                                    await fetch('https://bitebuddy-rgzf.onrender.com/restorent/seller/deletefood', {
                                        method: "DELETE",
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'authorization': `bearer ${token}`
                                        }
                                    }).then((res) => {
                                        setData(data.filter((obj) => obj._id !== item._id));
                                    });
                                }
                                else {
                                    navigate('/seller/dashboard');
                                }
                            });

                        }}></i></h5>
                    </div>
                </div>
            </>
        )
    })

    return (
        <div className="container-fluied text-center border foodDashboard" style={{ backgroundImage: "linear-gradient(45deg,#D1916D,#F5D7DB,#BD8388)" }}>
            <div className="row">
                <div className="col text-light">
                    <h5>Name</h5>
                </div>
                <div className="col text-light">
                    <h5>Image</h5>
                </div>
                <div className="col text-light">
                    <h5>Description</h5>
                </div>
                <div className="col text-light">
                    <h5>Type</h5>
                </div>
                <div className="col text-light">
                    <h5>Price</h5>
                </div>
                <div className="col text-light">
                    <h5>Edit</h5>
                </div><div className="col text-light">
                    <h5>Remove</h5>
                </div>
            </div>
            {formattedData}
        </div>
    )
}