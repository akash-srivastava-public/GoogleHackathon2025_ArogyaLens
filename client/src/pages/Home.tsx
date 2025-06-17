import React, { useEffect, useState } from 'react';
import { Box, Container, Tabs, Tab } from '@mui/material';
import Admin from '../components/Admin';
import ArogyaLens from '../components/ArogyaLens';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

const baseURL = "http://localhost:8000/api/v1/user";

const Home: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [userData, setUserData] = useState<any>(null);

  const { userId } = useAuth();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${baseURL}/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Container>
      <Tabs value={tabIndex} onChange={(_e, val) => setTabIndex(val)}>
        <Tab label="Admin" />
        <Tab label="Generation" />
      </Tabs>
      <Box mt={2}>
        {tabIndex === 0 && <Admin userData={userData} />}
        {tabIndex === 1 && (
          <ArogyaLens
            userId={userId+""}
            aiData={userData?.aiReports[0]?.data?.value || []}
            refreshUserData={fetchUserData}
          />
        )}
      </Box>
    </Container>
  );
};

export default Home;