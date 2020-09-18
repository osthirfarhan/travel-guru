import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { hotelFakeData } from '../data/hoteldata';
import Header from '../Header/Header';
import HotelDetails from '../HotelDetails/HotelDetails';
import './Hotels.css';

import GoogleMap from '../GoogleMap/GoogleMap'



const Hotels = () => {
  const headerNavColor={
    color:'black',
   }

  const [ , ,selectedPlace,setSelectdPlace]=useContext(UserContext);

  const [hotelData,setHotelData]=useState(hotelFakeData);

   const matchedData=hotelData.filter(data=>data.category.toUpperCase()===selectedPlace);

  return (
    <div className='hotels'>
      <Header headerNavColor={headerNavColor} />
      <hr />
      <div className='container hotels__container '>
        <h5 className='text-muted'>252 Stays Apr 13-17 3 guests</h5>
        
         
        <h4>Stay in {selectedPlace} </h4>
        

        <div className='row'>
          <div className='col-md-6'>
              {
                 matchedData.map(hotelData=>
                  
                 <HotelDetails hotelDetails={hotelData}/>)
              }
          </div>
          <div className='col-md-6'>
             <GoogleMap/>
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hotels;