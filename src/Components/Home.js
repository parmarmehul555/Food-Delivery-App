import { Link } from 'react-router-dom';
import '../index.css';

export default function Home() {
    return (
        <div className="home">
            <div id='darkBg'>
                <p className='home-msg'>Welcome to <text><span>B</span>ite<span>B</span>uddy</text></p>
                <p className='home-msg'>Local Flavors, Global Taste</p>
                <Link to={'/food/auth/signup'}><button className='btn btn-primary'>Order now</button></Link>
            </div>
        </div>
    )
}