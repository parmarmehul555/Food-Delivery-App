import { Link } from 'react-router-dom';
import '../index.css';

export default function Home() {
    if(!localStorage.getItem("count")){
        localStorage.setItem("count",parseInt(0));
    }
    return (

        <div className="home" >
            <div id='darkBg'>
                <div style={{ marginTop: "30vh" }}>
                    <p className='home-msg'>Welcome to <text><span>B</span>ite<span>B</span>uddy</text></p>
                    <p className='home-msg'>Local Flavors, Global Taste</p>
                    <Link to={'/food/auth/signup'}><button className='btn btn-primary'>Order now</button></Link>
                </div>
            </div>

        </div >


    )
}