
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Home from './Components/Home/Home'
import Login from './Components/Login/Login';
import Header from './Components/Header/Header';
import { useState } from 'react';
import { createContext } from 'react';
import PlaceDetails from './Components/PlaceDetails/PlaceDetails';
import Hotels from './Components/Hotels/Hotels';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext=createContext();


function App() {

  const [user,setUser]=useState({
    isSignedIn:false,
    name:'',
    email:'',
    password:'',
    isCreatedNow:false,
    isPassValid:true
  })
  
  const [selectedPlace,setSelectdPlace]=useState('Sundarban')
  
  return (
    <UserContext.Provider value={[user,setUser,selectedPlace,setSelectdPlace]} >
    
    <Router>
      <Switch>
        
        <Route path='/home'>
          <Home/>
        </Route>
        
        <Route path='/login'>
          <Header/>
          <Login/>
        </Route>
        
        <Route path='/place/:placeName'>
          <PlaceDetails/>
        </Route>
        
        <PrivateRoute path='/hotels'>
          <Hotels/>
        </PrivateRoute>
        
        <Route exact path='/'>
         <Home/>
         </Route>
         
         <Route  path='*'>
          <h4>Error 404</h4>
         </Route>
        
        </Switch>
     </Router>
    
    </UserContext.Provider>
    );
}

export default App;
