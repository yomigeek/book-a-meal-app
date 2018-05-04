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
  if (!req.body.dayOfWeek) {
    return res.status(400).send({
      message: 'Please select a day of the week..',
    });
  }
  const myMenu = menu
    .find((mealFinder => mealFinder.mealName === req.body.mealName) && (mealFinder => mealFinder.dayOfWeek === req.body.dayOfWeek));
  if (myMenu) {
    return res.status(409).send({
      message: 'Meal already added for this day menu',
    });
  }
  const menuSingular = ({
    id: menu.length + 1,
    mealName: req.body.mealName,
    dayOfWeek: req.body.dayOfWeek,
    mealPrice: req.body.mealPrice,
    mealId: Math.floor(Math.random() * 200000),
  });
  menu.push(menuSingular);
  return res.send({
    message: 'success',
    menuSingular,
  });
}
