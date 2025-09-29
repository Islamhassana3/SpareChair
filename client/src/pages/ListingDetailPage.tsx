import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const ListingDetailPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Listing Detail Page
        </Typography>
        <Typography variant="body1">
          This page will show detailed information about a specific listing,
          including photos, amenities, host information, reviews, and booking options.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ListingDetailPage;