/*
  General Response Handler
*/

import StorageService from 'services/StorageService';

export function handleResponse(response) {
  if (response && response.status === 200) {
    return response.data;
  } else {
    handleError(response);
  }
}

export function handleError(error) {
  if(error?.response?.status === 401){
    StorageService.instance.deleteLoginData(); // clear session
    window.location.reload();
  }
  throw error;
}