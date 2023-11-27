import { useState } from "react"

export default function AddFood() {
    const [data, setData] = useState({});

    function handleData(e) {
        e.preventDefault();
        const token = localStorage.getItem("seller-token");
        fetch("http://localhost:3030/restorent/seller/fooddetails", {
            method: 'POST',
            body: JSON.stringify(data),
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
                    throw new Error("can not send data to server");
                }
            })
            .then((res) => {
                setData(res);
            })
            .catch((err) => {
                console.log("ERROR to send data to server is ", err);
            })
    }

    return (
        <>
            <form action="/fooddetails" method="POST" encType="multipart/form-data">
                <table>
                    <tr>
                        <td><label>Food Name</label></td>
                        <td><input type="text" placeholder="Food Name" onChange={(e) => {
                            setData({ ...data, name: e.target.value })
                        }} /></td>
                    </tr>
                    <tr>
                        <td><label>Food Price</label></td>
                        <td><input type="text" placeholder="Food Price" onChange={(e) => {
                            setData({ ...data, price: e.target.value })
                        }} /></td>
                    </tr>
                    <tr>
                        <td><label>Food Description</label></td>
                        <td><input type="text" placeholder="Food Description" onChange={(e) => {
                            setData({ ...data, description: e.target.value })
                        }} /></td>
                    </tr>
                    <tr>
                        <td><label>Food Iamge</label></td>
                        <td><input type="file" name="avatar" onChange={(e) => {
                            console.log("dsfa",e.target.files);
                            const temp = e.target.files[0];
                            console.log("============",temp);
                            setData({ ...data, img: temp });
                        }} /></td>
                    </tr>
                    <tr>
                        <td><label>Food Type</label></td>
                        <td><input type="text" placeholder="Food Type" onChange={(e) => {
                            setData({ ...data, type: e.target.value })
                        }} /></td>
                    </tr>
                    <tr>
                        <td><button className="btn btn-outline-success" onClick={(e) => {
                            console.log(data);
                            handleData(e);
                        }}>Submit</button></td>
                        <td><button className="btn btn-outline-danger">Reset</button></td>
                    </tr>
                </table>
            </form>
        </>
    )
}