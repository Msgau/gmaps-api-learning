import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../App.jsx';
import Error404 from '../error404/Error404.jsx';
import PostEmplacement from './Emplacement/emplacement.jsx';
import Intro from './maps.jsx';
import PlacesV2 from './mapsv2.jsx';
import PlacesV3 from './mapsV3.jsx';

function RouteConfiguration() {

    return (
      <div className="page-container">
      <div className="content-wrap">
      
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/*" element={<Error404 />} />
            <Route path="/addPlace" element={<PostEmplacement />} />
            <Route path="/V1" element={<Intro />} />
            <Route path="/V2" element={<PlacesV2 />} />
            <Route path="/V3" element={<PlacesV3 />} />
          </Routes>
        </Router>
  
      </div>
      {/* <Footer /> */}
    </div>
    );
  }
  
  export default RouteConfiguration;
  