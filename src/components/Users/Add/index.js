//Ant Design 
import { Button, Col, Form, Modal, Row } from 'antd'

///common Elements
import { Dropdown, Email, Password, Text } from 'components/Common/FormElements'

/////constants
import LOCALIZATION from 'services/LocalizationService'
import { ADD_EMPLOYEE_KEYS, EMPLOYEMENT_ROLE_OPTIONS } from '../constants'
import { REDUX_STATES } from 'constants/ReduxStates'
//style
import '../style.scss';
import { parseEditEmployeeFormData } from 'dataParser/Employee';
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import URL from 'constants/ApplicationUrls';
import { getToken, parseGeneralErrorMessage } from 'helpers/GeneralHelper';
import { getAction, postAction, putAction } from 'store/actions/CRUDAction'
import { errorNotification, successNotification } from 'helpers/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { API_URLS } from 'constants/ApiUrl'
import STATUS_CODES from 'constants/StatusCodes'
import { useEffect } from 'react'



const Layout = () => {
  const {EMPLOYEE,LOADING,RESPONSE,CHECK_TOKEN}=REDUX_STATES;
  const [form] = Form.useForm()
  const history = useHistory()
  const { id } = useParams();
  // const {token}=useParams()
  const dispatch=useDispatch();


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const inviteToken = searchParams.get('token');

  const {
    [EMPLOYEE + LOADING]: loading = false,
    [EMPLOYEE + RESPONSE]: usersData = {},
    [CHECK_TOKEN + RESPONSE]: validUser = {},
  } = useSelector((state) => state?.Crud);

  useEffect(()=>{
    if(id){
      getEmplyeeData(id)
    }
  },[])

  useEffect(()=>{
    if(inviteToken){
      checkValidToken()
    }
  },[inviteToken])
  
 const getEmplyeeData=(id)=>{
    return dispatch(getAction(API_URLS.USERS+id,{},EMPLOYEE))
 }
 
 const checkValidToken=()=>{
   
  const params={
    token:inviteToken
  }
  dispatch(getAction(API_URLS.CHECK_TOKEN, {params},{}, CHECK_TOKEN)).then((res)=>{
    !res?.success && history.push(URL.USERS)
  })
 }
 
 const addEmployee = (data) => {
  dispatch(postAction(API_URLS.SIGN_UP, data, EMPLOYEE)).then(
    () => {
      successNotification(LOCALIZATION.ADDED_EMPLOYEE_SUCCESSFULLY);
      form.resetFields();
      history.push(URL.USERS);
    }
  ).catch(error=>{
    errorNotification(error?.error)
  })
};

const invitedEmployee = (data) => {
  dispatch(putAction(API_URLS.ACCEPT+inviteToken, data, EMPLOYEE)).then(
    () => {
      successNotification(LOCALIZATION.ADDED_EMPLOYEE_SUCCESSFULLY);
      form.resetFields();
      history.push(URL.USERS);
    }
  ).catch(error=>{
    errorNotification(error?.error)
  })
};

  const editEmployee = (data) => {
    dispatch(putAction(API_URLS.USERS+id, data, {}, EMPLOYEE)).then(
      () => {
        successNotification(LOCALIZATION.EDIT_EMPLOYEE_SUCCESSFULLY);
        form.resetFields()
        history.push(URL.USERS)
      }
    ).catch(error=>{
      errorNotification(error?.error)
    })
  };
  
  const onSubmit=(data)=>{
   if(id){
     editEmployee(data)
   }
   else if(inviteToken){
     invitedEmployee(data)
   }
   else{
     addEmployee(data)
   }
  }
  const onCancel=()=>{
    form.resetFields();
    history.push(URL.USERS)
  }
  return (
    <>

      <Row className='add-employee-wrapper'>
        <Form
          form={form}
          layout="vertical"
          title={id?LOCALIZATION.EDIT_USER:LOCALIZATION.ADD_USER}
          onFinish={onSubmit}
          fields={parseEditEmployeeFormData(usersData, ADD_EMPLOYEE_KEYS, id)}
        // requiredMark={LOCALIZATION.OPTIONAL}
        >
          <Row className='add-employee-form'>
            <h2>{id?LOCALIZATION.EDIT_EMPLOYEE:LOCALIZATION.ADD_EMPLOYEE}</h2>
            <Col span={24}>
              <Text label={LOCALIZATION.FIRST_NAME} name={ADD_EMPLOYEE_KEYS.FIRST_NAME} required />
            </Col>
            <Col span={24}>
              <Text label={LOCALIZATION.LAST_NAME} name={ADD_EMPLOYEE_KEYS.LAST_NAME} />
            </Col>
            <Col span={24}>
              <Email label={LOCALIZATION.EMAIL} name={ADD_EMPLOYEE_KEYS.EMAIL} required />
            </Col>
            <Col span={24} >
              <Dropdown label={LOCALIZATION.ROLE} name={ADD_EMPLOYEE_KEYS.ROLE} placeholder={LOCALIZATION.SELECT_ROLE} options={EMPLOYEMENT_ROLE_OPTIONS} />
            </Col>
            <Col span={24}>
              <Password label={LOCALIZATION.PASSWORD} name={ADD_EMPLOYEE_KEYS.PASSWORD} required />
            </Col>
            <Col span={24} className='form-buttons'>
              <Button className='cancel' onClick={()=>onCancel()}>Cancel</Button>
              <Button type='primary' htmlType="submit" onClick={() => new Event("submit")}>
                {id?LOCALIZATION.UPDATE:LOCALIZATION.ADD}
              </Button>
            </Col>
          </Row>

        </Form>
      </Row>

    </>
  )
}

export default Layout