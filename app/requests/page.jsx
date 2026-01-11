"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { format, parseISO, differenceInDays } from "date-fns";

import DataTable from "../components/DataTable";
import StatusChip from "../components/StatusChip";
import FulfillModal from "../components/FulfillModal";
import {
  buyerRequests as initialRequests,
  evidenceItems,
} from "../data/mockData";

export default function RequestsPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [fulfillModalOpen, setFulfillModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOpenFulfill = (request) => {
    setSelectedRequest(request);
    setFulfillModalOpen(true);
  };

  const handleFulfill = (data) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === data.requestId
          ? {
              ...req,
              status: "fulfilled",
              fulfilledWith: data.evidenceId,
              fulfilledDate: format(new Date(), "yyyy-MM-dd"),
            }
          : req
      )
    );

    const evidenceName =
      data.fulfillType === "existing"
        ? evidenceItems.find((e) => e.id === data.evidenceId)?.name
        : data.newEvidence?.name;

    setSnackbarMessage(`Request fulfilled with "${evidenceName}"`);
    setSnackbarOpen(true);
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
          sx={{ maxWidth: 300 }}
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
            <Chip
              icon={<CheckCircleIcon />}
              label="Fulfilled"
              color="success"
              size="small"
              variant="outlined"
            />
          );
        }
        return (
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
        );
      },
    },
  ];

  const pendingCount = requests.filter((r) => r.status !== "fulfilled").length;
  const overdueCount = requests.filter((r) => r.status === "overdue").length;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Buyer Requests
        </Typography>
        <Typography color="text.secondary">
          Fulfill compliance document requests from your buyers
        </Typography>
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
      <DataTable columns={columns} data={requests} getRowId={(row) => row.id} />

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
