import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'; //https://css-tricks.com/the-hooks-of-react-router/
import Loadable from 'react-loadable';

// Antd
import { notification } from 'antd';

// Constants
import APP_URL from 'constants/ApplicationUrls';
import { NOTIFICATION_DURATION } from 'constants/General';

// Components
import PrivateRoute from 'components/PrivateRoute';
import Loading from 'components/Loading';

// Auth Components
import Login from 'components/Authentication/Login';
import ForgotPassword from 'components/Authentication/ForgotPassword/ForgotScreen';
import Link from 'components/Authentication/ForgotPassword/ForgotScreen';
import Reset from 'components/Authentication/ForgotPassword/index';

// Localization
import LOCALIZATION from 'services/LocalizationService';

// Styling
import './assets/sass/style.scss';

// Package.json
const packageJson = require('../package.json');

// Notification Configuration for whole application
notification.config({
  placement: 'topRight',
  duration: NOTIFICATION_DURATION,
  rtl: false
});

// Base Layout
const BaseLayout = Loadable({
  loader: () => import('components/BaseLayout'),
  loading: Loading
});

function App() {

  return (
    <div className={`App`}>
      <BrowserRouter basename={packageJson?.homepage || ''}>
        <Switch>
          {/* 
            Open Routes Here 
          */}

          {/* Login */}
          <Route
            path={APP_URL.AUTH.LOGIN}
            name={LOCALIZATION.LOGIN}
            component={Login}
          />

          {/* Forgot Password */}
          <Route
            path={APP_URL.AUTH.FORGOT_PASSWORD}
            name={LOCALIZATION.FORGOT_PASSWORD}
            component={ForgotPassword}
          />

          {/* Forgot Link Screen */}
          {/* <Route
            path={APP_URL.AUTH.LINK}
            name={LOCALIZATION.LINK}
            component={Link}
          /> */}

          {/* Reset Password */}
          {/* <Route
            path={APP_URL.AUTH.RESET_PASSWORD}
            name={LOCALIZATION.RESET_PASSWORD}
            component={Reset}
          /> */}

          {/* Restricted Routes Here */}
          <PrivateRoute
            component={BaseLayout}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;