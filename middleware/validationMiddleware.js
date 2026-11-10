
const validateProduct = (req, res, next) => {
    const { name, sku, category, price, quantity, supplier } = req.body;

    if (!name || !sku || !category || !supplier) {
        return res.status(400).json({
            message: 'Name, SKU, category and supplier are required'
        });
    }

    if (price === undefined || quantity === undefined) {
        return res.status(400).json({
            message: 'Price and quantity are required'
        });
    }

    if (Number(price) < 0 || Number(quantity) < 0 ||
        !Number.isFinite(Number(price)) ||
        !Number.isFinite(Number(quantity))) {
        return res.status(400).json({
            message: 'Price and quantity must be valid non-negative numbers'
        });
    }

    next();
};

module.exports = validateProduct;
