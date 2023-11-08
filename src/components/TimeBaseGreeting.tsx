import React from "react";

const TimeBaseGreeting = () => {
  let myDate = new Date();
  let hours = myDate.getHours();
  let greet;
  if (hours < 12) greet = "morning";
  else if (hours >= 12 && hours <= 17) greet = "afternoon";
  else if (hours >= 17 && hours <= 24) greet = "evening";

  return (
    <h1 className="text-white text-3xl font-semibold ml-4">Good {greet}</h1>
  );
};

export default TimeBaseGreeting;
