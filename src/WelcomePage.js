import React, { useState } from 'react';
import icon from './img/icon.png'
import CheckIcon from '@material-ui/icons/Check';
import './styles/Welcome.css'
import { useStateValue } from './state/state';
import { setUser } from './state/reducer';


const WelcomePage = () => {
  const[,dispatch] = useStateValue();
  const[location, setLocation] = useState();

  const submit = () => {
    const user = {
      id: Math.random(),
      pos: [60, 24],
      pos_label: 'Helsinki, Finland'
    }
    dispatch(setUser(user))
  }

  return(
    <div id="welcome" className="text-center">
      <div className="center ">
        <div className="bounce-in-top">
          <img src={icon} alt='icon' height={150} width={150}/>
          <h1 class="display-4">Welcome to GeoPop!</h1>
          <p class="lead">Enter your location and you're ready to start your journey.</p>
        </div>
        <div className="group mt-2 mb-2 row">
          <input type="text" className="form-control col-9" placeholder="Your location..."
            value={location} onChange={e => setLocation(e.target.value)} />
          <button className="btn btn-success col-2 ml-2" onClick={submit} ><CheckIcon /></button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;

