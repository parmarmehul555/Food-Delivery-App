import { Link } from 'react-router-dom';
import '../index.css';

export default function Home() {
    const token = localStorage.getItem("auth-token");
    return (

        <div className="home" >
            <div id='darkBg'>
                <div style={{ marginTop: "30vh" }}>
                    <p className='home-msg'>Welcome to <text><span>B</span>ite<span>B</span>uddy</text></p>
                    <p className='home-msg'>Local Flavors, Global Taste</p>
                    <Link to={token ? '/user' : '/food/auth/signup'}><button className='btn btn-primary'>Order now</button></Link>
                </div>
            </div>

        </div >


    )
}