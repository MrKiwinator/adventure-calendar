import React from 'react';

interface DateUnitProps {
  dayNumber: number | null;
  currentDate?: number;
  active?: boolean;
}

const DateUnit: React.FC<DateUnitProps> = ({
  dayNumber, 
  currentDate, 
  active = true,
}) => {

  const [dayIsOpen, setDayIsOpen] = React.useState(false);

  const handleDateUnitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDayIsOpen(true);
  }

  if (dayNumber === currentDate) {
    return (
      <button className="date-unit date-unit_current" onClick={handleDateUnitClick}>
        {dayNumber}
      </button>
    )
  } else {
    return (
      <button className={`date-unit ${!active ? "date-unit_unactive" : ""}`} onClick={handleDateUnitClick}>
        {dayNumber}
      </button>
    )
  }
}

export default DateUnit;