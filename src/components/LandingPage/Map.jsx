import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
// import useMap from 'https://cdn.esm.sh/react-leaflet/hooks'
import { useState, useEffect } from "react";
// import { useMap } from 'https://cdn.esm.sh/react-leaflet/hooks'
import L from "leaflet";

const Test = () => {
  // const [position, setPosition] = useState([37.699739, 51.338097]);
  const position = [37.699739, 51.338097];
  // console.log(position);
  // const map = useMap();
  // useEffect(() => {
  //   console.log('dkljaskldjlk')
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     console.log(position.coords);
  //     setPosition({
  //       lat:position.coords.latitude,
  //       lng:position.coords.longitude
  //     });
  //   } , (error) =>{
  //     console.log("error : " , error);
  //   });
  // }, []);
  // const [bbox, setBbox] = useState([]);
  // const map = useMap();
  // useEffect (() => {
  //   map.locate().on('locationfound', function(e) {
  //     console.log(e);
  //     setPosition({
  //       lat:e.latlng.lat,
  //       lng:e.latlng.lng
  //     })
  //     // map.flyTo(e.latlng, map.getZoom())
  //     const radius = e.accuracy;
  //     const circle = L.circle(e.latlng, radius);
  //     circle.addTo(map);
  //     setBbox(e.bounds.toBBoxString().split(","));
  //   })
  // },[])

  // const [position, setPosition] = useState(null);
  // const [bbox, setBbox] = useState([]);
  // const map = useMap()
  // useEffect (()=>{
  //   map.locate().on('locationfound',function(e) {
  //     setPosition(e.latlng);
  //     map.flyTo(e.latlng, map.getZoom())
  //     const radius = e.accuracy;
  //     const circle = L.circle(e.latlng, radius);
  //     circle.addTo(map);
  //     setBbox(e.bounds.toBBoxString().split(","));
  //   })
  // },[map])

  return (
    <div>
      <MapContainer center={[37.699739, 51.338097]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[37.699739, 51.338097]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      {/* <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
    </MapContainer> */}
    </div>
  );
};

export default Test;
