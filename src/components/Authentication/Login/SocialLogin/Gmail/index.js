import React from "react";

// Localization
import LOCALIZATION from "services/LocalizationService";

// Gmail login
import { LoginSocialGoogle } from "reactjs-social-login";

// Antd
import { Button } from "antd";

// Constant
import { SOCIAL_PLATFORM } from "components/Authentication/Constant";

// Helper
import { errorNotification } from "helpers/Notification";

// Environment
import { GOOGLE_CLIENT_ID } from "config/environment";


const index = ({ checkSecurity }) => {

  return (
    <div>
      <LoginSocialGoogle
        client_id={ GOOGLE_CLIENT_ID }
        scope="email https://www.googleapis.com/auth/userinfo.profile"
        onResolve={({ provider, data }) => {
          checkSecurity(data?.email, data.access_token, SOCIAL_PLATFORM.GOOGLE);
        }}
        onReject={(err) => {
          errorNotification(err)
        }}
      >
        <Button type="social" className="mt-3">
          <span class="icon-Google mr-2"></span>
          {LOCALIZATION.LOGIN_WITH_GMAIL}
        </Button>
      </LoginSocialGoogle>
    </div>
  );
};

export default index;
