/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import TitleBar from 'frameless-titlebar';
import icon from './img/icon.png';
import { ipcMock } from './utils/ipcRendererMock';
import { headerTheme } from './utils/titleBarStyle';
import MapContainer from './MapContainer';
import ControlPanel from './ControlPanel';
import { useStateValue } from './state/state';
import { initUser } from './state/reducer';

const { ipcRenderer } = window.require ? window.require('electron'): ipcMock;

const App = () => {
  const [data, setData] = useState([]);
  const [, dispatch] = useStateValue()

  useEffect(() => {    
    dispatch(initUser())
  }, [])
  return(
    <>
    {/* App bar */}
    <TitleBar
      icon={<img src={icon} className="icon" alt="icon" />}
      app="Electron"
      title="GeoPop"
      theme={headerTheme}
      className="titleBar"
      onClose={() => ipcRenderer.send("close")}
      onMinimize={() => ipcRenderer.send("minimize")}
      onMaximize={() => ipcRenderer.send("maximize")}
    />
    {/* Main container */}
    <div className="main-container bg-main container-fluid m-0 p-0">
      <ControlPanel  markerState={{data, setData}} />
      <MapContainer markerState={{data, setData}} />
    </div>
    </>
  );
}

export default App;
