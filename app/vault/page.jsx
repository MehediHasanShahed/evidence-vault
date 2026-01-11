"use client";
import { useState, useMemo, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import { format, parseISO, differenceInDays } from "date-fns";

import DataTable from "../components/DataTable";
import StatusChip from "../components/StatusChip";
import {
  evidenceItems,
  docTypes,
  statuses,
  expiryFilters,
} from "../data/mockData";

function VaultPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read filters from URL
  const docTypeFilter = searchParams.get("docType") || "";
  const statusFilter = searchParams.get("status") || "";
  const expiryFilter = searchParams.get("expiry") || "all";
  const searchQuery = searchParams.get("search") || "";

  const [selectedIds, setSelectedIds] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Update URL with filters
  const updateFilters = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      router.push(`/vault?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Filter data
  const filteredData = useMemo(() => {
    return evidenceItems.filter((item) => {
      // Doc type filter
      if (docTypeFilter && item.docType !== docTypeFilter) return false;

      // Status filter
      if (statusFilter && item.status !== statusFilter) return false;

      // Expiry filter
      if (expiryFilter !== "all") {
        if (!item.expiry) return false;
        const daysUntilExpiry = differenceInDays(
          parseISO(item.expiry),
          new Date()
        );
        if (expiryFilter === "expired" && daysUntilExpiry >= 0) return false;
        if (
          expiryFilter === "expiring-soon" &&
          (daysUntilExpiry < 0 || daysUntilExpiry > 30)
        )
          return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.docType.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [docTypeFilter, statusFilter, expiryFilter, searchQuery]);

  const handleAddToPack = () => {
    setSnackbarOpen(true);
  };

  const columns = [
    {
      id: "name",
      label: "Doc Name",
      render: (value, row) => (
        <Typography fontWeight={500} color="primary.main">
          {value}
        </Typography>
      ),
    },
    { id: "docType", label: "Doc Type" },
    {
      id: "status",
      label: "Status",
      render: (value) => <StatusChip status={value} />,
    },
    {
      id: "expiry",
      label: "Expiry",
      render: (value) => {
        if (!value) return <Typography color="text.secondary">N/A</Typography>;
        const daysUntil = differenceInDays(parseISO(value), new Date());
        const isExpired = daysUntil < 0;
        const isExpiringSoon = daysUntil >= 0 && daysUntil <= 30;
        return (
          <Typography
            color={
              isExpired
                ? "error.main"
                : isExpiringSoon
                ? "warning.main"
                : "text.primary"
            }
            fontWeight={isExpired || isExpiringSoon ? 500 : 400}
          >
            {format(parseISO(value), "MMM d, yyyy")}
          </Typography>
        );
      },
    },
    {
      id: "versions",
      label: "Versions",
      render: (value) => (
        <Chip
          label={`${value.length} version${value.length !== 1 ? "s" : ""}`}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      id: "lastUpdated",
      label: "Last Updated",
      render: (value) => format(parseISO(value), "MMM d, yyyy"),
    },
    {
      id: "actions",
      label: "Actions",
      sortable: false,
      render: (_, row) => (
        <IconButton
          component={Link}
          href={`/vault/${row.id}`}
          onClick={(e) => e.stopPropagation()}
          size="small"
          color="primary"
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Evidence Vault
        </Typography>
        <Typography color="text.secondary">
          Manage your compliance documents and certifications
        </Typography>
      </Box>

      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Search documents..."
          size="small"
          value={searchQuery}
          onChange={(e) => updateFilters({ search: e.target.value })}
          sx={{ minWidth: 250 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Doc Type</InputLabel>
          <Select
            value={docTypeFilter}
            label="Doc Type"
            onChange={(e) => updateFilters({ docType: e.target.value })}
          >
            <MenuItem value="">All Types</MenuItem>
            {docTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 130 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => updateFilters({ status: e.target.value })}
          >
            <MenuItem value="">All Status</MenuItem>
            {statuses.map((status) => (
              <MenuItem
                key={status}
                value={status}
                sx={{ textTransform: "capitalize" }}
              >
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Expiry</InputLabel>
          <Select
            value={expiryFilter}
            label="Expiry"
            onChange={(e) => updateFilters({ expiry: e.target.value })}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="expired">Expired</MenuItem>
            <MenuItem value="expiring-soon">Expiring Soon</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ flexGrow: 1 }} />

        {selectedIds.length > 0 && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddToPack}
          >
            Add to Pack ({selectedIds.length})
          </Button>
        )}
      </Box>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {filteredData.length} of {evidenceItems.length} documents
      </Typography>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        onRowClick={(row) => router.push(`/vault/${row.id}`)}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          {selectedIds.length} document{selectedIds.length !== 1 ? "s" : ""}{" "}
          added to pack!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default function VaultPage() {
  return (
    <Suspense fallback={<Box sx={{ p: 3 }}>Loading...</Box>}>
      <VaultPageContent />
    </Suspense>
  );
}
