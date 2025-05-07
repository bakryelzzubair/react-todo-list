// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// const FormComponent = ({ open }) => {
//   return (
//     <>
//       <Dialog
//         open={open}
//         // onClose={handleClose}
//       >
//         <DialogTitle>اضافة مهمة جديدة</DialogTitle>
//         <DialogContent>
//           <TextField
//             onChange={handleInputTitleNewValue}
//             autoFocus
//             required
//             margin="dense"
//             id="name"
//             name="title"
//             label="اسم المهمة الجديدة"
//             type="text"
//             fullWidth
//             variant="standard"
//           />
//           <TextField
//             onChange={handleInputDescriptionNewValue}
//             required
//             margin="dense"
//             id="name"
//             name="description"
//             label="وصف المهمة الجديدة"
//             type="text"
//             fullWidth
//             variant="standard"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenCreateDialog(false)}>الغاء</Button>
//           <Button
//             onClick={() =>
//               setTodoItems(formInputs.title, formInputs.description)
//             }
//           >
//             حفظ
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default FormComponent;
