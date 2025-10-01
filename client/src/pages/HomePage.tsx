import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search, Chair, Business } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                mb: 2,
              }}
            >
              Find Your Perfect Workspace
            </Typography>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                fontWeight: 400,
                opacity: 0.95,
                mb: 4,
              }}
            >
              Book professional spaces by the hour or day. From salon chairs to studios, 
              find the perfect space for your business needs.
            </Typography>
            <Box sx={{ mt: 4, maxWidth: 600, mx: 'auto' }}>
              <TextField
                fullWidth
                placeholder="Search for spaces in your city..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: 'transparent',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Box>
            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/listings"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                }}
              >
                Explore Spaces
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/register"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                List Your Space
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              color: 'text.primary',
            }}
          >
            How ChairShare Works
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', fontSize: '1.1rem' }}
          >
            Simple, fast, and secure way to find or list professional spaces
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card 
              sx={{ 
                textAlign: 'center', 
                p: 4,
                height: '100%',
                border: '1px solid',
                borderColor: 'grey.200',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: 'primary.50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <Search sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Search & Discover
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                Find the perfect space for your needs. Filter by location, type, 
                amenities, and price to discover your ideal workspace.
              </Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card 
              sx={{ 
                textAlign: 'center', 
                p: 4,
                height: '100%',
                border: '1px solid',
                borderColor: 'grey.200',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: 'secondary.50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <Chair sx={{ fontSize: 40, color: 'secondary.main' }} />
              </Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Book Instantly
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                Reserve your space with just a few clicks. Choose your date, 
                time, and duration. Secure payments and instant confirmation.
              </Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card 
              sx={{ 
                textAlign: 'center', 
                p: 4,
                height: '100%',
                border: '1px solid',
                borderColor: 'grey.200',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: 'primary.50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <Business sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Work & Earn
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                Enjoy professional spaces or earn from your unused capacity. 
                Build your business and connect with the community.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Space Types Section */}
      <Box sx={{ backgroundColor: 'grey.50', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                color: 'text.primary',
              }}
            >
              Popular Space Types
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', fontSize: '1.1rem' }}
            >
              Explore hundreds of professional spaces available in your area
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {[
              { name: 'Salon Chairs', image: '/api/placeholder/300/200', count: '120+ spaces' },
              { name: 'Photography Studios', image: '/api/placeholder/300/200', count: '85+ spaces' },
              { name: 'Massage Therapy Rooms', image: '/api/placeholder/300/200', count: '95+ spaces' },
              { name: 'Coworking Desks', image: '/api/placeholder/300/200', count: '150+ spaces' },
              { name: 'Art Studios', image: '/api/placeholder/300/200', count: '40+ spaces' },
              { name: 'Music Studios', image: '/api/placeholder/300/200', count: '30+ spaces' },
            ].map((space) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={space.name}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: 'grey.200',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={space.image}
                    alt={space.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {space.name}
                    </Typography>
                    <Chip 
                      label={space.count} 
                      size="small"
                      sx={{
                        backgroundColor: 'primary.50',
                        color: 'primary.main',
                        fontWeight: 600,
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Box 
          sx={{ 
            textAlign: 'center',
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: 3,
            p: { xs: 4, md: 6 },
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          }}
        >
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 700,
            }}
          >
            Ready to Get Started?
          </Typography>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              opacity: 0.9,
              fontWeight: 400,
              mb: 4,
            }}
          >
            Join thousands of professionals finding and sharing spaces
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/register"
              sx={{ 
                px: 4,
                py: 1.5,
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'grey.100',
                },
              }}
            >
              Join as a Guest
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/register"
              sx={{ 
                px: 4,
                py: 1.5,
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Become a Host
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;