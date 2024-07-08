import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import axios from "axios";

export const Location = ({ icon, address, destination }) => {
  const [position, setPosition] = useState(null);
  const [route, setRoute] = useState(null);

  useEffect(() => {
    // Get current location on component mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting current location:', error);
          // Fallback to default coordinates if geolocation fails
          setPosition({ lat:12.971599, lng: 77.594566 });
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Fallback to default coordinates
      setPosition({ lat: 19.817743, lng: 85.828629 });
    }
  }, []);

  useEffect(() => {
    if (position?.lat && position?.lng && destination?.lat && destination?.lng) {
      console.log('Fetching directions for:', position, destination);
      fetchDirections(position, destination);
    }
  }, [position, destination]);

  const mapStyles = {
    height: "67vh",
    width: "96vw",
    maxWidth: "100%",
    maxHeight: "80%",
    border: "1px solid black"
  };

  const fetchDirections = async (position, destination) => {
    setRoute(null);
    try {
      const res = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car`, {
        params: {
          api_key: '5b3ce3597851110001cf62489e5a34c059a04d448b892d87739cc3bf',
          start: `${position.lng},${position.lat}`,
          end: `${destination.lng},${destination.lat}`
        }
      });

      console.log('Response from OpenRouteService:', res.data);

      if (res.data?.features?.length > 0) {
        const coordinates = res.data.features[0].geometry.coordinates.map(coord => ({
          lat: coord[1],
          lng: coord[0]
        }));
        setRoute(coordinates);
      } else {
        console.error('No route found or invalid response structure.');
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
      setRoute(null);
    }
  };

  // Fallback center position if neither position nor destination are valid
  const defaultCenter = { lat: 19.817743, lng: 85.828629 };
  const validPosition = position?.lat && position?.lng ? position : null;
  const validDestination = destination?.lat && destination?.lng ? destination : null;

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyCxCUiyXpntlMVPGPuCFYfVUS7Uni9wOzU">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={18}
          center={validPosition || validDestination || defaultCenter}
          onLoad={map => console.log('Map loaded:', map)}
          onError={error => console.error('Error loading map:', error)}
        >
          {icon && validPosition && <Marker position={validPosition} title={address} icon={icon} />}
          {icon && validDestination && <Marker position={validDestination} title="Destination" icon={icon} />}

          {route && (
            <Polyline
              path={route}
              options={{
                strokeColor: "blue",
                strokeOpacity: 1.0,
                strokeWeight: 6,
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
      <div style={{ whiteSpace: 'pre-wrap', padding: '10px', backgroundColor: '#f0f0f0', maxHeight: '200px', overflow: 'auto' }}>
        {/* Log messages can be displayed here for debugging */}
      </div>
    </div>
  );
};

export default Location;
