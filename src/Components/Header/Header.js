import React from 'react';
import './Header.css';
import Logo from '../../Images/Logo.png'
import { Button } from 'react-bootstrap';
import { Link }  from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../App';
import { googleSignOut } from '../Login/loginManager';



const Header = () => {

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
      <Link to='home'>
        <div className='header__logo'>
          <img className='header__logoImage' src={Logo}></img>
        </div>
      </Link>
      <div className='header__search'>
        <input className='header__searchInput' type='text' name='search' placeholder='Enter Your Destination'/>
     </div>
     <div className='header__nav'>
       <Link to='/news'>News</Link> 
       <Link to='/destination'>Destination</Link> 
       <Link to='/blog'>Blog</Link> 
       <Link to='/contact' hr>Contact</Link> 
        {
        user && user.isSignedIn ?
        <div>
          <Button onClick={handleGooglesignOut} variant="danger">Log out</Button>
          <p>{user.name}</p>
        </div>
          :
         <Link to='/login'>
            <Button variant="warning">Log In</Button>{' '}
        </Link>
       }
      
    </div>
    
      
      
      
    </div>
  );
};

export default Header;