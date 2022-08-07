export type Type = "box";

export type Container = {
  _rootContainer: any; // OpaqueRoot => node_modules/@types/react-reconciler/index.d.ts:885
  _hostContext: HostContext;
};

export type HostContext = {
};

export type TuiNodeInstance = {
  type: string;
  props: { [key: string]: any };
  _eventListener: Function;
  _updating: boolean;
};

export type BasicEventType = "click" | "mouseenter" | "mouseleave";
