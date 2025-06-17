import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import { CloudUpload } from '@mui/icons-material';

const baseURL = 'http://localhost:8000/api/v1/user';

interface ArogyaLensProps {
  userId: string;
  aiData: any[];
  refreshUserData: () => void;
}

const ArogyaLens: React.FC<ArogyaLensProps> = ({ userId, aiData, refreshUserData }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          setFileContent(json);
        } catch (err) {
          console.error('Invalid JSON file:', err);
          setFileContent(null);
          setSelectedFile(null);
          alert('Invalid JSON file. Please upload a valid JSON.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUpload = async () => {
    if (!fileContent) return;
    setLoading(true);
    try {
      await axios.post(`${baseURL}/lab`, { userId, data: fileContent });
      refreshUserData();
      setSelectedFile(null);
      setFileContent(null);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setLoading(true);
    try {
      await axios.post(`${baseURL}/ai`, { userId });
      refreshUserData();
    } catch (error) {
      console.error('AI regeneration error:', error);
      alert('AI regeneration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={{ xs: 2, sm: 4 }}
      sx={{
        maxWidth: 900,
        margin: 'auto',
      }}
    >
      <Paper elevation={6} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
        <Typography
          variant={isSmUp ? 'h4' : 'h5'}
          gutterBottom
          fontWeight="bold"
          textAlign="center"
          mb={4}
          color="primary.main"
        >
          Arogya Lens Report Panel
        </Typography>

        {/* Upload Area */}
        <Box
          onClick={() => document.getElementById('fileInput')?.click()}
          sx={{
            border: '3px dashed',
            borderColor: 'primary.main',
            borderRadius: 4,
            p: 5,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            '&:hover': { bgcolor: 'primary.light', opacity: 0.85 },
            userSelect: 'none',
            mb: 4,
          }}
        >
          <CloudUpload sx={{ fontSize: 60, color: 'primary.main', mb: 1 }} />
          <Typography variant="h6" color={selectedFile ? 'text.primary' : 'text.secondary'}>
            {selectedFile ? selectedFile.name : 'Click or drag file to upload JSON'}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Only JSON files supported.
          </Typography>
        </Box>

        <input
          id="fileInput"
          type="file"
          accept="application/json"
          hidden
          onChange={handleFileChange}
          disabled={loading}
        />

        {/* Buttons with flexbox */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mb: 4,
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={!fileContent || loading}
            onClick={handleUpload}
            fullWidth
            size="large"
            startIcon={loading && <CircularProgress size={22} color="inherit" />}
            sx={{ flex: { sm: '0 0 48%' } }}
          >
            Upload Lab Report
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleRegenerate}
            disabled={loading}
            fullWidth
            size="large"
            startIcon={loading && <CircularProgress size={22} color="inherit" />}
            sx={{ flex: { sm: '0 0 48%' } }}
          >
            Regenerate AI Report
          </Button>
        </Box>

        {/* AI Report Table */}
        <Box sx={{ overflowX: 'auto' }}>
          <Typography
            variant={isSmUp ? 'h5' : 'h6'}
            gutterBottom
            fontWeight="medium"
            mb={2}
            color="primary.dark"
          >
            AI Report
          </Typography>

          {aiData?.length > 0 ? (
            <Table
              sx={{
                minWidth: 650,
                '& th': { backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText },
              }}
              size={isSmUp ? 'medium' : 'small'}
            >
              <TableHead>
                <TableRow>
                  <TableCell><b>Disease</b></TableCell>
                  <TableCell><b>Risk Level</b></TableCell>
                  <TableCell><b>Description</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {aiData.map((item, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 'bold' }}>{item.disease}</TableCell>
                    <TableCell>{item['risk level']}</TableCell>
                    <TableCell sx={{ whiteSpace: 'normal', maxWidth: 350 }}>{item.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
              No AI report available. Please upload a lab report.
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ArogyaLens;
