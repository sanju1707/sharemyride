import { Route, Routes } from "react-router-dom"
import Homepage from "../homepage/homepage"
import MapPage from "../mappages/mappage"




const Navigations=()=>{
    return(
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/mappage" element={<MapPage/>}/>

        </Routes>
    )
}
export default Navigations