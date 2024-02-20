import LOCALIZATION from "services/LocalizationService";
export const TABLE_KEYS={
  ID:'id',
  NAME:"name",
  TYPE:'type',
  EMAIL:"email"
}
export const ADD_EMPLOYEE_KEYS={
  NAME:'name',
  EMAIL:"email",
  TYPE:"type",
  PASSWORD:"password"
}
export const EMPLOYEMENT_TYPE_OPTIONS = [
  {
      name: LOCALIZATION.CONTRACTUAL,
      value: LOCALIZATION.CONTRACTUAL
  },
  {
      name: LOCALIZATION.FULL_TIME,
      value: LOCALIZATION.FULL_TIME
  },
  {
      name: LOCALIZATION.PART_TIME,
      value: LOCALIZATION.PART_TIME
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
      title: LOCALIZATION.NAME,
      dataIndex: TABLE_KEYS.NAME ,
      key: TABLE_KEYS.NAME,
      sorter: true,
    },
    {
      title: LOCALIZATION.EMAIL,
      dataIndex: TABLE_KEYS.EMAIL,
      key: TABLE_KEYS.EMAIL,
      sorter: true,
    },
    {
      title: LOCALIZATION.TYPE,
      dataIndex: TABLE_KEYS.TYPE,
      key: TABLE_KEYS.TYPE,
      sorter: true,
    },
  ];