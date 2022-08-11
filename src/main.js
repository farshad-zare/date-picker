import "./style.css";
import { createCalender } from "./utils";

const locale = "fa-IR";
const now = new Date();
const body = document.querySelector("body");
createCalender(now, locale, body, (e) => console.log(e));
