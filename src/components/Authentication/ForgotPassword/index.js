/*
  Application Login Page
*/

import React  from "react";

// Antd
import { Col } from 'antd';

// Localization
import LOCALIZATION from "services/LocalizationService";

// Style
import "./style.scss"

function ForgotPassword({children}) {

    return (
        <div className="Forgot-Password-wrapper" >
            <div className="header">
                <h1> {LOCALIZATION.SMART_ROSTER} </h1>
            </div>
            <Col span={24} className="form-wrapper" >
                <Col span={6} className="form" >
                        {children}
                </Col>
            </Col>
        </div>
    );
}

export default ForgotPassword;