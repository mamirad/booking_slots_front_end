import React from 'react'
import LOCALIZATION from 'services/LocalizationService';
import { HomeOutlined, UserOutlined, TeamOutlined, ProjectOutlined, CalendarOutlined, RocketOutlined, CarryOutOutlined } from '@ant-design/icons';
export const USERS_LIST = [
  {
    href: '',
    title: <UserOutlined />,
  },
  {
    title: (
      <>
        <span>{LOCALIZATION.USERS}</span>
      </>
    ),
  }
];
export const BOOKINGS_LIST = [
  {
    href: '',
    title: <UserOutlined />,
  },
  {
    title: (
      <>
        <span>{LOCALIZATION.BOOKINGS}</span>
      </>
    ),
  }
];