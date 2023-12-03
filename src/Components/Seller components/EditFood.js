import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditFood() {
    const [data, setData] = useState({});
    const { foodId } = useParams();
    const token = localStorage.getItem("seller-token");
    const navigate = useNavigate();
    useEffect(() => {
        fetch("https://bitebuddy-rgzf.onrender.com/restorent/seller/" + foodId, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${token}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    throw new Error("Can not fetch data");
                }
            })
            .then((res) => {
                setData(res);
            })
    }, []);

    function handleDataChanges(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("foodName", data.foodName);
        formData.append("foodPrice", data.foodPrice);
        formData.append("foodDescription", data.foodDescription);
        formData.append("foodImg", data.foodImg);
        formData.append("foodType", data.foodType);

        const result = axios.put(`https://bitebuddy-rgzf.onrender.com/restorent/seller/updatefood/${foodId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': `bearer ${token}`
                }
            })

        navigate('/seller/dashboard');
    }


    return (
        <>
            <div id="foodData">
                <div id="food-details">
                    <h1 >Edit Food Details</h1>
                    <form action={`/updatefood/${foodId}`} method="PUT" enctype="multipart/form-data">

                        <div className="formIp">
                            <input className="ipField" type="text" placeholder="Food Name" value={data.foodName} onChange={(e) => {
                                console.log(e.target.value);
                                setData({ ...data, foodName: e.target.value })
                            }} />
                        </div>
                        <div className="formIp">
                            <input className="ipField" type="text" placeholder="Food Price" value={data.foodPrice} onChange={(e) => {
                                console.log(e.target.value);
                                setData({ ...data, foodPrice: e.target.value })
                            }} />
                        </div>
                        <div className="formIp">
                            <textarea className="ipField" placeholder="Food Description" value={data.foodDescription} onChange={(e) => {
                                setData({ ...data, foodDescription: e.target.value })
                            }} ></textarea>
                        </div>
                        <div className="formIp">
                            <input className="ipField" type="file" name="img" placeholder="Food Image" onChange={(e) => {
                                const temp = e.target.files[0];
                                console.log("AVB In form = ", temp);
                                setData({ ...data, img: temp });
                            }} />
                        </div>
                        <div className="formIp">
                            <input className="ipField" type="text" placeholder="Food Type" value={data.foodType} onChange={(e) => {
                                setData({ ...data, foodType: e.target.value })
                            }} />
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            marginTop: "10px"
                        }}>
                            <Link to={'/seller/dashboard'}><button type="button" className="btn btn-outline-success input-value" onClick={(e) => {
                                const btn = Swal.fire({
                                    title: "Are you sure?",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes"
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        Swal.fire({
                                            title: "Done!",
                                            text: "Data saved successfully!",
                                            icon: "success"
                                        });
                                        handleDataChanges(e);
                                        navigate('/seller/dashboard');
                                    }else{
                                    navigate(`/seller/${data._id}`)
                                    }
                                });
                                const input_box = document.getElementsByClassName("input-value");
                                for (let temp of input_box) {
                                    temp.value = "";
                                }
                            }}>save changes</button></Link>
                            <Link to={'/seller/dashboard'}><button type="reset" className="btn btn-danger" >cancel</button></Link>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}