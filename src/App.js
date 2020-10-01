import React from 'react';
import TitleBar from 'frameless-titlebar';
import icon from './icon.png';
import Main from './Main';
import { ipcMock } from './utils/ipcRendererMock';
import { headerTheme } from './utils/titleBarStyle';

const { ipcRenderer } = window.require ? window.require('electron'): ipcMock;

const App = () => {
  
  return(
    <>
    <TitleBar
      icon={<img src={icon} className="icon" alt="icon" />}
      app="Electron"
      title="GeoPop"
      theme={headerTheme}
      className="titleBar"
      onClose={() => ipcRenderer.send("close")}
      onMinimize={() => ipcRenderer.send("minimize")}
      onMaximize={() => ipcRenderer.send("maximize")}
      //onDoubleClick={() => { enqueueSnackbar('double clicked', { variant: 'success' }) }}
    />
    <Main />
    </>
  );
}

export default App;
