import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../App.jsx';
import Error404 from '../error404/Error404.jsx';
import PostEmplacement from './Emplacement/emplacement.jsx';
import Intro from './maps.jsx';
import PlacesV2 from './V2-V3/mapsv2.jsx';
import PlacesV3 from './V2-V3/mapsV3.jsx';
import MapsV4 from './V4-V5/mapsV4.jsx';
import MapsV5 from './V4-V5/mapsV5.jsx';
import MapsV6 from './V4-V5/mapsV6.jsx';
import MapsV7 from './V7-V8/mapsV7.jsx';

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
            <Route path="/V4" element={<MapsV4 />} />
            <Route path="/V5" element={<MapsV5 />} />
            <Route path="/V6" element={<MapsV6 />} />
            <Route path="/V7" element={<MapsV7 />} />
          </Routes>
        </Router>
  
      </div>
      {/* <Footer /> */}
    </div>
    );
  }
  
  export default RouteConfiguration;
  