import db from '../db/myDb';

const menu = ([

  {
    id: 1,
    dayOfWeek: 2,
    mealName: 'semo',
    mealPrice: 400,
    mealId: '3acd',
  },
  {
    id: 2,
    dayOfWeek: 4,
    mealName: 'fried chicken',
    mealPrice: 700,
    mealId: '5racd',
  },

]);


export function allMenu(req, res) {
  return res.json({
    menu,
    error: false,
  });
}

export function menuForTheDay(req, res) {
  const dayMenu = menu.find(mealFinder => mealFinder.dayOfWeek === parseInt(req.params.id, 10));
  if (!dayMenu) {
    return res.status(404).send({
      message: 'No Meal exist on this day menu.',
    });
  }
  return res.send({
    message: 'success',
    dayMenu,
  });
}

export function addToMenu(req, res) {
  const randomSystemId = Math.random().toString(36).slice(-5);
  db.meals.findAll({
    where: {
      id: req.body.mealId,
    },
  })
    .then((data) => {
      console.log(data);
      if (data.length <= 0) {
        return res.status(409).send({
          message: 'No Meal with this id exist!',
        });
      } else if (data.length > 0) {
      // create customer information
        db.menu.build({
          menuId: randomSystemId,
          mealId: req.body.mealId,
          userId: req.decoded.myCustomerId,
          userCustomerId: req.decoded.myCustomerId,
        }).save();
      }
      return res.status(201).send({
        message: 'Meal Added successfully!',
      });
    })
    .catch(res.send({
      message: 'catch message!',
    }));
}
