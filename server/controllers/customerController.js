const customers = ([

  {
    id: 1,
    customerName: 'ope',
    customerEmail: 'g@gmail.com',
    customerId: '3acd',
    customerPassword: '123456',
  },


]);

export function createCustomer(req, res) {
  if (!req.body.customerName) {
    return res.status(400).send({
      message: 'Please enter a name',
    });
  }
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
  const mycustomer = customers
    .find((customerFinder => customerFinder.customerName === req.body.customerName) && (customerFinder => customerFinder.customerEmail === req.body.customerEmail));
  if (mycustomer) {
    return res.status(409).send({
      message: 'Customer Already Exist!',
    });
  }
  const customerSingular = ({
    id: customers.length + 1,
    customerName: req.body.customerName,
    customerEmail: req.body.customerEmail,
    customerPassword: req.body.customerPassword,
    customerId: Math.floor(Math.random() * 200000),
  });
  customers.push(customerSingular);
  return res.send({
    message: 'success',
    customerSingular,
  });
}


// Customer Login function
export function loginCustomer(req, res) {
  if (!req.body.customerEmail) {
    return res.status(400).send({
      message: 'Please enter a name',
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
    return res.status(200).send({
      message: 'success',
    });
  }
  return res.status(404).send({
    message: 'customer does not exist',
  });
}
