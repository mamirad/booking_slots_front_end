export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SPACE_VALIDATIOR = '^\\S+[a-zA-Z0-9\\S#$%=+&-_\\s]*$'; 

export const SPECIAL_CHARACTERS_VALIDATIOR = /^(?=.*[^a-zA-Z0-9])/;

export const DIGITS_VALIDATIOR = /(?=.*[0-9])/;

export const PASSWORD_VALIDATOR = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const CAPITAl_LETTER_VALIDATIOR = /(?=.*[A-Z])/;

export const SMALL_LETTER_VALIDATIOR = /(?=.*[a-z])/;

export const RANGE_VALIDATIOR = /^.{8,15}$/;

export const PERCENTAGE_VALIDATION = /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0]{1,2})?$)/

export const CHARACTER_LIMIT = /^[0-9]{0,999999999999}$/;

export const CODE_LIMIT = /^(?=.{1,10}$).*/;

export const PHONE_PATTERN = /^(\+?\(61\)|\(\+?61\)|\+?61|\(0[1-9]\)|0[1-9]|\+?92[0-9]{2}[- ]?)?([0-9]{7,9}|[0-9]{11})$/;
