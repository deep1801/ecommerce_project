import Product from "../models/Product.js";

// CREATE PRODUCT

export const createProduct = async (req, res) => {
  try {
    // GET DATA FROM BODY

    const { title, description, price, image, category, stock } = req.body;
    console.log("getting", req.body);

    // CREATE PRODUCT

    const product = await Product.create({
      title,
      description,
      price,
      image,
      category,
      stock,
    });

    // RESPONSE

    res.status(201).json({
      success: true,

      message: "Product Created Successfully",

      product,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
export const getProducts = async (req, res) => {
  try {
    // GET ALL PRODUCTS

    const products = await Product.find();

    // RESPONSE

    res.status(200).json({
      success: true,

      count: products.length,

      products,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
export const getSingleProduct = async (req, res) => {
  try {
    // GET PRODUCT ID

    const { id } = req.params;

    // FIND PRODUCT

    const product = await Product.findById(id);

    // CHECK PRODUCT

    if (!product) {
      return res.status(404).json({
        success: false,

        message: "Product Not Found",
      });
    }

    // RESPONSE

    res.status(200).json({
      success: true,

      product,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    // GET PRODUCT ID

    const { id } = req.params;

    // FIND PRODUCT

    const product = await Product.findById(id);

    // CHECK PRODUCT

    if (!product) {
      return res.status(404).json({
        success: false,

        message: "Product Not Found",
      });
    }

    // DELETE PRODUCT

    await product.deleteOne();

    // RESPONSE

    res.status(200).json({
      success: true,

      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
export const updateProduct = async (req, res) => {
  try {
    // GET PRODUCT ID

    const { id } = req.params;

    // FIND PRODUCT

    const product = await Product.findById(id);

    // CHECK PRODUCT

    if (!product) {
      return res.status(404).json({
        success: false,

        message: "Product Not Found",
      });
    }

    // UPDATE PRODUCT

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,

      runValidators: true,
    });

    // RESPONSE

    res.status(200).json({
      success: true,

      message: "Product Updated Successfully",

      updatedProduct,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
export const getDashboardStats = async (req, res) => {
  try {
    // ==========================
    // OVERALL DASHBOARD STATS
    // ==========================
    const stats = await Product.aggregate([
      {
        $group: {
          _id: null,

          totalRevenue: {
            $sum: "$price",
          },

          totalProducts: {
            $sum: 1,
          },

          averagePrice: {
            $avg: "$price",
          },
        },
      },

      {
        $project: {
          _id: 0,

          totalRevenue: 1,

          totalProducts: 1,

          averagePrice: {
            $round: ["$averagePrice", 0],
          },
        },
      },
    ]);

    // ==========================
    // CATEGORY WISE PRODUCTS
    // ==========================
    const categoryStats = await Product.aggregate([
      {
        $group: {
          _id: "$category",

          totalProducts: {
            $sum: 1,
          },

          categoryRevenue: {
            $sum: "$price",
          },
        },
      },

      {
        $sort: {
          categoryRevenue: -1,
        },
      },

      {
        $limit: 3,
      },
    ]);

    // ==========================
    // RESPONSE
    // ==========================

    res.status(200).json({
      success: true,

      stats: stats[0],

      categoryStats,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Dashboard Stats Error",
    });
  }
};
