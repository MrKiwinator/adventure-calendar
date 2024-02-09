import React from "react";
import { Month, ShortWeekDays } from "../../utils/variables";
import DateUnit from "./DateUnit";

const Table = () => {
  
  // TODO: Supposed to be a state variable:
  console.log(ShortWeekDays);

  const [period, setPeriod] = React.useState("month");

  // new Date(first: year, month (starting from 0), day)
  const currentFullDate = new Date();
  const currentYear = currentFullDate.getFullYear();
  const currentMonth = currentFullDate.getMonth();
  const currentDate = currentFullDate.getDate();
  // const currentDayOfWeek = currentFullDate.getDay();
  const [activeDay, setActiveDay] = React.useState(currentFullDate);
  
  // const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const lastDateOfPrevMonth = new Date(currentYear, currentMonth, 0);
  const daysInMonth = lastDateOfMonth.getDate();
  const daysInPrevMonth = lastDateOfPrevMonth.getDate();
  const daysFromStart = lastDateOfPrevMonth.getDay(); // Day of the week for the 1st day of the month

  
  // console.log("Days from the month start: ", daysFromStart)
  // console.log("Current date: ", currentDate);
  // console.log("Current day of the week: ", currentDayOfWeek);
  // console.log("Days in month: ", daysInMonth);
  // console.log("Last full day of the month: ", lastDateOfMonth);
  // console.log("Last full day of prev month: ", lastDateOfPrevMonth);
  // console.log("Days in prev month: ", daysInPrevMonth);
  // console.log("Days in year: ", daysInYear)

  const getPeriodLenght = () => {
    if (period === "month") {
      let minArrLength = daysInMonth + daysFromStart - 1

      while (minArrLength % 7 !== 0) {
        minArrLength++;
      }

      console.log(minArrLength);

      return minArrLength;
    }
    return 7;
  }

  const getDaysArr = (): Array<number | null> => {
    if (period === "month") {
      return Array.from({length: getPeriodLenght()}, (value, index) => {
        if (index + 1 < daysFromStart) {
          return null; // Padding for days before the 1st day of the month
        }
        if (index - daysFromStart + 1 > 31) {
          return null; 
        }
        return index - daysFromStart + 1;
      })
    }
    // if (period === "week") {
    //   // Рассчитываем день начала текущей недели (понедельник)
    //   const startOfWeek = new Date(currentFullDate);
    //   startOfWeek.setDate(currentDate - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1));

    //   // Создаем массив с числами месяца для каждого дня недели
    //   return Array.from({ length: 7 }, (_, index) => {
    //     const day = new Date(startOfWeek);
    //     day.setDate(startOfWeek.getDate() + index);
    //     return day.getDate();
    //   });
    // }
    return [];
  }

  const daysArr = getDaysArr(); 

  console.log(daysArr);
  
  let firstWeekOfCurrentMonth = daysArr.slice(0, 7);
  let lastWeekOfCurrentMonth = daysArr.slice(daysArr.length - 7, daysArr.length);

  console.log(lastWeekOfCurrentMonth);

  let prevMonthDaysInCurrent = 0;
  let nextMonthDaysInCurrent = 0;

  firstWeekOfCurrentMonth.forEach((day) => {
    if (!day) {
      prevMonthDaysInCurrent++;
    }
  })

  lastWeekOfCurrentMonth.forEach((day) => {
    if (!day) {
      nextMonthDaysInCurrent++;
    }
  })

  console.log("Prev month days in current month: ", prevMonthDaysInCurrent);
  console.log("Next month days in current month: ", nextMonthDaysInCurrent);

  const handleClick = (day: number | null) => {
    if (day) {
      setActiveDay(new Date(currentYear, currentMonth, day))
    }

    console.log("Active Day: ", activeDay);
  }

  return (
    <div className="calendar-table">
      <div className="calendar-table__container">
        <ul className="calendar-table__header">
          {
            Object.values(ShortWeekDays).map((weekDay, index) => (
              <li key={"weekDay" + (index + 1)} className="calendar-table__weekday-conatiner">
                <p className="calendar-table__weekday">
                  {weekDay}
                </p>
              </li>
            ))
          }
        </ul>
        <ul className="calendar-table__body">
          {
            daysArr.map((day, index) => {
              // Days from prev month in current: 
              if (!day && index < 7) {
                return (
                  <li key={"day" + (index + 1)} className="calendar-table__day">
                    <DateUnit dayNumber={daysInPrevMonth - prevMonthDaysInCurrent + index + 1} active={false} />
                  </li>
                )
              }

              // Days from next month in current: 
              if (!day && index >= 31) {
                return (
                  <li key={"day" + (index + 1)} className="calendar-table__day">
                    <DateUnit dayNumber={index + 1 + nextMonthDaysInCurrent - daysArr.length} active={false} />
                  </li>
                )
              }

              // Current month days:
              return (
                <li key={"day" + (index + 1)} className={`calendar-table__day ${(day === currentDate) ? "calendar-table__day_current" : ""}`} onClick={() => handleClick(day)}>
                  <DateUnit dayNumber={day} currentDate={currentDate}/>
                </li>
              )
            })
          }
        </ul>
      </div>
      
    </div>
  );
}

export default Table;