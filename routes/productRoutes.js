const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const router = express.Router();
// CREATE PRODUCT
router.post("/", async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
});
// GET ALL PRODUCTS - FILTER, SORT, PAGINATION
router.get("/", async (req, res, next) => {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            sort = "createdAt",
            order = "desc",
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        if (category) {
            filter.category = new RegExp(category, "i");
        }

        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const pageNumber = Math.max(1, Number(page) || 1);
        const limitNumber = Math.min(100, Math.max(1, Number(limit) || 10));
        const sortOrder = order === "asc" ? 1 : -1;

        const total = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .sort({ [sort]: sortOrder })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        res.json({
            total,
            page: pageNumber,
            totalPages: Math.ceil(total / limitNumber),
            count: products.length,
            products
        });

    } catch (error) {
        next(error);
    }
});
// LOW STOCK REPORT
router.get("/low-stock", async (req, res, next) => {
    try {
        const products = await Product.find({
            $expr: {
                $lte: ["$quantity", "$reorderLevel"]
            }
        });

        res.json({
            count: products.length,
            lowStockItems: products
        });

    } catch (error) {
        next(error);
    }
});
// CATEGORY-WISE INVENTORY SUMMARY
router.get("/summary", async (req, res, next) => {
    try {
        const summary = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalItems: { $sum: 1 },
                    totalQuantity: { $sum: "$quantity" },
                    totalStockValue: {
                        $sum: {
                            $multiply: ["$price", "$quantity"]
                        }
                    },
                    avgPrice: { $avg: "$price" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        res.json({
            categories: summary.length,
            summary
        });

    } catch (error) {
        next(error);
    }
});
// GET SINGLE PRODUCT BY ID
router.get("/:id", async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Product ID"
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {
        next(error);
    }
});
// UPDATE PRODUCT DETAILS
router.put("/:id", async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Product ID"
            });
        }

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
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {
        next(error);
    }
});
// DELETE PRODUCT
router.delete("/:id", async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Product ID"
            });
        }

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted",
            id: product._id
        });

    } catch (error) {
        next(error);
    }
});
// STOCK ADJUSTMENT
router.patch("/:id/stock", async (req, res, next) => {
    try {
        const { change } = req.body;

        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Product ID"
            });
        }

        if (!Number.isInteger(change) || change === 0) {
            return res.status(400).json({
                message: "Change must be a non-zero integer"
            });
        }

        const product = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
                quantity: { $gte: Math.max(0, -change) }
            },
            {
                $inc: { quantity: change }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(400).json({
                message: "Product not found or insufficient stock"
            });
        }

        res.json({
            message: "Stock updated",
            product
        });

    } catch (error) {
        next(error);
    }
});
module.exports = router;