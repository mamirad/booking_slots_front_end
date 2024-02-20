// Service
import service from 'services/Api/Service';

// Constants
import { CRUD_ACTION } from 'constants/ActionKeys';

// General
import { request, success, failure } from '.';

/**************
  Get Action 
*************/
function getAction(url, data, key){
  return async (dispatch) => {
    try {
      dispatch(request(CRUD_ACTION.GET_REQUEST, { key }));

      // API Calling
      const response = await service.getService(
        url,
        data
      );

      if(response){
        dispatch(success(CRUD_ACTION.GET_SUCCESS, { key, response }));
      }else{
        dispatch(failure(CRUD_ACTION.GET_FAILURE));
      }

      return response;
       
    } catch (error) {
      dispatch(failure(CRUD_ACTION.GET_FAILURE, { key }));
      throw error;
    }
  };
}

/**************
  Post Action 
*************/
function postAction(url, data, opt, key){
  return async (dispatch) => {
    try {
      dispatch(request(CRUD_ACTION.POST_REQUEST, { key }));

      // API Calling
      const response = await service.postService(
        url,
        data,
        opt
      );
      if(response){
        dispatch(success(CRUD_ACTION.POST_SUCCESS, { key, response }));
      }else{
        dispatch(failure(CRUD_ACTION.POST_FAILURE));
      }

      return response;
       
    } catch (error) {
      dispatch(failure(CRUD_ACTION.POST_FAILURE, { key }));
      throw error;
    }
  };
}

/**************
  Put Action 
*************/
function putAction(url, data, opt, key){
  return async (dispatch) => {
    try {
      dispatch(request(CRUD_ACTION.PUT_REQUEST, { key }));

      // API Calling
      const response = await service.putService(
        url,
        data,
        opt
      );
      if(response){
        dispatch(success(CRUD_ACTION.PUT_SUCCESS, { key, response }));
      }else{
        dispatch(failure(CRUD_ACTION.PUT_FAILURE));
      }

      return response;
       
    } catch (error) {
      dispatch(failure(CRUD_ACTION.PUT_FAILURE, { key }));
      throw error;
    }
  };
}

/**************
  Patch Action 
*************/
function patchAction(url, data, opt, key,){
  return async (dispatch) => {
    try {
      dispatch(request(CRUD_ACTION.PATCH_REQUEST, { key }));

      // API Calling
      const response = await service.patchService(
        url,
        data,
        opt
      );
      if(response){
        dispatch(success(CRUD_ACTION.PATCH_SUCCESS, { key, response }));
      }else{
        dispatch(failure(CRUD_ACTION.PATCH_FAILURE));
      }

      return response;
       
    } catch (error) {
      dispatch(failure(CRUD_ACTION.PATCH_FAILURE, { key }));
      throw error;
    }
  };
}

/**************
  Delete Action 
*************/
function deleteAction(url, data, opt, key){
  return async (dispatch) => {
    try {
      dispatch(request(CRUD_ACTION.DELETE_REQUEST, { key }));

      // API Calling
      const response = await service.deleteService(
        url,
        data,
        opt
      );
      if(response){
        dispatch(success(CRUD_ACTION.DELETE_SUCCESS, { key, response }));
      }else{
        dispatch(failure(CRUD_ACTION.DELETE_FAILURE));
      }

      return response;
       
    } catch (error) {
      dispatch(failure(CRUD_ACTION.DELETE_FAILURE, { key }));
      throw error;
    }
  };
}

/*******************
  Update a Key Data
*******************/
function updateKeyData(data, key) {
  return async (dispatch) => {
    dispatch(request(CRUD_ACTION.UPDATE_KEY_DATA, { key, data }));
  };
}

export {
  getAction,
  postAction,
  putAction,
  patchAction,
  deleteAction,
  updateKeyData
};
