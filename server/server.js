import 'babel-core/register';
import express from 'express';
import { json } from 'body-parser';
import jwt from 'jsonwebtoken';
import config from './config';

const models = require('./models');

/* const myTask = models.userCustomers.build({
  id: 2,
  customerName: 'yomi',
  customerEmail: 'seayomi@gmail.com',
  customerId: '100',
  customerPassword: '123456',
});

myTask.save().then((newTask) => {
  console.log(newTask);
}); */

/* let m = {};
const a = models.allMeals.findAll().then((listOfMeals) => {
  // console.log(listOfMeals);
  m = listOfMeals;
 console.log(m);
});
console.log(m); */


// console.log(meals);

const router = express.Router();

const app = express();
const port = process.env.PORT || 5000;

app.use(json());

app.use('/api', require('./auth').verifyToken);

app.use('/api/v1/meals/', require('./auth').verifyToken);

app.use(require('./routes/index').default);

app.get('/api/', (req, res) => {
  res.json({
    message: 'api',
  });
});

app.listen(port, () => { console.log('server started'); });

export default app;
