import db from '../db/myDb';
import models from '../models';

export function allOrders(req, res) {
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
  models.allMeals.findAll({
    where: {
      mealId: req.body.mealId,
    },
  })
    .then((data) => {
      console.log(data);
      // create order information
      const orderSystemId = Math.floor(Math.random() * 2000000000);
      db.orders.build({
        id: orderSystemId,
        orderId: orderSystemId,
        quantity: req.body.quantity,
        mealId: req.body.mealId,
        adminId: data.dataValues.userId,
        userId: req.decoded.myCustomerId,
      }).save();
    });
}
