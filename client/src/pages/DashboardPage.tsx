import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user?.firstName}!
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Dashboard Overview
            </Typography>
            <Typography variant="body1">
              This dashboard will show personalized content based on user type:
            </Typography>
            <Box component="ul" sx={{ mt: 2 }}>
              <li>For Guests: Recent bookings, saved listings, recommendations</li>
              <li>For Hosts: Booking requests, earnings, listing performance</li>
              <li>Quick actions and important notifications</li>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            <Typography variant="body2">
              User Type: {user?.userType}
            </Typography>
            {user?.businessName && (
              <Typography variant="body2">
                Business: {user.businessName}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;