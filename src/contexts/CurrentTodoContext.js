import { useState, useContext, createContext } from "react";

const CurrentTodoContext = createContext({});

export const CurrentTodoProvider = ({ children }) => {
  const [currentTodo, setCurrentTodo] = useState({});

  return (
    <CurrentTodoContext.Provider value={{ currentTodo, setCurrentTodo }}>
      {children}
    </CurrentTodoContext.Provider>
  );
};

export const useCurrentTodo = () => {
  return useContext(CurrentTodoContext);
};
