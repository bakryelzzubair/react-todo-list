import { useState, useContext, createContext } from "react";

const CurrentTabContext = createContext({});

export const CurrentTabProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState("all");
  return (
    <CurrentTabContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </CurrentTabContext.Provider>
  );
};

export const useCurrentTab = () => {
  return useContext(CurrentTabContext);
};
