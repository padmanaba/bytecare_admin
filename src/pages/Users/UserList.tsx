import { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Chip,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useUserStore } from "@/store/userStore";

const UserList = () => {
  const {
    users,
    loading,
    page,
    total,
    type,
    setPage,
    setType,
    getUsers,
    approveUser,
    rejectUser,
  } = useUserStore();

  const [rejectId, setRejectId] = useState<string | null>(null);
  const [adminNote, setAdminNote] = useState("");

  useEffect(() => {
    getUsers();
  }, [page, type]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      valueGetter: (value, row) => row?.location || "N/A",
    },
    {
      field: "experience",
      headerName: "Experience",
      flex: 1,
      valueGetter: (value, row) =>
        row?.caregiver?.experienceYears
          ? `${row.caregiver.experienceYears} yrs`
          : "-",
    },
    {
      field: "fee",
      headerName: "Consultation Fee",
      flex: 1,
      valueGetter: (value, row) =>
        row?.caregiver?.consultationFee
          ? `$${row.caregiver.consultationFee}`
          : "-",
    },
    {
      field: "approvalStatus",
      headerName: "Approval",
      flex: 1,
      renderCell: (params) => {
        const status = params.row?.approvalStatus;
        if (!status) return "-";

        return (
          <Chip
            label={status}
            color={
              status === "approved"
                ? "success"
                : status === "pending"
                  ? "warning"
                  : "error"
            }
            size="small"
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      sortable: false,
      renderCell: (params) => {
        const row = params.row;

        // Only for caregivers
        if (row.type !== "caregiver") return "-";

        if (row.approvalStatus === "approved") {
          return <Chip label="Approved" color="success" size="small" />;
        }

        return (
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={() => approveUser(row._id)}
            >
              Approve
            </Button>

            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => setRejectId(row._id)}
            >
              Reject
            </Button>
          </Stack>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      valueGetter: (value, row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <Box sx={{ height: 650, width: "100%" }}>
      <Typography variant="h5" mb={2}>
        User Management
      </Typography>

      <Tabs value={type} onChange={(e, value) => setType(value)} sx={{ mb: 2 }}>
        <Tab label="Caregivers" value="caregiver" />
        <Tab label="Users" value="user" />
      </Tabs>

      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row._id}
        loading={loading}
        rowCount={total}
        pageSizeOptions={[10]}
        paginationMode="server"
        paginationModel={{
          page: page - 1,
          pageSize: 10,
        }}
        onPaginationModelChange={(model) => {
          setPage(model.page + 1);
        }}
      />

      {/* Reject Dialog */}
      <Dialog
        open={!!rejectId}
        onClose={() => {
          setRejectId(null);
          setAdminNote("");
        }}
      >
        <DialogTitle>Reject Caregiver</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Admin Note"
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setRejectId(null);
              setAdminNote("");
            }}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={async () => {
              if (rejectId) {
                await rejectUser(rejectId, adminNote);
                setRejectId(null);
                setAdminNote("");
              }
            }}
          >
            Confirm Reject
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserList;
