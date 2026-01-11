"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Modal from "./Modal";

export default function UploadVersionModal({ open, onClose, onSubmit }) {
  const [notes, setNotes] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = () => {
    if (!notes.trim()) {
      setError("Notes are required");
      return;
    }

    onSubmit({
      notes: notes.trim(),
      expiryDate: expiryDate || null,
      fileName: fileName || "document.pdf",
    });

    // Reset form
    setNotes("");
    setExpiryDate("");
    setFileName("");
    setError("");
    onClose();
  };

  const handleClose = () => {
    setNotes("");
    setExpiryDate("");
    setFileName("");
    setError("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Upload New Version"
      actions={
        <>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Upload Version
          </Button>
        </>
      }
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          label="Notes"
          placeholder="Describe what changed in this version..."
          multiline
          rows={3}
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            if (error) setError("");
          }}
          required
          error={!!error}
          helperText={
            error || "Required - describe the changes in this version"
          }
          fullWidth
        />

        <TextField
          label="Expiry Date"
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          helperText="Optional - when does this document expire?"
          fullWidth
        />

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Upload File
          </Typography>
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            fullWidth
            sx={{ py: 2 }}
          >
            {fileName || "Choose File"}
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1, display: "block" }}
          >
            Accepted formats: PDF, DOC, DOCX, XLS, XLSX (max 25MB)
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}
