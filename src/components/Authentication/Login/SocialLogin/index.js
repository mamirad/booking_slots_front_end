/*
  Application Login Page
*/

import React from "react";
import { useHistory } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Constants
import APP_URL from "constants/ApplicationUrls";
import STATUS_CODES from "constants/StatusCodes";
import { API_URLS } from "constants/ApiUrl";
import { REDUX_STATES } from "constants/ReduxStates"

// Actions
import { login } from "store/actions/AuthAction";
import { postAction } from "store/actions/CRUDAction";


// Antd
import { Modal } from "antd";

// Component
import Gmail from "./Gmail";
import Facebook from "./Facebook";

// Localization
import LOCALIZATION from "services/LocalizationService";

// Helper
import { errorNotification, successNotification } from "helpers/Notification";
import Loading from "components/Loading";

import "../../style.scss"

const { confirm } = Modal;

const { SECURITY_CHECK, LOADING } = REDUX_STATES

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    // Redux States
    const loading = useSelector((state) => state?.Auth?.loading);
    const { [SECURITY_CHECK + LOADING]: securityLoading = false } = useSelector((state) => state.Crud)

    const modal2FA = (email, token, platform) => {
        confirm({
            title: LOCALIZATION.FA_ENABLED,
            okText: LOCALIZATION.YES,
            onOk() {
                onSocialLogin(token, platform, true);
            },
            cancelText: LOCALIZATION.NO,
            onCancel() {
                onSocialLogin(token, platform, false);
            },
        });
    };

    const checkSecurity = (email, token, platform) => {
        dispatch(postAction(API_URLS.FA_SECURITY_CHECK, { email }, {}, SECURITY_CHECK))
            .then(res => {
                if (res?.data?.security_status === 0) {

                    modal2FA(email, token, platform)
                }
                else if (res?.data?.security_status === 2) {
                    const data = {};
                    data["auth_token"] = token;
                    if (platform === 1) {
                        onGmailLogin(data);
                    } else {
                        onFacebookLogin(data);
                    }
                }
                else {
                    history.push(APP_URL.AUTH.OTP + `?socialPlatform=${platform}&authToken=${token}`)
                }
            }
                , (e) => {
                    const message = e?.response?.data?.detail
                        ? e?.response?.data?.detail
                        : e?.response?.status === STATUS_CODES.NOT_FOUND
                            ? LOCALIZATION.SCURITY_CHECK_NOT_FOUND
                            : LOCALIZATION.NETWORK_ERROR;
                    errorNotification(message);
                })
    }

    const onSocialLogin = (token, platform, statusFA) => {
        const data = {};
        data["auth_token"] = token;
        data["is_2fa_enabled"] = statusFA
        if (platform === 1) {
            onGmailLogin(data);
        } else {
            onFacebookLogin(data);
        }

    };

    const onGmailLogin = (data) => {
        const prevState = JSON.parse(localStorage.getItem("prevState"))
        dispatch(login(API_URLS.GMAIL_LOGIN, data)).then(
            (res) => {
                if (!!res?.data?.qr_code) {
                    history.push(APP_URL.AUTH.QR_CODE + `?qrCode=${res?.data?.qr_code}`);
                }
                else {
                    successNotification(LOCALIZATION.GMAIL_LOGIN_SUCCESSFULLY);
                    if (prevState) {
                        history.push(prevState); // Redirect to the requested page
                    } else {
                        history.push(APP_URL.USER_DASHBOARD);
                    }
                    localStorage.setItem("prevState", null)
                }
            },
            (e) => {
                const message = e?.response?.data?.detail
                    ? e?.response?.data?.detail
                    : e?.response?.status === STATUS_CODES.NOT_FOUND
                        ? LOCALIZATION.GMAIL_LOGIN_ERROR
                        : LOCALIZATION.NETWORK_ERROR;

                errorNotification(message);
            }
        );
    };

    const onFacebookLogin = (data) => {
        const prevState = JSON.parse(localStorage.getItem("prevState"))
        dispatch(login(API_URLS.FACEBOOK_LOGIN, data)).then(
            (res) => {
                if (!!res?.data?.qr_code) {
                    history.push(APP_URL.AUTH.QR_CODE + `?qrCode=${res?.data?.qr_code}`);
                }
                else {
                    successNotification(LOCALIZATION.FACEBOOK_LOGIN_SUCCESSFULLY);
                    if (prevState) {
                        history.push(prevState); // Redirect to the requested page
                    } else {
                        history.push(APP_URL.USER_DASHBOARD);
                    }
                    localStorage.setItem("prevState", null)
                }
            },

            (e) => {
                const message = e?.response?.data?.detail
                    ? e?.response?.data?.detail
                    : e?.response?.status === STATUS_CODES.NOT_FOUND
                        ? LOCALIZATION.FACEBOOK_LOGIN_ERROR
                        : LOCALIZATION.NETWORK_ERROR;

                errorNotification(message);
            }
        );
    };

    return (
        < >
            {(loading || securityLoading) && <Loading />}
            <Gmail checkSecurity={checkSecurity} />
            <Facebook checkSecurity={checkSecurity} />
        </>
    );
}

export default Login;
