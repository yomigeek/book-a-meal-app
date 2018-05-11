import models from '../models';

class MenuController {
  // Static function for getting the menu for the day
  static menuForTheDay(req, res) {
    const currentDate = new Date();
    const formattedTodaysDate = currentDate.toISOString().slice(0, 10);
    models.userMenus.findAll({
      where: {
        formattedDate: formattedTodaysDate,
      },
    })
      .then((allMenuData) => {
      console.log(allMenuData);
        if (allMenuData.length <= 0) {
          return res.status(404).send({
            message: 'No Meal exist in today menu!',
          });
        }
        models.allMeals.findOne({
          where: {
            mealId: allMenuData.dataValues.mealId,
          },
        }).then((mealsData) => {
          const finalData = {
            menuId: allMenuData.dataValues.menuId,
            mealsData,

          };
          return res.status(200).send({
            message: 'success',
            finalData,
          });
        });
      });
  }

  // Static function to add meals to the specific day menu
  static addToMenu(req, res) {
    const randomSystemId = Math.random().toString(36).slice(-5);
    models.allMeals.findAll({
      where: {
        id: req.body.mealId.toString(),
      },
    })
      .then((data) => {
        if (data.length <= 0) {
          return res.status(409).send({
            message: 'No Meal with this id exist!',
          });
        }
      
        models.userMenus.findOne({
          where: {
            mealId: req.body.mealId.toString(),
          },
        }).then((menuData) => {
          // If meal doesn't exist in the menu, add to the specfic day menu
          if (!menuData) {
            const myDate = new Date();
            const todaysDate = myDate.toISOString().slice(0, 10);
            models.userMenus.build({
              id: req.body.mealId,
              menuId: randomSystemId,
              mealId: req.body.mealId,
              userId: req.decoded.myCustomerId,
              formattedDate: todaysDate,
            }).save();

            return res.status(201).send({
              message: 'Meal added to current menu successfully!',

            });
          }
          /* If meal exist in the menu, check if meal has been added to the
          specific day menu via comparing date */

          const createdDate = menuData.dataValues.createdAt;
          const formattedDate = createdDate.toISOString().slice(0, 10);
          const myDate = new Date();
          const todaysDate = myDate.toISOString().slice(0, 10);
          if (formattedDate == todaysDate) {
            return res.status(409).send({
              message: 'Meal Already added to todays menu!',
            });
          }
          models.userMenus.build({
            id: req.body.mealId,
            menuId: randomSystemId,
            mealId: req.body.mealId,
            userId: req.decoded.myCustomerId,
            formattedDate: todaysDate,
          }).save();

          return res.status(200).send({
            message: 'Meal added to current menu successfully!',
          });
        });
      })
      .catch(err => res.status(400).send({
        err,
      }));
  }
}

export default MenuController;
