const Product = require("../models/product.model");
const model = new Product();

// Get all products
exports.getProducts = (req, res) => {
  model.getProducts((err, data) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Data not received",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

// Get top 4 new products
exports.getNewsProduct = (req, res) => {
  model.getNewsProduct((err, data) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Data not received",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

// Get product details (Consists of request and links Product)
exports.getProduct = (req, res) => {
  model.getProduct(req.params.id, (err, data) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Data not received",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

// Get product by category
exports.getProductByCategory = (req, res) => {
  model.getProductByCategory(req.params.id, (err, product) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Data not received",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Get list product by category successfully",
        product,
      });
    }
  });
};

// Create new product (middleware required signin, admin)
exports.createNewProduct = (req, res) => {
  model.createNewProduct(req.body, req.user.ID_DLer, (err, newProduct) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Add product falure",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Add product successfully",
        newProduct,
      });
    }
  });
};

// Update product (middleware required signin, admin)
exports.updateProduct = (req, res) => {
  model.updateProduct(req.body, (err, product) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(201).json({
        success: true,
        message: "Update product successfully",
        product,
      });
    }
  });
};

// Delete product (middleware required signin, admin)
exports.deleteProduct = (req, res) => {
  model.deleteProduct(req.params.id, (err, data) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(201).json(data);
    }
  });
};
