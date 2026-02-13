import {
  Drawer,
  Box,
  Typography,
  Divider,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import AssignCaregiverDialog from "./AssignCaregiverDialog";

interface Props {
  open: boolean;
  onClose: () => void;
  data: any | null;
}

const BookingDetailsDrawer = ({ open, onClose, data }: Props) => {
  const [assignOpen, setAssignOpen] = useState(false);

  if (!data) return null;

  const contact = data.contactDetails || {};

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box sx={{ width: 420, p: 3 }}>
          <Typography variant="h6" mb={2}>
            Booking Details
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* Booking ID */}
          <Typography variant="subtitle2">Booking ID</Typography>
          <Typography mb={2}>{data.bookingId || "-"}</Typography>

          {/* Service */}
          <Typography variant="subtitle2">Service</Typography>
          <Typography mb={2}>{data.service?.name || "-"}</Typography>

          {/* Customer Info */}
          <Typography variant="subtitle2">Customer Info</Typography>
          <Typography>Name: {contact.name || "-"}</Typography>
          <Typography>Email: {contact.email || "-"}</Typography>
          <Typography>Mobile: {contact.mobile || "-"}</Typography>
          <Typography mb={2}>Location: {contact.location || "-"}</Typography>

          {/* Schedule */}
          <Typography variant="subtitle2">Schedule</Typography>
          <Typography>
            Date: {data.date ? new Date(data.date).toLocaleDateString() : "-"}
          </Typography>
          <Typography mb={2}>
            Time: {data.startTime || "-"} - {data.endTime || "-"}
          </Typography>

          {/* Payment Info */}
          <Typography variant="subtitle2">Payment</Typography>
          <Typography>Amount: $ {data.paymentAmount || 0}</Typography>
          <Chip
            label={data.paymentStatus}
            color={data.paymentStatus === "PAID" ? "success" : "warning"}
            size="small"
            sx={{ mt: 1, mb: 2 }}
          />

          {/* Caregiver Status */}
          <Typography variant="subtitle2">Caregiver Status</Typography>
          <Chip
            label={data.caregiverStatus}
            color={
              data.caregiverStatus === "NOT_ASSIGNED" ? "warning" : "success"
            }
            size="small"
            sx={{ mb: 2 }}
          />

          {/* Assigned Caregiver */}
          {data.caregiver && (
            <>
              <Typography variant="subtitle2">Assigned Caregiver</Typography>
              <Typography mb={2}>{data.caregiver.name}</Typography>
            </>
          )}

          {/* Assign Button */}
          {data.caregiverStatus === "NOT_ASSIGNED" && (
            <Stack mt={3}>
              <Button variant="contained" onClick={() => setAssignOpen(true)}>
                Assign Caregiver
              </Button>
            </Stack>
          )}
        </Box>
      </Drawer>

      <AssignCaregiverDialog
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
        bookingId={data._id}
      />
    </>
  );
};

export default BookingDetailsDrawer;
