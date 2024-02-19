import React from "react";
import Calendar from "./calendar/Calendar";
import Menu from "./menu/Menu";
import { onDaySelectType } from "./calendar/Table";

const Content = () => {
  const currentFullDate = new Date();

  const [activeFullDate, setActiveFullDate] = React.useState(currentFullDate);
  const [chosenPeriod, setChosenPeriod] = React.useState(activeFullDate);

  const handleDaySelect: onDaySelectType = (day, month) => {

    switch (month) {
      case "current":
        setActiveFullDate(new Date(chosenPeriod.getFullYear(), chosenPeriod.getMonth(), day));
        return;
      case "next":
        setActiveFullDate(new Date(chosenPeriod.getFullYear(), chosenPeriod.getMonth() + 1, day));
        handleNextSideBtnClick();
        return;
      case "prev":
        setActiveFullDate(new Date(chosenPeriod.getFullYear(), chosenPeriod.getMonth() - 1, day));
        handlePrevSideBtnClick();
        return;
    }
  }

  const handleNextSideBtnClick = () => {
    setChosenPeriod(new Date(chosenPeriod.getFullYear(), chosenPeriod.getMonth() + 1, 1));
  }

  const handlePrevSideBtnClick = () => {
    setChosenPeriod(new Date(chosenPeriod.getFullYear(), chosenPeriod.getMonth() - 1, 1));
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