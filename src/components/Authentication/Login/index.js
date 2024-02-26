/*
  Application Login Page
*/

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Components
import IconLogin1 from "../../../assets/images/Icon-login-1.png"
import IconLogin2 from "../../../assets/images/Icon-login-2.png"
import { Email, Password } from "components/Common/FormElements";

// Constants
import APP_URL from 'constants/ApplicationUrls';
import { REDUX_STATES } from "constants/ReduxStates";
import { API_URLS } from "constants/ApiUrl";
// Actions
import { login } from "store/actions/AuthAction";

// Antd
import { Form, Button, Row, Col } from 'antd';

// Localization
import LOCALIZATION from "services/LocalizationService";

// Style
import "./style.scss"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { errorNotification, successNotification } from "helpers/Notification";
import { postAction } from "store/actions/CRUDAction";
import AuthenticationBase from "..";

const { LOGIN, LOADING } = REDUX_STATES

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [form] = Form.useForm();
  let formRef = React.createRef();
  // Redux States
  const loading = useSelector((state) => state?.Auth?.loading);
  // const {[LOGIN+LOADING]:securityLoading=false}=useSelector(state=>state.Crud);

  useEffect(() => {
    if (location.state && location.state.from) {
      localStorage.setItem("prevState", JSON.stringify(location.state.from.pathname));
    }
  })


  const onSubmit = (data) => {

    dispatch(login(data)).then(
      () => {
        history.push('/');
        successNotification("Login Successfully")
      }
    );
  };
  // const simpleLogin = (data) => {
  //   const prevState = JSON.parse(localStorage.getItem("prevState"))
  //   dispatch(login(API_URLS.LOGIN, data)).then(
  //     () => {
  //       successNotification(LOCALIZATION.LOG_IN_SUCCESSFULLY);
  //       if (prevState) {
  //         history.push(prevState); // Redirect to the requested page
  //       } else {
  //         history.push( !!isSuperAdmin()? APP_URL.SUPER_ADMIN_DASHBOARD:APP_URL.USER_DASHBOARD); // Redirect to the dashboard by default
  //       }
  //       localStorage.setItem("prevState", null)
  //     },
  //     (e) => {
  //       const message = e?.response?.data?.detail
  //         ? e?.response?.data?.detail
  //         : e?.response?.status === STATUS_CODES.NOT_FOUND
  //           ? LOCALIZATION.INVALID_EMAIL_OR_PASSWORD
  //           : LOCALIZATION.NETWORK_ERROR;
  //       errorNotification(message);
  //     }
  //   );
  // }

  return (
      <div className="login-wrapper" >
        <div className="header">
        </div>
        <Col xs={12} md={8} lg={6} xl={3} className="title" >
          <h2> {LOCALIZATION.MEETING_ROOM} </h2>
        </Col>
        <Col span={24} className="form-row" >
          <Col xs={20} md={12} xl={7} className="login-form-wrapper" >
            <h2>{LOCALIZATION.LOGIN}</h2>
            <Form 
            form={form}
            ref={formRef}
            onFinish={onSubmit}
            layout="vertical"
              >
              <Col span={24} >
                <Email label={"Email"} name={'email'} />
              </Col>
              <Col span={24} >
                <Password label={"Password"} name={'password'} />
              </Col>
              <Col span={24} className="d-flex justify-center" >
                <a onClick={() => history.push(APP_URL.AUTH.FORGOT_PASSWORD)} > {LOCALIZATION.FORGOT_PASSWORD}? </a>
              </Col>
              <Col span={24} className="mt-3" >
                <Button className="mt-3" htmlType="submit" type="primary" onClick={onSubmit} >
                  <img src={IconLogin1} className="mr-10" height={14} width={14} />
                  {LOCALIZATION.LOGIN}
                  <img src={IconLogin2} className="ml-10" height={18} width={18} />
                </Button>
              </Col>
            </Form>
          </Col>
        </Col>

      </div>
  );
}

export default Login;
