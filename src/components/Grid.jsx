import React from "react";
import "./Grid.css";

export function Grid({ width = 10, height = 10, children = null }) {
  const style = {
    width: `${width}em`,
    height: `${height}em`,
    maxWidth: `${width}em`,
    maxHeight: `${height}em`,
  };
  return <output style={style}>{children}</output>;
}
