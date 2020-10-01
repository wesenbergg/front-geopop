export const ipcMock = {
  ipcRenderer: {
    send: (arg) => {
      console.log("ipcRenderer mock: send ", arg);
    }
  }
} 