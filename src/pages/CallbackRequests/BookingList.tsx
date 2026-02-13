import { useEffect, useState } from "react";
import { Box, Typography, Chip, Button, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useBookingStore } from "@/store/bookingStore";
import AssignCaregiverDialog from "./AssignCaregiverDialog";
import BookingDetailsDrawer from "./BookingDetailsDrawer";

const BookingList = () => {
  const [selected, setSelected] = useState<any | null>(null);
  const [assignId, setAssignId] = useState<string | null>(null);

  const { list, loading, page, total, setPage, getBookings } =
    useBookingStore();

  useEffect(() => {
    getBookings();
  }, [page]);

  const columns: GridColDef[] = [
    {
      field: "bookingId",
      headerName: "Booking ID",
      flex: 1,
    },
    {
      field: "service",
      headerName: "Service",
      flex: 1,
      valueGetter: (_, row) => row.service?.name || "-",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      valueGetter: (_, row) => row.contactDetails?.name || "-",
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 1,
      valueGetter: (_, row) => row.contactDetails?.mobile || "-",
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      valueGetter: (_, row) => row.contactDetails?.location || "-",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueGetter: (_, row) =>
        row.date ? new Date(row.date).toLocaleDateString() : "-",
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
      valueGetter: (_, row) =>
        `${row.startTime || "-"} - ${row.endTime || "-"}`,
    },
    {
      field: "caregiverStatus",
      headerName: "Caregiver Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.row.caregiverStatus}
          color={
            params.row.caregiverStatus === "NOT_ASSIGNED"
              ? "warning"
              : "success"
          }
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

          {params.row.caregiverStatus === "NOT_ASSIGNED" && (
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
        Booking Requests
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
        bookingId={assignId}
        onClose={() => setAssignId(null)}
      />

      <BookingDetailsDrawer
        open={!!selected}
        data={selected}
        onClose={() => setSelected(null)}
      />
    </Box>
  );
};

export default BookingList;
