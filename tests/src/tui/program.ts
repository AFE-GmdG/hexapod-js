import EventEmitter from "node:events";

export type ProgramOptions = {
  input?: NodeJS.ReadStream;
  output?: NodeJS.WriteStream;
};

class Program extends EventEmitter {
  #options: Required<ProgramOptions>;
  #columns: number;
  get columns() { return this.#columns; }
  #rows: number;
  get rows() { return this.#rows; }

  constructor(options: ProgramOptions = {}) {
    super({ captureRejections: true });

    this.#options = {
      input: process.stdin,
      output: process.stdout,
      ...options,
    };

    if (!this.#options.output.isTTY) {
      throw new Error("Not a TTY");
    }
    this.#columns = this.#options.output.columns;
    this.#rows = this.#options.output.rows;

    this.#options.output.addListener("resize", this.#handleOutputResize);
  }

  #handleOutputResize = () => {
    this.#columns = this.#options.output.columns;
    this.#rows = this.#options.output.rows;
    this.emit("resize", { type: "resize", columns: this.#columns, rows: this.#rows });
  };
}

export default Program;
