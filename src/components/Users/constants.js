import LOCALIZATION from "services/LocalizationService";
export const TABLE_KEYS={
  ID:'id',
  FIRST_NAME:"first_name",
  LAST_NAME:'last_name',
  TYPE:'type',
  EMAIL:"email"
}
export const ADD_EMPLOYEE_KEYS={
  FIRST_NAME:'first_name',
  LAST_NAME:'last_name',
  EMAIL:"email",
  ROLE:"role",
  PASSWORD:"password"
}
export const EMPLOYEE_ROLE_KEYS={
  DEVELOPER:"developer",
  BUSINESS_DEVELOPER:"business_developer",
  TEAM_LEAD:"team_lead",
  ADMIN:"admin"
}
export const EMPLOYEMENT_ROLE_OPTIONS = [
  {
      value: EMPLOYEE_ROLE_KEYS.ADMIN,
      name: LOCALIZATION.ADMIN
  },
  {
      value: EMPLOYEE_ROLE_KEYS.TEAM_LEAD,
      name: LOCALIZATION.TEAM_LEAD
  },
  {
    value: EMPLOYEE_ROLE_KEYS.BUSINESS_DEVELOPER,
    name: LOCALIZATION.BUSINESS_DEVELOPER
},
{
  value: EMPLOYEE_ROLE_KEYS.DEVELOPER,
  name: LOCALIZATION.DEVELOPER
},
]
export const EMPLOYEE_TABLE_COLUMNS= [
  {
    title: LOCALIZATION.ID,
    dataIndex: TABLE_KEYS.ID ,
    key: TABLE_KEYS.ID,
    sorter: true,
  },
    {
      title: LOCALIZATION.FIRST_NAME,
      dataIndex: TABLE_KEYS.FIRST_NAME ,
      key: TABLE_KEYS.FIRST_NAME,
      sorter: true,
    },
    {
      title: LOCALIZATION.LAST_NAME,
      dataIndex: TABLE_KEYS.LAST_NAME,
      key: TABLE_KEYS.LAST_NAME,
      sorter: true,
    },
    {
      title: LOCALIZATION.EMAIL,
      dataIndex: TABLE_KEYS.EMAIL,
      key: TABLE_KEYS.EMAIL,
      sorter: true,
    },
  ];