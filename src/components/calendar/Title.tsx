import React from "react";
import { Month } from "../../utils/variables";

interface TitleProps {
  chosenPeriod: Date,
}

const Title: React.FC<TitleProps> = ({chosenPeriod}) => {

  const transitionTime = 1000;

  // Unrelated variable used in animation:
  const [monthNumber, setMonthNumber] = React.useState(chosenPeriod.getMonth());
  const [switchingState, setSwitchingState] = React.useState(false);

  React.useEffect(() => {
    if (monthNumber !== chosenPeriod.getMonth()) {
      setSwitchingState(true);
      setTimeout(() => {
        console.log("MEEEEEEEEOW!");
        setMonthNumber(chosenPeriod.getMonth());
        setSwitchingState(false);
      }, transitionTime)
    }
  }, [chosenPeriod, monthNumber])

  console.log(switchingState);

  const getMonthByIndex = (index: number): string | undefined => {
    const monthsArray = Object.values(Month);

    if (!monthsArray[index]) {
      return monthsArray[monthsArray.length - 1];
    }
    return monthsArray[index];
  }

  return (
    <div className="calendar__title title">
      <h2 className="title__month">
          {getMonthByIndex(chosenPeriod.getMonth())}
      </h2>
    </div>
  )
}

export default Title;