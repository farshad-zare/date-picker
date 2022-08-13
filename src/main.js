import "./style.css";
import { createCalender } from "./utils";

const now = new Date();
const locale = "fa-IR";
const parent = document.querySelector("body");

function datesClickHandler(event, date) {
  console.log(event, date);
}

const specialDates = {
  health: "2022-8-8",
  water: ["2022-8-5", "2022-8-9", "2022-8-2"],
};

createCalender(now, locale, parent, datesClickHandler, specialDates);
