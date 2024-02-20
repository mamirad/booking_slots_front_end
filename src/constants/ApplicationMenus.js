/* Left Menus List */
import URL from "constants/ApplicationUrls";
import LOCALIZATION from "services/LocalizationService";
export const ADMIN_MENUS = [
  {
    name: LOCALIZATION.BOOKINGS,
    icon: 'icon-AdWriter-Blue-Icon',
    url: URL.BOOKINGS
  },
  {
    name: LOCALIZATION.USERS,
    icon: 'icon-Shortlist-main',
    url: URL.USERS,
  },
];
