const orders = ([

  {
    id: 1,
    mealName: 'semo',
    mealPrice: 350,
    mealId: '7c3',
    buyerName: 'Yomi Olaoye',
    deliveryAddress: 'Lagos, Nigeria.',
    buyerPhone: '08060094070',
    approval: 0,
    date: '2018-05-10 12:00:00',
    orderId: 56,
    quantity: 2,

  },
  {
    id: 2,
    mealName: 'fried chicken',
    mealPrice: 900,
    mealId: '7ck3',
    buyerName: 'Tayo Dipo',
    deliveryAddress: 'Ota, Nigeria.',
    buyerPhone: '08088888890',
    approval: 1,
    date: '2018-05-10 12:00:00',
    orderId: 9088879,
    quantity: 3,

  },

]);

export function allOrders(req, res) {
  // res.status(200).send('Ok')
  return res.json({
    orders,
    error: false,
  });
}

export function updateOrder(req, res) {
  const order = orders.find(mealFinder => mealFinder.orderId === parseInt(req.params.orderId, 10));
  if (!order) {
    return res.status(404).send({
      message: 'Order not found',
    });
  }
  order.quantity = req.body.quantity;
  order.deliveryAddress = req.body.deliveryAddress;
  return res.send({
    message: 'success',
    order,
  });
}

export function addOrder(req, res) {
  if (!req.body.mealId) {
    return res.status(400).send({
      message: 'Please select a meal option to start an order',
    });
  }
  const addOrders = ({
    id: orders.length + 1,
    mealName: req.body.mealName,
    mealPrice: req.body.mealPrice,
    mealId: req.body.mealId,
    buyerName: req.body.buyerName,
    deliveryAddress: req.body.deliveryAddress,
    buyerPhone: req.body.buyerPhone,
    approval: 0,
    date: req.body.date,
    orderId: Math.floor(Math.random() * 200000),
    quantity: req.body.quantity,
  });
  orders.push(addOrder);
  return res.send({
    message: 'success',
    addOrders,
  });
}
