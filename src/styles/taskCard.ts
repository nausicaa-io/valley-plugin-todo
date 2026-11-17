/* The right sidebar's Task tab: the task selected in the main table, read-only. */
export const taskCardCss = `
.todo-task-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-3);
  user-select: text;
}
.todo-task-title {
  margin: 0;
  color: var(--title-color, var(--text-color));
  font-size: 1.25rem;
  font-weight: var(--font-bold, 700);
  line-height: 1.25;
  overflow-wrap: anywhere;
}
.todo-task-title.is-struck { color: var(--text-secondary); text-decoration: line-through; }
/* Status, priority, flag and group in one wrapping row under the title. */
.todo-task-facts { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; min-width: 0; font-size: var(--smaller-font-size); }
.todo-task-fact { display: inline-flex; align-items: center; gap: 4px; color: var(--text-secondary); white-space: nowrap; }
.todo-task-fact svg { width: 14px; height: 14px; }
.todo-task-flag { color: var(--color-orange); }
.todo-task-flag svg { fill: currentColor; }
.todo-task-facts .todo-table-group-pill { max-width: 100%; }
.todo-task-tags { display: flex; flex-wrap: wrap; gap: 4px 8px; }
.todo-task-tag { color: var(--accent-color); font-size: var(--smaller-font-size); }
.todo-task-note {
  margin: 0;
  color: var(--text-color);
  font-size: var(--small-font-size);
  line-height: 1.5;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.todo-task-line {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  color: var(--text-secondary);
  font-size: var(--small-font-size);
  line-height: 18px;
}
.todo-task-line svg { flex: 0 0 auto; width: 14px; height: 14px; margin-top: 2px; }
.todo-task-line span { min-width: 0; overflow-wrap: anywhere; }
.todo-task-line.is-overdue { color: var(--negative-color); }
.todo-task-map {
  position: relative;
  display: block;
  width: 100%;
  height: 180px;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  background: var(--hover-bg);
  cursor: grab;
  touch-action: none;
  user-select: none;
}
.todo-task-map.is-dragging { cursor: grabbing; }
.todo-task-map-tile { position: absolute; width: 256px; height: 256px; max-width: none; pointer-events: none; user-select: none; }
/* The one map has light tiles: in Dark they are turned dark, hues kept. */
.todo-task-map.is-dark .todo-task-map-tile { filter: invert(1) hue-rotate(180deg) brightness(0.85) contrast(0.9) saturate(0.6); }
.todo-task-map-pin {
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  /* The pin's tip, not its middle, marks the place. */
  transform: translate(-50%, -100%);
  color: var(--accent-color);
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45));
}
.todo-task-map-pin svg { display: block; width: 26px; height: 26px; fill: currentColor; stroke: #fff; stroke-width: 1.5; }
.todo-task-map-pin svg circle { fill: #fff; stroke: none; }
/* + and − sit on the map, top right, one pill. */
.todo-task-map-zoom {
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  background: var(--pane-bg);
}
.todo-task-map-zoom-btn {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--text-color);
  cursor: pointer;
}
.todo-task-map-zoom-btn + .todo-task-map-zoom-btn { border-top: 1px solid var(--border-light); }
.todo-task-map-zoom-btn:hover:not(:disabled) { background: var(--hover-bg); }
.todo-task-map-zoom-btn:disabled { opacity: 0.4; cursor: default; }
.todo-task-map-zoom-btn svg { width: 14px; height: 14px; }
/* The address and each link are lines that open what they name. */
.todo-task-link {
  align-self: flex-start;
  max-width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--accent-color);
  font: inherit;
  font-size: var(--small-font-size);
  text-align: left;
  cursor: pointer;
}
.todo-task-link:hover span { text-decoration: underline; }
.todo-task-map-credit {
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 1px 5px;
  border-top-left-radius: 4px;
  background: color-mix(in srgb, var(--pane-bg, #fff) 78%, transparent);
  color: var(--text-secondary);
  font-size: calc(var(--smaller-font-size) * 0.85);
  line-height: 1.4;
}
`
