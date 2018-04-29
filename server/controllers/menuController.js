const menu = ([

  {
    id: 1,
    dayOfWeek: 2,
    mealName: 'semo',
    price: 400,
    mealId: '3acd',
  },
  {
    id: 2,
    dayOfWeek: 4,
    mealName: 'fried chicken',
    price: 700,
    mealId: '5racd',
  },

]);


export function allMenu(req, res) {
  // res.status(200).send('Ok')
  return res.json({
    menu,
    error: false,
  });
}

export function menuByDay(req, res) {
  const dayMenu = menu.find(m => m.dayOfWeek === parseInt(req.params.id, 10));
  if (!dayMenu) {
    res.status(404).send({
      statusCode: '404',
      message: 'No Meal exist on this day menu.',
    });
    return;
  }
  res.send({
    statusCode: '200',
    message: 'success',
    dayMenu,
  });
}

export function addToMenu(req, res) {
  if (!req.body.dayOfWeek) {
    res.status(400).send({
      statusCode: 400,
      message: 'Please select a day of the week..',
    });
    return;
  }
  const myMenu = menu
    .find((m => m.mealName === req.body.mealName) && (m => m.dayOfWeek === req.body.dayOfWeek));
  if (myMenu) {
    res.status(409).send({
      statusCode: 409,
      message: 'Meal already added for this day menu',
    });
    return;
  }
  const menuSingular = ({
    id: menu.length + 1,
    mealName: req.body.mealName,
    dayOfWeek: req.body.dayOfWeek,
    price: req.body.price,
    mealId: Math.floor(Math.random() * 200000),
  });
  menu.push(menuSingular);
  res.send({
    statusCode: 200,
    message: 'success',
    menuSingular,
  });
}
