import React from "react";

interface MenuProps {
  activeFullDate: Date,
  onBackToActiveDayBtn: () => void;
}

const Menu: React.FC<MenuProps> = ({activeFullDate, onBackToActiveDayBtn}) => {

  return (
    <div className="menu">
      <div className="menu__header menu-header">
        <h2 className="menu-header__title">
          {`${activeFullDate.getDate()}/${activeFullDate.getMonth() + 1}/${activeFullDate.getFullYear()}`}
        </h2>
        <button className="menu-header__button" onClick={() => onBackToActiveDayBtn()}>
          ACTIVE DAY
        </button>
      </div>
      
    </div>
  )
}

export default Menu;