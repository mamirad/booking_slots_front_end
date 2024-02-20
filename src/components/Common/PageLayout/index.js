import { Breadcrumb, Col, Row } from 'antd'
import Loading from 'components/Loading'
import React from 'react'
import './style.scss'
const Layout = ({title,actions,breadcumbs,loading,children}) => {
  return (
    <div className='pagelayout-wrapper'>
      {!!loading && Loading}
      <Breadcrumb items={breadcumbs}/>
      <Row>
        <Col span={!!actions?12:24}>
          <h1 className='page-title'>{title}</h1>
        </Col>
        {
          !!actions &&
          <Col span={12} className='action-area'>
            {actions}
          </Col>
        }
      </Row>
      {children}
    </div>
  )
}

export default Layout