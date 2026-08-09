import React from "react";

const ParentFlexDirectionContext = React.createContext<"row" | "column">("column");

export const ParentFlexDirectionProvider = ({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: "row" | "column";
}) => {
  return <ParentFlexDirectionContext.Provider value={direction}>{children}</ParentFlexDirectionContext.Provider>;
};

export const useParentFlexDirection = () => {
  return React.useContext(ParentFlexDirectionContext);
};
