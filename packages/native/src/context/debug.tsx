import { createContext, useContext } from "react";

const DebugContext = createContext(false);

export const DebugProvider = ({ children, value }: { children: React.ReactNode; value: boolean }) => (
  <DebugContext.Provider value={value}>
    {children}
  </DebugContext.Provider>
);

export const useDebugMode = () => {
  return useContext(DebugContext);
}
