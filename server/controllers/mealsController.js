import db from '../db/myDb';

class MealsController {
  static allMeals(req, res) {
    db.meals.findAll({
      where: {
        userId: req.decoded.myCustomerId,
      },
    }).then((mealList) => {
      if (mealList.length < 1) {
        return res.send({
          message: 'No Meal exist for this user!',
        });
      }
      return res.send({
        mealList,
      });
    });
  }

  static addAMeal(req, res) {
    db.meals.findAll({
      where: {
        userId: req.decoded.myCustomerId,
        mealName: req.body.mealName,
      },
    })
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          return res.status(409).send({
            message: 'Meal already exist for this user!',
          });
        } else if (data.length < 1) {
          // create meal information
          const mealSystemId = Math.floor(Math.random() * 200000);
          db.meals.build({
            id: mealSystemId,
            mealName: req.body.mealName,
            mealPrice: req.body.mealPrice,
            mealImage: req.body.mealImage,
            mealId: mealSystemId,
            userId: req.decoded.myCustomerId,
            userCustomerId: req.decoded.myCustomerId,
          }).save();
          return res.status(201).send({
            message: 'Meal created successfully!',
          });
        }
        return res.send({
          message: 'Taking too long to complete...',
        });
      })
      .catch(err => res.status(404).send({
        err,
      }));
  }


  static getMealById(req, res) {
    db.meals.findAll({
      where: {
        userId: req.decoded.myCustomerId,
        id: req.params.mealId,
      },
    })
      .then((data) => {
        if (data.length <= 0) {
          return res.status(404).send({
            message: 'Oops! Meal not found or not available.',
          });
        } else if (data.length > 0) {
          // Show meal information
          return res.status(201).send({
            data,
          });
        }
        return true;
      })
      .catch(err => res.send({
        err,
      }));
  }

  static updateAMeal(req, res) {
    db.meals.findAll({
      where: {
        userId: req.decoded.myCustomerId,
        id: req.params.mealId,
      },
    })
      .then((data) => {
        if (data.length <= 0) {
          return res.status(404).send({
            message: 'Oops! Meal not found or not available.',
          });
        } else if (data.length >= 1) {
          db.meals.update({
            mealName: req.body.mealName,
            mealPrice: req.body.mealPrice,
            mealImage: req.body.mealImage,
          }, {
            where: {
              id: req.params.mealId,
            },
          }).then(() => res.status(200).send({
            message: 'Meal Update successful',
          }));
        }
        return true;
      })
      .catch(err => res.send({
        err,
      }));
  }

  static deleteMeal(req, res) {
    db.meals.findAll({
      where: {
        userId: req.decoded.myCustomerId,
        id: req.params.mealId,
      },
    })
      .then((data) => {
        if (data.length <= 0) {
          return res.status(404).send({
            message: 'Oops! Meal not found or not available.',
          });
        } else if (data.length >= 1) {
          db.meals.destroy({
            where: {
              id: req.params.mealId,
            },
          }).then(() => res.status(200).send({
            message: 'Meal delete successful',
          }));
        }
        return true;
      })
      .catch(err => res.send({
        err,
      }));
  }
}

export default MealsController;
