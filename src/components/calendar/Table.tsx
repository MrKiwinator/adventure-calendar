import React from "react";
import { Month, ShortWeekDays } from "../../utils/variables";
import DateUnit from "./DateUnit";

export type onDaySelectType = (
  day: number,
  month: "prev" | "next" | "current",
) => void;

export interface TableProps {
  onDaySelect: onDaySelectType,
  activeFullDate: Date,
  chosenPeriod: Date,
}

const Table: React.FC<TableProps> = ({onDaySelect, activeFullDate, chosenPeriod}) => {
  
  // TODO: Supposed to be a state variable:
  console.log(ShortWeekDays);

  const [period, setPeriod] = React.useState("month");

  // new Date(first: year, month (starting from 0), day)
  const currentFullDate = new Date();

  const activeYear = activeFullDate.getFullYear();
  const activeMonth = activeFullDate.getMonth();
  const activeDate =  new Date(activeFullDate.getFullYear(), activeFullDate.getMonth(), activeFullDate.getDate());

  const chosenYear = chosenPeriod.getFullYear();
  const chosenMonth = chosenPeriod.getMonth();
  const chosenDate = chosenPeriod.getDate();

  const currentDate = new Date(currentFullDate.getFullYear(), currentFullDate.getMonth(), currentFullDate.getDate());
  // const activeDayOfWeek = activeFullDate.getDay();
  
  // const firstDayOfMonth = new Date(chosenYear, chosenMonth, 1);
  const lastDateOfMonth = new Date(chosenYear, chosenMonth + 1, 0);
  const lastDateOfPrevMonth = new Date(chosenYear, chosenMonth, 0);
  const daysInMonth = lastDateOfMonth.getDate();
  const daysInPrevMonth = lastDateOfPrevMonth.getDate();
  const daysFromStart = lastDateOfPrevMonth.getDay(); // Day of the week for the 1st day of the month

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
        if (index - daysFromStart + 1 > daysInMonth) {
          return null; 
        }
        return index - daysFromStart + 1;
      })
    }
    return [];
  }

  const daysArr = getDaysArr(); 

  console.log(daysArr);
  
  let firstWeekOfActiveMonth = daysArr.slice(0, 7);
  let lastWeekOfActiveMonth = daysArr.slice(daysArr.length - 7, daysArr.length);

  console.log(lastWeekOfActiveMonth);

  let prevMonthDaysInActive = 0;
  let nextMonthDaysInActive = 0;

  firstWeekOfActiveMonth.forEach((day) => {
    if (!day) {
      prevMonthDaysInActive++;
    }
  })

  lastWeekOfActiveMonth.forEach((day) => {
    if (!day) {
      nextMonthDaysInActive++;
    }
  })

  console.log("Prev month days in active month: ", prevMonthDaysInActive);
  console.log("Next month days in active month: ", nextMonthDaysInActive);

  const isEquialDates = (d1: any, d2: any) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();

    if (date1 === date2) return true;
    return false;
  }

  return (
    <>
      <ul className="calendar__header">
        {
          Object.values(ShortWeekDays).map((weekDay, index) => (
            <li key={"weekDay" + (index + 1)} className="calendar__weekday-container">
              <p className="calendar__weekday-title">
                {weekDay}
              </p>
            </li>
          ))
        }
      </ul>
      <ul className="calendar__table">
        {
          daysArr.map((day, index) => {

            // Days from prev month in active: 
            if (!day && index < 7) {
              const dayNumber = daysInPrevMonth - prevMonthDaysInActive + index + 1;
              return (
                <li 
                  key={"day" + (index + 1)} 
                  className="calendar__day"
                  onClick={() => onDaySelect(dayNumber, "prev")}
                >
                  <DateUnit dayNumber={dayNumber} activeMonth={false} />
                </li>
              )
            }

            // Days from next month in active: 
            if (!day && index >= 28) {
              const dayNumber = index + 1 + nextMonthDaysInActive - daysArr.length;
              
              return (
                <li 
                  key={"day" + (index + 1)} 
                  className="calendar__day"
                  onClick={() => onDaySelect(dayNumber, "next")}
                >
                  <DateUnit dayNumber={dayNumber} activeMonth={false} />
                </li>
              )
            }

            if (day) {
              // Active month days:
              const chosen = new Date(chosenPeriod.getFullYear(), chosenPeriod.getMonth(), day);

              return (
                <li 
                  key={"day" + (index + 1)} 
                  className="calendar__day" 
                  onClick={() => onDaySelect(day, "current")}
                >
                  <DateUnit 
                    dayNumber={day} 
                    isActive={activeDate.getTime() === chosen.getTime()} 
                    isCurrent={isEquialDates(currentDate, chosen)} 
                  />
                </li>
              )
            }

            return (
              <div>
                Some Error occure, try once more!
              </div>
            )
          })
        }
      </ul>
    </>
  );
}

export default Table;