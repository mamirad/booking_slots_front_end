const URL = {
  WELCOME: '/welcome',
  BOOKINGS: '/bookings', 
  USERS: '/users', 
  ADD_USERS:"/users/add/",
  EDIT_USER:"/users/add/:id",
  PROJECT:'/project',
  AUTH: {
    LOGIN: '/login', // Login
    FORGOT_PASSWORD:'/forgotpassword'
  },
  ERROR: {
    PAGE404: '/page404',
    PAGE500: '/page500',
  }
};

export default URL;