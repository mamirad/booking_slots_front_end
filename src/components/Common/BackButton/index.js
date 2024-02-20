
import React from 'react'

// Antd
import { LeftOutlined } from "@ant-design/icons"
import { Row } from 'antd'

// React Router Dom
import { useHistory } from "react-router-dom"

const Layout = ({ name }) => {
    const history = useHistory()
    const goBack = () => {
        history.goBack(); // Go back to the previous page in the history stack
    };
    return (
        <>
            <Row className='header' >
                <h3> <span><LeftOutlined onClick={goBack} /></span> {name} </h3>
            </Row>
        </>
    )
}

export default Layout