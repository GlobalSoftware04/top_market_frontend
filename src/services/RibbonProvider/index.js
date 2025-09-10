import React, { createContext, useState } from "react";

export const RibbonContext = createContext();

export function RibbonProvider({ children }) {
  const [ribbonState, setRibbonState] = useState({});

  const triggerRibbon = (key) => {
    setRibbonState((prev) => ({ ...prev, [key]: true }));

    setTimeout(() => {
      setRibbonState((prev) => ({ ...prev, [key]: false }));
    }, 1000);
  };

  return (
    <RibbonContext.Provider value={{ ribbonState, triggerRibbon }}>
      {children}
    </RibbonContext.Provider>
  );
}
