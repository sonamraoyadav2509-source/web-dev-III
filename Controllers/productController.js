
const Product = require('../models/Product');

// 1. Add New Product
exports.addProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

// 2. Get All Products with Filtering, Sorting and Pagination
exports.getProducts = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 10);
        const skip = (page - 1) * limit;

        const filter = {};

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};

            if (req.query.minPrice) {
                filter.price.$gte = Number(req.query.minPrice);
            }

            if (req.query.maxPrice) {
                filter.price.$lte = Number(req.query.maxPrice);
            }
        }

        if (req.query.search) {
            filter.name = {
                $regex: req.query.search,
                $options: 'i'
            };
        }

        const sortBy = req.query.sortBy || 'createdAt';
        const order = req.query.order === 'asc' ? 1 : -1;

        const allowedSortFields = [
            'name', 'price', 'quantity', 'createdAt'
        ];

        if (!allowedSortFields.includes(sortBy)) {
            return res.status(400).json({
                message: 'Invalid sort field'
            });
        }

        const total = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .sort({ [sortBy]: order })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            count: products.length,
            products
        });
    } catch (error) {
        next(error);
    }
};

// 3. Get Single Product by ID
exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

// 4. Update Product Details
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

// 5. Delete Product
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json({
            message: 'Product deleted',
            id: product._id
        });
    } catch (error) {
        next(error);
    }
};

// 6. Low Stock Alert Report
exports.getLowStock = async (req, res, next) => {
    try {
        const lowStockItems = await Product.find({
            $expr: {
                $lte: ['$quantity', '$reorderLevel']
            }
        });

        res.status(200).json({
            count: lowStockItems.length,
            lowStockItems
        });
    } catch (error) {
        next(error);
    }
};

// 7. Category-wise Inventory Summary
exports.getSummary = async (req, res, next) => {
    try {
        const summary = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    totalItems: { $sum: 1 },
                    totalQuantity: { $sum: '$quantity' },
                    totalStockValue: {
                        $sum: {
                            $multiply: ['$price', '$quantity']
                        }
                    },
                    avgPrice: { $avg: '$price' }
                }
            }
        ]);

        res.status(200).json({
            categories: summary.length,
            summary
        });
    } catch (error) {
        next(error);
    }
};

// 8. Update Product Stock
exports.updateStock = async (req, res, next) => {
    try {
        const change = Number(req.body.change);

        if (!Number.isInteger(change) || change === 0) {
            return res.status(400).json({
                message: 'Change must be a non-zero integer'
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        if (product.quantity + change < 0) {
            return res.status(400).json({
                message: 'Insufficient stock'
            });
        }

        product.quantity += change;
        await product.save();

        res.status(200).json({
            message: 'Stock updated',
            product
        });
    } catch (error) {
        next(error);
    }
};
