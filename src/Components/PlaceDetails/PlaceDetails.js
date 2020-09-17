import React, { useContext, useState } from 'react';
import './PlaceDetails.css'
import { useParams } from 'react-router-dom';
import {placeFakeData} from '../../placeData'
import Header from '../Header/Header';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const PlaceDetails = () => {
 const [placeData,setPlaceData]=useState(placeFakeData);

 const [, , selectedPlace,setSelectedPlace]=useContext(UserContext);
 console.log(selectedPlace,setSelectedPlace);
 
 const {placeName}=useParams();

 setSelectedPlace(placeName);
 const matchedPlace=placeData.find(pl=> pl.name==placeName);
    
 const {name,desc}=matchedPlace; 
  return (
    <div>
      <Header/>
      <div className='placeDetails__container row'>
        <div className='col-md-5 offset-1'>
          <h3>{name}</h3>
          <p>{desc}</p>
          <Link to='/hotels'>
            <Button size="sm" variant='warning' >Book</Button>
          </Link>
        </div>
        <div className='calender col-md-6'>
             
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
   