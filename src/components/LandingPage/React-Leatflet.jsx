import { MapContainer } from 'https://cdn.esm.sh/react-leaflet/MapContainer'
import { useMap } from 'https://cdn.esm.sh/react-leaflet/hooks'

const ReactLeatflet = () => {
    
    function MyComponent() {
        const map = useMap()
        console.log('map center:', map.getCenter())
        return null
      }
    
    return (
        <MapContainer center={[50.5, 30.5]} zoom={13}>
          <MyComponent />
        </MapContainer>
      )
}
 
export default ReactLeatflet;