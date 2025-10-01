import React from 'react';
import { Container, Typography, Box, Paper, Grid, Avatar, Chip } from '@mui/material';
import { Person, Business, Verified, Payment, PhotoCamera } from '@mui/icons-material';

const ProfilePage: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: 'calc(100vh - 64px)', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ fontWeight: 700, color: 'text.primary' }}
          >
            Profile Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your account information and preferences
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Profile Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper 
              sx={{ 
                p: 3,
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    width: 120, 
                    height: 120,
                    mx: 'auto',
                    backgroundColor: 'primary.main',
                    fontSize: '3rem',
                  }}
                >
                  J
                </Avatar>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'primary.50',
                    },
                  }}
                >
                  <PhotoCamera sx={{ fontSize: 20, color: 'primary.main' }} />
                </Box>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                John Doe
              </Typography>
              <Chip 
                label="GUEST"
                size="small"
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  fontWeight: 600,
                  mb: 2,
                }}
              />
              <Typography variant="body2" color="text.secondary">
                Member since Jan 2024
              </Typography>
            </Paper>
          </Grid>

          {/* Settings Sections */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Personal Information */}
              <Paper 
                sx={{ 
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.200',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Person sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Personal Information
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Edit your personal details including name, email, phone number, and contact preferences.
                </Typography>
              </Paper>

              {/* Business Details */}
              <Paper 
                sx={{ 
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.200',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Business sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Business Details
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  For hosts: Manage your business name, description, and professional information.
                </Typography>
              </Paper>

              {/* Verification */}
              <Paper 
                sx={{ 
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.200',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Verified sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    ID Verification
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Upload your ID documents for verification to increase trust and unlock additional features.
                </Typography>
              </Paper>

              {/* Payment Methods */}
              <Paper 
                sx={{ 
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.200',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Payment sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Payment Methods
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Manage your payment methods, billing information, and payout preferences.
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;