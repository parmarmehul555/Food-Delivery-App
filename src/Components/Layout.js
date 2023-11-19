import { Link, Outlet } from 'react-router-dom';
import '../index.css';

export default function Layout() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                <a class="navbar-brand" href="#">BityBuddy</a>
                    {/* <div className='logo'><img src="https://o.remove.bg/downloads/0d9c5319-f94b-4ca3-8de2-9eb01916f6a7/48712595597_4f09c9071d_w-removebg-preview.png" alt="logo"></img></div> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <div>
                <Outlet />
            </div>
            <div className='footer'>
            </div>
        </>
    )
}