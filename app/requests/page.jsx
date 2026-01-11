"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { format, parseISO, differenceInDays } from "date-fns";

import DataTable from "../components/DataTable";
import StatusChip from "../components/StatusChip";
import FulfillModal from "../components/FulfillModal";
import CreateRequestModal from "../components/CreateRequestModal";
import { evidenceItems } from "../data/mockData";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fulfillModalOpen, setFulfillModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/requests");
      const result = await response.json();
      setRequests(result.data || []);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleOpenFulfill = (request) => {
    setSelectedRequest(request);
    setFulfillModalOpen(true);
  };

  const handleFulfill = async (data) => {
    try {
      const response = await fetch(`/api/requests/${data.requestId}/fulfill`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          evidenceId: data.evidenceId,
          notes: data.notes || "Fulfilled via UI",
          newEvidence: data.newEvidence,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fulfill request");
      }

      // Update local state
      setRequests((prev) =>
        prev.map((req) => (req.id === result.data.id ? result.data : req))
      );

      setSnackbarMessage(`Request fulfilled successfully!`);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Fulfillment error:", err);
      setSnackbarMessage(`Error: ${err.message}`);
      setSnackbarOpen(true);
    }
  };

  const handleCheckStatus = async (id) => {
    try {
      const response = await fetch(`/api/requests/${id}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Request not found");
      }

      setSnackbarMessage(
        `Status for ${result.data.docType}: ${result.data.status.toUpperCase()}`
      );
      setSnackbarOpen(true);
      // Sync local state if changed
      setRequests((prev) =>
        prev.map((req) => (req.id === result.data.id ? result.data : req))
      );
    } catch (error) {
      console.error("Check status error:", error);
      setSnackbarMessage(`Error: ${error.message}`);
      setSnackbarOpen(true);
    }
  };

  const columns = [
    {
      id: "docType",
      label: "Document Type",
      render: (value) => <Typography fontWeight={500}>{value}</Typography>,
    },
    {
      id: "dueDate",
      label: "Due Date",
      render: (value) => {
        const daysUntil = differenceInDays(parseISO(value), new Date());
        const isOverdue = daysUntil < 0;
        const isDueSoon = daysUntil >= 0 && daysUntil <= 7;
        return (
          <Box>
            <Typography
              color={
                isOverdue
                  ? "error.main"
                  : isDueSoon
                  ? "warning.main"
                  : "text.primary"
              }
              fontWeight={isOverdue || isDueSoon ? 500 : 400}
            >
              {format(parseISO(value), "MMM d, yyyy")}
            </Typography>
            {isOverdue && (
              <Typography variant="caption" color="error.main">
                {Math.abs(daysUntil)} days overdue
              </Typography>
            )}
            {isDueSoon && !isOverdue && (
              <Typography variant="caption" color="warning.main">
                Due in {daysUntil} day{daysUntil !== 1 ? "s" : ""}
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      id: "status",
      label: "Status",
      render: (value) => <StatusChip status={value} />,
    },
    {
      id: "notes",
      label: "Notes",
      render: (value) => (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 200 }}
          noWrap
        >
          {value}
        </Typography>
      ),
    },
    {
      id: "actions",
      label: "Actions",
      sortable: false,
      render: (_, row) => {
        if (row.status === "fulfilled") {
          return (
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                icon={<CheckCircleIcon />}
                label="Fulfilled"
                color="success"
                size="small"
                variant="outlined"
              />
              <Button
                size="small"
                variant="text"
                onClick={() => handleCheckStatus(row.id)}
              >
                Check Status
              </Button>
            </Stack>
          );
        }
        return (
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenFulfill(row);
              }}
            >
              Fulfill
            </Button>
            <Button
              size="small"
              variant="text"
              onClick={() => handleCheckStatus(row.id)}
            >
              Check
            </Button>
          </Stack>
        );
      },
    },
  ];

  const pendingCount = requests.filter((r) => r.status !== "fulfilled").length;
  const overdueCount = requests.filter((r) => r.status === "overdue").length;

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Buyer Requests
          </Typography>
          <Typography color="text.secondary">
            Fulfill compliance document requests from your buyers
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchRequests}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
          >
            New Request
          </Button>
        </Stack>
      </Box>

      {/* Stats */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Chip
          label={`${pendingCount} Pending`}
          color={pendingCount > 0 ? "warning" : "default"}
          variant={pendingCount > 0 ? "filled" : "outlined"}
        />
        {overdueCount > 0 && (
          <Chip label={`${overdueCount} Overdue`} color="error" />
        )}
        <Chip
          label={`${requests.length - pendingCount} Fulfilled`}
          color="success"
          variant="outlined"
        />
      </Box>

      {/* Table */}
      <DataTable
        columns={columns}
        data={requests}
        getRowId={(row) => row.id}
        loading={loading}
      />

      {/* Create Request Modal (Buyer View) */}
      <CreateRequestModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={(newReq) => {
          setRequests((prev) => [newReq, ...prev]);
          setSnackbarMessage(`Buyer created request: ${newReq.docType}`);
          setSnackbarOpen(true);
        }}
      />

      {/* Fulfill Modal */}
      <FulfillModal
        open={fulfillModalOpen}
        onClose={() => {
          setFulfillModalOpen(false);
          setSelectedRequest(null);
        }}
        request={selectedRequest}
        onFulfill={handleFulfill}
      />

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
