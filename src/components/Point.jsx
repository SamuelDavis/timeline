import React from "react";
import "./Point.css";

export function Point({ x = 0, y = 0 }) {
  const style = {
    top: `${y}em`,
    left: `${x}em`,
  };

  return <figure style={style} title={`${x},${y}`} />;
}
