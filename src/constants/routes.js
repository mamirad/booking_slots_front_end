import React from 'react';

// Application URLs
import URL from "constants/ApplicationUrls";

//components
const Bookings = React.lazy(() => import('components/Bookings'));
const Users = React.lazy(() => import('components/Users'));
const AddUsers = React.lazy(() => import('components/Users/Add'));

/* Routes */
export const ADMIN_ROUTES = [
  { path: URL.BOOKINGS, exact: true, component: Bookings },
  { path: URL.USERS, exact: true, component: Users },
  { path: URL.ADD_USERS, exact: true, component: AddUsers },
  { path: URL.EDIT_USER, exact: true, component: AddUsers },
];
