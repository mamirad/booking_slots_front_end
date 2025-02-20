/* 
  Service file that serve all api calling
*/

import axios from 'axios';
import StorageService from 'services/StorageService'
import { API_TIMEOUT } from 'constants/General';
import { BASE_URL } from 'config/environment';

export const apiClient = () => {
  const token = StorageService.instance.getAccessToken();

  // Dummy Condition, will remove with actual api
  let defaultOptions = !!token? {
    headers: {
      Authorization: token ? `Bearer ${token || null}` : '',
      'Content-Type': 'application/json'
    }
  }: {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  // Request timeout
  defaultOptions = {
    ...defaultOptions,
    timeout: API_TIMEOUT
  }

  return {
    get: (url, options = {}) => (
      axios.get(
        `${BASE_URL}${url}`, 
        { ...defaultOptions, ...options }
      )
    ),
    post: (url, data, options = {}) => (
      axios.post(
        `${BASE_URL}${url}`, 
        data, 
        { ...defaultOptions, ...options }
      )
    ),
    put: (url, data, options = {}) => (
      axios.put(
        `${BASE_URL}${url}`, 
        data, 
        { ...defaultOptions, ...options }
      )
    ),
    patch: (url, data, options = {}) => (
      axios.patch(
        `${BASE_URL}${url}`, 
        data, 
        { ...defaultOptions, ...options }
      )
    ),
    delete: (url, data, options = {}) => (
      axios.delete(
        `${BASE_URL}${url}`, 
        { ...defaultOptions, ...options, data }
      )
    )
  };
};