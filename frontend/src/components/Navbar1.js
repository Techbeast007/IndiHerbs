

import React,{ useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import '../navbar.css'
import { Route,Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import { NavDropdown } from "react-bootstrap";


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
			{/* <i className='fas fa-shopping-cart links' ></i>  */}
			<nav ref={navRef}>
            <Route render={({ history }) => <SearchBox history={history} />} />
				<Link to={"/cart"} onClick={showNavbar} className='links'> Cart</Link>
               {userInfo?<><Link to={"/profile"} onClick={showNavbar} className='links'>{userInfo.name}</Link>
               <Link to=""  onClick={logoutHandler} className='links'>Logout</Link></>:<Link to='/login' onClick={showNavbar} className='links'>
               
                    <i className='fas fa-user' ></i> Sign In
                 
                </Link>

               } 

				<Link to={"/blog"} onClick={showNavbar} className='links'>Blog</Link>
				{userInfo && userInfo.isAdmin && (<NavDropdown title="Admin Menu" className="links" >
			<>
			
				<NavDropdown.Item className="droped">
					 <Link to={"/admin/userlist"} onClick={showNavbar} className="links">Admin</Link>

				</NavDropdown.Item>
				<NavDropdown.Item className="droped">
				<Link to={"/admin/productlist"} onClick={showNavbar} className="links">Product List</Link>

		   </NavDropdown.Item>
		   <NavDropdown.Item className="droped"> <Link to={"/admin/orderlist"} onClick={showNavbar} className="links">Order List</Link></NavDropdown.Item>
		   <NavDropdown.Item className="droped"><Link to={"/blogList"} onClick={showNavbar} className="links">Blog List</Link></NavDropdown.Item>
		   </> 
			</NavDropdown>)}
			
			
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