import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import { useCurrentTodo } from "../contexts/CurrentTodoContext";
import { useDialog } from "../contexts/DialogContext";

export default function Dialogs({setTodoItems = false}) {
  const initialInputValue = { title: "", description: "" };
  const { currentTodo } = useCurrentTodo();
  const {
    openCreateDialog,
    openDeleteDialog,
    openEditDialog,
    setOpenCreateDialog,
    setOpenDeleteDialog,
    setOpenEditDialog,
  } = useDialog();

  if (currentTodo) {
    initialInputValue.title = currentTodo?.title;
    initialInputValue.description = currentTodo?.description;
  }

  const [formInputs, setFormInputs] = React.useState(initialInputValue);

  const handleInputTitleNewValue = (e) =>
    setFormInputs({ ...formInputs, title: e.target.value });

  const handleInputDescriptionNewValue = (e) =>
    setFormInputs({ ...formInputs, description: e.target.value });

  return (
    <>
      {/* create modal */}
      <Dialog
        open={openCreateDialog}
        // onClose={handleClose}
      >
        <DialogTitle>اضافة مهمة جديدة</DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleInputTitleNewValue}
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="اسم المهمة الجديدة"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={handleInputDescriptionNewValue}
            required
            margin="dense"
            id="name"
            name="description"
            label="وصف المهمة الجديدة"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>الغاء</Button>
          <Button
            onClick={() => {
              setTodoItems(formInputs.title, formInputs.description);
              // setOpenCreateDialog(false)
              // handleSubmitCreateTodo("formInputs.title", "formInputs.description")
              // console.log("clicked", handleSubmitCreateTodo);
            }}
          >
            حفظ
          </Button>
        </DialogActions>
      </Dialog>

      {/* edit dialog modal */}
      <Dialog
        open={openEditDialog}
        // onClose={handleClose}
      >
        <DialogTitle>تعديل مهمة </DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleInputTitleNewValue}
            value={formInputs.title}
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="اسم المهمة الجديدة"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={handleInputDescriptionNewValue}
            value={formInputs.description}
            required
            margin="dense"
            id="name"
            name="description"
            label="وصف المهمة الجديدة"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>الغاء</Button>
          <Button
            onClick={() =>
              setTodoItems(
                currentTodo?.id,
                formInputs.title,
                formInputs.description
              )
            }
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      {/* delete dialog */}
      <Dialog
        open={openDeleteDialog}
        // onClose={handleClose}
      >
        <DialogTitle>حذف مهمة </DialogTitle>
        <DialogContent>
          <Typography variant="h5" color="primary">
            {currentTodo?.title}
          </Typography>
          <Typography variant="h6" color="error">
            لا يمكنك التراجع عن عملية الحذف بعد اتمامها
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="success" onClick={() => setOpenDeleteDialog(false)}>
            الغاء
          </Button>
          <Button color="error" onClick={() => setTodoItems(currentTodo?.id)}>
            تاكيد الحذف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
