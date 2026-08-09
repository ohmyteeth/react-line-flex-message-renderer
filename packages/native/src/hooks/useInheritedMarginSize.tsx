import React from "react";

const MarginSizeContext = React.createContext<number | undefined>(undefined);

export const MarginSizeProvider = ({ children, marginSize }: { children: React.ReactNode; marginSize: number | undefined }) => {
  return <MarginSizeContext.Provider value={marginSize}>{children}</MarginSizeContext.Provider>;
}

export const useInheritedMarginSize = () => {
  return React.useContext(MarginSizeContext);
};