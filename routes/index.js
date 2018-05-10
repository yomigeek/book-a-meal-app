import express from 'express';
import CustomerController from '../controllers/customerController';
import VendorController from '../controllers/vendorController';
import MealController from '../controllers/mealsController';
import MenuController from '../controllers/menuController';
import OrderController from '../controllers/ordersController';
import verifyToken from '../auth';
import Validate from '../validations/validate';
import CheckRole from '../validations/checkRole';

// Declare a localStorage for storing JWT tokens

const router = express.Router();


// User(Customer) API
router.post('/auth/customer/signup', Validate.userSignUp, CustomerController.createCustomer);
router.post('/auth/customer/login', Validate.userLogin, CustomerController.loginCustomer);

// User(Vendor) API
router.post('/auth/vendor/signup', Validate.userSignUp, VendorController.createVendor);
router.post('/auth/vendor/login', Validate.userLogin, VendorController.loginVendor);

// Meals API Routes
router.get('/api/v1/meals', verifyToken, CheckRole.checkAdmin, MealController.allMeals);
router.post('/api/v1/meals/', verifyToken, CheckRole.checkAdmin, Validate.addMeals, MealController.addAMeal);
router.get('/api/v1/meals/:mealId', verifyToken, CheckRole.checkAdmin, MealController.getMealById);
router.put('/api/v1/meals/:mealId', verifyToken, CheckRole.checkAdmin, MealController.updateAMeal);
router.delete('/api/v1/meals/:mealId', verifyToken, CheckRole.checkAdmin, MealController.deleteMeal);

// Menu API Routes
router.post('/api/v1/menu', verifyToken, CheckRole.checkAdmin, MenuController.addToMenu);
router.get('/api/v1/menu/', verifyToken, MenuController.menuForTheDay);

// Orders API Routes
router.post('/api/v1/orders', verifyToken, Validate.checkTime, Validate.addOrder, OrderController.addOrder);
router.get('/api/v1/orders', verifyToken, CheckRole.checkAdmin, OrderController.allOrders);
router.put('/api/v1/orders/:orderId', verifyToken, Validate.updateOrder, OrderController.updateOrder);


export default router;
