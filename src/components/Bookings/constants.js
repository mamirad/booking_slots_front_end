import LOCALIZATION from "services/LocalizationService"

export const EVENT_KEYS = {
  NAME: "name",
  ROOM: "location_id",
  START_TIME:"start_time",
  END_TIME:"end_time",
  REMINDER:"reminder",
  RECURSION:"recursion",
  DESCRIPTION:"description",
  USERS:"user",
  DATE:"schedule_date"
}

export const ROOM_KEYS = {
  MR_1: "room_1",
  MR_2: "room_2",
  MR_3: "room_3",
  MR_4: "room_4",
  MR_5: "room_5",
}

export const RECURSION_KEYS={
  NO_REPEAT:'no_repeat',
  WEEKLY:"weekly",
  MONTHLY:"monthly"
}

export const REMINDER_KEYS={
   TEN:"10m",
   FIFTEEN:"15m",
   TWENTY:"20m",
   TWENTY_FIVE:"25m",
   THIRTY:"30m",
}
export const ROOM_OPTIONS = [
  {
    value: ROOM_KEYS.MR_1,
    name: LOCALIZATION.ROOM_1
  },
  {
    value: ROOM_KEYS.MR_2,
    name: LOCALIZATION.ROOM_2
  },
  {
    value: ROOM_KEYS.MR_3,
    name: LOCALIZATION.ROOM_3
  },
  {
    value: ROOM_KEYS.MR_4,
    name: LOCALIZATION.ROOM_4
  },
  {
    value: ROOM_KEYS.MR_5,
    name: LOCALIZATION.ROOM_5
  },
]

export const RECURSION_OPTIONS = [
  {
    name: LOCALIZATION.NO_REPEAT,
    value: RECURSION_KEYS.NO_REPEAT,
  },
  {
    name: LOCALIZATION.WEEKLY,
    value: RECURSION_KEYS.WEEKLY,
  },
  {
    name: LOCALIZATION.MONTHLY,
    value: RECURSION_KEYS.MONTHLY,
  }
]

export const REMINDER_OPTIONS = [
  {
    name: LOCALIZATION.TEN,
    value: REMINDER_KEYS.TEN,
  },
  {
    name: LOCALIZATION.FIFTEEN,
    value: REMINDER_KEYS.FIFTEEN,
  },
  {
    name: LOCALIZATION.TWENTY,
    value: REMINDER_KEYS.TWENTY,
  },
  {
    name: LOCALIZATION.TWENTY_FIVE,
    value: REMINDER_KEYS.TWENTY_FIVE,
  },
  {
    name: LOCALIZATION.THIRTY,
    value: REMINDER_KEYS.THIRTY,
  },
 
]