import "./Style";
import Container from "@mui/material/Container";
import TodoList from "./components/TodoList";
import { SnakeBarProvider } from "./contexts/SnackBarContext";
import { CurrentTodoProvider } from "./contexts/CurrentTodoContext";
import { DialogProvider } from "./contexts/DialogContext";
import { TodosProvider } from "./contexts/TodosContext";
import { CurrentTabProvider } from "./contexts/CurrentTabContext";

function App() {
  return (
    <Container maxWidth="sm" sx={{ direction: "rtl", textAlign: "center" }}>
      <SnakeBarProvider>
        <CurrentTodoProvider>
          <CurrentTabProvider>
            <TodosProvider>
              <DialogProvider>
                <TodoList />
              </DialogProvider>
            </TodosProvider>
          </CurrentTabProvider>
        </CurrentTodoProvider>
      </SnakeBarProvider>
    </Container>
  );
}

export default App;
