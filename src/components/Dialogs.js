import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

export default function Dialogs({
  openCreateDialog = false,
  openEditDialog = false,
  openDeleteDialog = false,
  setOpenCreateDialog = null,
  setOpenEditDialog = null,
  setOpenDeleteDialog = null,
  todo = null,
  setTodoItems = false,
}) {
  const initialInputValue = { title: "", description: "" };

  if (todo) {
    initialInputValue.title = todo.title;
    initialInputValue.description = todo.description;
  }

  const [formInputs, setFormInputs] = React.useState(initialInputValue);

  const handleInputTitleNewValue = (e) =>
    setFormInputs({ ...formInputs, title: e.target.value });

  const handleInputDescriptionNewValue = (e) =>
    setFormInputs({ ...formInputs, description: e.target.value });

  // if (todo) {
  //   setFormInputs({...formInputs, title: todo.title, description: todo.description})
  // }

  return (
    <React.Fragment>
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
            onClick={() =>
              setTodoItems(formInputs.title, formInputs.description)
            }
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
              setTodoItems(todo?.id, formInputs.title, formInputs.description)
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
            {todo?.title}
          </Typography>
          <Typography variant="h6" color="error">
            لا يمكنك التراجع عن عملية الحذف بعد اتمامها
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="success" onClick={() => setOpenDeleteDialog(false)}>
            الغاء
          </Button>
          <Button color="error" onClick={() => setTodoItems(todo?.id)}>
            تاكيد الحذف
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
