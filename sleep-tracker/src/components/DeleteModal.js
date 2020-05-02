import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { getWeek, formatDate } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { setData } from "../redux/actions/authActions";

const DeleteModal = (props) => {
  console.log(props);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const hanldeOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    axiosWithAuth()
      .delete(`https://sleep-tracker2020.herokuapp.com/api/users/${props.id}`)
      .then((res) => {
        const week = getWeek(props.sleep_start);

        axiosWithAuth()
          .get(
            `https://sleep-tracker2020.herokuapp.com/api/users/dates?start=${formatDate(
              week[0]
            )}&end=${formatDate(week[1])}`
          )
          .then((res) => {
            console.log(res.data);
            dispatch(setData(res.data));
            handleClose();
          });
      })

      .catch((err) => console.log(err));
  };

  return (
    <>
      <DeleteIcon onClick={hanldeOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you wish to delete this entry?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By click accept, you accept that this is permanent and cannot be
            undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ color: "#39869d", fontWeight: "bold" }}
          >
            Disagree
          </Button>
          <Button
            onClick={handleDelete}
            style={{ color: "#39869d", fontWeight: "bold" }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal;
