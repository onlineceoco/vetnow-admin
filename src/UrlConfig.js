export const api =
  window.location.hostname === "localhost"
    ? "http://localhost:8001/api/v1/"
    : "https://api.vetnow.ir/api/v1/";

export const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8001"
    : "https://api.vetnow.ir";
