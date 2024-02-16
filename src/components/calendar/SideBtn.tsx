import React from "react";
import rightArrow from "../../images/icons/right-arrow.svg";
import leftArrow from "../../images/icons/left-arrow.svg"

export type onSideBtnClickType = () => void

interface SideBtnProps {
  onSideBtnClick: onSideBtnClickType,
  direction: "next" | "prev",
}

const SideBtn: React.FC<SideBtnProps> = ({onSideBtnClick, direction}) => {
  return (
    <button className={`calendar__side-btn side-btn_${direction}`} onClick={() => onSideBtnClick()}>
      <img className="side-btn__icon" src={direction === "next" ? rightArrow : leftArrow} alt={direction === "next" ? "Next month" : "Previous month"}/>
    </button>
  )
}

export default SideBtn;