import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link as MuiLink,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const businessTypes = [
  'SALON',
  'BARBERSHOP',
  'SPA',
  'MASSAGE_THERAPY',
  'NAIL_SALON',
  'TATTOO_PARLOR',
  'PHOTOGRAPHY_STUDIO',
  'MUSIC_STUDIO',
  'ART_STUDIO',
  'DANCE_STUDIO',
  'FITNESS_STUDIO',
  'COWORKING_SPACE',
  'MEDICAL_OFFICE',
  'THERAPY_OFFICE',
  'OTHER',
];

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    userType: 'GUEST' as 'GUEST' | 'HOST',
    businessName: '',
    businessType: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const registerData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        userType: formData.userType,
        ...(formData.userType === 'HOST' && {
          businessName: formData.businessName,
          businessType: formData.businessType,
        }),
      };

      await register(registerData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          Join ChairShare
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" gutterBottom>
          Create your account to start booking or hosting spaces
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Box>

          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Box>

          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">I want to:</FormLabel>
            <RadioGroup
              row
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <FormControlLabel value="GUEST" control={<Radio />} label="Find Spaces (Guest)" />
              <FormControlLabel value="HOST" control={<Radio />} label="List My Spaces (Host)" />
            </RadioGroup>
          </FormControl>

          {formData.userType === 'HOST' && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                select
                label="Business Type"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                margin="normal"
                required
              >
                {businessTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.replace(/_/g, ' ')}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </Box>

        <Box textAlign="center">
          <Typography variant="body2">
            Already have an account?{' '}
            <MuiLink component={Link} to="/login">
              Sign in here
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;