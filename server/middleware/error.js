const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Resource not found' });
    }
  
    // Mongoose duplicate key
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Duplicate field value entered' });
    }
  
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: messages });
    }
  
    // Default to 500 server error
    res.status(500).json({ message: 'Server Error' });
  };
  
  module.exports = errorHandler;