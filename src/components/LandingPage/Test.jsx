import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import {useState,useEffect} from 'react';

const Test = () => {
  const [position, setPosition] = useState({
    lat:0,
    lng:0
  });
  // console.log(position);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords);
      setPosition({
        lat:position.coords.latitude,
        lng:position.coords.longitude
      });
    });
  }, []);
  
  
  return (
    <div>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      , )
    </div>
  );
};

export default Test;
