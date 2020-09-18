import React, { useContext, useState } from 'react';
import './PlaceDetails.css'
import { useParams } from 'react-router-dom';
import {placeFakeData} from '../data/placeData'
import Header from '../Header/Header';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import BookingForm from './BookingForm/BookingForm';

const PlaceDetails = () => {
 const [placeData,setPlaceData]=useState(placeFakeData);

 const [, , selectedPlace,setSelectedPlace]=useContext(UserContext);

 
 const {placeName}=useParams();

 setSelectedPlace(placeName);
 const matchedPlace=placeData.find(pl=> pl.name==placeName);
    
 const {name,desc}=matchedPlace; 

 const headerNavColor={
   color:'white',
  
}
  return (
    <div className='bookingDetails'>
     <div className='overlay'>
     <div>
        <Header headerNavColor={headerNavColor}/>
      </div>
      
     
        <div className='row mt-5'>
          
          <div className='offset-1 col-md-4 offset-1 my-5 '>
            <h3>{name}</h3>
            <p>{desc}</p>
            <Link to='/hotels'>
              <Button size="sm" variant='warning' >Book</Button>
            </Link>
          </div>
          
          <div className='offse-1 col-md-4 offset-1'>
            <BookingForm/>
          </div>
        
        </div>
      
     </div>
    
    </div>
  );
};

export default PlaceDetails;
   