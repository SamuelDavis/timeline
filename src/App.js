import React, { useState } from "react";
import { TimelineControl } from "./components/TimelineControl";
import { Grid } from "./components/Grid";
import { Point } from "./components/Point";
import { TimelineLi } from "./components/TimelineLi";

function derivePosition({ x = 0, y = 0 }, actions = []) {
  return actions.reduce(
    ({ x, y }, action) => {
      switch (action) {
        case "up":
          return { x, y: y - 1 };
        case "right":
          return { x: x + 1, y };
        case "down":
          return { x, y: y + 1 };
        case "left":
          return { x: x - 1, y };
        default:
          throw new Error(`Unhandled action type: ${action}.`);
      }
    },
    { x, y }
  );
}

function App() {
  const actions = ["up", "right", "down", "left"];

  const [timeline, setTimeline] = useState([
    "right",
    "down",
    "down",
    "right",
    "down",
    "left",
    "up",
  ]);
  const [activeIndex, setActiveIndex] = useState(2);
  const [replaySpeed, setReplaySpeed] = useState(200);
  const [replayState, setReplayState] = useState({
    replayIndex: undefined,
    replayInterval: undefined,
  });

  function onActiveIndexChange({ target: { value } }) {
    setActiveIndex(Math.min(timeline.length, parseInt(value, 10)));
  }

  function onAddAction({ target: { value } }) {
    setTimeline([...timeline, value]);
    setActiveIndex(timeline.length + 1);
  }

  function removeAction(index) {
    setTimeline([...timeline.slice(0, index), ...timeline.slice(index + 1)]);
    if (activeIndex > index) setActiveIndex(activeIndex - 1);
  }

  function onReplaySpeedChange({ target: { value } }) {
    setReplaySpeed(parseInt(value, 10));
  }

  function onReplay() {
    if (replayState.replayInterval) return;
    setReplayState({
      replayIndex: 0,
      replayInterval: setInterval(() => {
        setReplayState(({ replayIndex, replayInterval }) => {
          if (replayIndex > activeIndex) {
            clearInterval(replayInterval);
            return {
              replayIndex: undefined,
              replayInterval: undefined,
            };
          }

          setActiveIndex(replayIndex);
          return {
            replayInterval,
            replayIndex: replayIndex + 1,
          };
        });
      }, replaySpeed),
    });
  }

  return (
    <main>
      <aside>
        <label htmlFor="timeline">Timeline</label>
        <ol id="timeline" start={timeline.length} reversed={true}>
          <TimelineLi
            isActive={activeIndex >= timeline.length}
            onClick={setActiveIndex.bind(null, timeline.length)}
            value="&hellip;"
          />
          {timeline
            .map((action, i) => (
              <TimelineLi
                key={i}
                isActive={i === activeIndex}
                onRemove={removeAction.bind(null, i)}
                onClick={setActiveIndex.bind(null, i)}
                value={action}
              />
            ))
            .reverse()}
        </ol>
      </aside>
      <article>
        <section>
          <fieldset>
            <legend>Timeline (Active Index: {activeIndex})</legend>
            <TimelineControl
              timeline={timeline}
              activeIndex={activeIndex}
              onActiveIndexChange={onActiveIndexChange}
            />
          </fieldset>
        </section>
        <section>
          <fieldset>
            <legend>Replay Controls</legend>
            <label htmlFor="replay-speed">Replay Speed (ms):</label>
            <input
              id="replay-speed"
              type="number"
              min={1}
              step={1}
              value={replaySpeed}
              onChange={onReplaySpeedChange}
            />
            <input type="button" onClick={onReplay} value="Replay" />
          </fieldset>
          <fieldset>
            <legend>Action Controls</legend>
            {actions.map((action) => (
              <input
                key={action}
                type="button"
                value={action}
                onClick={onAddAction}
              />
            ))}
          </fieldset>
        </section>
        <section>
          <Grid>
            <Point
              {...derivePosition(
                { x: 5, y: 5 },
                timeline.slice(0, activeIndex)
              )}
            />
          </Grid>
        </section>
      </article>
    </main>
  );
}

export default App;
