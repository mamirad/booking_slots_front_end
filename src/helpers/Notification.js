/*
    Notifications Helper
*/

import React from "react";

// Antd
import { notification, Modal } from 'antd';

// Localization
import LOCALIZATION from 'services/LocalizationService';

// Constants
import { NOTIFICATION_DURATION } from 'constants/General';

export function showWarning (message, callNextScreen){
  Modal.warning({
    title: LOCALIZATION.WARNING,
    content: <div>{
      message?.warnings?.map((val)=>{
        return (
          <p>{val}</p>
        )
      })
    }</div>,
    onOk(){
      callNextScreen(message)
    }
  });
}

// Success
export function successNotification(message, duration = NOTIFICATION_DURATION){
  const key = 'success';
  notification.open({
    closeIcon: <i className="icon-highlight_remove"></i>,
    key,
    duration,
    description: 
      typeof(message)==='string'
        ?        
        message || 'Notification'
        :
        <div>{
          message?.map((val)=>{
            return (
              <p>{val}</p>
            )
          })
        }</div>  ,  
    className: 'notification-success'
  });
}

// Error
export function errorNotification(message, duration = NOTIFICATION_DURATION){
  const key = 'error';
  notification.open({
    closeIcon: <i className="icon-highlight_remove"></i>,
    key,
    duration,
    description:
    typeof(message)==='string'
      ?        
      message || 'Notification'
      :
      <div>{
        message?.map((val)=>{
          return (
            <p>{val}</p>
          )
        })
      }</div>  ,
    className: 'notification-error'
  });

}

// Warning
export function warningNotification(message, duration = NOTIFICATION_DURATION){
  const key = 'warning';
  notification.open({
    closeIcon: <i className="icon-highlight_remove"></i>,
    key,
    duration,
    description: message || 'Notification',
    className: 'notification-warning'
  });
}

// Info
export function infoNotification(message, duration = NOTIFICATION_DURATION){
  const key = 'info';
  notification.open({
    closeIcon: <i className="icon-highlight_remove"></i>,
    key,
    duration,
    description: message || 'Notification',
    className: 'notification-info'
  });
}