import EventEmitter from "node:events";

import type Node from "./node";

import type Screen from "./screen";

class Text extends EventEmitter {
  #text: string;

  protected _screen: Screen;
  get screen(): Screen { return this._screen; }

  parent: Node | null;

  detached: boolean;

  constructor(screen: Screen, text: string) {
    super({ captureRejections: true });
    this.#text = text;
    this._screen = screen;
    this.parent = null;
    this.detached = true;
  }

  detach() {
    if (this.parent) {
      this.parent.remove(this);
    }
  }
}

export default Text;
