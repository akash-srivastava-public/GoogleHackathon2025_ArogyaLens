import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const baseURL = "http://localhost:8000/api/v1/user";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [passcode, setPasscode] = useState("");
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Ref to store timeout ID for cleanup
  const copyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleRegister = async () => {
    if (!email.trim() || !passcode.trim()) {
      setErrorMsg("Email and Passcode are required.");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    try {
      const res:any = await axios.post(`${baseURL}/register`, { email, passcode });
      const newUserId = res.data.userId;
      setSnackbarMsg(newUserId);
      setUserId(newUserId);
      setShowSnackbar(true);
      setIsRegister(false);
      setEmail("");
      setPasscode("");
    } catch (e: any) {
      setErrorMsg(
        e.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!userId.trim() || !passcode.trim()) {
      setErrorMsg("User ID and Passcode are required.");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    try {
      const res:any = await axios.post(`${baseURL}/login`, { userId, passcode });
      setToken(res.data.token);
      navigate("/");
    } catch (e: any) {
      setErrorMsg(e.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!userId) return;
    try {
      await navigator.clipboard.writeText(userId);
      setCopied(true);
      copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setErrorMsg("Failed to copy User ID");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          {isRegister ? "Register" : "Login"}
        </Typography>

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        {isRegister ? (
          <>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              type="email"
            />
            <TextField
              label="Passcode"
              fullWidth
              type="password"
              margin="normal"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              disabled={loading}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <Link component="button" onClick={() => setIsRegister(false)}>
                Login here
              </Link>
            </Typography>
          </>
        ) : (
          <>
            <TextField
              label="User ID"
              fullWidth
              margin="normal"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              disabled={loading}
            />
            <TextField
              label="Passcode"
              fullWidth
              type="password"
              margin="normal"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              disabled={loading}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don’t have an account?{" "}
              <Link component="button" onClick={() => setIsRegister(true)}>
                Register here
              </Link>
            </Typography>
          </>
        )}
      </Box>

      {/* Snackbar for successful registration */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={10000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%", display: "flex", alignItems: "center" }}
          action={
            <Tooltip title="Copy User ID">
              <IconButton
                color="inherit"
                size="small"
                onClick={handleCopy}
                aria-label="copy user ID"
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          }
        >
          Registration successful! Your User ID: {snackbarMsg}
        </Alert>
      </Snackbar>

      {/* Snackbar for copy feedback */}
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          User ID copied to clipboard
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
