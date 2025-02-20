import { apiClient } from './ApiClient';
import { 
  handleResponse, 
  handleError 
} from './GenericResponseHandler';

// GET Service
const getService = async (url, data) => {
  try {
    const response = await apiClient().get(
      url, 
      data
    );

    return handleResponse(response);
  } catch (error) {
    throw handleError(error);
  }
};

// POST Service
const postService = async (url, data, opt={}) => {
  try {
    const response = await apiClient().post(
      url, 
      data,
      opt
    );
    
    // return handleResponse(response);
    return response;
  } catch (error) {
    throw handleError(error);
  }
};

// Patch Service
const patchService = async (url, data, opt={}) => {
  try {
    const response = await apiClient().patch(
      url, 
      data,
      opt
    );

    // return handleResponse(response);
    return response;
  } catch (error) {
    throw handleError(error);
  }
};

// PUT Service
const putService = async (url, data, opt={}) => {
  try {
    const response = await apiClient().put(
      url,
      data,
      opt
    );

    return handleResponse(response);
  } catch (error) {
    throw handleError(error);
  }
};

// DELETE Service
const deleteService = async (url, data, opt={}) => {
  try {
    const response = await apiClient().delete(
      url, 
      data,
      opt
    );

    return handleResponse(response);
  } catch (error) {
    throw handleError(error);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getService,
  postService,
  putService,
  patchService,
  deleteService
};