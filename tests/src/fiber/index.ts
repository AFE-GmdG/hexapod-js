import ReactFiberReconciler, {
  HostConfig,
  OpaqueHandle,
  OpaqueRoot,
} from "react-reconciler";

import {
  ConcurrentRoot,
  DefaultEventPriority,
} from "react-reconciler/constants";

import Box, { isBoxProps } from "../tui/box";
import Screen from "../tui/screen";
import Text from "../tui/text";

import type {
  Container,
  HostContext,
  Instance,
  Props,
  TextInstance,
  Type,
} from "./types";

type TuiRootHostConfig = HostConfig<
  Type,            // Type
  Props,           // Props
  Container,       // Container
  Instance,        // Instance
  TextInstance,    // TextInstance
  any,             // SuspenseInstance
  any,             // HydratableInstance
  any,             // PublicInstance
  HostContext,     // HostContext
  any,             // UpdatePayload
  any,             // ChildSet
  NodeJS.Timeout,  // TimeoutHandle
  null             // NoTimeout
>;

type TuiRootReconciler = ReactFiberReconciler.Reconciler<
  Container,
  Instance,        // Instance
  TextInstance,    // TextInstance
  any,             // SuspenseInstance
  any              // PublicInstance
>;

class TuiRoot {
  #hostConfig: TuiRootHostConfig;
  #reconciler: TuiRootReconciler;
  #internalRoot: OpaqueRoot;

  constructor(screen: Screen) {
    this.#hostConfig = this.#initializeHostConfig();
    this.#reconciler = ReactFiberReconciler(this.#hostConfig);

    const container: Container = {
      _screen: screen,
      _hostContext: {},
    };

    this.#internalRoot = this.#reconciler.createContainer(
      container,       // containerInfo: Container
      ConcurrentRoot,  // tag: RootTag
      null,            // hydrationCallbacks: SuspenseHydrationCallbacks<any> | null
      true,            // isStrictMode: boolean
      null,            // concurrentUpdatesByDefaultOverride: boolean | null
      "",              // identifierPrefix: string
      () => { },       // onRecoverableError: (error: Error) => void
      null             // transitionCallbacks: ReactFiberReconciler.TransitionTracingCallbacks | null
    );
  }

  #initializeHostConfig(): TuiRootHostConfig {
    return {
      supportsMutation: true,
      supportsPersistence: false,
      createInstance: this.#createInstance,
      createTextInstance: this.#createTextInstance,
      appendInitialChild: this.#appendInitialChild,
      finalizeInitialChildren: this.#finalizeInitialChildren,
      prepareUpdate: (instance, type, oldProps, newProps, rootContainer, hostContext) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      shouldSetTextContent: (type, props) => {
        // return true for elements, that only have a single text content.
        // currently only return false.
        return false;
      },
      getRootHostContext: (rootContainer) => {
        return rootContainer._hostContext;
      },
      getChildHostContext: (parentHostContext, type, rootContainer) => {
        return rootContainer._hostContext;
      },
      getPublicInstance: (instance) => {
        return instance;
      },
      prepareForCommit: (containerInfo) => {
        // noop but must return `null` to avoid issues related to node removal
        return null;
      },
      resetAfterCommit: (containerInfo) => {
        // noop
      },
      preparePortalMount: (containerInfo) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      scheduleTimeout: setTimeout,
      cancelTimeout: clearTimeout,
      noTimeout: null,
      supportsMicrotask: true,
      scheduleMicrotask: queueMicrotask,
      isPrimaryRenderer: true,
      warnsIfNotActing: true,
      getCurrentEventPriority: () => DefaultEventPriority,
      getInstanceFromNode: (node) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      beforeActiveInstanceBlur: () => {
        debugger;
        throw new Error("Method not implemented.");
      },
      afterActiveInstanceBlur: () => {
        debugger;
        throw new Error("Method not implemented.");
      },
      prepareScopeUpdate: (scopeInstance, instance) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      getInstanceFromScope: (scopeInstance) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      detachDeletedInstance: (node) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      appendChild: (parentInstance, child) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      appendChildToContainer: this.#appendChildToContainer,
      insertBefore: (parentInstance, child, beforeChild) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      insertInContainerBefore: (container, child, beforeChild) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      removeChild: (parentInstance, child) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      removeChildFromContainer: (container, child) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      resetTextContent: (instance) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      commitTextUpdate: (textInstance, oldText, newText) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      commitMount: (instance, type, props, internalInstanceHandle) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      commitUpdate: (instance, updatePayload, type, prevProps, nextProps, internalHandle) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      hideInstance: (instance) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      hideTextInstance: (textInstance) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      unhideInstance: (instance, props) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      unhideTextInstance: (textInstance, text) => {
        debugger;
        throw new Error("Method not implemented.");
      },
      clearContainer: this.#clearContainer,
      supportsHydration: false,
    };
  }

  #createInstance(type: Type, props: Props, rootContainer: Container, _hostContext: HostContext, _internalHandle: OpaqueHandle) {
    switch (type) {
      case "box": {
        if (!isBoxProps(props)) {
          throw new Error("Invalid props");
        }
        return new Box(rootContainer._screen, props);
      }
      default:
    };
    debugger;
    throw new Error("Method not implemented.");
  }

  #createTextInstance(text: string, rootContainer: Container, _hostContext: HostContext, _internalHandle: OpaqueHandle) {
    return new Text(rootContainer._screen, text);
  }

  #appendInitialChild(parentInstance: Instance, child: Instance | TextInstance) {
    parentInstance.append(child);
  }

  #finalizeInitialChildren(_instance: Instance, _type: Type, _props: Props, _rootContainer: Container, _hostContext: HostContext) {
    return false;
  };

  #appendChildToContainer(container: Container, child: Instance | TextInstance) {
    debugger;
    container.append(child);
  }

  #clearContainer(container: Container) {
    debugger;
    container.render();
  }

  render(children: React.ReactNode, callback?: () => void) {
    if (this.#internalRoot === null) {
      throw new Error("Cannot update an unmounted root.");
    }

    this.#reconciler.updateContainer(children, this.#internalRoot, null, callback);
  }
};

export const createRoot = (screen: Screen) => {
  return new TuiRoot(screen);
};
