import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} from "../controller/productController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

// GET ALL PRODUCTS
router.route("/products").get(getAllProducts);

// CREATE PRODUCT --- ADMIN
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

// UPDATE INDIVIDUAL PRODUCT THROUGH id --- ADMIN
// & ALSO DELETE INDIVIDUAL PRODUCT THROUGH id --- ADMIN
// & ASLO GET PRODUCT DETAILS THROUGH id
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
// GET PRODUCT DETAILS
router.route("/product/:id").get(getProductDetails);

// PUT CREATE PRODUCT REVIEW
router.route("/review").put(isAuthenticatedUser, createProductReview);

// GET ALL REVIEWS OF A PRODUCT
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

export default router;
