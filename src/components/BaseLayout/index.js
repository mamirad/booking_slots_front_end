/* 
  Main Layout for application.
  It contains header, footer, body, routes
*/

import React, { Suspense } from 'react';
import { Redirect, Route, Switch, useLocation, useHistory } from 'react-router-dom';

// Attd
import { Row, Layout } from 'antd';
import { Footer } from "antd/lib/layout/layout";

// Constants
import APP_URL from 'constants/ApplicationUrls';
import {ADMIN_ROUTES} from 'constants/routes';

// Components
import Loading from 'components/Loading';
import HeaderArea from './AppHeaderArea';
import MenuArea from './AppMenuArea';

// Logo
import appLogo from '../../assets/images/horizon-digital-logo-lg.png';

// Style
import './style.scss'

const { Header, Content, Sider } = Layout;

function BaseLayout() {

  const history = useHistory();
  let { pathname } = useLocation();

  const goToWelcome = () => {
    history.push(APP_URL.WELCOME);
  }

  const SideBar =(flag)=>{
    return(
      <Sider
        className={
          !!flag 
            ?
            'sidebar-nav sidebar-nav-mobile-view': 
            'sidebar-nav sidebar-nav-desktop-view'
        } 
        trigger={<span className="icon-menu"></span>}
        width={240}
        breakpoint="lg"
      >
        <div className='sidebar-logo-wrap'>
          <img 
            src={ appLogo} 
            alt="logo" 
            width={ 100 }
            height={50}
            onClick={ goToWelcome }
          />
        </div>
        
        {/* Left Menus */}
        <MenuArea 
          pathname={ pathname }
        />
      </Sider>)
    
  }

  const AdminRoutes = ADMIN_ROUTES ;

  return (
    <Layout className="main-app">
      {
        SideBar(false) //desktop view
      }
      <Content className={ 'layout-full' }>
        <Layout className="site-layout">
          <Header className="app-header">
            <Row className="align-center justify-end">
              <HeaderArea />
            </Row>
          </Header>
        </Layout>
        
        <div className="main-section">
        <Suspense fallback={<Loading />}>
          <Switch>
            {
              AdminRoutes?.map((route, index) => {
                let {
                  path, exact, name, 
                  component: Component
                } = route;

                return (
                  <Route
                    key={index}
                    params={ name }
                    path={path}
                    exact={exact}
                    render={() => (
                      <Component />
                    )}
                  />
                )
              })
            }

            {/* Default case when application goes to root then what should happens? */}
            <Redirect
              from="/"
              to={ AdminRoutes?.[0]?.path || APP_URL.WELCOME }
            />
          </Switch>
        </Suspense>
        </div>
      </Content>
    </Layout>
  );
};

export default BaseLayout;