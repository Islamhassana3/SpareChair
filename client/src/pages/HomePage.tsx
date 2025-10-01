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
  alpha,
} from '@mui/material';
import { Search, Chair, TrendingUp, CheckCircle, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: 'background.default', overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, #6366F1 0%, #8B5CF6 100%)',
          color: 'white',
          py: { xs: 10, md: 16 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -2,
            left: 0,
            right: 0,
            height: '100px',
            background: 'linear-gradient(180deg, transparent 0%, #F8FAFC 100%)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', maxWidth: 900, mx: 'auto' }}>
            {/* Badge */}
            <Box sx={{ mb: 3 }}>
              <Chip
                label="🚀 The Future of Workspace Booking"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  fontWeight: 600,
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  px: 2,
                  py: 2.5,
                  height: 'auto',
                  fontSize: '0.875rem',
                }}
              />
            </Box>

            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4.5rem' },
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Find Your Perfect
              <br />
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #A5B4FC 0%, #C4B5FD 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Workspace
              </Box>
            </Typography>

            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontSize: { xs: '1.125rem', md: '1.375rem' },
                fontWeight: 400,
                opacity: 0.95,
                mb: 5,
                lineHeight: 1.6,
                maxWidth: 700,
                mx: 'auto',
              }}
            >
              Connect with thousands of professional spaces. Book by the hour or day.
              <br />
              From salon chairs to studios — your perfect space awaits.
            </Typography>

            {/* Search Bar */}
            <Box sx={{ mt: 5, maxWidth: 680, mx: 'auto' }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                  backgroundColor: 'white',
                  p: 1.5,
                  borderRadius: 4,
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Search for spaces in your city..."
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: 'text.secondary', fontSize: 24 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'grey.50',
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<Search />}
                  sx={{
                    px: 4,
                    py: 2,
                    minWidth: { xs: '100%', sm: 'auto' },
                    whiteSpace: 'nowrap',
                    fontSize: '1rem',
                    fontWeight: 700,
                  }}
                >
                  Search Now
                </Button>
              </Box>
            </Box>

            {/* Stats */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: { xs: 3, sm: 6 },
                mt: 6,
                flexWrap: 'wrap',
              }}
            >
              {[
                { value: '10,000+', label: 'Active Spaces' },
                { value: '50,000+', label: 'Happy Customers' },
                { value: '4.9/5', label: 'Average Rating' },
              ].map((stat, index) => (
                <Box key={index} sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      mb: 0.5,
                      fontSize: { xs: '1.75rem', md: '2.25rem' },
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.9,
                      fontSize: '0.9375rem',
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 14 } }}>
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Chip
            label="WHY CHOOSE US"
            size="small"
            sx={{
              backgroundColor: alpha('#6366F1', 0.1),
              color: 'primary.main',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              mb: 2,
            }}
          />
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: '2.25rem', md: '3rem' },
              fontWeight: 800,
              color: 'text.primary',
              mb: 2,
            }}
          >
            Everything You Need
            <br />
            In One Platform
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', fontSize: '1.125rem' }}
          >
            The most intuitive way to find, book, and manage professional spaces
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              icon: Search,
              title: 'Smart Discovery',
              description:
                'Advanced filtering and AI-powered recommendations help you find exactly what you need in seconds.',
              color: '#6366F1',
              gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            },
            {
              icon: Chair,
              title: 'Instant Booking',
              description:
                'Book your perfect space with just a few clicks. Secure payments, real-time availability, and instant confirmation.',
              color: '#8B5CF6',
              gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
            },
            {
              icon: TrendingUp,
              title: 'Grow Your Business',
              description:
                "Whether you're booking or hosting, our platform helps you maximize productivity and revenue.",
              color: '#10B981',
              gradient: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
            },
          ].map((feature, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  textAlign: 'center',
                  p: 4,
                  height: '100%',
                  background: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: feature.gradient,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: '20px',
                    background: feature.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    boxShadow: `0 8px 16px -4px ${alpha(feature.color, 0.4)}`,
                  }}
                >
                  <feature.icon sx={{ fontSize: 36, color: 'white' }} />
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1rem' }}>
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Trust Indicators */}
        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontWeight: 600 }}>
            TRUSTED BY LEADING PROFESSIONALS
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            {['Verified Hosts', 'Secure Payments', '24/7 Support', 'Money-Back Guarantee'].map(
              (badge, index) => (
                <Chip
                  key={index}
                  icon={<CheckCircle sx={{ fontSize: 16 }} />}
                  label={badge}
                  sx={{
                    backgroundColor: alpha('#10B981', 0.1),
                    color: 'success.main',
                    fontWeight: 600,
                    py: 2.5,
                    px: 1,
                    fontSize: '0.875rem',
                  }}
                />
              )
            )}
          </Box>
        </Box>
      </Container>

      {/* Space Types Section */}
      <Box sx={{ backgroundColor: alpha('#6366F1', 0.02), py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Chip
              label="EXPLORE CATEGORIES"
              size="small"
              sx={{
                backgroundColor: alpha('#6366F1', 0.1),
                color: 'primary.main',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                mb: 2,
              }}
            />
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontSize: { xs: '2.25rem', md: '3rem' },
                fontWeight: 800,
                color: 'text.primary',
                mb: 2,
              }}
            >
              Popular Space Types
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', fontSize: '1.125rem' }}
            >
              Discover thousands of professional spaces tailored to your needs
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              {
                name: 'Salon Chairs',
                image: '/api/placeholder/400/300',
                count: '120+',
                color: '#EC4899',
              },
              {
                name: 'Photography Studios',
                image: '/api/placeholder/400/300',
                count: '85+',
                color: '#F59E0B',
              },
              {
                name: 'Massage Therapy',
                image: '/api/placeholder/400/300',
                count: '95+',
                color: '#8B5CF6',
              },
              {
                name: 'Coworking Desks',
                image: '/api/placeholder/400/300',
                count: '150+',
                color: '#3B82F6',
              },
              {
                name: 'Art Studios',
                image: '/api/placeholder/400/300',
                count: '40+',
                color: '#10B981',
              },
              {
                name: 'Music Studios',
                image: '/api/placeholder/400/300',
                count: '30+',
                color: '#EF4444',
              },
            ].map((space, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={space.name}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(180deg, transparent 0%, ${alpha(space.color, 0.8)} 100%)`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease-in-out',
                    },
                    '&:hover::after': {
                      opacity: 1,
                    },
                    '&:hover .space-content': {
                      transform: 'translateY(-8px)',
                      color: 'white',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden', height: 240 }}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={space.image}
                      alt={space.name}
                      sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease-in-out',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        backgroundColor: 'white',
                        borderRadius: 2,
                        px: 2,
                        py: 0.75,
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: space.color,
                        }}
                      >
                        {space.count} spaces
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent
                    className="space-content"
                    sx={{
                      p: 3,
                      position: 'relative',
                      zIndex: 2,
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                      }}
                    >
                      {space.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        View spaces
                      </Typography>
                      <ArrowForward sx={{ fontSize: 16, color: 'text.secondary' }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 14 } }}>
        <Box
          sx={{
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            borderRadius: 6,
            p: { xs: 6, md: 10 },
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.4) 0%, transparent 50%)',
            },
          }}
        >
          <Box
            sx={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 700, mx: 'auto' }}
          >
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 800,
                color: 'white',
                mb: 2,
              }}
            >
              Ready to Transform Your
              <br />
              Workspace Experience?
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                opacity: 0.95,
                fontWeight: 400,
                mb: 5,
                color: 'white',
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                lineHeight: 1.7,
              }}
            >
              Join thousands of professionals and businesses who trust ChairShare for their
              workspace needs
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/register"
                endIcon={<ArrowForward />}
                sx={{
                  px: 5,
                  py: 2,
                  backgroundColor: 'white',
                  color: 'primary.main',
                  fontSize: '1.0625rem',
                  fontWeight: 700,
                  '&:hover': {
                    backgroundColor: 'grey.100',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Get Started Free
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/listings"
                sx={{
                  px: 5,
                  py: 2,
                  color: 'white',
                  borderColor: 'white',
                  borderWidth: 2,
                  fontSize: '1.0625rem',
                  fontWeight: 700,
                  '&:hover': {
                    borderColor: 'white',
                    borderWidth: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Browse Spaces
              </Button>
            </Box>
            <Typography
              variant="body2"
              sx={{
                mt: 4,
                color: 'white',
                opacity: 0.8,
                fontSize: '0.9375rem',
              }}
            >
              No credit card required • Get started in minutes
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
