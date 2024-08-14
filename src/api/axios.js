import axios from "axios";

const baseURLBackEnd = process.env.REACT_APP_BASE_URL_BACKEND;
const baseURLMonitoringBackEnd = process.env.REACT_APP_MONITOR_URL_BACKEND;
// console.log("baseURL_BE = " + baseURLBackEnd);

export const instanceBackEnd = axios.create({
  baseURL: baseURLBackEnd,
});

export const monitoringBackEnd = axios.create({
  baseURL: baseURLMonitoringBackEnd,
});