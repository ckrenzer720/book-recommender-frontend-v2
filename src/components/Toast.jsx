import React, { useEffect } from "react";
import { Box, Typography, Slide } from "@mui/material";
import { CheckCircle, Bookmark } from "@mui/icons-material";

const Toast = ({ message, type = "success", isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle sx={{ color: "white", mr: 1 }} />;
      case "info":
        return <Bookmark sx={{ color: "white", mr: 1 }} />;
      default:
        return <CheckCircle sx={{ color: "white", mr: 1 }} />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#4caf50";
      case "info":
        return "#2196f3";
      default:
        return "#4caf50";
    }
  };

  return (
    <Slide direction="up" in={isVisible} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: getBackgroundColor(),
          color: "white",
          padding: 2,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          zIndex: 9999,
          boxShadow: 3,
          minWidth: 250,
        }}
      >
        {getIcon()}
        <Typography variant="body2">{message}</Typography>
      </Box>
    </Slide>
  );
};

export default Toast;
