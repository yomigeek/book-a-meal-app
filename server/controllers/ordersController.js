import db from '../db/myDb';
import models from '../models';

class OrderController {
  static allOrders(req, res) {
    db.orders.findAll({
      where: {
        adminId: req.decoded.myCustomerId,
      },
    }).then((ordersList) => {
      if (ordersList.length < 1) {
        return res.send({
          message: 'No Meal exist for this user!',
        });
      }
      return res.send({
        ordersList,
      });
    });
  }


  static addOrder(req, res) {
    models.allMeals.findOne({
      where: {
        mealId: req.body.mealId,
      },
    })
      .then((data) => {
        if (data == null) {
          return res.send({
            message: 'This meal does not exist!',
          });
        } else if (data != null) {
          const myDate = new Date();
          const todaysDate = myDate.toISOString().slice(0, 10);
          db.orders.findAll({
            where: {
              mealId: req.body.mealId,
              formattedDate: todaysDate,
            },
          }).then((newData) => {
            if (newData.length > 0) {
              return res.send({
                message: 'You have already ordered this meal today! Preferaably, edit the order in the cart.',
              });
            }

            models.allMeals.findOne({
              where: {
                mealId: req.body.mealId,
              },
            }).then((mealDataForOrder) => {
            // create order information
              const orderSystemId = Math.floor(Math.random() * 20000);
              db.orders.build({
                id: orderSystemId,
                orderId: orderSystemId,
                quantity: req.body.quantity,
                mealId: req.body.mealId,
                adminId: mealDataForOrder.dataValues.userId,
                userId: req.decoded.myCustomerId,
                formattedDate: todaysDate,
              }).save();
              return res.send({
                message: 'Order has been placed successfully!',
              });
            });
            return true;
          });
        }
        return true;
      });
  }

  static updateOrder(req, res) {
    db.orders.findAll({
      where: {
        id: req.params.orderId,
      },
    })
      .then((data) => {
        if (data.length <= 0) {
          return res.status(404).send({
            message: 'Oops! Order not found.',
          });
        } else if (data.length >= 1) {
          db.orders.update({
            quantity: req.body.quantity,

          }, {
            where: {
              id: req.params.orderId,
            },
          }).then(() => res.status(200).send({
            message: 'Order Updated successfully',
          }));
        }
        return true;
      })
      .catch(err => res.send({
        err,
      }));
  }
}

export default OrderController;
