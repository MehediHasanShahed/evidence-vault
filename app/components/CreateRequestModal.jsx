"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Modal from "./Modal";
import { docTypes } from "../data/mockData";

const evidenceTypes = ["Certificate", "Audit Report", "Policy", "Assessment"];

export default function CreateRequestModal({ open, onClose, onCreate }) {
  const [docType, setDocType] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!docType || !dueDate) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          docType,
          dueDate,
          notes,
          requiredEvidence: docType, // Use docType directly as requiredEvidence
        }),
      });

      if (!response.ok) throw new Error("Failed to create request");

      const result = await response.json();
      onCreate(result.data);
      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setDocType("");
    setDueDate("");
    setNotes("");
    setError("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Create New Request (Buyer View)"
      maxWidth="xs"
      actions={
        <>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? "Creating..." : "Create Request"}
          </Button>
        </>
      }
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Simulate a Buyer creating a compliance document request for your
          factory.
        </Typography>

        <FormControl fullWidth required error={!!error && !docType}>
          <InputLabel>Document Type</InputLabel>
          <Select
            value={docType}
            label="Document Type"
            onChange={(e) => setDocType(e.target.value)}
          >
            {docTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Evidence Type (for matching)</InputLabel>
          <Select value={docType} label="Evidence Type (for matching)" disabled>
            {evidenceTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Due Date"
          type="date"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          error={!!error && !dueDate}
        />

        <TextField
          label="Notes"
          placeholder="e.g. Please provide the latest audit report"
          multiline
          rows={3}
          fullWidth
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
      </Box>
    </Modal>
  );
}
