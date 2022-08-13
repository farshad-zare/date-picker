const faWeek = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
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

const enShortWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const faShortWeek = [
  "شنبه",
  "۱شنبه",
  "۲شنبه",
  "۳شنبه",
  "۴شنبه",
  "۵شنبه",
  "جمعه",
];

const leftArrowString = `<path d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z"/>`;

const rightArrowString = `<path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z"/>`;

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

function findFirstMonthDay(date, locale) {
  const dayOfMonth = date.toLocaleDateString(locale, { day: "numeric" });
  let firstDayOfMonth;

  if (locale === "fa-IR") {
    firstDayOfMonth = pNumStr2eInt(dayOfMonth);
  } else {
    firstDayOfMonth = parseInt(dayOfMonth);
  }

  return addDays(-firstDayOfMonth + 1, date);
}

function monthDays(date, locale) {
  const firstDay = findFirstMonthDay(date, locale);
  const month = date.toLocaleDateString(locale, { month: "numeric" });
  const days = [];

  for (let i = 0; i < 32; i++) {
    const day = addDays(i, firstDay);
    const everyMonth = day.toLocaleDateString(locale, { month: "numeric" });

    if (month === everyMonth) {
      days.push(day);
    }
  }

  return days;
}

function addNulls(dayArr, locale, week) {
  const daysArray = [...dayArr];
  const firstDay = dayArr[0];
  const lastDay = dayArr[dayArr.length - 1];

  const firstDayWeekday = week.indexOf(
    firstDay.toLocaleDateString(locale, {
      weekday: "long",
    })
  );

  const lastDayWeekday = week.indexOf(
    lastDay.toLocaleDateString(locale, {
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

function createMonthChanger(date, locale, parent, dateHandler) {
  const preArrow = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  preArrow.setAttribute("id", "pre-month");
  preArrow.setAttribute("viewBox", "0 0 512 512");

  const nextArrow = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  nextArrow.setAttribute("id", "next-month");
  nextArrow.setAttribute("viewBox", "0 0 512 512");

  const currentMonth = document.createElement("h3");
  const monthChangerContainer = document.createElement("div");
  monthChangerContainer.classList.add("month-changer");
  const newDate = new Date(date);
  const changerString = date.toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });

  preArrow.innerHTML = leftArrowString;
  nextArrow.innerHTML = rightArrowString;
  currentMonth.innerText = changerString;

  monthChangerContainer.append(preArrow);
  monthChangerContainer.append(currentMonth);
  monthChangerContainer.append(nextArrow);

  const preMonth = monthChangerContainer.querySelector("#pre-month");
  preMonth.addEventListener("click", () => {
    const preCalender = document.querySelector(".calender-container");
    preCalender.remove();
    createCalender(addMonth(-1, newDate), locale, parent, dateHandler);
  });

  const nextMonth = monthChangerContainer.querySelector("#next-month");
  nextMonth.addEventListener("click", () => {
    const preCalender = document.querySelector(".calender-container");
    preCalender.remove();
    createCalender(addMonth(1, newDate), locale, parent, dateHandler);
  });

  return monthChangerContainer;
}

function createDates(daysArray, locale, week, dateHandler) {
  const direction = locale === "fa-IR" ? "rtl" : "ltr";

  const daysContainer = document.createElement("div");
  daysContainer.dir = direction;
  daysContainer.classList.add("days-container");
  const today = new Date();

  week.forEach((dayName) => {
    const dayNameElem = document.createElement("span");
    dayNameElem.classList.add("week-day-name");
    dayNameElem.innerText = dayName;
    daysContainer.append(dayNameElem);
  });

  daysArray.forEach((day) => {
    const dayElem = document.createElement("button");
    dayElem.classList.add("day");
    const content = day
      ? day.toLocaleDateString(locale, { day: "numeric" })
      : null;
    dayElem.innerText = content;

    if (day) {
      dayElem.dataset.date = day.toDateString();
      dayElem.classList.add("active-day");

      if (dateHandler) {
        dayElem.addEventListener("click", dateHandler);
      }

      if (today.toDateString() === day.toDateString()) {
        dayElem.classList.add("today");
      }
    }

    if (!day) {
      dayElem.classList.add("empty-day");
    }

    daysContainer.append(dayElem);
  });

  return daysContainer;
}

function createCalender(date, locale, parent, dateHandler) {
  const weekDayNames = locale === "fa-IR" ? [...faShortWeek] : [...enShortWeek];

  const week = locale === "fa-IR" ? faWeek : enWeek;

  const calenderContainer = document.createElement("div");
  calenderContainer.classList.add("calender-container");

  const monthChanger = createMonthChanger(date, locale, parent, dateHandler);
  calenderContainer.append(monthChanger);

  const daysArray = monthDays(date, locale);
  const daysArrayWithNulls = addNulls(daysArray, locale, week);
  const datesContainer = createDates(
    daysArrayWithNulls,
    locale,
    weekDayNames,
    dateHandler
  );

  calenderContainer.append(datesContainer);

  parent.append(calenderContainer);

  return calenderContainer;
}

export {
  pNumStr2eInt,
  addDays,
  addMonth,
  findFirstMonthDay,
  monthDays,
  addNulls,
  createMonthChanger,
  createDates,
  createCalender,
};
