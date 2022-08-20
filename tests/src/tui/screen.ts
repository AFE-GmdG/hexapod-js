import Node from "./node";
import Program, { ProgramOptions } from "./program";

import type { ResizeEventArgs } from "./types";

class Screen extends Node {
  #program: Program;
  #debouncedRenderTimer: NodeJS.Timeout | null;

  constructor(programOptions?: ProgramOptions) {
    super(null as unknown as Screen, "screen");
    this._screen = this;

    this.#program = new Program(programOptions);
    this.#program.on("resize", this.#handleResize);

    this.#debouncedRenderTimer = null;
  }

  #handleResize = (event: ResizeEventArgs) => {
  };

  render() {
  }

  debouncedRender(delay: number = 16) {
    if (this.#debouncedRenderTimer !== null) {
      clearTimeout(this.#debouncedRenderTimer);
    }
    this.#debouncedRenderTimer = setTimeout(() => {
      this.render();
      this.#debouncedRenderTimer = null;
    }, delay);
  }
}

export default Screen;
