import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const BookingsPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Bookings
        </Typography>
        <Typography variant="body1">
          This page will display all user bookings with filtering options:
        </Typography>
        <Box component="ul" sx={{ mt: 2 }}>
          <li>For Guests: All their booking requests and confirmations</li>
          <li>For Hosts: All booking requests for their listings</li>
          <li>Status tracking, cancellation options, and communication tools</li>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookingsPage;
