import React, { Fragment } from "react";
import "./TimelineControl.css";

export function TimelineControl({
  timeline = [],
  activeIndex = 0,
  onActiveIndexChange = () => {},
}) {
  return (
    <Fragment>
      <input
        type="range"
        onChange={onActiveIndexChange}
        value={activeIndex}
        min={0}
        max={timeline.length}
        list="timeline-increments"
      />
      <datalist id="timeline-increments">
        {timeline.map((value, i) => (
          <option key={i} value={i} label={value} />
        ))}
      </datalist>
    </Fragment>
  );
}
