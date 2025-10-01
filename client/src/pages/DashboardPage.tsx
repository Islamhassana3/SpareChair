import React from 'react';
import { Container, Typography, Box, Paper, Grid, Card, CardContent, Avatar, Chip } from '@mui/material';
import { 
  TrendingUp, 
  EventNote, 
  AttachMoney, 
  People,
  CalendarToday,
  Star,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const statsCards = [
    {
      title: 'Total Bookings',
      value: '24',
      change: '+12%',
      icon: EventNote,
      color: '#4F46E5',
      bgColor: '#EEF2FF',
    },
    {
      title: 'Revenue',
      value: '$3,420',
      change: '+8%',
      icon: AttachMoney,
      color: '#10B981',
      bgColor: '#D1FAE5',
    },
    {
      title: 'Active Listings',
      value: '8',
      change: '+2',
      icon: CalendarToday,
      color: '#F59E0B',
      bgColor: '#FEF3C7',
    },
    {
      title: 'Rating',
      value: '4.8',
      change: '★★★★★',
      icon: Star,
      color: '#8B5CF6',
      bgColor: '#EDE9FE',
    },
  ];

  const recentActivities = [
    { action: 'New booking received', time: '2 hours ago', type: 'booking' },
    { action: 'Payment processed', time: '5 hours ago', type: 'payment' },
    { action: 'Review received', time: '1 day ago', type: 'review' },
    { action: 'Listing updated', time: '2 days ago', type: 'listing' },
  ];

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ fontWeight: 700, color: 'text.primary' }}
          >
            Welcome back, {user?.firstName}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your account today
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statsCards.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        backgroundColor: stat.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <stat.icon sx={{ color: stat.color, fontSize: 24 }} />
                    </Box>
                  </Box>
                  <Chip 
                    label={stat.change}
                    size="small"
                    sx={{
                      backgroundColor: '#D1FAE5',
                      color: '#059669',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper 
              sx={{ 
                p: 3,
                border: '1px solid',
                borderColor: 'grey.200',
                mb: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TrendingUp sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Dashboard Overview
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Your personalized dashboard shows key metrics and activities based on your user type:
              </Typography>
              <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                <li>For Guests: Recent bookings, saved listings, recommendations</li>
                <li>For Hosts: Booking requests, earnings, listing performance</li>
                <li>Quick actions and important notifications</li>
              </Box>
            </Paper>

            {/* Recent Activity */}
            <Paper 
              sx={{ 
                p: 3,
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Recent Activity
              </Typography>
              {recentActivities.map((activity, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    py: 2,
                    borderBottom: index < recentActivities.length - 1 ? '1px solid' : 'none',
                    borderColor: 'grey.100',
                  }}
                >
                  <Avatar 
                    sx={{ 
                      mr: 2,
                      width: 40,
                      height: 40,
                      backgroundColor: 'primary.50',
                      color: 'primary.main',
                    }}
                  >
                    <EventNote />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {activity.action}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper 
              sx={{ 
                p: 3,
                border: '1px solid',
                borderColor: 'grey.200',
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Quick Stats
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  User Type
                </Typography>
                <Chip 
                  label={user?.userType || 'GUEST'}
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
              </Box>
              {user?.businessName && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Business
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {user.businessName}
                  </Typography>
                </Box>
              )}
            </Paper>

            <Paper 
              sx={{ 
                p: 3,
                border: '1px solid',
                borderColor: 'grey.200',
                backgroundColor: 'primary.main',
                color: 'white',
              }}
            >
              <People sx={{ fontSize: 40, mb: 2, opacity: 0.9 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Invite Friends
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                Share ChairShare with your network and earn rewards
              </Typography>
              <Box 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 1,
                  px: 2,
                  py: 1.5,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                <Typography variant="button" sx={{ fontWeight: 600 }}>
                  Get Invite Link
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;