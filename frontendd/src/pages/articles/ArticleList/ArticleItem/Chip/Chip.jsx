import React from "react";
import "./chip.css";

const Chip = ({ category }) => {
  return (
    <div className="chip">
      <h4>{category}</h4>
    </div>
  );
};

export default Chip;
