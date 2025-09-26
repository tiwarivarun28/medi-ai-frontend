import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function Signup({ open, onClose }) {
  const [show, setShow] = useState(true);

  const handleClick = () => setShow(!show);
  return (
    <Box sx={{ mt: 4 }}>
      <Modal
        open={open}
        onClose={onclose}
        aria-labelledby="signup-modal-title"
        aria-describedby="signup-modal-description"
      >
        <Box sx={modalStyle}>
          {/* X Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "grey.500",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="signup-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Create an Account
          </Typography>

          {/* Signup Form */}
          <Stack spacing={2}>
            <TextField label="Name" fullWidth />
            <TextField label="Email" fullWidth />
            <TextField label="Phone Number" fullWidth type="number" />
            <TextField
              fullWidth
              label="Password"
              type={show ? "text" : "password"}
              variant="outlined"
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      // variant="contained"
                      size="small"
                      onClick={handleClick}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" color="primary" onClick={onClose}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}
export { Signup };
