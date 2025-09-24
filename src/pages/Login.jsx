import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //   const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);

  const handleClick = () => setShow(!show);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    //     setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // setLoading(true);

    //     // try {
    //     //   const response = await fetch("http://localhost:5000/api/login", {
    //     //     method: "POST",
    //     //     headers: { "Content-Type": "application/json" },
    //     //     body: JSON.stringify({ email, password }),
    //     //   });

    //     //   const data = await response.json();

    //     //   if (!response.ok) {
    //     //     setError(data.message || "Login failed.");
    //     //   } else {
    //     //     alert("Login successful!");
    //     //     // You can store token or navigate here
    //     //   }
    //     // } catch (err) {
    //     //   setError("Something went wrong.");
    //     // } finally {
    //     //   setLoading(false);
    //     // }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" sx={{ color: "#103674" }} gutterBottom>
          Login
        </Typography>

        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type={show ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            variant="outlined"
            sx={{
              mt: 1,
              px: 15,
              py: 1,
              border: "2px solid #103674",
            }}
          >
            Login
          </Button>

          <Typography
            variant="h6"
            sx={{ color: "#103674", marginTop: "1rem" }}
            gutterBottom
          >
            Don't have account?
          </Typography>

          <Button
            variant="outlined"
            sx={{
              mt: 1,
              px: 15,
              py: 1,
              border: "2px solid #103674",
            }}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export { Login };
