import models from '../models';

class OrderController {
  static allOrders(req, res) {
    models.userOrders.findAll({
      where: {
        adminId: req.decoded.myCustomerId,
      },
    }).then((ordersList) => {
      if (ordersList.length < 1) {
        return res.status(404).send({
          message: 'No orders exist for this user!',
        });
      }
      return res.status(200).send({
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
        if (!data) {
          return res.status(404).send({
            message: 'This meal does not exist!',
          });
        } else if (data != null) {
          models.allMeals.findOne({
            where: {
              mealId: req.body.mealId,
            },
          }).then((mealDataForOrder) => {
            // create order information
            const myDate = new Date();
            const todaysDate = myDate.toISOString().slice(0, 10);
            const orderSystemId = Math.floor(Math.random() * 20000);
            models.userOrders.build({
              id: orderSystemId,
              orderId: orderSystemId,
              quantity: req.body.quantity,
              mealId: req.body.mealId,
              adminId: mealDataForOrder.dataValues.userId,
              userId: req.decoded.myCustomerId,
              formattedDate: todaysDate,
            }).save();
            return res.status(201).send({
              message: 'Order has been placed successfully!',
            });
          });
        }
      });
  }

  static updateOrder(req, res) {
    models.userOrders.findOne({
      where: {
        id: req.params.orderId,
      },
    })
      .then((data) => {
        if (data.length <= 0) {
          return res.status(404).send({
            message: 'Oops! Order not found.',
          });
        }
        const myDate = new Date();
        const todaysDate = myDate.getHours();
        const orderDate = data.dataValues.createdAt.getHours();
        const dateDifference = todaysDate - orderDate;
        if (dateDifference > 2) {
          return res.status(400).send({
            message: 'Oops! The duration for modifing the orders has passed.',
          });
        }
        models.userOrders.update({
          quantity: req.body.quantity,

        }, {
          where: {
            id: req.params.orderId,
          },
        }).then(() => res.status(200).send({
          message: 'Order Updated successfully',
        }));
      })
      .catch(err => res.status(400).send({
        err,
      }));
  }
}

export default OrderController;
