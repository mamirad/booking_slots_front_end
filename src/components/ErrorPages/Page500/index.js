// Antd
import { Button, Result } from 'antd';

//react-router-dom
import { useHistory } from "react-router-dom";

// Constants
import APP_URLS from "constants/ApplicationUrls";

// Localization
import LOCALIZATION from "services/LocalizationService";

const Page500 = ({
  refresh
}) => {
  const history = useHistory();

  return(
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button 
          onClick={() => {
            !!refresh? refresh(): history.push(APP_URLS.WELCOME)
          }} 
          type="primary"
        >
          { 
            !!refresh?
            LOCALIZATION.REFRESH:
            LOCALIZATION.BACK_HOME 
          }
        </Button>
      }
    />
  )
};

export default Page500;