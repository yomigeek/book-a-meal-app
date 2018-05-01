const express = require('express');

const router = express.Router();

const mealsController = require('../controllers/mealsController');
const menuController = require('../controllers/menuController');
const ordersController = require('../controllers/ordersController');
const vendorController = require('../controllers/vendorController');
const customerController = require('../controllers/customerController');

// Meals API Routes
router.get('/api/v1/meals', mealsController.allMeals);
router.get('/api/v1/meals/:mealId', mealsController.getMealById);
router.post('/api/v1/meals/', mealsController.addAMeal);
router.put('/api/v1/meals/:mealId', mealsController.updateAMeal);
router.delete('/api/v1/meals/:mealId', mealsController.deleteMeal);

// Menu API Routes
router.get('/api/v1/menu', menuController.allMenu);
router.get('/api/v1/menu/:id', menuController.menuForTheDay);
router.post('/api/v1/menu', menuController.addToMenu);

// Orders API Routes
router.get('/api/v1/orders', ordersController.allOrders);
router.put('/api/v1/orders/:orderId', ordersController.updateOrder);
router.post('/api/v1/orders', ordersController.addOrder);

// User(Vendor) API
router.post('/api/v1/vendor', vendorController.createVendor);
router.post('/api/v1/vendor/login', vendorController.loginVendor);


// User(Customer) API
router.post('/api/v1/customer', customerController.createCustomer);
router.post('/api/v1/customer/login', customerController.loginCustomer);


module.exports = router;
