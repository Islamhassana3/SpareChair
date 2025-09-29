import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const ProfilePage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile Settings
        </Typography>
        <Typography variant="body1">
          This page will contain user profile management features:
        </Typography>
        <Box component="ul" sx={{ mt: 2 }}>
          <li>Personal information editing</li>
          <li>Business details for hosts</li>
          <li>Avatar upload</li>
          <li>ID verification status and upload</li>
          <li>Payment methods and preferences</li>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;