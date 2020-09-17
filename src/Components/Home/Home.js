import React from 'react';
import Header from '../Header/Header';
import './Home.css';
import Slider from '../Slider/Slider';
import {placeFakeData} from '../../placeData'
 
import { CardDeck } from 'react-bootstrap';
import { useState } from 'react';

const Home = () => {
 
  const [placeData,setPlaceData]=useState(placeFakeData);
 
  const [sliderAData,setSliderData]=useState("Cox's Bazar")
 
  const handleSliderData=(place)=>{
   setSliderData(place)
   }

 return (
    <div>
      <div>
        
       <Header/>
      </div>
     <div className='row'>
       <div className='place__desc col-md-4'>
          <h2>{sliderAData}</h2>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ut, nihil quisquam numquam rem molestiae!</p>
       </div>
       <div className='d-flex col-md-8'>
       <CardDeck >
          {
            placeData.map(place=>
             <Slider 
             placeDetails={place}
             handleSliderData={handleSliderData}
             />
               )
          }
        </CardDeck>
       </div>
     </div>
     
      
    </div>
  );
};

export default Home;