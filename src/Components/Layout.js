import { Link, Outlet, useLocation, useNavigate, } from 'react-router-dom';
    import '../index.css';
import useGetUserDetail from '../hooks/useGetUserDetail';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useGetCartFood from '../hooks/useGetCartFood';
import SellerLayout from './Seller components/SellerLayout';
import { getAllFood } from '../features/foodSlice';
import useGetAllFood from '../hooks/useGetAllFood';
import userContext from '../context/userContext';

export default function Layout() {
    const location = useLocation();
    const [user] = useGetUserDetail();
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const food = useSelector(state => state.food.foods);
    const cartCount = useSelector(state => state.cartCount.count);
    const temp = useGetAllFood();
    const foodList = useGetAllFood();
    console.log("temp is ", temp[0]);
    const dispatch = useDispatch();

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
            {location.pathname == '/user' ? <> <form className="d-flex" >
                <input style={{marginTop:"1vh",marginBottom:"1vh",margin:"1vh"}} className="form-control me-2" type="text" placeholder="Search" aria-label="Search" id='searchBtn' onChange={(e) => {
                    e.preventDefault();
                    dispatch(getAllFood(food.filter((item) => (item.foodName).toLowerCase().includes((e.target.value)))))
                }} onKeyUp={(e) => {
                    e.preventDefault();
                    if (e.key === "Backspace") {
                        let search = temp[0].filter((item) => ((item.foodName).toLowerCase()).includes(e.target.value));
                        console.log("key ", search)
                        dispatch(getAllFood(search));
                    }
                    if (e.target.value === "") {
                        dispatch(getAllFood(temp[0]));
                    }
                }} />
                <button style={{marginTop:"1vh",marginBottom:"1vh",margin:"1vh"}}  className="btn btn-outline-success" >Search</button>
            </form></> : ""}
            {
                localStorage.getItem("auth-token") ?
                    <>
                        <nav className="navbar navbar-expand-lg bg-body-tertiary">
                            <div className="container-fluid">
                                <a className="navbar-brand" href="#">BityBuddy</a>

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
                                        <li className="nav-item">
                                            <div className='mx-2 nav-link' style={{ cursor: "pointer" }}>
                                                {
                                                    token ?
                                                        <>
                                                            <div className='userInfo'>
                                                                <i className="fa-solid fa-user mx-2"></i>
                                                                <text className='userInfo'><Link to={'/user/profile'}>{user.username}</Link></text>
                                                            </div>
                                                        </>
                                                        : ""
                                                }
                                            </div>
                                        </li>
                                    </ul>

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
                    : <SellerLayout />
            }
        </>
    )
}