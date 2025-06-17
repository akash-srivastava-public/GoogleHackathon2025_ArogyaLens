import React, { useState } from 'react';
import axios from 'axios';
import {
  Box, Button, Dialog, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableHead, TableRow, Typography
} from '@mui/material';
import { useAuth } from '../auth/AuthContext'; 
import { useNavigate } from 'react-router-dom';

interface AdminProps {
  userData: any;
}

const Admin: React.FC<AdminProps> = ({ userData }) => {
  const [open, setOpen] = useState(false);
  const [jsonData, setJsonData] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleView = (doc: any) => {
    setJsonData(doc);
    setOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (!userData?.userId) {
      alert('User ID missing');
      return;
    }

    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleting(true);
      await axios.delete(`/api/users/${userData.userId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      alert('Account deleted successfully.');
      handleLogout();

    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to delete account';
      alert(`Error deleting account: ${message}`);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Box>
      {/* Personal Details */}
      <Typography variant="h6">Personal Details</Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>{userData?.email || 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>{userData?.userId || 'N/A'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Uploaded Files */}
      <Typography variant="h6" mt={4}>Uploaded Files</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Doc ID</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData?.labReports?.map((entry: any, idx: number) => (
            <TableRow key={entry?._id || idx}>
              <TableCell>{entry?._id || 'None'}</TableCell>
              <TableCell>
                <Button onClick={() => handleView(entry?.data)}>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Account Controls */}
      <Box mt={4}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteAccount}
          disabled={deleting}
        >
          {deleting ? 'Deleting...' : 'Delete My Account'}
        </Button>
        <Button variant="contained" sx={{ ml: 2 }} onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Dialog for JSON View */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Document JSON</DialogTitle>
        <DialogContent>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Admin;
