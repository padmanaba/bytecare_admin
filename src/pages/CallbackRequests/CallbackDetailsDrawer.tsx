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

const CallbackDetailsDrawer = ({ open, onClose, data }: Props) => {
  const [assignOpen, setAssignOpen] = useState(false);

  if (!data) return null;

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box sx={{ width: 400, p: 3 }}>
          <Typography variant="h6" mb={2}>
            Callback Details
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* Service */}
          <Typography variant="subtitle2">Service</Typography>
          <Typography mb={2}>{data.service?.name}</Typography>

          {/* Requester Info */}
          <Typography variant="subtitle2">Requested By</Typography>
          <Typography>Name: {data.name}</Typography>
          <Typography>Email: {data.email}</Typography>
          <Typography>Mobile: {data.mobileNo}</Typography>
          <Typography mb={2}>Location: {data.location}</Typography>

          {/* Patient Info */}
          <Typography variant="subtitle2">About Patient</Typography>
          <Typography mb={2}>{data.aboutPatient}</Typography>

          {/* Schedule */}
          <Typography variant="subtitle2">Schedule</Typography>
          <Typography>
            Date: {new Date(data.preferredDate).toLocaleDateString()}
          </Typography>
          <Typography mb={2}>
            Time: {data.preferredStartTime} - {data.preferredEndTime}
          </Typography>

          {/* Status */}
          <Typography variant="subtitle2">Status</Typography>
          <Chip
            label={data.status}
            color={
              data.status === "pending"
                ? "warning"
                : data.status === "assigned"
                  ? "info"
                  : "success"
            }
            size="small"
            sx={{ mb: 2 }}
          />

          {/* Assignment Info */}
          {data.assignedCaregiver && (
            <>
              <Typography variant="subtitle2">Assigned Caregiver</Typography>
              <Typography mb={2}>
                {data.assignedCaregiver.name || "Assigned"}
              </Typography>
            </>
          )}

          {/* Assign Button */}
          {data.status === "pending" && (
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
        callbackId={data._id}
      />
    </>
  );
};

export default CallbackDetailsDrawer;
