"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import Modal from "./Modal";
import { evidenceItems } from "../data/mockData";

export default function FulfillModal({ open, onClose, request, onFulfill }) {
  const [fulfillType, setFulfillType] = useState("existing");
  const [selectedEvidenceId, setSelectedEvidenceId] = useState("");
  const [newEvidenceName, setNewEvidenceName] = useState("");
  const [newEvidenceNotes, setNewEvidenceNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (fulfillType === "existing" && !selectedEvidenceId) {
      setError("Please select evidence from the vault");
      return;
    }
    if (fulfillType === "new" && !newEvidenceName.trim()) {
      setError("Please enter a name for the new evidence");
      return;
    }

    onFulfill({
      requestId: request?.id,
      fulfillType,
      evidenceId: fulfillType === "existing" ? selectedEvidenceId : null,
      newEvidence:
        fulfillType === "new"
          ? {
              name: newEvidenceName.trim(),
              notes: newEvidenceNotes.trim(),
            }
          : null,
    });

    // Reset form
    handleClose();
  };

  const handleClose = () => {
    setFulfillType("existing");
    setSelectedEvidenceId("");
    setNewEvidenceName("");
    setNewEvidenceNotes("");
    setError("");
    onClose();
  };

  // Show all evidence items, but prioritize matching ones first
  const matchingEvidence = [...evidenceItems].sort((a, b) => {
    const aMatches =
      a.docType === request?.requiredEvidence || a.status === "active";
    const bMatches =
      b.docType === request?.requiredEvidence || b.status === "active";
    if (aMatches && !bMatches) return -1;
    if (!aMatches && bMatches) return 1;
    return 0;
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Fulfill Request"
      maxWidth="sm"
      actions={
        <>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="success">
            Mark as Fulfilled
          </Button>
        </>
      }
    >
      {request && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Request Info */}
          <Box
            sx={(theme) => ({
              bgcolor:
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.background.paper,
              p: 2,
              borderRadius: 1,
            })}
          >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Request Details
            </Typography>
            <Typography fontWeight={500}>{request.docType}</Typography>
            <Typography variant="body2" color="text.secondary">
              {request.notes}
            </Typography>
          </Box>

          <Divider />

          {/* Fulfillment Options */}
          <FormControl>
            <Typography variant="subtitle2" gutterBottom>
              How would you like to fulfill this request?
            </Typography>
            <RadioGroup
              value={fulfillType}
              onChange={(e) => {
                setFulfillType(e.target.value);
                setError("");
              }}
            >
              <FormControlLabel
                value="existing"
                control={<Radio />}
                label="Choose existing evidence from vault"
              />
              <FormControlLabel
                value="new"
                control={<Radio />}
                label="Create new evidence"
              />
            </RadioGroup>
          </FormControl>

          {/* Existing Evidence Selection */}
          {fulfillType === "existing" && (
            <FormControl fullWidth error={!!error && !selectedEvidenceId}>
              <InputLabel>Select Evidence</InputLabel>
              <Select
                value={selectedEvidenceId}
                label="Select Evidence"
                onChange={(e) => {
                  setSelectedEvidenceId(e.target.value);
                  setError("");
                }}
              >
                {matchingEvidence.map((evidence) => (
                  <MenuItem key={evidence.id} value={evidence.id}>
                    <Box>
                      <Typography>{evidence.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {evidence.docType} • {evidence.versions.length}{" "}
                        version(s)
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              {error && fulfillType === "existing" && (
                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
            </FormControl>
          )}

          {/* New Evidence Form */}
          {fulfillType === "new" && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Evidence Name"
                placeholder="e.g., GDPR Compliance Certificate"
                value={newEvidenceName}
                onChange={(e) => {
                  setNewEvidenceName(e.target.value);
                  setError("");
                }}
                required
                error={!!error && !newEvidenceName.trim()}
                helperText={error && fulfillType === "new" ? error : ""}
                fullWidth
              />
              <TextField
                label="Notes"
                placeholder="Add any notes about this evidence..."
                multiline
                rows={2}
                value={newEvidenceNotes}
                onChange={(e) => setNewEvidenceNotes(e.target.value)}
                fullWidth
              />
              <Typography variant="caption" color="text.secondary">
                Note: This will create a mock evidence entry for demonstration
                purposes.
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Modal>
  );
}
