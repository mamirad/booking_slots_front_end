import React from "react";

// Redux
import { useDispatch } from "react-redux";

// Antd
import { Modal } from "antd";
import { Tooltip } from "antd";


// Icons
import { MdOutlineDeleteForever } from "react-icons/md"


// Actions
import { deleteAction } from "../../../store/actions/CRUDAction";

// Helper
import {
  successNotification,
  errorNotification,
} from "../../../helpers/Notification";

import { useHistory } from "react-router-dom"

// Localization
import LOCALIZATION from "../../../services/LocalizationService";

function Layout({
  apiUrl,
  reduxKey,
  onSuccess,
  navigationUrl,
  icon,
  text
}) {

  const dispatch = useDispatch();
  const history = useHistory()
  const config = {
    title: LOCALIZATION.CONFIRM,
    icon: <MdOutlineDeleteForever />,
    content: LOCALIZATION.DELETE_MESSGAE,
    onOk() {
      onDelete();
    }
  };

  const onDelete = () => {
    dispatch(
      deleteAction(
        apiUrl,
        {},
        {},
        reduxKey
      )
    ).then(() => {
      successNotification(LOCALIZATION.RECORD_DELETED_SUCCESSFULLY);
      history.push(navigationUrl)
      // onSuccess?.();
    }, () => {
      errorNotification(LOCALIZATION.ERROR_IN_RECORD_DELETE);
    });
  }

  return (
    <Tooltip placement="top" title={LOCALIZATION.DELETE}>
      < MdOutlineDeleteForever
      size={25}
        className="round-icon round-delete"
        onClick={() => Modal.confirm(config)}
      />

    </Tooltip>
  );
}

export default Layout;