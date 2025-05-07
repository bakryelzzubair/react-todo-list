import { useState, useContext, createContext } from "react";

const DialogContext = createContext({});

export const DialogProvider = ({ children }) => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  return (
    <DialogContext.Provider
      value={{
        openCreateDialog,
        openEditDialog,
        openDeleteDialog,
        setOpenCreateDialog,
        setOpenDeleteDialog,
        setOpenEditDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {return useContext(DialogContext)}
