import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchAvailableCaregivers } from "@/services/caregiverService";
import { useCallbackStore } from "@/store/callbackStore";

interface Props {
  open: boolean;
  onClose: () => void;
  callbackId: string | null;
}

const AssignCaregiverDialog = ({ open, onClose, callbackId }: Props) => {
  const [caregivers, setCaregivers] = useState<any[]>([]);
  const [selected, setSelected] = useState("");

  const { assignToCaregiver } = useCallbackStore();

  useEffect(() => {
    const loadCaregivers = async () => {
      if (!callbackId) return;

      const data = await fetchAvailableCaregivers(callbackId);
      setCaregivers(data);
    };

    if (open) {
      loadCaregivers();
    }
  }, [open, callbackId]);

  console.log("Cargiver Details", caregivers);

  const handleAssign = async () => {
    if (!callbackId || !selected) return;
    await assignToCaregiver(callbackId, selected);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Assign Caregiver</DialogTitle>

      <DialogContent>
        <Select
          fullWidth
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {caregivers.map((cg) => (
            <MenuItem key={cg._id} value={cg._id}>
              {cg.name} - {cg.experienceYears} yrs
            </MenuItem>
          ))}
        </Select>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAssign}>
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignCaregiverDialog;
