import React from "react";

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  let message;
  switch (error.type) {
    case "EMPTY_INPUT":
      message = "Please enter a city name.";
      break;
    case "NOT_FOUND":
      message = "City not found. Check spelling or try another city.";
      break;
    case "RATE_LIMIT":
      message = "Too many requests! Try again later.";
      break;
    case "SERVER_ERROR":
      message = "Weather service is currently unavailable. Please try later.";
      break;
    case "NETWORK_ERROR":
      message = "Network issue detected. Check your internet connection.";
      break;
    default:
      message = "An unexpected error occurred. Please try again.";
  }

  return <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>;
};

export default ErrorMessage;
