import React, { useContext, useState } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { placeFakeData } from '../data/placeData';
import { UserContext } from '../../App';



const GoogleMap = (props) => {
  const mapStyles = {
    width: '100%',
    height: '80%',
  };
  
  const [ , ,selectedPlace,setSelectdPlace]=useContext(UserContext);
  
  const [placeData,setPlaceData]=useState(placeFakeData)
  

  const matchedPlace=placeData.filter(place=>
        place.name===selectedPlace.toUpperCase()
    )

    const {lat,long}=matchedPlace[0];
    
    const latitude=parseFloat(lat);
    const longitude=parseFloat(long)
    

  return (
    <Map
          google={props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: {latitude}, lng: {longitude}}}

      />
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDG3ce9_Hg7lv7dKVBc45WpOD5AugzJzOQ'
})(GoogleMap);





