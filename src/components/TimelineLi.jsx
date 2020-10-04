import React from "react";
import "./TimelineLi.css";

export function TimelineLi({
  isActive = false,
  onRemove = null,
  onClick = () => {},
  value = null,
}) {
  return (
    <li className={isActive ? "active" : null}>
      <div>
        <input type="button" onClick={onClick} value={value} />
        {onRemove && (
          <input type="button" onClick={onRemove} value={"x"} title="remove" />
        )}
      </div>
    </li>
  );
}
