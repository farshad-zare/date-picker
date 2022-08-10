const faWeek = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const enWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function pNumStr2eInt(s) {
  const eStr = s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  return parseInt(eStr);
}

function addDays(days, date) {
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
}

function addMonth(months, date) {
  const dateObj = new Date(date);
  dateObj.setMonth(dateObj.getMonth() + months);
  return dateObj;
}

function findFirstPerMonthDay(date) {
  const dayOfMonth = date.toLocaleDateString("fa-IR", { day: "numeric" });
  const enDayOfMonth = pNumStr2eInt(dayOfMonth);
  return addDays(-enDayOfMonth + 1, date);
}

function perMonthDays(date) {
  const firstDay = findFirstPerMonthDay(date);
  const monthFa = date.toLocaleDateString("fa-IR", { month: "numeric" });
  const days = [];

  for (let i = 0; i < 32; i++) {
    const day = addDays(i, firstDay);
    const everyMonth = day.toLocaleDateString("fa-IR", { month: "numeric" });

    if (monthFa === everyMonth) {
      days.push(day);
    }
  }

  return days;
}

function addNulls(dayArr, week) {
  const daysArray = [...dayArr];
  const firstDay = dayArr[0];
  const lastDay = dayArr[dayArr.length - 1];

  const firstDayWeekday = week.indexOf(
    firstDay.toLocaleDateString("en-US", {
      weekday: "long",
    })
  );

  const lastDayWeekday = week.indexOf(
    lastDay.toLocaleDateString("en-US", {
      weekday: "long",
    })
  );

  for (let i = 1; i <= firstDayWeekday; i++) {
    daysArray.unshift(null);
  }

  for (let i = 1; i < week.length - lastDayWeekday; i++) {
    daysArray.push(null);
  }

  return daysArray;
}

export {
  pNumStr2eInt,
  addDays,
  addMonth,
  findFirstPerMonthDay,
  perMonthDays,
  addNulls,
  faWeek,
  enWeek,
};
