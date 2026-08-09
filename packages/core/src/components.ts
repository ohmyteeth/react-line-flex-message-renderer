import React from "react";
import type {
  BoxComponent,
  ButtonComponent,
  FillerComponent,
  IconComponent,
  ImageComponent,
  SeparatorComponent,
  SpanComponent,
  TextComponent,
  VideoComponent,
} from "./interfaces/components/index.js";
import type { Action } from "./interfaces/index.js";

const registry = new Map<string, (data: any, onClick: ClickHandler) => React.ReactNode>();

export type ClickHandler = (action: Action) => void;

type ComponentRegistrar = {
  box?: (data: BoxComponent, onClick: ClickHandler) => React.ReactNode;
  button?: (data: ButtonComponent, onClick: ClickHandler) => React.ReactNode;
  filler?: (data: FillerComponent, onClick: ClickHandler) => React.ReactNode;
  icon?: (data: IconComponent, onClick: ClickHandler) => React.ReactNode;
  image?: (data: ImageComponent, onClick: ClickHandler) => React.ReactNode;
  separator?: (data: SeparatorComponent, onClick: ClickHandler) => React.ReactNode;
  span?: (data: SpanComponent, onClick: ClickHandler) => React.ReactNode;
  text?: (data: TextComponent, onClick: ClickHandler) => React.ReactNode;
  video?: (data: VideoComponent, onClick: ClickHandler) => React.ReactNode;
};

export const registerComponents = (components: ComponentRegistrar) => {
  Object.entries(components).forEach(([key, component]) => {
    if (component) {
      registry.set(key, component);
    }
  });
};

export const renderComponent = (
  data:
    | BoxComponent
    | ButtonComponent
    | FillerComponent
    | IconComponent
    | ImageComponent
    | SeparatorComponent
    | SpanComponent
    | TextComponent
    | VideoComponent,
  onClick?: (action: Action) => void,
) => {
  const componentType = data.type;
  const component = registry.get(componentType);
  if (!component) {
    throw new Error(`Component type "${componentType}" is not registered.`);
  }

  const handleClick = (action: Action) => {
    if (onClick) {
      onClick(action);
    }
  };

  // Must go through React.createElement (not a plain `component(data, handleClick)` call) so this
  // actually becomes its own component instance in React's tree. A plain call runs the registered
  // function's hooks as part of *this* caller's render pass instead of its own — breaking useState,
  // useContext (a child's `useContext` would read the value visible to its parent, not what the parent's
  // own JSX provides below it), and silently dropping `onClick` too, since these components declare a
  // single props parameter, not the `(data, onClick)` shape this was calling them with.
  return React.createElement(component as React.ComponentType<any>, { ...data, onClick: handleClick });
};
