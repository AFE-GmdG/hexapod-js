export type NodeType = "screen" | "box" /* | "xyz" */;

export type ResizeEventArgs = {
  type: "resize";
  columns: number;
  rows: number;
};
