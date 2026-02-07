import { useState, useCallback } from "react";
import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Layout, UserList, UserDialog, ConfirmDialog } from "../components";
import { useUsers } from "../hooks";
import type { User, FormValues, CreateUserDto } from "../types";

/**
 * Main users page - orchestrates all CRUD operations
 */
export function UsersPage(): React.JSX.Element {
  const {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    editUser,
    removeUser,
    clearError,
  } = useUsers();

  // Dialog states
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Success message state
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch users on mount
  useState(() => {
    void fetchUsers();
  });

  // Handle add user click
  const handleAddClick = useCallback((): void => {
    setSelectedUser(null);
    setUserDialogOpen(true);
  }, []);

  // Handle edit user click
  const handleEditClick = useCallback((user: User): void => {
    setSelectedUser(user);
    setUserDialogOpen(true);
  }, []);

  // Handle delete user click
  const handleDeleteClick = useCallback((user: User): void => {
    setSelectedUser(user);
    setConfirmDialogOpen(true);
  }, []);

  // Handle form submission (create or update)
  const handleFormSubmit = useCallback(
    async (values: FormValues): Promise<void> => {
      const userData: CreateUserDto = {
        firstName: values["firstName"] ?? "",
        lastName: values["lastName"] ?? "",
        email: values["email"] ?? "",
        phoneNumber: values["phoneNumber"] ?? "",
      };

      if (selectedUser) {
        const result = await editUser(selectedUser.id, userData);
        if (result) {
          setUserDialogOpen(false);
          setSuccessMessage("User updated successfully");
        }
      } else {
        const result = await addUser(userData);
        if (result) {
          setUserDialogOpen(false);
          setSuccessMessage("User created successfully");
        }
      }
    },
    [selectedUser, addUser, editUser],
  );

  // Handle delete confirmation
  const handleDeleteConfirm = useCallback(async (): Promise<void> => {
    if (selectedUser) {
      const success = await removeUser(selectedUser.id);
      if (success) {
        setConfirmDialogOpen(false);
        setSelectedUser(null);
        setSuccessMessage("User deleted successfully");
      }
    }
  }, [selectedUser, removeUser]);

  // Handle dialog close
  const handleDialogClose = useCallback((): void => {
    setUserDialogOpen(false);
    setSelectedUser(null);
  }, []);

  // Handle confirm dialog close
  const handleConfirmClose = useCallback((): void => {
    setConfirmDialogOpen(false);
    setSelectedUser(null);
  }, []);

  // Handle success message close
  const handleSuccessClose = (): void => {
    setSuccessMessage(null);
  };

  // Handle error close
  const handleErrorClose = (): void => {
    clearError();
  };

  return (
    <Layout>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
          Users
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
          sx={{
            px: 3,
            py: 1,
            borderRadius: 2,
            boxShadow: 2,
            "&:hover": {
              boxShadow: 4,
            },
          }}
        >
          Add User
        </Button>
      </Box>

      <UserList
        users={users}
        loading={loading}
        error={error}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <UserDialog
        open={userDialogOpen}
        user={selectedUser}
        onClose={handleDialogClose}
        onSubmit={(values) => void handleFormSubmit(values)}
        isLoading={loading}
      />

      <ConfirmDialog
        open={confirmDialogOpen}
        title="Delete User"
        message={`Are you sure you want to delete ${selectedUser?.firstName} ${selectedUser?.lastName}? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={() => void handleDeleteConfirm()}
        onCancel={handleConfirmClose}
        isLoading={loading}
      />

      <Snackbar
        open={successMessage !== null}
        autoHideDuration={4000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          onClose={handleSuccessClose}
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="error"
          onClose={handleErrorClose}
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Layout>
  );
}
