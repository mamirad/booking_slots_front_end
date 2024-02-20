import React from "react";

import { useHistory } from "react-router-dom";

// Antd
import { Tooltip } from "antd";
import { EditOutlined, LockOutlined  } from '@ant-design/icons';

function Layout({
  url
}) {
  const history = useHistory();

  return (
    <>
    {/* <Tooltip placement="top" title={"Change Password"}>
      <LockOutlined className="round-icon" />
    </Tooltip>
    &nbsp; */}
    
    <Tooltip placement="top" title={"Edit"}>
      <EditOutlined
        className="round-icon"
        onClick={(event) => {
          event.stopPropagation();
          history.push(url);
        }}
      />
    </Tooltip>
    </>
  );
}

export default Layout;