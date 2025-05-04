import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { blue, red } from "@mui/material/colors";

const Todo = ({ todo, handleActionS }) => {
  const handleAction = (action, todoID) => {
    handleActionS(action, todoID);
  };

  return (
    <Box
      sx={{
        // minWidth: 275,
        // height: 400,
        overflow: "auto",
        textAlign: "right",
        marginTop: 2,
        backgroundColor: "#0d47a1",
        color: "white",
        padding: "5px 10px",
      }}
      // bgcolor={blueGrey}
    >
      {!todo&&(<h1>no todos</h1>)}
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Grid size={7}>
          <Typography variant="h5" gutterBottom>
            {todo?.title}
          </Typography>
          <Typography variant="p">{todo?.description}</Typography>
        </Grid>
        <Grid size={5} display={"flex"} justifyContent={"space-evenly"}>
          <IconButton
            onClick={() => {
              handleAction("check", todo.id);
            }}
            aria-label="delete"
            sx={{
              border: 2,
              color: todo.isCompleted ? "white" : "green",
              background: todo.isCompleted ? "green" : "white",
            }}
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            onClick={() => handleAction("edit", todo.id)}
            aria-label="edit"
            color="primary"
            sx={{ border: 2, borderColor: blue }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleAction("delete", todo.id)}
            aria-label="delete"
            color="error"
            sx={{ border: 2, borderColor: red }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Todo;
