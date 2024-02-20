/*
    General Helper Class
*/

// example: https://bithacker.dev/javascript-object-multi-property-sort

import { 
  format, 
} from 'date-fns'

// Date Format
import { DATE_FORMAT } from "constants/DateFormat";


export const formatDate = (
  date= new Date(), 
  formate=DATE_FORMAT.DAY_SLASH_MONTH_SLASH_YEAR 
) => {
  return format(date, formate);
}