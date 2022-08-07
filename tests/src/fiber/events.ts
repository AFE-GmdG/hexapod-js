import type { TuiNodeInstance } from "./types";

const startCase = (value: string) => value
  .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => Number(match) === 0 ? "" : match.toUpperCase())
  .replace(/[^A-Za-z0-9 ]+/, '');

const eventName = (event: string) => `on${startCase(event)}`;

const eventListener = (node: TuiNodeInstance, event: string, ...args: any[]) => {
  if (node._updating) {
    console.warn(`Event ${event} was triggered while updating.`);
    return;
  }

  const handler = node.props[eventName(event)];
  if (typeof handler === "function") {
    args[0] = node;
    handler(...args);
  }
};

export default eventListener;
