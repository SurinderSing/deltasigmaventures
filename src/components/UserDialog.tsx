import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DynamicForm } from "../forms";
import { userSchema } from "../schemas";
import type { User, FormValues } from "../types";

interface UserDialogProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
  isLoading?: boolean;
}

/**
 * Dialog for creating or editing a user
 * Uses DynamicForm for schema-driven field rendering
 */
export function UserDialog({
  open,
  user,
  onClose,
  onSubmit,
  isLoading = false,
}: UserDialogProps): React.JSX.Element {
  const isEditMode = user !== null;
  const title = isEditMode ? "Edit User" : "Add New User";
  const submitLabel = isEditMode ? "Save Changes" : "Create User";

  // Convert User to FormValues for initial form state
  const initialValues: FormValues = user
    ? {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }
    : {};

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="user-dialog-title"
    >
      <DialogTitle id="user-dialog-title">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {title}
          <IconButton aria-label="close" onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <DynamicForm
            schema={userSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
            onCancel={onClose}
            submitLabel={submitLabel}
            isLoading={isLoading}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
