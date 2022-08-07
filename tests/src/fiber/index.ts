import { ReactNode } from "react";
import ReactFiberReconciler, { HostConfig } from "react-reconciler";
import { DefaultEventPriority } from "react-reconciler/constants";

import type { Container, HostContext, Type } from "./types";

const hostConfig: HostConfig<
  Type,            // Type
  any,             // Props
  Container,       // Container
  any,             // Instance
  any,             // TextInstance
  any,             // SuspenseInstance
  any,             // HydratableInstance
  any,             // PublicInstance
  HostContext,     // HostContext
  any,             // UpdatePayload
  any,             // ChildSet
  NodeJS.Timeout,  // TimeoutHandle
  -1               // NoTimeout
> = {
  supportsMutation: true,
  supportsPersistence: false,
  createInstance: (type, props, rootContainer, hostContext, internalHandle) => {
    throw new Error("Method not implemented.");
  },
  createTextInstance: (text, rootContainer, hostContext, internalHandle) => {
    throw new Error("Method not implemented.");
  },
  appendInitialChild: (parentInstance, child) => {
    throw new Error("Method not implemented.");
  },
  finalizeInitialChildren: (instance, type, props, rootContainer, hostContext) => {
    throw new Error("Method not implemented.");
  },
  prepareUpdate: (instance, type, oldProps, newProps, rootContainer, hostContext) => {
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
    throw new Error("Method not implemented.");
  },
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
  supportsMicrotask: true,
  scheduleMicrotask: queueMicrotask,
  isPrimaryRenderer: true,
  warnsIfNotActing: true,
  getCurrentEventPriority: () => DefaultEventPriority,
  getInstanceFromNode: (node) => {
    throw new Error("Method not implemented.");
  },
  beforeActiveInstanceBlur: () => {
    throw new Error("Method not implemented.");
  },
  afterActiveInstanceBlur: () => {
    throw new Error("Method not implemented.");
  },
  prepareScopeUpdate: (scopeInstance, instance) => {
    throw new Error("Method not implemented.");
  },
  getInstanceFromScope: (scopeInstance) => {
    throw new Error("Method not implemented.");
  },
  detachDeletedInstance: (node) => {
    throw new Error("Method not implemented.");
  },
  appendChild: (parentInstance, child) => {
    throw new Error("Method not implemented.");
  },
  appendChildToContainer: (container, child) => {
    throw new Error("Method not implemented.");
  },
  insertBefore: (parentInstance, child, beforeChild) => {
    throw new Error("Method not implemented.");
  },
  insertInContainerBefore: (container, child, beforeChild) => {
    throw new Error("Method not implemented.");
  },
  removeChild: (parentInstance, child) => {
    throw new Error("Method not implemented.");
  },
  removeChildFromContainer: (container, child) => {
    throw new Error("Method not implemented.");
  },
  resetTextContent: (instance) => {
    throw new Error("Method not implemented.");
  },
  commitTextUpdate: (textInstance, oldText, newText) => {
    throw new Error("Method not implemented.");
  },
  commitMount: (instance, type, props, internalInstanceHandle) => {
    throw new Error("Method not implemented.");
  },
  commitUpdate: (instance, updatePayload, type, prevProps, nextProps, internalHandle) => {
    throw new Error("Method not implemented.");
  },
  hideInstance: (instance) => {
    throw new Error("Method not implemented.");
  },
  hideTextInstance: (textInstance) => {
    throw new Error("Method not implemented.");
  },
  unhideInstance: (instance, props) => {
    throw new Error("Method not implemented.");
  },
  unhideTextInstance: (textInstance, text) => {
    throw new Error("Method not implemented.");
  },
  clearContainer: (container) => {
    throw new Error("Method not implemented.");
  },
  supportsHydration: false,
};

const reconciler = ReactFiberReconciler(hostConfig);

const createTuiRenderer = () => {
  return (reactElement: ReactNode, domElement: Container, callback: (() => void) | null) => {
    // create a root container if it doesn't exist
    if (!domElement._rootContainer) {
      domElement._rootContainer = reconciler.createContainer(
        domElement, // containerInfo: Container,
        0,          // tag: RootTag,
        null,       // hydrationCallbacks: null | SuspenseHydrationCallbacks<SuspenseInstance>,
        true,       // isStrictMode: boolean,
        null,       // concurrentUpdatesByDefaultOverride: null | boolean,
        "tui",      // identifierPrefix: string,
        () => {},   // onRecoverableError: (error: Error) => void,
        null        // transitionCallbacks: null | TransitionTracingCallbacks,
      );
    }

    // update the root container
    return reconciler.updateContainer(
      reactElement,
      domElement._rootContainer,
      null,
      callback
    );
  };
};

export const render = (element: ReactNode, screen: Container, callback: (() => void) | null) => {
  const renderer = createTuiRenderer();
  return renderer(element, screen, callback);
};
