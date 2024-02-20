/*
  Application Login Page Base Layout
*/

import React, { useEffect } from 'react';

// Redux
import {
  useDispatch,
} from 'react-redux';

//Components
import Loading from 'components/Loading';

// Actions
import { logout } from 'store/actions/AuthAction';

// Antd
import { Row, Col } from 'antd';

// Style
import './style.scss';

// Main Logo
import MainLogo from "../../assets/images/horizon-digital-logo-lg.png";

// Main Logo
import MainBanner from "../../assets/images/main-login-bg.jpg";

function AuthenticationBase({
  loading,
  children
}) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout())
  }, [dispatch]);

  return (
    <div className="login-wrapper">
      {
        loading &&
        // true &&
        <Loading />
      }

      <Row>  
        <Col md={12} xs={24}>
          <div className="form-row">       
            <Row className="login-form-wrapper">
              <Col md={24} xs={24}>
                <div className="app-logo">
                  <img src={MainLogo} alt="logo" />
                  {children}
                </div>
              </Col>
            </Row>
          </div>
        </Col>

        <Col md={12} xs={0}>
          <figure className="login-pic">
            <img src={MainBanner} alt="banner" />
          </figure>
        </Col>

      </Row>
    </div>
  );
}

export default AuthenticationBase;