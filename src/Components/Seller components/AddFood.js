import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import foodContext from "../../context/foodContext";

export default function AddFood(props) {
    console.log(props);
    const [data, setData] = useState({});

    function handleData(e) {
        e.preventDefault();
        const token = localStorage.getItem("seller-token");

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("description", data.description);
        formData.append("img", data.img);
        formData.append("type", data.type);
        console.log(formData.get("price"));

        const result = axios.post('http://localhost:3030/restorent/seller/fooddetails', formData, { headers: { 'Content-Type': 'multipart/form-data', 'authorization': `bearer ${token}` } })
    }

    return (
        <>
            <div id="foodData" style={{
                color: "white",
                height: "100vh",
                width: "100%",
            }}>
                <div id="food-details">
                    <h1 style={{textAlign:"center"}}>Add Food Details</h1>
                    <form action="/restorent/seller/fooddetails" method="POST" enctype="multipart/form-data" onSubmit={(e) => {
                        handleData(e);
                        const input_box = document.getElementsByClassName("input-value");
                        for (let temp of input_box) {
                            temp.value = "";
                        }
                    }}>

                        <div className="formIp">
                            <input className="ipField" type="text" placeholder="Food Name" value={data.foodName} onChange={(e) => {
                                setData({ ...data, name: e.target.value })
                            }} />
                        </div>
                        <div className="formIp">
                            <input className="ipField" type="text" placeholder="Food Price" value={data.foodPrice} onChange={(e) => {
                                setData({ ...data, price: e.target.value })
                            }} />
                        </div>
                        <div className="formIp">
                            <textarea className="ipField" placeholder="Food Description" value={data.foodDescription} onChange={(e) => {
                                setData({ ...data, description: e.target.value })
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
                                setData({ ...data, type: e.target.value })
                            }} />
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            marginTop: "10px"
                        }}>
                            <button className="btn btn-outline-success input-value">{props.isAdd ? "send" : "save changes"}</button>
                            <button type="reset" className="btn btn-danger">Reset</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}