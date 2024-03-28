import Title, { TitleProps } from "./Title";
import Table, { TableProps } from "./Table";
import SideBtn, { onSideBtnClickType } from "./SideBtn";

export interface CalendarProps extends TableProps, TitleProps {
  onNextSideBtnClick: onSideBtnClickType,
  onPrevSideBtnClick: onSideBtnClickType,
}

const Calendar: React.FC<CalendarProps> = ({onDaySelect, activeFullDate, chosenPeriod, onNextSideBtnClick, onPrevSideBtnClick, monthDirection}) => {
  return (
    <div className="calendar">
        <SideBtn direction="prev" onSideBtnClick={() => onPrevSideBtnClick()} />
        <div className="calendar__body">
          <Title chosenPeriod={chosenPeriod} monthDirection={monthDirection}/>
          <Table onDaySelect={onDaySelect} activeFullDate={activeFullDate} chosenPeriod={chosenPeriod} />
        </div>
        <SideBtn direction="next" onSideBtnClick={() => onNextSideBtnClick()} />
    </div>
  )
}

export default Calendar;