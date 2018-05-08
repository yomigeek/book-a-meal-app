import express from 'express';
// import { LocalStorage } from 'node-localstorage';
import { allMeals, getMealById, addAMeal, updateAMeal, deleteMeal } from '../controllers/mealsController';
import { allMenu, menuForTheDay, addToMenu } from '../controllers/menuController';
import { allOrders, updateOrder, addOrder } from '../controllers/ordersController';
import CustomerController from '../controllers/customerController';
import VendorController from '../controllers/vendorController';
import verifyToken from '../auth';
import Validate from '../validations/validate';

// Declare a localStorage for storing JWT tokens

const router = express.Router();


// User(Customer) API
router.post('/auth/customer/signup', Validate.userSignUp, CustomerController.createCustomer);
router.post('/auth/customer/login', Validate.userLogin, CustomerController.loginCustomer);

// User(Vendor) API
router.post('/auth/vendor/signup', Validate.userSignUp, VendorController.createVendor);
router.post('/auth/vendor/login', Validate.userLogin, VendorController.loginVendor);

// Meals API Routes
router.get('/api/v1/meals', allMeals);
router.get('/api/v1/meals/:mealId', getMealById);
router.post('/api/v1/meals/', verifyToken, addAMeal);
router.put('/api/v1/meals/:mealId', verifyToken, updateAMeal);
router.delete('/api/v1/meals/:mealId', verifyToken, deleteMeal);

// Menu API Routes
router.get('/api/v1/menu', verifyToken, allMenu);
router.get('/api/v1/menu/:id', verifyToken, menuForTheDay);
router.post('/api/v1/menu', verifyToken, addToMenu);

// Orders API Routes
router.get('/api/v1/orders', verifyToken, allOrders);
router.put('/api/v1/orders/:orderId', verifyToken, updateOrder);
router.post('/api/v1/orders', verifyToken, addOrder);


export default router;
