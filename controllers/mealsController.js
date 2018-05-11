import models from '../models';

class MealsController {
  static allMeals(req, res) {
    models.allMeals.findAll({
      where: {
        userId: req.decoded.myCustomerId.toString(),
      },
    }).then((mealList) => {
      if (mealList.length < 1) {
        return res.status(404).send({
          message: 'No Meal found for this user!',
        });
      }
      return res.status(200).send({
        mealList,
      });
    });
  }

  static addAMeal(req, res) {
    models.allMeals.findAll({
      where: {
        userId: req.decoded.myCustomerId.toString(),
        mealName: req.body.mealName,
      },
    })
      .then((data) => {
      console.log(data, data.length);
        if (data.length >= 1) {
          return res.status(409).send({
            message: 'This Meal already exist for this user!',
          });
        }
        // create meal information
        const mealSystemId = Math.floor(Math.random() * 200000);
        models.allMeals.build({
          id: mealSystemId,
          mealName: req.body.mealName,
          mealPrice: req.body.mealPrice,
          mealImage: req.body.mealImage,
          mealId: mealSystemId,
          userId: req.decoded.myCustomerId,
        }).save();
        return res.status(201).send({
          message: 'Meal created successfully!',
          mealName: req.body.mealName,
          mealPrice: req.body.mealPrice,
          mealImage: req.body.mealImage,
          mealId: mealSystemId,
        });
      })
      .catch(err => res.status(400).send({
        err,
      }));
  }


  static getMealById(req, res) {
    models.allMeals.findOne({
      where: {
        userId: req.decoded.myCustomerId.toString(),
        id: req.params.mealId,
      },
    })
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: 'Oops! Meal not found or not available.',
          });
        }
        // Show meal information
        return res.status(200).send({
          message: 'success',
          data,
        });
      })
      .catch(err => res.send({
        err,
      }));
  }

  static updateAMeal(req, res) {
    models.allMeals.findOne({
      where: {
        userId: req.decoded.myCustomerId.toString(),
        id: req.params.mealId.toString(),
      },
    })
      .then((data) => {
      console.log(data, data.length)
        if (data.length <= 0) {
          return res.status(404).send({
            message: 'Oops! Meal not found or not available.',
          });
        }
        models.allMeals.update({
          mealName: req.body.mealName,
          mealPrice: req.body.mealPrice,
          mealImage: req.body.mealImage,
        }, {
          where: {
            id: req.params.mealId,
          },
        }).then(() => res.status(200).send({
          message: 'Meal Update successful',
          newMealInfo: {
            mealName: req.body.mealName,
            mealPrice: req.body.mealPrice,
            mealImage: req.body.mealImage,
          },
        }));
      })
      .catch(err => res.status(400).send({
        err,
      }));
  }

  static deleteMeal(req, res) {
    models.allMeals.findAll({
      where: {
        userId: req.decoded.myCustomerId.toString(),
        id: req.params.mealId,
      },
    })
      .then((data) => {
        if (data.length <= 0) {
          return res.status(404).send({
            message: 'Oops! Meal not found or not available.',
          });
        }
        models.allMeals.destroy({
          where: {
            id: req.params.mealId,
          },
        }).then(() => res.status(200).send({
          message: 'Meal delete successful',
        }));
      })
      .catch(err => res.status(400).send({
        err,
      }));
  }
}

export default MealsController;
