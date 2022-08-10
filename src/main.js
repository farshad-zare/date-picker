import {
  pNumStr2eInt,
  addDays,
  addMonth,
  findFirstPerMonthDay,
  perMonthDays,
  addNulls,
  faWeek,
  enWeek,
} from "./utils";

const now = new Date();
const mordad = perMonthDays(now);

console.log("res", addNulls(mordad, faWeek));
