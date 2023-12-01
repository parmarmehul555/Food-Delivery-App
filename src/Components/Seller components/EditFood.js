import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditFood() {
    const [data, setData] = useState({});
    const { foodId } = useParams();
    const token = localStorage.getItem("seller-token");
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:3030/restorent/seller/" + foodId, {
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

        fetch(`http://localhost:3030/restorent/seller/updatefood/${foodId}`, {
            method: "PUT",
            body: formData,
            headers: {
                'Content-type': 'multipart/form-data',
                'authorization': `bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error("Can not edit data");
            }
        }).then((res) => {
            setData(res);
            navigate('/seller/dashboard');
        })
            .catch((err) => {
                console.log("ERROR to edit data ", err);
            })
        console.log("data is ", data);

        // const result = axios.put(`http://localhost:3030/restorent/seller/updatefood/${foodId}`, formData, { headers: { 'Content-Type': 'multipart/form-data', 'authorization': `bearer ${token}` } })
    }


    return (
        <>
            <div id="foodData" style={{
                color: "white",
                height: "100vh",
                width: "100%",
            }}>
                <div id="food-details">
                    <h1 style={{
                    }}>Edit Food Details</h1>
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
                            <button type="button" className="btn btn-outline-success input-value" onClick={(e) => {
                                handleDataChanges(e);
                                const input_box = document.getElementsByClassName("input-value");
                                for (let temp of input_box) {
                                    temp.value = "";
                                }
                            }}>save changes</button>
                            <button type="reset" className="btn btn-danger">Reset</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}