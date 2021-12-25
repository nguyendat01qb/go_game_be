const Category = require("../models/category.model");
const model = new Category();

// Get all category
exports.getCategories = (req, res) => {
  model.getCategories((err, data) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "No data available",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

// Get category by id
exports.getCategory = (req, res) => {
  model.getCategory(req.params.id, (err, data) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "No data available",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

// Post category (require signin, admin)
exports.createCategory = (req, res) => {
  model.createCategory(req.body, (err, data) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Create category falure",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

// Update category (require signin, admin)
exports.updateCategory = async (req, res) => {
  model.updateCategory(req.body, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Update category falure",
      });
    } else {
      return res.status(201).json(data);
    }
  });
};

// Delete category (require signin, admin)
exports.deleteCategory = async (req, res) => {
  model.deleteCategory(req.params.id, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Delete category falure",
      });
    } else {
      return res
        .status(201)
        .json({ success: true, message: "Deleted category successfully" });
    }
  });
};
