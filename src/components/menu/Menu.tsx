import React from "react";

interface MenuProps {
  activeFullDate: Date,
}

const Menu: React.FC<MenuProps> = ({activeFullDate}) => {

  return (
    <div className="menu">
      {`${activeFullDate.getDate()}/${activeFullDate.getMonth() + 1}/${activeFullDate.getFullYear()}`}
    </div>
  )
}

export default Menu;