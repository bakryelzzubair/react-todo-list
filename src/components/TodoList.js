import { Divider, Grid, Typography } from "@mui/material";
import ToggleButtons from "./ToggleButtons";
import Todo from "./Todo";
import Dialogs from "./DialogsController";
import IconButton from "@mui/material/IconButton";
import PlaylistAddSharpIcon from "@mui/icons-material/PlaylistAddSharp";
import { useDialog } from "../contexts/DialogContext";
import { useTodos } from "../contexts/TodosContext";
import { useCurrentTodo } from "../contexts/CurrentTodoContext";
import { useSnack } from "../contexts/SnackBarContext";
import { v4 as uuidv4 } from "uuid";
import { useCurrentTab } from "../contexts/CurrentTabContext";

export default function TodoList() {
  //************************ COMPONENT BEGIN */

  const {
    openCreateDialog,
    openDeleteDialog,
    openEditDialog,
    setOpenCreateDialog,
    setOpenEditDialog,
    setOpenDeleteDialog,
  } = useDialog();
  const { filterdTodos, todoItems, setTodoItems } = useTodos();
  const { setCurrentTodo } = useCurrentTodo();
  const { setShowHideSnakeBar } = useSnack();
  const { setCurrentTab } = useCurrentTab();

  const handleActionS = (action, todoID = null) => {
    switch (action) {
      case "create":
        setOpenCreateDialog(true);
        break;

      case "check":
        const newTodoItems = todoItems?.map((todo) => {
          if (todo.id === todoID) {
            todo.isCompleted = !todo.isCompleted;
          }
          return todo;
        });

        setTodoItems(newTodoItems);
        localStorage.setItem("todos", JSON.stringify(newTodoItems));

        break;

      case "edit":
        const currentTodoToEdit = todoItems?.filter((t) => t.id === todoID);

        setCurrentTodo(currentTodoToEdit[0]);

        setOpenEditDialog(true);

        break;

      case "delete":
        const currentTodoToDelete = todoItems?.filter((t) => t.id === todoID);

        setCurrentTodo(currentTodoToDelete[0]);

        setOpenDeleteDialog(true);
        break;

      default:
        break;
    }
  };

  const handleSubmitCreateTodo = (title, description) => {
    const updatedTodos = [
      ...todoItems,
      {
        id: uuidv4(),
        title: title,
        description: description,
        isCompleted: false,
      },
    ];
    setTodoItems(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setOpenCreateDialog(false);
    setCurrentTab("all");
    setShowHideSnakeBar("تم انشاء المهمة بنجاح !!!");
  };

  const handleSubmitEditTodo = (id, title, description) => {
    const newTodoItems = todoItems?.map((todo) => {
      if (id === todo.id) {
        todo.title = title;
        todo.description = description;
      }
      return todo;
    });

    setTodoItems(newTodoItems);
    localStorage.setItem("todos", JSON.stringify(newTodoItems));

    setOpenEditDialog(false);
    setShowHideSnakeBar("تم تعديل المهمة بنجاح !!!");
  };

  const handleSubmitDeleteTodo = (id) => {
    const newTodoItems = todoItems?.filter((t) => t.id !== id);
    setTodoItems(newTodoItems);
    localStorage.setItem("todos", JSON.stringify(newTodoItems));
    setOpenDeleteDialog(false);
    setShowHideSnakeBar("تم حذف المهمة بنجاح !!!");
  };

  let jsxTodos = null;
  if (filterdTodos.length > 0) {
    jsxTodos = filterdTodos?.map((todo) => (
      <Todo key={todo.id} todo={todo} handleActionS={handleActionS} />
    ));
  } else {
    jsxTodos = (
      <Typography
        color="white"
        bgcolor="info.main"
        sx={{
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        لا توجد مهام لعرضها, قم باضافة مهمة جديدة
      </Typography>
    );
  }

  //************************ JSX SECTION BEGIN */
  return (
    <>
      <Typography variant="h1">مهامي</Typography>
      <Divider style={{ marginBottom: "30px" }} />
      <Grid container>
        <Grid size={1} justifyContent="end">
          <IconButton
            variant="outlined"
            onClick={() => handleActionS("create")}
          >
            <PlaylistAddSharpIcon sx={{ fontSize: 60 }} />
          </IconButton>
        </Grid>
        <Grid size={11} justifyContent="center">
          <ToggleButtons />
        </Grid>
      </Grid>

      {/* show todos according to toggle button */}
      {jsxTodos}

      {openCreateDialog && <Dialogs setTodoItems={handleSubmitCreateTodo} />}
      {openEditDialog && <Dialogs setTodoItems={handleSubmitEditTodo} />}
      {openDeleteDialog && <Dialogs setTodoItems={handleSubmitDeleteTodo} />}
    </>
  );
  //************************ JSX SECTION END */
} //************************ COMPONENT END */
