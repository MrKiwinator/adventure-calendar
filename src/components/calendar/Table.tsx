import React from "react";
import { Month, ShortWeekDays } from "../../utils/variables";
import DateUnit from "./DateUnit";

export interface TableProps {
  onDaySelect: (
    year: number,
    month: number,
    day: number | null
  ) => void,
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
  const activeDate = activeFullDate.getDate();
  const currentDate = currentFullDate.getDate();
  // const activeDayOfWeek = activeFullDate.getDay();
  
  // const firstDayOfMonth = new Date(activeYear, activeMonth, 1);
  const lastDateOfMonth = new Date(activeYear, activeMonth + 1, 0);
  const lastDateOfPrevMonth = new Date(activeYear, activeMonth, 0);
  const daysInMonth = lastDateOfMonth.getDate();
  const daysInPrevMonth = lastDateOfPrevMonth.getDate();
  const daysFromStart = lastDateOfPrevMonth.getDay(); // Day of the week for the 1st day of the month

  
  // console.log("Days from the month start: ", daysFromStart)
  // console.log("Active date: ", activeDate);
  // console.log("Active day of the week: ", activeDayOfWeek);
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
        if (index - daysFromStart + 1 > daysInMonth) {
          return null; 
        }
        return index - daysFromStart + 1;
      })
    }
    // if (period === "week") {
    //   // Рассчитываем день начала текущей недели (понедельник)
    //   const startOfWeek = new Date(activeFullDate);
    //   startOfWeek.setDate(activeDate - activeDayOfWeek + (activeDayOfWeek === 0 ? -6 : 1));

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
                  onClick={() => onDaySelect(activeYear, activeMonth - 1, dayNumber)}
                >
                  <DateUnit dayNumber={dayNumber} activeMonth={false} />
                </li>
              )
            }

            // Days from next month in active: 
            if (!day && index >= 31) {
              const dayNumber = index + 1 + nextMonthDaysInActive - daysArr.length;
              
              return (
                <li 
                  key={"day" + (index + 1)} 
                  className="calendar__day"
                  onClick={() => onDaySelect(activeYear, activeMonth + 1, dayNumber)}
                >
                  <DateUnit dayNumber={dayNumber} activeMonth={false} />
                </li>
              )
            }

            // Active month days:
            const current = new Date(`${currentFullDate.getMonth()}/${currentFullDate.getDate()}/${currentFullDate.getFullYear()}`);
            const active = new Date(`${activeFullDate.getMonth()}/${day}/${activeFullDate.getFullYear()}`);
            
            return (
              <li 
                key={"day" + (index + 1)} 
                className="calendar__day" 
                onClick={() => onDaySelect(activeYear, activeMonth, day)}
              >
                <DateUnit 
                  dayNumber={day} 
                  isActive={activeDate === day} 
                  isCurrent={isEquialDates(current, active)} 
                />
              </li>
            )
          })
        }
      </ul>
    </>
  );
}

export default Table;