import { createContext, useContext } from "react";
import { useState } from "react";
import SnackeBar from "../components/SnackeBar";

export const SnackBarContext = createContext({});

export const SnakeBarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const setShowHideSnakeBar = (msg) => {
    setMsg(msg);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  return (
      <SnackBarContext.Provider value={{ setShowHideSnakeBar }}>
        <SnackeBar open={open} msg={msg} />
        {children}
      </SnackBarContext.Provider>
  );
};

export const useSnack = () => {
    return useContext(SnackBarContext)
}