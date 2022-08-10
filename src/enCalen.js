import { baseUrl } from "/src/utils.js";

function createEnCalc(date, fieldData) {
  const calContainer = document.createElement("div");
  calContainer.classList.add("calll");

  let calTitle = date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  calContainer.innerHTML = `
    <div class = "calendar-container"> 
        <div class="calendar-title"> Choose date to show image </div>
        <div class="cal-seprator"></div>
        <div class="month-changer">
            <img class="back-p" src="public/back-p.png" style="width:30px; height:30px">
            <p>${calTitle}</p>
            <img class="forward-p" src="public/back-p.png" style="width:30px; height:30px">
        </div>

        <div class="days-container">
            <div class="weekday-name">
                <span>Sun</span>   
                <span>Mon</span>   
                <span>Tues</span>   
                <span>Wed</span>   
                <span>Thurs</span>   
                <span>Fri</span>   
                <span>Sat</span>   
            </div>    
        </div>
        <div class="cal-seprator"></div>
        <div class="calendar-legend">
            <div class="legend-item"> <div class="cal-legend-color" style="background-color: rgb(23 73 252);"> </div> <h3> Water Stress </h3> </div>
            <div class="legend-item"> <div class="cal-legend-color" style="background-color: rgb(179 23 252);">  </div>  <h3> Both </h3> </div>
            <div class="legend-item"> <div class="cal-legend-color" style="background-color: rgb(255 94 113);">  </div> <h3> Health Stress</h3></div>
            <div class="legend-item"> <div class="cal-legend-color" style="background-color: rgb(230 230 230);">  </div> <h3> No Stress </h3></div>
        </div>

    </div>`;

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let thisMonth = date.getMonth() + 1;

  if (thisMonth.toString().length === 1) {
    thisMonth = `0${thisMonth}`;
  }

  const thisYear = date.getFullYear();

  const firstDayOfMonth = new Date(`${thisYear}-${thisMonth}-01`);
  const firstDayOfWeek = weekday[firstDayOfMonth.getDay()];
  const firstDayOfWeekIndex = weekday.indexOf(firstDayOfWeek);

  const getDays = (year, month) => {
    return new Date(year, month, 0).getDate();
  };
  const thisMonthNumberOfDays = getDays(thisYear, thisMonth);

  const daysArray = [];
  for (let day = 1; day <= thisMonthNumberOfDays; day++) {
    if (day.toString().length === 1) {
      day = `0${day}`;
    }

    daysArray.push(new Date(`${thisYear}-${thisMonth}-${day}`));
  }

  for (let i = 0; i < firstDayOfWeekIndex; i++) {
    daysArray.unshift(null);
  }

  let numberOfEndNulls = 7 - (daysArray.length % 7);

  for (let i = 0; i < numberOfEndNulls; i++) {
    daysArray.push(null);
  }

  const numberOfWeeks = daysArray.length / 7;

  const weeks = [];

  for (let i = 0; i < numberOfWeeks; i++) {
    let week = daysArray.slice(i * 7, i * 7 + 7);
    weeks.push(week);
  }

  const daysContainer = calContainer.querySelector(".days-container");

  const { alarm_dates, alarm_types, all_dates, links } = fieldData;
  console.log(fieldData);

  let all_dates_object = [];

  for (let i in all_dates) {
    let date_obj = new Date(all_dates[i]);
    all_dates_object.push(date_obj.toDateString());
  }

  let alarm_dates_obj = [];
  for (let i in alarm_dates) {
    let date_obj = new Date(alarm_dates[i]);
    alarm_dates_obj.push(date_obj.toDateString());
  }

  weeks.forEach((week) => {
    const weekElem = document.createElement("div");
    weekElem.classList.add("week-container");

    week.forEach((day) => {
      const dayElem = document.createElement("div");
      dayElem.classList.add("day");
      const content = day ? day.getDate() : "";
      dayElem.innerText = content;
      if (day) {
        if (all_dates) {
          if (all_dates_object.includes(day.toDateString())) {
            let myLink = links[all_dates_object.indexOf(day.toDateString())];
            dayElem.innerHTML = `<a href=${baseUrl}?id=${myLink} target="_blank">${content}</a>;`;
          } else {
            dayElem.classList.add("disabled-day");
          }
        }

        if (alarm_dates) {
          if (alarm_dates_obj.includes(day.toDateString())) {
            // console.log(alarm_dates.indexOf(day.toDateString()))
            let myLink = links[all_dates_object.indexOf(day.toDateString())];
            dayElem.innerHTML = `<a href=${baseUrl}?id=${myLink} target="_blank">${content}</a>;`;
            dayElem.classList.add(
              alarm_types[alarm_dates_obj.indexOf(day.toDateString())]
            );
            dayElem.style.color = "white";
          }
        }
      } else {
        dayElem.classList.add("empty-day");
      }

      weekElem.append(dayElem);
    });

    daysContainer.append(weekElem);
  });

  return calContainer;
}

export { createEnCalc };
