// Constatns
import { CRUD_ACTION } from 'constants/ActionKeys';
import { REDUX_STATES } from 'constants/ReduxStates';

const {
  DEFAULT_GET_KEY,
  DEFAULT_POST_KEY,
  DEFAULT_PUT_KEY,
  DEFAULT_PATCH_KEY,
  DEFAULT_DELETE_KEY,
  DEFAULT_SELECTED_KEY,
  LOADING,
  ERROR,
  RESPONSE,
} = REDUX_STATES;

let initialState = {};

const Crud = (state = initialState, action) => {

  switch (action.type) {
  /* GET */
  //Request  
  case CRUD_ACTION.GET_REQUEST:
    const get_keyR = action?.payload?.key || DEFAULT_GET_KEY;
  
    return { 
      ...state,
      [get_keyR + LOADING]: true,
      [get_keyR + ERROR]: false,
    };
  
  // Success
  case CRUD_ACTION.GET_SUCCESS:
    const get_keyS = action?.payload?.key || DEFAULT_GET_KEY;
    const get_responseS = action?.payload?.response;
      
    return { 
      ...state,
      [get_keyS + LOADING]: false,
      [get_keyS + ERROR]: false,
      [get_keyS + RESPONSE]: get_responseS
        
    };
  
    // Failure
  case CRUD_ACTION.GET_FAILURE:
    const get_keyE = action?.payload?.key || DEFAULT_GET_KEY;
  
    return { 
      ...state,
      [get_keyE + LOADING]: false,
      [get_keyE + ERROR]: true
    };

  /* POST */
  //Request  
  case CRUD_ACTION.POST_REQUEST:
    const post_keyR = action?.payload?.key || DEFAULT_POST_KEY;
    
    return { 
      ...state,
      [post_keyR + LOADING]: true,
      [post_keyR + ERROR]: false,
    };
  
    // Success
  case CRUD_ACTION.POST_SUCCESS:
    const post_keyS = action?.payload?.key || DEFAULT_POST_KEY;
    const post_responseS = action?.payload?.response;
      
    return { 
      ...state,
      [post_keyS + LOADING]: false,
      [post_keyS + ERROR]: false,
      [post_keyS + RESPONSE]: post_responseS
        
    };
  
    // Failure
  case CRUD_ACTION.POST_FAILURE:
    const post_keyE = action?.payload?.key || DEFAULT_POST_KEY;
  
    return { 
      ...state,
      [post_keyE + LOADING]: false,
      [post_keyE + ERROR]: true
    };

  /* PUT */
  //Request  
  case CRUD_ACTION.PUT_REQUEST:
    const put_keyR = action?.payload?.key || DEFAULT_PUT_KEY;
    
    return { 
      ...state,
      [put_keyR + LOADING]: true,
      [put_keyR + ERROR]: false,
    };
  
    // Success
  case CRUD_ACTION.PUT_SUCCESS:
    const put_keyS = action?.payload?.key || DEFAULT_PUT_KEY;
    const put_responseS = action?.payload?.response;
      
    return { 
      ...state,
      [put_keyS + LOADING]: false,
      [put_keyS + ERROR]: false,
      [put_keyS + RESPONSE]: put_responseS
        
    };
  
    // Failure
  case CRUD_ACTION.PUT_FAILURE:
    const put_keyE = action?.payload?.key || DEFAULT_PUT_KEY;
  
    return { 
      ...state,
      [put_keyE + LOADING]: false,
      [put_keyE + ERROR]: true
    };

  /* PATCH */
  //Request  
  case CRUD_ACTION.PATCH_REQUEST:
    const patch_keyR = action?.payload?.key || DEFAULT_PATCH_KEY;
    
    return { 
      ...state,
      [patch_keyR + LOADING]: true,
      [patch_keyR + ERROR]: false,
    };
  
    // Success
  case CRUD_ACTION.PATCH_SUCCESS:
    const patch_keyS = action?.payload?.key || DEFAULT_PATCH_KEY;
    const patch_responseS = action?.payload?.response;
      
    return { 
      ...state,
      [patch_keyS + LOADING]: false,
      [patch_keyS + ERROR]: false,
      [patch_keyS + RESPONSE]: patch_responseS
        
    };
  
    // Failure
  case CRUD_ACTION.PATCH_FAILURE:
    const patch_keyE = action?.payload?.key || DEFAULT_PATCH_KEY;
  
    return { 
      ...state,
      [patch_keyE + LOADING]: false,
      [patch_keyE + ERROR]: true
    };

  /* DELETE */
  //Request  
  case CRUD_ACTION.DELETE_REQUEST:
    const delete_keyR = action?.payload?.key || DEFAULT_DELETE_KEY;
    
    return { 
      ...state,
      [delete_keyR + LOADING]: true,
      [delete_keyR + ERROR]: false,
    };
  
    // Success
  case CRUD_ACTION.DELETE_SUCCESS:
    const delete_keyS = action?.payload?.key || DEFAULT_DELETE_KEY;
    const delete_responseS = action?.payload?.response;
      
    return { 
      ...state,
      [delete_keyS + LOADING]: false,
      [delete_keyS + ERROR]: false,
      [delete_keyS + RESPONSE]: delete_responseS
        
    };
  
    // Failure
  case CRUD_ACTION.DELETE_FAILURE:
    const delete_keyE = action?.payload?.key || DEFAULT_DELETE_KEY;
  
    return { 
      ...state,
      [delete_keyE + LOADING]: false,
      [delete_keyE + ERROR]: true
    };

  // Update Key Data
  case CRUD_ACTION.UPDATE_KEY_DATA:
    const update_key = action?.payload?.key || DEFAULT_SELECTED_KEY;
    const update_data = action?.payload?.data;

    return { 
      ...state,
      [update_key + RESPONSE]: update_data
    };

  default:
    return state;
  }
};

export default Crud;