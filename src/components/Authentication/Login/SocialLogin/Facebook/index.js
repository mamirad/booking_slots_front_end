import React from "react";

// Localization
import LOCALIZATION from "services/LocalizationService";

// Gmail login
import { LoginSocialFacebook } from "reactjs-social-login";

// Constant
import { SOCIAL_PLATFORM } from "components/Authentication/Constant";

// Antd
import { Button } from "antd";

// Helper
import { errorNotification } from "helpers/Notification";

// Environment
import { FACEBOOK_APP_ID } from "config/environment";


const index = ({ checkSecurity }) => {
  return (
    <div>
      <LoginSocialFacebook
        appId={FACEBOOK_APP_ID}
        onResolve={({ provider, data }) => {
          checkSecurity(data?.email , data.accessToken , SOCIAL_PLATFORM.FACEBOOK);
        }}
        onReject={(err) => {
          errorNotification(err)
        }}
      >
        <Button type="social" className="mt-3">
          <span class="icon-facebook mr-2 "></span>
          {LOCALIZATION.LOGIN_WITH_FACEBOOK}
        </Button>
      </LoginSocialFacebook>
    </div>
  );
};

export default index;
