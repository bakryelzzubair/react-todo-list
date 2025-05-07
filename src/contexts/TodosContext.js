import { useState, useContext, createContext, useMemo, useEffect } from "react";
import { useCurrentTab } from "./CurrentTabContext";

const TodosContext = createContext({});

export const TodosProvider = ({ children }) => {
  const [todoItems, setTodoItems] = useState([]);
  const { currentTab } = useCurrentTab();



  useEffect(() => {
    setTodoItems(JSON.parse(localStorage.getItem("todos")) ?? []);
  }, []);


  let filterdTodos;

  const nonCompleted = useMemo(
    (_) => todoItems?.filter((todo) => todo.isCompleted === false),
    [todoItems]
  );
  const completed = useMemo(
    (_) => todoItems?.filter((todo) => todo.isCompleted === true),
    [todoItems]
  );

  switch (currentTab) {
    case "non-completed":
      filterdTodos = nonCompleted;
      break;
    case "completed":
      filterdTodos = completed;
      break;
    default:
      filterdTodos = todoItems;
      break;
  }

  return (
    <TodosContext.Provider
      value={{
        todoItems,
        setTodoItems,
        filterdTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodosContext);
};
