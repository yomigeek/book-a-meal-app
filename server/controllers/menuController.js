import db from '../db/myDb';

class MenuController {
  // Static function for checking the menu for the day
  static menuForTheDay(req, res) {
    const currentDate = new Date();
    const formattedTodaysDate = currentDate.toISOString().slice(0, 10);
    db.menu.findAll({
      where: {
        formattedDate: formattedTodaysDate,
      },
      include: [
        {
          model: db.meals,
        },
      ],
    })
      .then((allMenuData) => {
        console.log(allMenuData);
        if (allMenuData.length < 1) {
          return res.send({
            message: 'No Meal exist for today menu. Please check back later.',
          });
        }
        const resObj = allMenuData.map(menuInfo => Object.assign(
          {
            allMenuData,
            mealInfo: menuInfo.meals.map(getMeals => Object.assign(
              {
                getMeals,

              },
            )),
          },
        ));
        res.json(resObj);
        return true;
      });
  }

  // Static function to add meals to the specific day menu
  static addToMenu(req, res) {
    const randomSystemId = Math.random().toString(36).slice(-5);
    db.meals.findAll({
      where: {
        id: req.body.mealId,
      },
    })
      .then((data) => {
        if (data.length <= 0) {
          return res.status(409).send({
            message: 'No Meal with this id exist!',
          });
        } else if (data.length > 0) {
          // create customer information
          db.menu.findOne({
            where: {
              mealId: req.body.mealId,
            },
          }).then((menuData) => {
          // If meal doesn't exist in the menu, add to the specfic day menu
            if (menuData === null) {
              const myDate = new Date();
              const todaysDate = myDate.toISOString().slice(0, 10);
              db.menu.build({
                id: req.body.mealId,
                menuId: randomSystemId,
                mealId: req.body.mealId,
                userId: req.decoded.myCustomerId,
                userCustomerId: req.decoded.myCustomerId,
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
            db.menu.build({
              id: req.body.mealId,
              menuId: randomSystemId,
              mealId: req.body.mealId,
              userId: req.decoded.myCustomerId,
              userCustomerId: req.decoded.myCustomerId,
              formattedDate: todaysDate,
            }).save();

            return res.status(201).send({
              message: 'Meal added to current menu successfully!',
            });
          });
        } return true;
      })
      .catch(err => res.send({
        err,
      }));
  }
}

export default MenuController;
