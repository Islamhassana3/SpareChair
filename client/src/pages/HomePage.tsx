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
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Find Your Perfect Workspace
          </Typography>
          <Typography variant="h5" gutterBottom>
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
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: 'white',
                borderRadius: 1,
              }}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              component={Link}
              to="/listings"
              sx={{ mr: 2 }}
            >
              Explore Spaces
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/register"
              sx={{ color: 'white', borderColor: 'white' }}
            >
              List Your Space
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          How ChairShare Works
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Search sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Search & Discover
              </Typography>
              <Typography color="text.secondary">
                Find the perfect space for your needs. Filter by location, type, 
                amenities, and price to discover your ideal workspace.
              </Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Chair sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Book Instantly
              </Typography>
              <Typography color="text.secondary">
                Reserve your space with just a few clicks. Choose your date, 
                time, and duration. Secure payments and instant confirmation.
              </Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Business sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Work & Earn
              </Typography>
              <Typography color="text.secondary">
                Enjoy professional spaces or earn from your unused capacity. 
                Build your business and connect with the community.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Space Types Section */}
      <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Popular Space Types
          </Typography>
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {[
              { name: 'Salon Chairs', image: '/api/placeholder/300/200', count: '120+ spaces' },
              { name: 'Photography Studios', image: '/api/placeholder/300/200', count: '85+ spaces' },
              { name: 'Massage Therapy Rooms', image: '/api/placeholder/300/200', count: '95+ spaces' },
              { name: 'Coworking Desks', image: '/api/placeholder/300/200', count: '150+ spaces' },
              { name: 'Art Studios', image: '/api/placeholder/300/200', count: '40+ spaces' },
              { name: 'Music Studios', image: '/api/placeholder/300/200', count: '30+ spaces' },
            ].map((space) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={space.name}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={space.image}
                    alt={space.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {space.name}
                    </Typography>
                    <Chip label={space.count} size="small" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h3" component="h2" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Join thousands of professionals finding and sharing spaces
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/register"
            sx={{ mr: 2 }}
          >
            Join as a Guest
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/register"
          >
            Become a Host
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;