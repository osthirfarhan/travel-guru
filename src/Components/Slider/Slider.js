import React, { useContext } from 'react';
import './Slider.css'
import { Card, CardDeck } from 'react-bootstrap';
import background from '../../Images/background.png'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Slider = (props) => {

  const {name,photoUrl}=props.placeDetails;
  
  const handleSliderData =props.handleSliderData;
  
 


  const [ , ,selectedPlace,setSelectdPlace]=useContext(UserContext);
  

  return (
    <Link  to={`/place/${name}`} style={{textDecoration:'none'}} >
       
       <Card border="dark" style={{ width: '12rem',height:'10rem' }}>
          <Card.Img className='card__img' variant="top" src={photoUrl} />
        <Card.Title className='card__title' onMouseOver={()=>handleSliderData(name)} >{name}</Card.Title>
       </Card>
    </Link>
  );
};

export default Slider;