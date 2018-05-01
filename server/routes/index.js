const express = require('express');

const router = express.Router();

const mealsController = require('../controllers/mealsController');
const menuController = require('../controllers/menuController');
const ordersController = require('../controllers/ordersController');
// Meals API Routes
router.get('/api/v1/meals', mealsController.allMeals);
router.get('/api/v1/meals/:mealId', mealsController.getMealById);
router.post('/api/v1/meals/', mealsController.addAMeal);
router.put('/api/v1/meals/:mealId', mealsController.updateAMeal);
router.delete('/api/v1/meals/:mealId', mealsController.deleteMeal);

// Menu API Routes
router.get('/api/v1/menu', menuController.allMenu);
router.get('/api/v1/menu/:id', menuController.menuByDay);
router.post('/api/v1/menu', menuController.addToMenu);

// Orders API Routes
router.get('/api/v1/orders', ordersController.allOrders);
router.put('/api/v1/orders/:orderId', ordersController.updateOrder);
router.post('/api/v1/orders', ordersController.addOrder);

module.exports = router;