/*
  Boot component for application.
*/

import React from 'react';

// Redux
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

// Configuration
import configureStore from "store/configureStore";

// Components
import App from 'App';

// Storage Devices
import StorageService from 'services/StorageService';

// Stores & History
const store = configureStore();
const history = createBrowserHistory();

function BootSetup () {
  
  // Save Platform Web
  StorageService.instance = new StorageService(localStorage);

  return (
    <>
      <Provider 
        store={store} 
        history={history}
      >
        <App />
      </Provider>
    </>
  );

}

export default BootSetup;