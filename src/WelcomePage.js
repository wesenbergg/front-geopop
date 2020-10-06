import React, { useState } from 'react';
import icon from './img/icon.png'
import CheckIcon from '@material-ui/icons/Check';
import './styles/Welcome.css'
import { useStateValue } from './state/state';
import { setMessage, setUser } from './state/reducer';
import AutocompleteInput from './components/AutocompleteInput';


const WelcomePage = () => {
  const[,dispatch] = useStateValue();
  const[tempUser, setTempUser] = useState();

  const submit = () => {
    if(tempUser && tempUser.pos)
      return dispatch(setUser(tempUser))
    dispatch(setMessage('Please enter a valid location', 'danger'))
  }

  const handleAutoComplete = ({ prop, geo }) => {
    setTempUser({
      id: Math.random(),
      pos_label: prop.geocoding.label,
      pos: [geo.coordinates[1], geo.coordinates[0]]
    })
  }

  return(
    <div id="welcome" className="text-center">
      <div className="center ">
        <div className="bounce-in-top">
          <img src={icon} alt='icon' height={150} width={150}/>
        </div>
        <div className="fade-in">
          <h1 className="display-4">Welcome to GeoPop!</h1>
          <p className="lead">Enter your location and you're ready to start your journey.</p>
        </div>
        <div className="group mt-2 mb-2 row">
          <AutocompleteInput className="col-9" placeholder="Your location..."
            handleAutoComplete={handleAutoComplete} />
          <button className="btn btn-success col-2 ml-2" onClick={submit} ><CheckIcon /></button>
        </div>
        <small className="text-muted">
          Credits; emoji assets: <i>freepngimg.com</i>, GIFs: GIPHY&copy;, geocoding: <i>OSM nominatim</i>
          <br/>
          All rights reserved &copy; GeoPop 2020
        </small>
      </div>
    </div>
  );
}

export default WelcomePage;

