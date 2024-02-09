import TimePeriod from "./TimePeriod";
import TimePeriodNavBtn from "./TimePeriodNavBtn";

const Header = () => {
  return (
    <div className="calendar-header">
        <TimePeriodNavBtn />
        <TimePeriod />
        <TimePeriodNavBtn />
    </div>
  )
}

export default Header;