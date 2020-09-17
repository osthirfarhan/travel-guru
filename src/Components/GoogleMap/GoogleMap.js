import React, { useContext, useState } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { placeFakeData } from '../../placeData';
import { UserContext } from '../../App';



const GoogleMap = (props) => {
  const mapStyles = {
    width: '100%',
    height: '80%',
  };
  
  const [ , ,selectedPlace,setSelectdPlace]=useContext(UserContext);
  
  const [placeData,setPlaceData]=useState(placeFakeData)
  console.log(placeData);

  const matchedPlace=placeData.filter(place=>
        place.name===selectedPlace.toUpperCase()
    )

    const [lat,long]=matchedPlace;
    console.log(matchedPlace);


  return (
    <Map
          google={props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: {lat}, lng: {long}}}

      />
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBh15L6ZQVrZVsMjwAhb_3-X6bbgpSGtQk&callback'
})(GoogleMap);





// import React, { Component } from 'react';
// import { Map, GoogleApiWrapper } from 'google-maps-react';
// import placeFakeData from '../../placeData'

// const mapStyles = {
//   width: '100%',
//   height: '80%',
// };

// class GoogleMap extends Component {
//   render() {
//     return (
//       <Map
//       google={this.props.google}
//       zoom={8}
//       style={mapStyles}
//       initialCenter={{ lat: 47.444, lng: -122.176}}
//     />
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyBh15L6ZQVrZVsMjwAhb_3-X6bbgpSGtQk&callback'
// })(GoogleMap);