"use client";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

export default function DataTable({
  columns,
  data,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  onRowClick,
  getRowId = (row) => row.id,
}) {
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSort = (columnId) => {
    const isAsc = orderBy === columnId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnId);
  };

  const sortedData = [...data].sort((a, b) => {
    if (!orderBy) return 0;
    const aVal = a[orderBy] ?? "";
    const bVal = b[orderBy] ?? "";
    if (order === "asc") {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    }
    return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
  });

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      onSelectionChange?.(data.map(getRowId));
    } else {
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (id) => {
    const currentIndex = selectedIds.indexOf(id);
    const newSelected = [...selectedIds];
    if (currentIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(currentIndex, 1);
    }
    onSelectionChange?.(newSelected);
  };

  const isSelected = (id) => selectedIds.includes(id);
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const someSelected =
    selectedIds.length > 0 && selectedIds.length < data.length;

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ border: "1px solid", borderColor: "divider" }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                  ? "grey.100"
                  : "rgba(255,255,255,0.05)",
            }}
          >
            {selectable && (
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={someSelected}
                  checked={allSelected}
                  onChange={handleSelectAll}
                />
              </TableCell>
            )}
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align || "left"}
                sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
              >
                {column.sortable !== false ? (
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => {
            const id = getRowId(row);
            const selected = isSelected(id);
            return (
              <TableRow
                key={id}
                hover
                selected={selected}
                onClick={() => onRowClick?.(row)}
                sx={{ cursor: onRowClick ? "pointer" : "default" }}
              >
                {selectable && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectRow(id);
                      }}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align || "left"}>
                    {column.render
                      ? column.render(row[column.id], row)
                      : row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
          {sortedData.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length + (selectable ? 1 : 0)}
                align="center"
                sx={{ py: 4, color: "text.secondary" }}
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
