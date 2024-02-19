import Title from "./Title";
import Table, { TableProps } from "./Table";
import SideBtn, { onSideBtnClickType } from "./SideBtn";

export interface CalendarProps extends TableProps {
  onNextSideBtnClick: onSideBtnClickType,
  onPrevSideBtnClick: onSideBtnClickType,
}

const Calendar: React.FC<CalendarProps> = ({onDaySelect, activeFullDate, chosenPeriod, onNextSideBtnClick, onPrevSideBtnClick}) => {
  return (
    <div className="calendar">
        <SideBtn direction="prev" onSideBtnClick={() => onPrevSideBtnClick()} />
        <div className="calendar__body">
          <Title chosenPeriod={chosenPeriod} />
          <Table onDaySelect={onDaySelect} activeFullDate={activeFullDate} chosenPeriod={chosenPeriod} />
        </div>
        <SideBtn direction="next" onSideBtnClick={() => onNextSideBtnClick()} />
    </div>
  )
}

export default Calendar;