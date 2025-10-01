import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  LinearProgress,
  alpha,
} from '@mui/material';
import {
  EventNote,
  AttachMoney,
  CalendarToday,
  Star,
  ArrowUpward,
  ArrowDownward,
  FiberManualRecord,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const statsCards = [
    {
      title: 'Total Revenue',
      value: '$12,426',
      change: '+18.2%',
      trend: 'up',
      icon: AttachMoney,
      color: '#6366F1',
      bgColor: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    },
    {
      title: 'Total Bookings',
      value: '142',
      change: '+12.5%',
      trend: 'up',
      icon: EventNote,
      color: '#8B5CF6',
      bgColor: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    },
    {
      title: 'Active Listings',
      value: '24',
      change: '+4',
      trend: 'up',
      icon: CalendarToday,
      color: '#10B981',
      bgColor: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
    },
    {
      title: 'Avg. Rating',
      value: '4.9',
      change: '+0.3',
      trend: 'up',
      icon: Star,
      color: '#F59E0B',
      bgColor: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
    },
  ];

  const recentBookings = [
    {
      title: 'Salon Chair - Downtown',
      date: 'Today, 10:00 AM',
      status: 'confirmed',
      amount: '$85',
    },
    { title: 'Photography Studio', date: 'Tomorrow, 2:00 PM', status: 'pending', amount: '$150' },
    { title: 'Coworking Desk', date: 'Dec 28, 9:00 AM', status: 'confirmed', amount: '$45' },
    { title: 'Music Studio Pro', date: 'Dec 30, 3:00 PM', status: 'confirmed', amount: '$120' },
  ];

  const performanceData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 72 },
    { month: 'Mar', value: 78 },
    { month: 'Apr', value: 85 },
    { month: 'May', value: 92 },
    { month: 'Jun', value: 88 },
  ];

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: 'calc(100vh - 72px)' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}
          >
            Welcome back, {user?.firstName || 'User'}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.0625rem' }}>
            Here's what's happening with your workspace today
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statsCards.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
              <Card
                sx={{
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
                    background: stat.bgColor,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 3,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ fontWeight: 600, fontSize: '0.8125rem' }}
                      >
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2.5,
                        background: stat.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 4px 12px ${alpha(stat.color, 0.3)}`,
                      }}
                    >
                      <stat.icon sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {stat.trend === 'up' ? (
                      <ArrowUpward sx={{ fontSize: 16, color: 'success.main' }} />
                    ) : (
                      <ArrowDownward sx={{ fontSize: 16, color: 'error.main' }} />
                    )}
                    <Typography
                      variant="body2"
                      sx={{
                        color: stat.trend === 'up' ? 'success.main' : 'error.main',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                      }}
                    >
                      {stat.change}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: '0.875rem' }}
                    >
                      vs last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid size={{ xs: 12, lg: 8 }}>
            {/* Performance Chart */}
            <Paper
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 4,
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Performance Overview
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your booking trends over the last 6 months
                  </Typography>
                </Box>
                <Chip
                  label="Last 6 Months"
                  size="small"
                  sx={{
                    fontWeight: 600,
                    backgroundColor: alpha('#6366F1', 0.1),
                    color: 'primary.main',
                  }}
                />
              </Box>

              {/* Simple Bar Chart Representation */}
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 200 }}>
                {performanceData.map((data, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: `${data.value}%`,
                        background:
                          index === performanceData.length - 1
                            ? 'linear-gradient(180deg, #6366F1 0%, #8B5CF6 100%)'
                            : alpha('#6366F1', 0.3),
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(180deg, #6366F1 0%, #8B5CF6 100%)',
                          transform: 'scaleY(1.05)',
                        },
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {data.month}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>

            {/* Recent Bookings */}
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Recent Bookings
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  View All
                </Typography>
              </Box>
              {recentBookings.map((booking, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 2.5,
                    borderBottom: index < recentBookings.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                    '&:hover': {
                      backgroundColor: alpha('#6366F1', 0.02),
                      mx: -2,
                      px: 2,
                      borderRadius: 2,
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      mr: 2,
                      width: 48,
                      height: 48,
                      background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                    }}
                  >
                    <EventNote />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {booking.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: '0.875rem' }}
                    >
                      {booking.date}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right', mr: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {booking.amount}
                    </Typography>
                    <Chip
                      label={booking.status}
                      size="small"
                      sx={{
                        backgroundColor:
                          booking.status === 'confirmed'
                            ? alpha('#10B981', 0.1)
                            : alpha('#F59E0B', 0.1),
                        color: booking.status === 'confirmed' ? 'success.main' : 'warning.main',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        height: 24,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, lg: 4 }}>
            {/* Profile Card */}
            <Paper
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                color: 'white',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    mr: 2,
                    backgroundColor: 'white',
                    color: 'primary.main',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                  }}
                >
                  {user?.firstName?.charAt(0) || 'U'}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {user?.firstName || 'User'} {user?.lastName || ''}
                  </Typography>
                  <Chip
                    label={user?.userType || 'GUEST'}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    142
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.8125rem' }}>
                    Bookings
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    4.9
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.8125rem' }}>
                    Rating
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    24
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.8125rem' }}>
                    Listings
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Quick Actions */}
            <Paper
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Quick Actions
              </Typography>
              {[
                { label: 'Create New Listing', color: '#6366F1' },
                { label: 'View Calendar', color: '#8B5CF6' },
                { label: 'Manage Bookings', color: '#10B981' },
              ].map((action, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    mb: 1.5,
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: action.color,
                      backgroundColor: alpha(action.color, 0.04),
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FiberManualRecord sx={{ fontSize: 12, color: action.color, mr: 1.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {action.label}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Paper>

            {/* Activity Progress */}
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                This Month's Goal
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Booking Target
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    32 / 40
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={80}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: alpha('#6366F1', 0.1),
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)',
                    },
                  }}
                />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Revenue Target
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    $12.4k / $15k
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={83}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: alpha('#10B981', 0.1),
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      background: 'linear-gradient(90deg, #10B981 0%, #3B82F6 100%)',
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;
