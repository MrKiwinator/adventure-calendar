import React from 'react';

interface DateUnitProps {
  dayNumber: number | null;
  isActive?: boolean;
  activeMonth?: boolean;
  isCurrent?: boolean;
}

const DateUnit: React.FC<DateUnitProps> = ({
  dayNumber, 
  isActive = false,
  activeMonth = true,
  isCurrent = false,
}) => {


  return (
    <button className={`day ${!activeMonth ? "day_unactive" : ""} ${isCurrent ? "day_current" : ""} ${isActive ? "day_active" : ""}`}>
      {dayNumber}
    </button>
  )
}

export default DateUnit;