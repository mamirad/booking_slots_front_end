// Service
import service from 'services/Api/Service';
import StorageService from 'services/StorageService';

// Constatns
import { USER_ACTIONS } from 'constants/ActionKeys';
import { API_URLS } from 'constants/ApiUrl';

// General
import { request, success, failure } from '.';

function login(loginModel) {
  return async (dispatch) => {
    try {
      dispatch(request(USER_ACTIONS.LOGIN_REQUEST));

      // API Calling
      const response = await service.postService(
        API_URLS.LOGIN,
        loginModel,
        {}
      );

      // Save Access Token
      const accessToken = response?.data?.access || null;
      StorageService.instance.setAccessToken(accessToken);

      // Save Refresh Token
      const refreshToken = response?.data?.refresh || null;
      StorageService.instance.setRefreshToken(refreshToken);

      // Save User Info
      StorageService.instance.setUserInfo(response?.data?.user || {});

      dispatch(success(USER_ACTIONS.LOGIN_SUCCESS, response));

      return response;
      
    } catch (error) {
      dispatch(failure(USER_ACTIONS.LOGIN_FAILURE));
      throw error;
    }
  };
}

function logout() {
  return async (dispatch) => {
    try {
      dispatch(request(USER_ACTIONS.LOGOUT_REQUEST));
      await StorageService.instance.deleteLoginData();
      dispatch(success(USER_ACTIONS.LOGOUT_SUCCESS));
    } catch (error) {
      dispatch(failure(USER_ACTIONS.LOGOUT_FAILURE, error));
      throw error;
    }
  };
}

export {
  login,
  logout
};
