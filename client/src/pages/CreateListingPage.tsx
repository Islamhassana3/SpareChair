import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const CreateListingPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          List Your Space
        </Typography>
        <Typography variant="body1">
          This page will contain a comprehensive form for hosts to create new listings,
          including space details, photos, pricing, availability, and amenities.
        </Typography>
      </Paper>
    </Container>
  );
};

export default CreateListingPage;