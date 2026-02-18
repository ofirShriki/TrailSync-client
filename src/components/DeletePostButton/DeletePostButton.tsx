import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postService from "../../services/postService";
import { QUERY_KEYS } from "../../constants/queryKeys";

interface DeletePostButtonProps {
  postId: string;
  userId?: string;
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({
  postId,
  userId,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: () => postService.deletePost(postId),
    onSuccess: () => {
      setOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS_BY_USER, userId],
        });
      }
    },
  });

  const handleOpenDialog = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    deletePost();
  };

  return (
    <>
      <IconButton size="small" onClick={handleOpenDialog} disabled={isPending}>
        {isPending ? (
          <CircularProgress size={20} />
        ) : (
          <DeleteOutlineIcon fontSize="small" color="error" />
        )}
      </IconButton>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Post?</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={isPending}
          >
            {isPending ? <CircularProgress size={20} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeletePostButton;
