import React from "react";
import Calendar from "./calendar/Calendar";
import Menu from "./menu/Menu";

const Content = () => {
  const currentFullDate = new Date();

  const [activeFullDate, setActiveFullDate] = React.useState(currentFullDate);
  const [chosenPeriod, setChosenPeriod] = React.useState(activeFullDate);

  const handleDaySelect = (year: number, month: number, day: number | null) => {
    if (day) {
      console.log("DATE: ", new Date(year, month, day));

      setActiveFullDate(new Date(year, month, day))
    }

    console.log("Active Date: ", activeFullDate);
    console.log(currentFullDate);
  }

  const handleNextSideBtnClick = () => {
    // setActiveFullDate(new Date(activeFullDate.getFullYear(), activeFullDate.getMonth() + 1, 1));
  }

  const handlePrevSideBtnClick = () => {
    // setActiveFullDate(new Date(activeFullDate.getFullYear(), activeFullDate.getMonth() - 1, 1));
  }

  return (
    <div className="content">
      <Calendar 
        onDaySelect={handleDaySelect} 
        activeFullDate={activeFullDate}
        chosenPeriod={chosenPeriod}
        onNextSideBtnClick={() => handleNextSideBtnClick()}
        onPrevSideBtnClick={() => handlePrevSideBtnClick()}
      />
      <Menu activeFullDate={activeFullDate} />
    </div>
  )
}

export default Content;