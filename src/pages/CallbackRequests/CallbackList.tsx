import { useEffect, useState } from "react";
import { Box, Typography, Chip, Button, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCallbackStore } from "@/store/callbackStore";
import AssignCaregiverDialog from "./AssignCaregiverDialog";
import CallbackDetailsDrawer from "./CallbackDetailsDrawer";

const CallbackList = () => {
  const [selected, setSelected] = useState<any | null>(null);

  const { list, loading, page, total, setPage, getCallbacks } =
    useCallbackStore();

  const [assignId, setAssignId] = useState<string | null>(null);

  useEffect(() => {
    getCallbacks();
  }, [page]);

  const columns: GridColDef[] = [
    {
      field: "service",
      headerName: "Service",
      flex: 1,
      valueGetter: (value, row) => row.service?.name,
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "mobileNo", headerName: "Mobile", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    {
      field: "preferredDate",
      headerName: "Date",
      flex: 1,
      valueGetter: (value, row) =>
        new Date(row.preferredDate).toLocaleDateString(),
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
      valueGetter: (value, row) =>
        `${row.preferredStartTime} - ${row.preferredEndTime}`,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          color={params.row.status === "pending" ? "warning" : "success"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setSelected(params.row)}
          >
            View
          </Button>

          {params.row.status === "pending" && (
            <Button
              size="small"
              variant="contained"
              onClick={() => setAssignId(params.row._id)}
            >
              Assign
            </Button>
          )}
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ height: 650, width: "100%" }}>
      <Typography variant="h5" mb={2}>
        Pending Callback Requests
      </Typography>

      <DataGrid
        rows={list}
        columns={columns}
        getRowId={(row) => row._id}
        loading={loading}
        rowCount={total}
        paginationMode="server"
        paginationModel={{
          page: page - 1,
          pageSize: 10,
        }}
        onPaginationModelChange={(model) => setPage(model.page + 1)}
      />

      <AssignCaregiverDialog
        open={!!assignId}
        callbackId={assignId}
        onClose={() => setAssignId(null)}
      />
      <CallbackDetailsDrawer
        open={!!selected}
        data={selected}
        onClose={() => setSelected(null)}
      />
    </Box>
  );
};

export default CallbackList;
