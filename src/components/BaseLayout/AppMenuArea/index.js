/* 
  Menus for application
*/

import React from 'react';

import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';

import { NavLink } from 'react-router-dom';

import { Menu } from 'antd';

// Constants
import {ADMIN_MENUS} from 'constants/ApplicationMenus';

// Actions
import { logout } from 'store/actions/AuthAction';

// Constants
import APP_URL from 'constants/ApplicationUrls';

// Style
import './style.scss'

// Helpers
function AppMenuArea ({
  pathname,
  onClickMenu
}) {

  // Refs
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = () => {
    dispatch(
      logout()
    ).then(() => {
      history.push(APP_URL.AUTH.LOGIN);
    })
  }

  const Admin_Menus = ADMIN_MENUS;

  return (
    <Menu mode="inline">
      {
        Admin_Menus && Admin_Menus.map((data, index) => {
          const { 
            name, icon, 
            url, disabled, pngIcon,
            parent, func
          } = data;

          return(
            (!func || !!func()) &&
            <Menu.Item 
              key={ index } 
              className={ pathname.includes("/" + parent)? "ant-menu-item-selected": 'ant-menu-item-not-selected' }
              icon={ !pngIcon? <i className={ icon }></i>: <img src={pngIcon} alt="" width={18}/> }
              disabled={ !!disabled }
              onClick={onClickMenu}
            >
              <NavLink to={ url || '' } className="menu-item-title">{icon} { name }</NavLink>
            </Menu.Item>
          );

        })
      }
    </Menu>
  )
};

export default AppMenuArea;