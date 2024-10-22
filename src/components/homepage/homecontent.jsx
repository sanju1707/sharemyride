


import React, { createContext, useRef, useState } from "react";
import { Button } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import "../homepage/homecontent.scss";
import { useNavigate } from "react-router-dom";


const libraries = ["places"];
 
const HomeContent = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBzRRsFH6kUE_PP5QaBIGytJIowSkPiAUQ",
    libraries,
  });

  const fromRef = useRef();
  const toRef = useRef();
  const [formErrors, setFormErrors] = useState({});
  const[address,setAddress]=useState({ from: "", to: "" });


  const navigate=useNavigate()

  const handleSubmit =(event)=>{
    
    event.preventDefault()
    
    const fromEntered = fromRef.current.value;
    const toEntered = toRef.current.value;

    console.log(fromEntered,toEntered)
    const Errors=validations(fromEntered,toEntered)
    if(Object.keys(Errors).length>0){
      setFormErrors(Errors)
    }
    else{
      const newAddress = { from: fromEntered, to: toEntered };
      setAddress(newAddress);
      
      
      console.log("Address set:", newAddress);
      
      navigate("/mappage", {state:{address: newAddress }})
    }
    
  }
  const validations=(from,to)=>{
    let errors={}
    if(!from){
      errors.fromAdd="please enter ur location"
    }
    if(!to){
      errors.toAdd="please enter ur destination"
        }
        return errors
  }



  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (<>
    
      <div className="mainbody">
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "1rem" }}>Enter your location:</label>
          <Autocomplete>
            <input
              type="text"
              placeholder="from"
              style={{ width: "100%", height: "30px" }}
              ref={fromRef}
            />
          </Autocomplete>
          <span style={{color:"red"}}>{formErrors?.fromAdd}</span>
         
        </div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Button
            icon={<SwapOutlined style={{ transform: "rotate(90deg)" }} />}
            shape="circle"
            size="large"
            style={{ backgroundColor: "black", color: "#fff" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "1rem" }}>Enter your Destination:</label>
          <Autocomplete>
            <input
              type="text"
              placeholder="To"
              style={{ width: "100%", height: "30px" }}
              ref={toRef}
            />
          </Autocomplete>
          <span style={{color:"red"}}>{formErrors?.toAdd}</span>
        </div>
        <Button style={{ backgroundColor: "black", color: "#fff" }} htmlType="submit"  block  >
          Submit
        </Button>
      </form>
    </div>
    
    </>
  );
};

export default HomeContent;


