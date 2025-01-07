"use client";
import { useUser } from "@clerk/nextjs";

const Greeting = () => {
  const { user } = useUser();

  // Determine the current hour of the user's local time
  const currentHour = new Date().getHours();
  let greeting;

  // Set the greeting message based on the hour
  if (currentHour >= 0 && currentHour < 6) {
    greeting = "Night";
  } else if (currentHour >= 6 && currentHour < 12) {
    greeting = "Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Afternoon";
  } else {
    greeting = "Evening";
  }

  return (
    <div className="md:text-2xl">
      {greeting}
      <span className="font-bold font-mono">, {user?.fullName || "Guest"}</span>
    </div>
  );
};

export default Greeting;
