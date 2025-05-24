import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const changelogItems = [
  {
    title: "v1.3.2",
    description: [
      "Added settings and export",
      "Fixed minor bugs",
      "Improved performance",
      "Updated UI styles",
    ],
    date: "2025-5-23",
    releaseType: "beta",
  },
  {
    title: "v1.3.3",
    description: [
      "Added change log",
      "Added chips for changelog and dropdown box to select different versions.",
      "Added line break support",
      "Enhanced accessibility",
      "Optimized build size",
      "Add more information and pop-ups",
      "Add Title",
    ],
    date: "2025-5-24",
    releaseType: "beta",
  },
  {
    title: "v1.3.4",
    description: ["Add a prominent overdue reminder.", "Changing the UI"],
    date: "2025-5-24",
    releaseType: "alpha",
  },
];

const typeColor = {
  stable: "success",
  beta: "warning",
  alpha: "info",
  dev: "default",
};

export default function Changelog() {
  const [filter, setFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: [],
  });

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handleOpenDialog = (item) => {
    setDialogContent(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const filteredItems = changelogItems
    .filter((item) => filter === "all" || item.releaseType === filter)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const MAX_LINES = 2; // 默认显示的描述行数

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "90%",
          maxWidth: 600,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Link to="/">Back</Link>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Release Type</InputLabel>
            <Select value={filter} label="Release Type" onChange={handleChange}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="stable">Stable</MenuItem>
              <MenuItem value="beta">Beta</MenuItem>
              <MenuItem value="alpha">Alpha</MenuItem>
              <MenuItem value="dev">Dev</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Typography variant="h5" gutterBottom>
          Changelog
        </Typography>

        <List>
          {filteredItems.map((item, index) => {
            const showMore = item.description.length > MAX_LINES;
            return (
              <Box key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.title}
                        </Typography>
                        <Chip
                          label={item.releaseType}
                          size="small"
                          color={typeColor[item.releaseType] || "default"}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          mb={1}
                          display="block"
                        >
                          {new Date(item.date).toLocaleDateString()}
                        </Typography>
                        {item.description.slice(0, MAX_LINES).map((line, i) => (
                          <Typography
                            key={i}
                            variant="body2"
                            color="text.secondary"
                            component="div"
                          >
                            {line}
                          </Typography>
                        ))}
                        {showMore && (
                          <Button
                            size="small"
                            sx={{ mt: 0.5 }}
                            onClick={() => handleOpenDialog(item)}
                          >
                            Show more
                          </Button>
                        )}
                      </>
                    }
                  />
                </ListItem>
                {index < filteredItems.length - 1 && <Divider component="li" />}
              </Box>
            );
          })}
        </List>

        {/* 弹窗显示全部描述 */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{dialogContent.title}</DialogTitle>
          <DialogContent dividers>
            {dialogContent.description.map((line, i) => (
              <Typography
                key={i}
                variant="body2"
                color="text.secondary"
                paragraph
              >
                {line}
              </Typography>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
}
