import React from "react";
import { Month } from "../../utils/variables";
import { CSSTransition } from 'react-transition-group';

export interface TitleProps {
  chosenPeriod: Date,
  monthDirection: "next" | "prev" | undefined;
}

const Title: React.FC<TitleProps> = ({chosenPeriod, monthDirection}) => {
  const [switchingState, setSwitchingState] = React.useState(true);

  const prevMonth = React.useRef(chosenPeriod.getMonth());

  React.useEffect(() => {
    setSwitchingState(true);
    setTimeout(() => {
      setSwitchingState(false);
    }, 0)
  }, [chosenPeriod])

  const getMonthByIndex = (index: number): string | undefined => {
    const monthsArray = Object.values(Month);

    if (index === 12) {
      return monthsArray[0]
    }
    if (!monthsArray[index]) {
      return monthsArray[monthsArray.length - 1];
    }
    return monthsArray[index];
  }

  const getCurrentMonth = () => {
    return getMonthByIndex(chosenPeriod.getMonth());
  }

  const getPrevMonth = () => {
    console.log("Предыдущий месяц: ", prevMonth.current);

    if (monthDirection === "next") {
      return getMonthByIndex(chosenPeriod.getMonth() - 1);
    }
    if (monthDirection === "prev") {
      return getMonthByIndex(chosenPeriod.getMonth() + 1);
    }
  }

  return (
    
      <div className="calendar__title title">
          
          {
            monthDirection &&
            <CSSTransition
              in={switchingState}
              timeout={500}
              classNames={`fade-out-${monthDirection === "next" ? "left" : monthDirection === "prev" && "right"}`}
              unmountOnExit={true}
            >
              <h2 className="title__month title__month_prev">
                {getPrevMonth()}
              </h2>
            </CSSTransition>          
          }
          
          
          <CSSTransition
            in={switchingState}
            timeout={500}
            classNames={`fade-in-${monthDirection === "next" ? "left" : monthDirection === "prev" && "right"}`}
          >
            <h2 className="title__month">
              {getCurrentMonth()}
            </h2>
          </CSSTransition>

      </div>

  )
}

export default Title;