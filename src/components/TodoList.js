import { Divider, Grid, Typography } from "@mui/material";
import ToggleButtons from "./ToggleButtons";
import Todo from "./Todo";
import Dialogs from "./Dialogs";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import IconButton from "@mui/material/IconButton";
import PlaylistAddSharpIcon from "@mui/icons-material/PlaylistAddSharp";
import { useSnack } from "../contexts/SnackBarContext";

export default function TodoList() {
  //************************ COMPONENT BEGIN */

  const [todoItems, setTodoItems] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentTab, setCurrentTab] = useState("non-completed");
  const [currentTodo, setCurrentTodo] = useState({});
  const { setShowHideSnakeBar } = useSnack();

  // currentTab state handler
  const handleSetCurrentTab = (value) => {
    setCurrentTab(value);
  };

  // CreateDialog start handlers
  const handleSetOpenCreateDialog = (status = false) => {
    setOpenCreateDialog(status);
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
    setCurrentTab("non-completed");
    setOpenCreateDialog(false);
    setShowHideSnakeBar("تم انشاء المهمة بنجاح !!!");
  };

  // EditDialog handlesr
  const handleSetOpenEditDialog = (status) => {
    setOpenEditDialog(status);
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

  //DeleteDialog handler
  const handleSetOpenDeleteDialog = (status) => {
    setOpenDeleteDialog(status);
  };

  const handleSubmitDeleteTodo = (id) => {
    const newTodoItems = todoItems?.filter((t) => t.id !== id);
    setTodoItems(newTodoItems);
    localStorage.setItem("todos", JSON.stringify(newTodoItems));
    setOpenDeleteDialog(false);
    setShowHideSnakeBar("تم حذف المهمة بنجاح !!!");
  };

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

        handleSetOpenEditDialog(true);

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

  useEffect(() => {
    setTodoItems(JSON.parse(localStorage.getItem("todos")) ?? []);
  }, []);

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
          <ToggleButtons
            currentTab={currentTab}
            setCurrentTab={handleSetCurrentTab}
          />
        </Grid>
      </Grid>

      {/* show todos according to toggle button */}
      {jsxTodos}

      {openCreateDialog && (
        <Dialogs
          openCreateDialog={openCreateDialog}
          setOpenCreateDialog={handleSetOpenCreateDialog}
          setTodoItems={handleSubmitCreateTodo}
        />
      )}
      {openEditDialog && (
        <Dialogs
          openEditDialog={openEditDialog}
          setOpenEditDialog={handleSetOpenEditDialog}
          todo={currentTodo}
          setTodoItems={handleSubmitEditTodo}
        />
      )}
      {openDeleteDialog && (
        <Dialogs
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={handleSetOpenDeleteDialog}
          todo={currentTodo}
          setTodoItems={handleSubmitDeleteTodo}
        />
      )}
    </>
  );
  //************************ JSX SECTION END */
} //************************ COMPONENT END */

export const todoInitiailValue = [
  {
    id: uuidv4(),
    title: "one",
    description:
      "تهدف هذه الدورة الى رفع المستوي البرمجي للحد الذي يمكن معه بناء مشاريع الويب 3",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة 3 كتب تاريخية",
    description:
      "كتاب عون الشريف قاسم وطبقات ودضيف الله وكتاب تاريخ السودان الحديث",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "حفظ الوجة الاخير من سورة الطور",
    description:
      "بالاضافة الي الحفظ يجب التدقيق علي الحفظ القديم من نفس السورة",
    isCompleted: false,
  },
];
