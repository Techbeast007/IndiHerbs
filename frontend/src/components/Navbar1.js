

import React,{ useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import '../navbar.css'
import { Route,Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'


function Navbar1() {
	const navRef = useRef();
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
  
    const logoutHandler = () => {
      dispatch(logout())
    }

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<header>
			<h3><Link to={"/"}>INDIHERBS</Link></h3>
           
			<nav ref={navRef}>
            <Route render={({ history }) => <SearchBox history={history} />} />
				<Link to={"/cart"} onClick={showNavbar}><i className='fas fa-shopping-cart'></i> Cart</Link>
               {userInfo?<><Link to={"/profile"} onClick={showNavbar}>{userInfo.name}</Link>
               <Link to=""  onClick={logoutHandler}>Logout</Link></>:<Link to='/login' onClick={showNavbar}>
               
                    <i className='fas fa-user'></i> Sign In
                 
                </Link>

               } 
                 {userInfo && userInfo.isAdmin && (<>
                    <Link to={"/admin/userlist"} onClick={showNavbar}>Admin</Link>
                    <Link to={"/admin/productlist"} onClick={showNavbar}>Product List</Link>
                    <Link to={"/admin/orderlist"} onClick={showNavbar}>Order List</Link>
					<Link to={"/blogList"} onClick={showNavbar}>Blog List</Link>
                    </>
                    

                 )}
				<Link to={"/blog"} onClick={showNavbar}>Blog</Link>
			
			
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar1;