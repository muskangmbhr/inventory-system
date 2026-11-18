
const errorHandler = (err, req, res, next) => {

    console.error(err.message);

    if (err.code === 11000) {
        return res.status(400).json({
            message: "SKU already exists"
        });
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: err.message
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID"
        });
    }

    res.status(500).json({
        message: err.message || "Server Error"
    });
};

module.exports = errorHandler;
