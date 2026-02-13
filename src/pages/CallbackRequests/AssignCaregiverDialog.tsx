import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchAvailableCaregivers } from "@/services/bookingService";
import { useBookingStore } from "@/store/bookingStore";

interface Props {
  open: boolean;
  onClose: () => void;
  bookingId: string | null;
}

const AssignCaregiverDialog = ({ open, onClose, bookingId }: Props) => {
  const [caregivers, setCaregivers] = useState<any[]>([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  const { assignCaregiver } = useBookingStore();

  useEffect(() => {
    const loadCaregivers = async () => {
      if (!bookingId) return;

      try {
        setLoading(true);
        const data = await fetchAvailableCaregivers(bookingId);
        setCaregivers(data || []);
      } finally {
        setLoading(false);
      }
    };

    if (open) loadCaregivers();
  }, [open, bookingId]);

  const handleAssign = async () => {
    if (!bookingId || !selected) return;

    await assignCaregiver(bookingId, selected);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Assign Caregiver</DialogTitle>

      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <Select
            fullWidth
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">Select Caregiver</MenuItem>

            {caregivers.map((cg) => (
              <MenuItem key={cg._id} value={cg._id}>
                {cg.name} - {cg.experienceYears} yrs
              </MenuItem>
            ))}
          </Select>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" disabled={!selected} onClick={handleAssign}>
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignCaregiverDialog;
