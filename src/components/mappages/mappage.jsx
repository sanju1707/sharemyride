import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import { Card } from "antd";

const libraries = ["places"];

const MapPage = () => {
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const location = useLocation();
  const [vechile,setVechile]=useState("")
  const[selectedVech,setSelectedVEch]=useState(null)
  const { address } = location.state || {};

  const containerStyle = {
    width: "100%",
    height: "80vh",
  };

  const center = {
    lat: 17.491659,
    lng: 78.391983,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBzRRsFH6kUE_PP5QaBIGytJIowSkPiAUQ",
    libraries,
  });
  const mapTheme = [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [
        {
          saturation: 36,
        },
        {
          color: "#000000",
        },
        {
          lightness: 40,
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [
        {
          visibility: "on",
        },
        {
          color: "#000000",
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 17,
        },
        {
          weight: 1.2,
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "all",
      stylers: [
        {
          color: "#ebbe18",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#f3c723",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 21,
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 17,
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 29,
        },
        {
          weight: 0.2,
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 18,
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 19,
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 17,
        },
      ],
    },
  ];

  async function calculateRoute() {
    if (!address?.from || !address?.to) return;

    const directionservice = new google.maps.DirectionsService();
    const results = await directionservice.route({
      origin: address.from,
      destination: address.to,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirections(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  useEffect(() => {
    if (address) {
      calculateRoute();
    }
  }, [address]);

  if (!isLoaded) {
    return <h1>Map loading ...</h1>;
  }
  const distanceInKm = distance ? parseFloat(distance.replace(/[^\d.]/g, "")) : 0;

  
  const getMotorBikePrice = () => {
    if (distanceInKm < 4) {
      return distanceInKm *12.5
    } else if (distanceInKm >= 4 && distanceInKm <= 7) {
      return distanceInKm * 11.3
    } else {
      return distanceInKm * 8.1
    }
  };

  const getAutoWalaPrice = () => {
    if (distanceInKm < 4) {
      return distanceInKm * 14.1
    } else if (distanceInKm >= 4 && distanceInKm <= 7) {
      return distanceInKm * 12.2
    } else {
      return distanceInKm * 9.1
    }
  };

  const getCarPrice = () => {
    if (distanceInKm < 4) {
      return distanceInKm * 16.2
    } else if (distanceInKm >= 4 && distanceInKm <= 7) {
      return distanceInKm * 13.4
    } else {
      return distanceInKm * 10.4
    }
  };
  const vechileHandler=(vechilename)=>{
    setVechile(vechilename)
    setSelectedVEch(vechilename)

  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={
          {
            //   styles:mapTheme
          }
        }
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      <div>{duration && <h3>Duration of journey:{duration}</h3>}</div>
      <div>
        <Card
          style={{
            width: 1000,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            border: selectedVech === "Motor-Bike" ? "2px solid green" : "1px solid lightgrey",
          }}
          cover={
            <img
              alt="Bike"
              src="https://static.vecteezy.com/system/resources/previews/003/777/131/original/green-simple-big-motorbike-cartoon-design-design-for-templates-free-vector.jpg"
              style={{ width: "100px" }}
            />
          }
          onClick={()=>{vechileHandler("Motor-Bike")}}
        >
          <div
            style={{
              width: "800px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4>Motor-bike</h4>
            {distance && (
              <p>Price: {getMotorBikePrice()} Rupees</p>
            )}
          </div>
        </Card>
        <Card
          style={{
            width: 1000,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            border: selectedVech === "Auto-Wala" ? "2px solid green" : "1px solid lightgrey",
          }}
          cover={
            <img
              alt="Bike"
              src="https://media.istockphoto.com/id/1283737720/vector/tuk-tuk-icon-on-transparent-background.jpg?s=612x612&w=0&k=20&c=WzyZTIM3k3TX7ffNvqpbYrXEMhaNR9JeFy8boC1bFV0="
              style={{ width: "100px" }}
            />
          }
          onClick={()=>{vechileHandler("Auto-Wala")}}
        >
          <div
            style={{
              width: "800px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4>Auto-wala</h4>
            {distance && (
               <p>Price: {getAutoWalaPrice()} Rupess</p>
            )}
          </div>
        </Card>
        <Card
          style={{
            width: 1000,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            border: selectedVech === "car" ? "2px solid green" : "1px solid lightgrey",
          }}
          cover={
            <img
              alt="Bike"
              src="https://cdna.artstation.com/p/assets/images/images/069/376/138/large/brady-defelice-sav-2023fall-seqa311-bradydefelice-05.jpg?1699985966"
              style={{ width: "100px" }}
            />
          }
          onClick={()=>{vechileHandler("car")}}
        >
          <div
            style={{
              width: "800px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4>car</h4>
            {distance && (
               <p>Price: {getCarPrice()} Rupees</p>
            )}
          </div>
        </Card>
        <div style={{width:"1000px",height:"10vh",backgroundColor:"black"}}>
            <h1 style={{color:"white",textAlign:"center",lineHeight:"10vh"}}>Confirm {vechile}</h1>

      </div>
      </div>
      
    </div>
  );
};

export default MapPage;
