/*
    General Helper Class
*/

// example: https://bithacker.dev/javascript-object-multi-property-sort

import { SEARCH_TYPING_INTERVAL } from "constants/General";

import StorageService from "services/StorageService";

import LOCALIZATION from "services/LocalizationService";

export const getName = () => {
  const token = StorageService.instance.getAccessToken() || {};
  const { first_name, last_name } = parseJwt(token)?.user || {};

  if (!!first_name && !!last_name) {
    return `${first_name} ${last_name}`;
  } else if (!!first_name) {
    return first_name;
  } else {
    return last_name || LOCALIZATION.USER;
  }
};

const debounceFunction = () => {
  let timeoutInstance = null;
  return (callback) => {
    /**
     * clear old timeout instance if exist.
     */
    if (timeoutInstance) clearTimeout(timeoutInstance);
    timeoutInstance = setTimeout(callback, SEARCH_TYPING_INTERVAL);
  };
};

export const debounce = debounceFunction();

export const parseJwt = (token) => {
  var base64Url = token?.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const getUserId = () => {
  const token = StorageService.instance.getAccessToken() || {};
  return parseJwt(token)?.user_id;
};

export const disabledFutureDates = (current) => {
  return current && current.valueOf() > Date.now();
};

// Sort an array
export function sortArray(array = [], sortBy) {
  return (
    array &&
    array.sort(function (a, b) {
      let i = 0,
        result = 0;
      while (i < sortBy.length && result === 0) {
        result =
          sortBy[i].direction *
          (a[sortBy[i]?.prop]?.toString() < b[sortBy[i]?.prop]?.toString()
            ? -1
            : a[sortBy[i]?.prop]?.toString() > b[sortBy[i]?.prop]?.toString()
              ? 1
              : 0);
        i++;
      }
      return result;
    })
  );
}

export function truncateString(str, n) {
  if (str?.length > n) {
    return str.substring(0, n) + "...";
  } else {
    return str;
  }
}

export function camalize(str) {
  const words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0]?.toUpperCase() + words[i]?.substr(1).toLowerCase();
  }

  return words.join(" ");
}

// Get Int value of given value
export function getIntVal(value) {
  return parseInt(value || 0);
}

// Add Thousand Separator in value
export function thousandSeprator(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const toBase64 = async (file) => {
  const action = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  const base64String = await action;
  let result = base64String?.split(",")?.[1];
  return result;
};

export function getFiltersCount(filterObj = {}) {
  let count = 0;
  filterObj &&
    // eslint-disable-next-line array-callback-return
    Object.keys(filterObj)?.map((key) => {
      const value = filterObj?.[key];
      const isArray = Array.isArray(value);
      if ((!isArray && !!value) || (!!isArray && !!value?.length > 0)) {
        count++;
      }
    });
  return count;
}

export function isObjectEmpty(obj) {
  return (
    !!obj &&
    !!!Object.keys(obj)
      ?.map((key) => !!obj?.[key])
      ?.filter((i) => i !== false)?.length
  );
}

export function parseGeneralErrorMessage(object) {
  let message = "";
  for (const property in object) {
    message += object[property]?.toString() + ", ";
  }
  return message.substring(0, message.length - 2);
}

export function replaceUndefinedWithNull(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === undefined) {
      obj[key] = null;
    }
  }
  return obj;
}

export function capitalizeEachWord(input) {
  if (typeof input !== 'string' || input.length === 0) {
    return "";
  }
  return input.replace(/\b\w/g, (match) => {
    if (match[0].toUpperCase() === match[0]) {
      return match;
    } else {
      return match.toUpperCase();
    }
  });
}

export function formatNumber(inputString) {
  const cleanedString = inputString?.replace(/\D/g, '');
  if (!cleanedString) {
    return '';
  }
  const formattedString = cleanedString?.replace(/(\d{4})(\d{0,3})(\d*)/, (_, p1, p2, p3) => {
    return p1 + (p2 ? ' ' + p2 : '') + (p3 ? ' ' + p3 : '');
  });
  return formattedString.trim();
}

export function formatPhone(inputString) {
  const cleanedString = inputString?.replace(/\D/g, '');
  if (!cleanedString) {
    return '';
  }
  let formattedString;
  if (cleanedString.length > 8) {
    // formattedString = cleanedString?.replace(/(\d{6})(\d{4})/, '$1 $2');
    formattedString = cleanedString?.replace(/(\d{6})(\d*)/, (_, p1, p2) => {
      return p1 + (p2 ? ' ' + p2 : '');
    });
  }
  if (cleanedString.length <= 8) {
    formattedString = cleanedString?.replace(/(\d{4})(\d*)/, '$1 $2');
  }

  return formattedString.trim()
}

export const minutesConverter = (totalMinutes) => {
  const sign = totalMinutes < 0 ? '-' : '';
  const absMinutes = Math.abs(totalMinutes);
  const hours = Math.floor(absMinutes / 60);
  const formattedHours = String(hours).padStart(2, '0');
  const remainingMinutes = absMinutes % 60;
  const formattedMinutes = String(remainingMinutes).padStart(2, '0');
  return `${sign}${formattedHours}:${formattedMinutes}`;
};

export function generateYears(startYear, endYear) {
  const yearsArray = [];
  for (let year = startYear; year <= endYear; year++) {
    yearsArray.push({ name: `${year}`, value: year });
  }
  return yearsArray;
}