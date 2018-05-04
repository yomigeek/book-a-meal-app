import jwt from 'jsonwebtoken';
import { LocalStorage } from 'node-localstorage';
import config from '../config';
import models from '../models';

let localStorage;
let customers;

// Model to list out the list of customers
models.userCustomers.findAll().then((listOfCustomers) => {
  customers = listOfCustomers;
  return listOfCustomers;
});


// Function to sign up new individual customers
export function createCustomer(req, res) {

  // check if name field was supplied
  if (!req.body.customerName) {
    return res.status(400).send({
      message: 'Please enter a name',
    });
  }

  // checks id the email field was supplied
  if (!req.body.customerEmail) {
    return res.status(400).send({
      message: 'Please enter an email',
    });
  }

  // checks if the password field was supplied
  if (!req.body.customerPassword) {
    return res.status(400).send({
      message: 'Please enter a password',
    });
  }

  // checks if the customer information already exist
  const mycustomer = customers
    .find((customerFinder => customerFinder.customerName === req.body.customerName) && (customerFinder => customerFinder.customerEmail === req.body.customerEmail));
  if (mycustomer) {
    return res.status(409).send({
      message: 'Customer Already Exist!',
    });
  }

  const customerSingular = models.userCustomers.build({
    id: customers.length + 1,
    customerName: req.body.customerName,
    customerEmail: req.body.customerEmail,
    customerPassword: req.body.customerPassword,
    customerId: Math.floor(Math.random() * 200000),
  });

  // saves the details of the new customer to the database after succssful validations
  customerSingular.save().then(newCustomer => newCustomer);
  return res.status(200).send({
    message: 'success',
    customerSingular,
  });
}


// Customer Login function
export function loginCustomer(req, res) {
  if (!req.body.customerEmail) {
    return res.status(400).send({
      message: 'Please enter an email',
    });
  }
  if (!req.body.customerPassword) {
    return res.status(400).send({
      message: 'Please enter a password',
    });
  }
  const myCustomerLogin = customers
    .find((customerFinder => customerFinder.customerEmail === req.body.customerEmail) && (customerFinder => customerFinder.customerPassword === req.body.customerPassword));

  if (myCustomerLogin) {
    const token = jwt.sign(
      {
        custEmail: req.body.customerEmail,
      },
      config.secret, {
        expiresIn: (24 * 60 * 60),
      },
    );
    if (typeof (localStorage) === 'undefined' || localStorage === null) {
      localStorage = new LocalStorage('./scratch');
    }
    localStorage.setItem('tokenValue', token);
    return res.status(200).send({
      message: 'success',
      tokenValue: localStorage.getItem('tokenValue'),

    });
  }
  return res.status(404).send({
    message: 'customer does not exist',
  });
}
