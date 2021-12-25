const Router = require("express");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { requireSignin, adminMiddleware } = require("../middlewares");

const router = Router();

// Get all category
router.get("/categories", getCategories);

// Get category by id
router.get("/category/:id", getCategory);

// Post category (require signin, admin)
router.post("/category", requireSignin, adminMiddleware, createCategory);

// Update category (require signin, admin)
router.put("/category/update", requireSignin, adminMiddleware, updateCategory);

// Delete category (require signin, admin)
router.delete("/category/:id", requireSignin, adminMiddleware, deleteCategory);

module.exports = router;
