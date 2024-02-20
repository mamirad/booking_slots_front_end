//Ant Design 
import { Button, Col, Form, Modal, Row } from 'antd'

///common Elements
import { Dropdown, Email, Password, Text } from 'components/Common/FormElements'

/////constants
import LOCALIZATION from 'services/LocalizationService'
import { ADD_EMPLOYEE_KEYS, EMPLOYEMENT_TYPE_OPTIONS } from '../constants'

//style
import '../style.scss';
import { Employee } from '..';
import { parseEditEmployeeFormData } from 'dataParser/Employee';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import URL from 'constants/ApplicationUrls';

const Layout = () => {
  const [form] = Form.useForm()
  const history=useHistory()
  const {id}=useParams();
  const onSubmit = (data) => {
    history.push(URL.USERS)
  }
  const employeeData=Employee.find(item=>item.id==id);
  return (
    <>
    
       <Row className='add-employee-wrapper'>
        <Form
          title='Add User'
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          
          fields={parseEditEmployeeFormData(employeeData, ADD_EMPLOYEE_KEYS,id)}
          // requiredMark={LOCALIZATION.OPTIONAL}
        >
          <Row className='add-employee-form'>
            <h2>Add Employee</h2>
            <Col span={24}>
              <Text label={LOCALIZATION.NAME} name={ADD_EMPLOYEE_KEYS.NAME} required />
            </Col>
            <Col span={24}>
            <Email label={LOCALIZATION.EMAIL} name={ADD_EMPLOYEE_KEYS.EMAIL} required />
            </Col>
            <Col span={24}>
            <Dropdown label={LOCALIZATION.TYPE} name={ADD_EMPLOYEE_KEYS.TYPE}  placeholder={LOCALIZATION.TYPE} />
            </Col>
            <Col span={24}>
            <Password label={LOCALIZATION.PASSWORD} name={ADD_EMPLOYEE_KEYS.PASSWORD} required />
            </Col>
            <Col span={24} className='form-buttons'>
              <Button  className='cancel' onClick={()=>history.push(URL.USERS)}>Cancel</Button>
              <Button type='primary'  htmlType="submit" onClick={() => new Event("submit")}>Add</Button>
            </Col>
          </Row>
          
        </Form>
        </Row>
      
    </>
  )
}

export default Layout