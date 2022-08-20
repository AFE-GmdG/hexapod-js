import type {
  ClassAttributes,
  FocusEventHandler,
  ReactNode,
} from "react";

import type { BoxProps } from "../tui/box";

type DetailedTUIProps<E extends TUIAttributes<T>, T> = ClassAttributes<T> & E;

interface TUIDOMAttributes<T> {
  children?: ReactNode;

  // Focus Events
  onFocus?: FocusEventHandler<T>;
  onBlur?: FocusEventHandler<T>;
}

interface TUIAttributes<T> extends TUIDOMAttributes<T> {
  // Standard TUI Attributes
  className?: string;
  id?: string;
}

interface BoxTUIAttributes<T> extends TUIAttributes<T>, BoxProps { }

declare global {
  interface TUIElement extends Element { }
  interface TUIBoxElement extends TUIElement { }

  namespace JSX {
    interface IntrinsicElements {
      box: DetailedTUIProps<BoxTUIAttributes<TUIBoxElement>, TUIBoxElement>;
    }
  }
}
