"use client";
import Chip from "@mui/material/Chip";

const statusConfig = {
  active: { label: "Active", color: "success" },
  pending: { label: "Pending", color: "warning" },
  expired: { label: "Expired", color: "error" },
  fulfilled: { label: "Fulfilled", color: "info" },
  overdue: { label: "Overdue", color: "error" },
};

export default function StatusChip({ status, size = "small" }) {
  const config = statusConfig[status] || { label: status, color: "default" };

  return (
    <Chip
      label={config.label}
      color={config.color}
      size={size}
      sx={{ fontWeight: 500, textTransform: "capitalize" }}
    />
  );
}
