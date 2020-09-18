import React from 'react';
import './Header.css';
import Logo from '../../Images/Logo.png'
import { Button } from 'react-bootstrap';
import { Link }  from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../App';
import { googleSignOut } from '../Login/loginManager';



const Header = ({headerNavColor}) => {

  const [user,setUser]=useContext(UserContext);

  const handleGooglesignOut=()=>{
    googleSignOut()
    .then((res)=>{
      setUser(res);
    }
    )
  }

  return (
    <div className='header'>
      <Link to='/home'>
        <div className='header__logo'>
          <img className='header__logoImage' src={Logo}></img>
        </div>
      </Link>
      <div className='header__search'>
        <input className='header__searchInput' type='text' name='search' placeholder='Enter Your Destination'/>
     </div>
     <nav className='header__nav'>
       
       <Link  to='/news'>
         <span style={headerNavColor}>
           News
        </span></Link> 
       <Link to='/destination'>
         <span style={headerNavColor}>
           Destination
         </span></Link> 
       <Link to='/blog'>
         <span style={headerNavColor}>
           Blog
         </span></Link> 
       <Link to='/contact' >
         <span style={headerNavColor}>
          Contact
         </span>
       </Link> 
        {
        user && user.isSignedIn ?
        <div>
          <Button onClick={handleGooglesignOut} variant="danger">Log out</Button>
          <p className='user__name'>{user.name}</p>
        </div>
          :
         <Link to='/login'>
            <Button variant="warning">Log In</Button>{' '}
        </Link>
       }
      
    </nav>
    
      
      
      
    </div>
  );
};

export default Header;