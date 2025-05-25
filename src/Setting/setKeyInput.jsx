import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
export default function SetKeyInput({ setWorkspace }) {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [input, setInput] = useState("");

  const [text, setText] = useState("");
  const [state, setState] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    setText("Your workspace has been changed!");
    setState("success");

    if (input.length < 1) {
      setText("Please enter at least one character.");
      setState("error");
    }

    window.localStorage.setItem("workspace", input);
    setWorkspace(input);
    setInput("");
    setOpen2(true);
  };
  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Set workspace
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Set workspace"}</DialogTitle>
        <DialogContent>
          <TextField
            id="standard-basic"
            label="Workspace Name"
            variant="standard"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ok</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={open2}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpen2(false)}
      >
        <Alert
          onClose={() => setOpen2(false)}
          autoHideDuration={3000}
          severity={state}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {text}
        </Alert>
      </Snackbar>
    </>
  );
}
