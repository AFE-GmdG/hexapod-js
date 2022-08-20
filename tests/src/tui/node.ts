import EventEmitter from "node:events";

import type { NodeType } from "./types";
import type { Instance, TextInstance } from "../fiber/types";

import type Screen from "./screen";

class Node extends EventEmitter {
  #nodeType: NodeType;
  get nodeType(): NodeType { return this.#nodeType; }

  protected _screen: Screen;
  get screen(): Screen { return this._screen; }

  parent: Node | null;
  #children: (Node | TextInstance)[];

  detached: boolean;

  constructor(screen: Screen, nodeType: NodeType) {
    super({ captureRejections: true });
    this._screen = screen;
    this.#nodeType = nodeType;
    this.parent = null;
    this.#children = [];
    this.detached = nodeType !== "screen";
  }

  append(element: Instance | TextInstance) {
    this.insert(element, this.#children.length);
  }

  detach() {
    if (this.parent) {
      this.parent.remove(this);
    }
  }

  insert(element: Instance | TextInstance, index: number) {
    if (element.screen !== this._screen) {
      throw new Error("Cannot insert element from different screen");
    }
    const self = this;

    element.detach();
    element.parent = this;

    if (index === 0) {
      this.#children.unshift(element);
    } else if (index === this.#children.length) {
      this.#children.push(element);
    } else {
      this.#children.splice(index, 0, element);
    }

    element.emit("reparent", { type: "reparent", parent: this });
    this.emit("adopt", { type: "adopt", element });

    (function emitAttachRecursive(el: Node | TextInstance) {
      const n = el.detached !== self.detached;
      el.detached = self.detached;
      if (n) {
        el.emit("attach", { type: "attach" });
      }
      if (el instanceof Node) {
        el.#children.forEach(emitAttachRecursive);
      }
    })(element);
  }

  remove(element: Node | TextInstance) {
    if (element.parent !== this) {
      return;
    }

    var index = this.#children.indexOf(element);
    if (index < 0) {
      return;
    }

    // element.clearPosition();

    element.parent = null;
    this.#children.splice(index, 1);

    this.emit("remove", { type: "remove", element });
    (function emitDetachRecursive(el: Node | TextInstance) {
      const isNotDetached = el.detached !== true;
      el.detached = true;
      if (isNotDetached) {
        el.emit("detach", { type: "detach" });
        if (el instanceof Node) {
          el.#children.forEach(emitDetachRecursive);
        }
      }
    })(element);
  }
}

export default Node;
