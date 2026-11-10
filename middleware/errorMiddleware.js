
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    // Duplicate SKU error
    if (err.code === 11000) {
        return res.status(400).json({
            message: 'SKU already exists'
        });
    }

    // Invalid MongoDB ID
    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid product ID'
        });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: err.message
        });
    }

    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error'
    });
};

module.exports = errorMiddleware;
