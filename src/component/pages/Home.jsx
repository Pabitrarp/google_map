import React, {useState } from 'react';
import { Layout } from '../Layout';
import { Location } from "../location";
import pinIcon from "../logo/i.png";
import haversine from 'haversine';
import axios from 'axios';
export const Home = () => {
  const [position, setPosition] = useState({ lat: null, lng: null });
  const [icon, setIcon] = useState(null);
  const [address, setAddress] = useState(null);
  const [destiaddress, setdestiddress] = useState(null);
  const [destination, setDestination] = useState({ lat: null, lng: null });
  const [distance,setdistance]=useState();
  //fetchlocation//

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude, 
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.log(err.message);
        }
      );
    }
    if (position) {
      const newIcon = {
        url: pinIcon,
        scaledSize: new window.google.maps.Size(40, 40),
        anchor: new window.google.maps.Point(20, 20),
      };
      setIcon(newIcon);
    }
  };

 //get address  ///
 const getAddress = async () => {
  try {
    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
      params: {
        format: 'json',
        lat: position.lat,
        lon: position.lng
      }
    });
    if (res.data) {
      setAddress(res.data.display_name);
    } else {
      console.log("No address found.");
    }
  } catch (error) {
    console.log(error);
  }
};
/////get distance /////

const calculateDistance = () => {
  const cords = { latitude: position.lat, longitude: position.lng };
  const cords1 = { latitude: destination.lat, longitude: destination.lng };

  if (!position.lat || !position.lng || !destination.lat || !destination.lng) {
    console.error('Invalid coordinates provided.');
    return;
  }

  const distanceInMeters = haversine(cords, cords1, { unit: 'meter' });

  if (!isNaN(distanceInMeters)) {
    console.log(`Distance: ${distanceInMeters.toFixed(2) / 1000} km`);
    setdistance(distanceInMeters);
  } else {
    console.error('Failed to calculate distance.');
  }
};

// Get coordinates from address
const getCoordinatesFromAddress = async (address) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: destiaddress,
        format: 'json',
        limit: 1,
      },
    });

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      setDestination({ lat: parseFloat(lat), lng: parseFloat(lon) });
    } else {
      throw new Error('No coordinates found for the given address.');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
  }
};

  return (
    <Layout>
      <div className='flex justify-center items-center'>
      <button onClick={fetchLocation} className="bg-black text-white p-2 m-4">
        Get Current Location
      </button>
      <button onClick={getAddress} className="bg-black text-white p-2 m-4">
       Get Current Address
      </button>
      <button onClick={calculateDistance} className="bg-black text-white p-2 m-4">
       Get Distance
      </button>
         {address? address:""}
      </div>
      <div className='flex justify-center
       m-2'>
        <input type="text" vlaue="" className='w-1/2 border-2 rounded-xl  pl-2' placeholder='Enter Destination ' onChange={(e)=>setdestiddress(e.target.value)}/>
        <button  className="bg-black text-white p-2 rounded-xl mr-2" onClick={getCoordinatesFromAddress}>
       Get Shortest ROute
      </button>{distance? distance +" km":"cant get distance"}
      </div>
      <div className='flex justify-center items-center '>
      <Location position={position} icon={icon}   address={address} destination={destination} />
      </div>
     
    </Layout>
  );
};
