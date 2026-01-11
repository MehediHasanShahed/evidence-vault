"use client";
import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadIcon from "@mui/icons-material/Upload";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import StorageIcon from "@mui/icons-material/Storage";
import { format, parseISO, differenceInDays } from "date-fns";

import StatusChip from "../../components/StatusChip";
import DataTable from "../../components/DataTable";
import UploadVersionModal from "../../components/UploadVersionModal";
import { evidenceItems } from "../../data/mockData";

export default function EvidenceDetailPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [versions, setVersions] = useState(() => {
    const item = evidenceItems.find((e) => e.id === id);
    return item?.versions || [];
  });

  const evidence = evidenceItems.find((e) => e.id === id);

  if (!evidence) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" color="error" gutterBottom>
          Evidence Not Found
        </Typography>
        <Button component={Link} href="/vault" startIcon={<ArrowBackIcon />}>
          Back to Vault
        </Button>
      </Box>
    );
  }

  const handleUploadVersion = (data) => {
    const newVersion = {
      version: `v${versions.length + 1}`,
      date: format(new Date(), "yyyy-MM-dd"),
      uploader: "Current User",
      notes: data.notes,
      fileSize: "1.2 MB",
    };
    setVersions([newVersion, ...versions]);
    setSnackbarOpen(true);
  };

  const daysUntilExpiry = evidence.expiry
    ? differenceInDays(parseISO(evidence.expiry), new Date())
    : null;

  const versionColumns = [
    {
      id: "version",
      label: "Version",
      render: (value) => (
        <Chip label={value} size="small" color="primary" variant="outlined" />
      ),
    },
    {
      id: "date",
      label: "Date",
      render: (value) => format(parseISO(value), "MMM d, yyyy"),
    },
    {
      id: "uploader",
      label: "Uploader",
      render: (value) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PersonIcon fontSize="small" color="action" />
          {value}
        </Box>
      ),
    },
    { id: "notes", label: "Notes" },
    {
      id: "fileSize",
      label: "File Size",
      render: (value) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <StorageIcon fontSize="small" color="action" />
          {value}
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          href="/vault"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Evidence Vault
        </Link>
        <Typography color="text.primary">{evidence.name}</Typography>
      </Breadcrumbs>

      {/* Back button and title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Button
          component={Link}
          href="/vault"
          startIcon={<ArrowBackIcon />}
          color="inherit"
        >
          Back
        </Button>
      </Box>

      {/* Metadata Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  bgcolor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DescriptionIcon sx={{ fontSize: 28, color: "white" }} />
              </Box>
              <Box>
                <Typography variant="h5" gutterBottom>
                  {evidence.name}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Chip label={evidence.docType} size="small" />
                  <StatusChip status={evidence.status} />
                </Box>
              </Box>
            </Box>
            <Button
              variant="contained"
              startIcon={<UploadIcon />}
              onClick={() => setUploadModalOpen(true)}
            >
              Upload New Version
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 3,
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Last Updated
              </Typography>
              <Typography fontWeight={500}>
                {format(parseISO(evidence.lastUpdated), "MMMM d, yyyy")}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Expiry Date
              </Typography>
              {evidence.expiry ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarTodayIcon
                    fontSize="small"
                    color={
                      daysUntilExpiry < 0
                        ? "error"
                        : daysUntilExpiry <= 30
                        ? "warning"
                        : "action"
                    }
                  />
                  <Typography
                    fontWeight={500}
                    color={
                      daysUntilExpiry < 0
                        ? "error.main"
                        : daysUntilExpiry <= 30
                        ? "warning.main"
                        : "text.primary"
                    }
                  >
                    {format(parseISO(evidence.expiry), "MMMM d, yyyy")}
                    {daysUntilExpiry < 0 && " (Expired)"}
                    {daysUntilExpiry >= 0 &&
                      daysUntilExpiry <= 30 &&
                      ` (${daysUntilExpiry} days left)`}
                  </Typography>
                </Box>
              ) : (
                <Typography color="text.secondary">No expiry</Typography>
              )}
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Versions
              </Typography>
              <Typography fontWeight={500}>
                {versions.length} version{versions.length !== 1 ? "s" : ""}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Version History */}
      <Typography variant="h6" gutterBottom>
        Version History
      </Typography>
      <DataTable
        columns={versionColumns}
        data={versions}
        getRowId={(row) => row.version}
      />

      {/* Upload Modal */}
      <UploadVersionModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onSubmit={handleUploadVersion}
      />

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          New version uploaded successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
