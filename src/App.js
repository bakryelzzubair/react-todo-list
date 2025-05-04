import "./Style";
import Container from "@mui/material/Container";
import TodoList from "./components/TodoList";
import { SnakeBarProvider } from "./contexts/SnackBarContext";

function App() {
  return (
    <>
      <Container maxWidth="sm" sx={{ direction: "rtl", textAlign: "center" }}>
        <SnakeBarProvider>
          <TodoList />
        </SnakeBarProvider>
      </Container>
    </>
  );
}

export default App;
