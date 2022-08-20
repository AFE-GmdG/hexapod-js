import type Box from "../tui/box";
import type Screen from "../tui/screen";
import type Text from "../tui/text";

export type Type = "box";

export type Props = {};

export type Container = {
  _screen: Screen; // (_screen is the rootContainer: OpaqueRoot) => node_modules/@types/react-reconciler/index.d.ts:885
  _hostContext: HostContext;
};

export type HostContext = {};

export type Instance = Box;

export type TextInstance = Text;
