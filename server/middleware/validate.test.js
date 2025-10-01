const { validate, schemas } = require('./validate');

describe('Validation Middleware', () => {
  describe('Register Schema', () => {
    test('should validate correct registration data', () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
        },
      };
      const res = {};
      const next = jest.fn();

      validate(schemas.register)(req, res, next);
      expect(next).toHaveBeenCalledWith();
    });

    test('should reject invalid email', () => {
      const req = {
        body: {
          email: 'invalid-email',
          password: 'password123',
          name: 'Test User',
        },
      };
      const res = {};
      const next = jest.fn();

      validate(schemas.register)(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    test('should reject short password', () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'short',
          name: 'Test User',
        },
      };
      const res = {};
      const next = jest.fn();

      validate(schemas.register)(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('Listing Schema', () => {
    test('should validate correct listing data', () => {
      const req = {
        body: {
          title: 'Test Listing',
          description: 'This is a test listing with sufficient description length.',
          price: 100,
          address: '123 Test St',
          city: 'Test City',
          category: 'salon',
        },
      };
      const res = {};
      const next = jest.fn();

      validate(schemas.listing)(req, res, next);
      expect(next).toHaveBeenCalledWith();
    });

    test('should reject negative price', () => {
      const req = {
        body: {
          title: 'Test Listing',
          description: 'This is a test listing with sufficient description length.',
          price: -100,
          address: '123 Test St',
          city: 'Test City',
          category: 'salon',
        },
      };
      const res = {};
      const next = jest.fn();

      validate(schemas.listing)(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('Review Schema', () => {
    test('should validate correct review data', () => {
      const req = {
        body: {
          rating: 5,
          comment: 'Great experience, highly recommended!',
        },
      };
      const res = {};
      const next = jest.fn();

      validate(schemas.review)(req, res, next);
      expect(next).toHaveBeenCalledWith();
    });

    test('should reject rating outside valid range', () => {
      const req = {
        body: {
          rating: 6,
          comment: 'Great experience, highly recommended!',
        },
      };
      const res = {};
      const next = jest.fn();

      validate(schemas.review)(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
