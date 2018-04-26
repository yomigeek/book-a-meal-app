const express = require('express');
const router = express.Router();

const meals_controller = require('../controllers/mealsController');
const menu_controller = require ('../controllers/menuController');
const orders_controller = require('../controllers/ordersController');
// Meals API Routes
router.get('/api/v1/meals', meals_controller.allMeals);
router.get('/api/v1/meals/:mealId', meals_controller.getMealById);
router.post('/api/v1/meals/', meals_controller.addAMeal);
router.put('/api/v1/meals/:mealId', meals_controller.updateAMeal);
router.delete('/api/v1/meals/:mealId', meals_controller.deleteMeal);

// Menu API Routes
router.get('/api/v1/menu', menu_controller.allMenu);
router.get('/api/v1/menu/:id', menu_controller.menuByDay);
router.post('/api/v1/menu', menu_controller.addToMenu);

//Orders API Routes
router.get('/api/v1/orders', orders_controller.allOrders);
router.put('/api/v1/orders/:orderId', orders_controller.updateOrder);
router.post('/api/v1/orders', orders_controller.addOrder);

//router.use('/api/v1/meals', require('./meals'));
/*router.use('/api/v1/menu', require('./menu'));
router.use('/api/v1/orders', require('./orders'));*/

module.exports = router;
