import { Router } from 'express';
import { allMeals, getMealById, addAMeal, updateAMeal, deleteMeal } from '../controllers/mealsController';
import { allMenu, menuForTheDay, addToMenu } from '../controllers/menuController';
import { allOrders, updateOrder, addOrder } from '../controllers/ordersController';
import { createVendor, loginVendor } from '../controllers/vendorController';
import { createCustomer, loginCustomer } from '../controllers/customerController';

const router = Router();

let tokenValue = '';
if (typeof (localStorage) === 'undefined') {
  tokenValue = 'sss';
} else {
  tokenValue = localStorage.token;
}

router.use((req, res, next) => {
  // inject default headers
  res.header('x-access-token', tokenValue);

  next();
});

// Meals API Routes
router.get('/api/v1/meals', allMeals);
router.get('/api/v1/meals/:mealId', getMealById);
router.post('/api/v1/meals/', addAMeal);
router.put('/api/v1/meals/:mealId', updateAMeal);
router.delete('/api/v1/meals/:mealId', deleteMeal);

// Menu API Routes
router.get('/api/v1/menu', allMenu);
router.get('/api/v1/menu/:id', menuForTheDay);
router.post('/api/v1/menu', addToMenu);

// Orders API Routes
router.get('/api/v1/orders', allOrders);
router.put('/api/v1/orders/:orderId', updateOrder);
router.post('/api/v1/orders', addOrder);

// User(Vendor) API
router.post('/auth/vendor/signup', createVendor);
router.post('/auth/vendor/login', loginVendor);


// User(Customer) API
router.post('/auth/customer/signup', createCustomer);
router.post('/auth/customer/login', loginCustomer);


export default router;
