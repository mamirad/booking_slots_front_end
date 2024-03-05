/* Left Menus List */
import URL from "constants/ApplicationUrls";
import LOCALIZATION from "services/LocalizationService";
import { FaUsers ,FaCalendarAlt} from "react-icons/fa";

export const ADMIN_MENUS = [
  {
    name: LOCALIZATION.BOOKINGS,
    icon: <FaCalendarAlt/>,
    url: URL.BOOKINGS
  },
  {
    name: LOCALIZATION.USERS,
    icon: <FaUsers/>,
    url: URL.USERS,
  },
];
