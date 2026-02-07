import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Skeleton,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { userSchema } from "../schemas";
import type { User } from "../types";

interface UserListProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

/**
 * User list table with loading skeleton and error display
 * Columns are generated from userSchema for extensibility
 */
export function UserList({
  users,
  loading,
  error,
  onEdit,
  onDelete,
}: UserListProps): React.JSX.Element {
  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (loading && users.length === 0) {
    return (
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              {userSchema.map((field) => (
                <TableCell
                  key={field.name}
                  sx={{ color: "white", fontWeight: 600 }}
                >
                  {field.label}
                </TableCell>
              ))}
              <TableCell sx={{ color: "white", fontWeight: 600, width: 120 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                {userSchema.map((field) => (
                  <TableCell key={field.name}>
                    <Skeleton animation="wave" />
                  </TableCell>
                ))}
                <TableCell>
                  <Skeleton animation="wave" width={80} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (users.length === 0) {
    return (
      <Paper
        sx={{
          p: 4,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
        elevation={2}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No users found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click &quot;Add User&quot; to create your first user.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "primary.main" }}>
            {userSchema.map((field) => (
              <TableCell
                key={field.name}
                sx={{ color: "white", fontWeight: 600 }}
              >
                {field.label}
              </TableCell>
            ))}
            <TableCell sx={{ color: "white", fontWeight: 600, width: 120 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{
                "&:hover": {
                  bgcolor: "action.hover",
                },
                transition: "background-color 0.2s",
              }}
            >
              {userSchema.map((field) => (
                <TableCell key={field.name}>
                  {user[field.name as keyof User]}
                </TableCell>
              ))}
              <TableCell>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <Tooltip title="Edit user">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => onEdit(user)}
                      aria-label={`Edit ${user.firstName} ${user.lastName}`}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete user">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete(user)}
                      aria-label={`Delete ${user.firstName} ${user.lastName}`}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
