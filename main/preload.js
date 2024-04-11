// preload.js (main)
import { contextBridge, ipcRenderer } from 'electron';

const handler = {
  send: (channel, value) => ipcRenderer.send(channel, value),
  on: (channel, callback) => {
    const subscription = (event, ...args) => {
        console.log("Received data in preload:", args);
        const textContent = args[0];  // Access text content directly
        callback(event, textContent);
    };
    ipcRenderer.on(channel, subscription);
    return () => ipcRenderer.removeListener(channel, subscription);
  },
  removeListener: (channel, callback) => ipcRenderer.removeListener(channel, callback),
};

contextBridge.exposeInMainWorld('ipc', handler);
