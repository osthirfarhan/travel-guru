import React from 'react';
import './HotelDetails.css';


const HotelDetails = (props) => {
   const {name,bedDesc,kitchenType,flexiblity,rating,price,imageUrl}=props.hotelDetails;
  
 return (
    <div className='hotel__details'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='hotelDetails__imgContainer'>
            <img src={imageUrl} />
          </div>
        </div>
        <div className='col-md-6'>
         <h4 className='hotelDetails__name'>
           {name}
         </h4>
         <p className='hotelDetails__description'>
           {bedDesc}
         </p>
         <p>
           {kitchenType}
         </p>
         <p>
           {flexiblity}
         </p>
         <p>
           <span>
             <i className="fas fa-star"></i>
           </span>
           <span>
             {rating}
           </span>
           <span>
             {price} $123 Total
           </span>
         </p>
        </div>

      </div>
      
    </div>
  );
};

export default HotelDetails;