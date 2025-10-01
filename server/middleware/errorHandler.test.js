const { AppError, errorHandler } = require('./errorHandler');
const logger = require('../config/logger');

// Mock the logger
jest.mock('../config/logger', () => ({
  error: jest.fn(),
}));

describe('AppError', () => {
  test('should create an AppError with correct properties', () => {
    const error = new AppError('Test error', 400);
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(400);
    expect(error.status).toBe('fail');
    expect(error.isOperational).toBe(true);
  });

  test('should set status to "error" for 500-level errors', () => {
    const error = new AppError('Server error', 500);
    expect(error.status).toBe('error');
  });
});

describe('errorHandler', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      url: '/test',
      method: 'GET',
      ip: '127.0.0.1',
      user: null,
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    logger.error.mockClear();
  });

  test('should log error details', () => {
    const error = new AppError('Test error', 400);
    errorHandler(error, mockReq, mockRes, mockNext);

    expect(logger.error).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Test error',
        statusCode: 400,
        url: '/test',
        method: 'GET',
      })
    );
  });

  test('should return operational error in production', () => {
    process.env.NODE_ENV = 'production';
    const error = new AppError('Test error', 400);
    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'Test error',
    });
  });

  test('should return generic error for non-operational errors in production', () => {
    process.env.NODE_ENV = 'production';
    const error = new Error('Unknown error');
    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Something went wrong',
    });
  });

  test('should return detailed error in development', () => {
    process.env.NODE_ENV = 'development';
    const error = new AppError('Test error', 400);
    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'fail',
        message: 'Test error',
        stack: expect.any(String),
      })
    );
  });
});
