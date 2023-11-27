import { Link, Outlet, useLocation, useNavigate, } from 'react-router-dom';
import '../index.css';
import useGetUserDetail from '../hooks/useGetUserDetail';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useGetCartFood from '../hooks/useGetCartFood';
import SellerLayout from './Seller components/SellerLayout';

export default function Layout() {
    const location = useLocation();
    const [user] = useGetUserDetail();
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const food = useSelector(state => state.food.foods);
    const cartCount = useSelector(state => state.cartCount.count);
    console.log("dfajkdkf", cartCount)

    const [count, setCount] = useState(0);
    useEffect(() => {

    }, [location])

    useEffect(() => {
        if (location.pathname !== "/food/auth/login" || location.pathname !== "/food/auth/signup") {
            setToken(localStorage.getItem("auth-token"));
        }
        else {
            setToken("");
        }
    }, [location.pathname]);

    return (
        <>
            {
                localStorage.getItem("auth-token")?
                <>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">BityBuddy</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to={localStorage.getItem('auth-token') ? '/user' : '/food/auth/login'}>Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/user/yourorders'} className="nav-link" href="#">Your Orders</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/seller/signup'} className="nav-link" href="#">Become a seller</Link>
                                    </li>
                                </ul>
                                <form className="d-flex" >
                                    <input className="form-control me-2" type="text" placeholder="Search" aria-label="Search" id='searchBtn' />
                                    <button className="btn btn-outline-success" >Search</button>
                                </form>
                                <div className='mx-2' style={{ cursor: "pointer" }}>
                                    {
                                        token ?
                                            <div className='userInfo'>
                                                <i className="fa-solid fa-user mx-2"></i>
                                                <text>{user.username}</text>
                                            </div>
                                            : ""
                                    }
                                </div>
                                <Link to={'/food/foocart'}>
                                    <div className='mx-3'>
                                        {
                                            token ?
                                                <button type="button" class="btn position-relative">
                                                    <i class="fa-solid fa-cart-shopping"></i>
                                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger my-1">
                                                        {/* {localStorage.getItem("count")} */}
                                                        {cartCount}
                                                    </span>
                                                </button>
                                                : ""
                                        }
                                    </div>
                                </Link>
                                <div className='mx-2'>
                                    {token ? <button className='btn btn-outline-danger' onClick={() => {
                                        localStorage.clear();
                                        setToken("");
                                        navigate('/food/auth/login');
                                    }}>Log out</button> : ""}
                                </div>
                            </div>
                        </div>
                    </nav >
                    <div>
                        <Outlet />
                    </div>
                    <div className='footer'>
                    </div>
                </>
                :<SellerLayout/>
            }
        </>
    )
}