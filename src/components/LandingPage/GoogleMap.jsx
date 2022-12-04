import React from "react";
import GoogleMapReact from 'google-map-react';
import { useState } from "react";
import { useEffect } from "react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
    const[location,setLocation] = useState(null);
    const getLocation=()=>{
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position)

        },(err)=>{
            console.log(err);
        });
    }
    useEffect(()=>{
        getLocation();
    },[])
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100vw' ,zIndex:'10000' ,position :'absolute' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}