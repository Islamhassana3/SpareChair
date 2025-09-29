import React, { useEffect, useState, useCallback } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Chip,
  Box,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
  Pagination,
} from '@mui/material';
import { Search, LocationOn } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { listingService } from '../services/listings';
import { Listing } from '../types';

const ListingsPage: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    businessType: '',
    spaceType: '',
    minPrice: '',
    maxPrice: '',
  });

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 12,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== '')),
      };
      const response = await listingService.getListings(params);
      setListings(response.listings);
      setTotalPages(response.pagination.pages);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchListings();
  }, [page, fetchListings]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters({ ...filters, [name]: value });
    setPage(1);
  };

  const handleSearch = () => {
    fetchListings();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              placeholder="Search spaces..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 } }>
            <TextField
              fullWidth
              placeholder="City"
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 } }>
            <TextField
              fullWidth
              select
              label="Business Type"
              value={filters.businessType}
              onChange={(e) => handleFilterChange('businessType', e.target.value)}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="SALON">Salon</MenuItem>
              <MenuItem value="BARBERSHOP">Barbershop</MenuItem>
              <MenuItem value="SPA">Spa</MenuItem>
              <MenuItem value="PHOTOGRAPHY_STUDIO">Photography Studio</MenuItem>
              <MenuItem value="MUSIC_STUDIO">Music Studio</MenuItem>
              <MenuItem value="COWORKING_SPACE">Coworking Space</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 2 } }>
            <TextField
              fullWidth
              select
              label="Space Type"
              value={filters.spaceType}
              onChange={(e) => handleFilterChange('spaceType', e.target.value)}
            >
              <MenuItem value="">All Spaces</MenuItem>
              <MenuItem value="CHAIR">Chair</MenuItem>
              <MenuItem value="ROOM">Room</MenuItem>
              <MenuItem value="STATION">Station</MenuItem>
              <MenuItem value="DESK">Desk</MenuItem>
              <MenuItem value="STUDIO">Studio</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 2 } }>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearch}
              sx={{ height: '56px' }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Results */}
      <Typography variant="h4" gutterBottom>
        Available Spaces
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {listings.map((listing) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={listing.id}>
                <Card
                  component={Link}
                  to={`/listings/${listing.id}`}
                  sx={{
                    height: '100%',
                    textDecoration: 'none',
                    '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={listing.images[0] || '/api/placeholder/300/200'}
                    alt={listing.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom noWrap>
                      {listing.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 } }>
                      <LocationOn sx={{ mr: 0.5, fontSize: 16 }} />
                      <Typography variant="body2" color="text.secondary">
                        {listing.city}, {listing.state}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' } }>
                      <Chip
                        label={listing.businessType.replace(/_/g, ' ')}
                        size="small"
                        color="primary"
                      />
                      <Chip
                        label={listing.spaceType}
                        size="small"
                        variant="outlined"
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 } }>
                      <Rating
                        value={listing.averageRating || 0}
                        readOnly
                        size="small"
                        precision={0.1}
                      />
                      <Typography variant="body2" sx={{ ml: 1 } }>
                        ({listing.reviewCount || 0})
                      </Typography>
                    </Box>

                    <Typography variant="h6" color="primary">
                      ${listing.pricePerHour}/hour
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 } }>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, newPage) => setPage(newPage)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default ListingsPage;