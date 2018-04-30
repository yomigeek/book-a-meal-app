const meals = ([

  {
    id: 1,
    name: 'semo',
    price: '200',
    photoDir: './meals_photo/111234.jpg',
    mealId: '7cd',
  },
  {
    id: 2,
    name: 'fried rice',
    price: '400',
    photoDir: './meals_photo/3456.jpg',
    mealId: '78v',
  },

]);

export function allMeals(req, res) {
  // res.status(200).send('Ok')
  return res.json({
    meals,
    error: false,
  });
}

export function getMealById(req, res) {
  const meal = meals.find(m => m.mealId === req.params.mealId);
  if (!meal) {
    res.status(404).send('Meal not found!');
    return;
  }
  res.send(meal);
}

export function addAMeal(req, res) {
  if (!req.body.name || req.body.name.length < 3) {
    return res.status(400).send({
      statusCode: '400',
      message: 'Name is required and must be more than 3 characters',
    });
  }
  if (!req.body.price) {
    return res.status(400).send({
      statusCode: '400',
      message: 'Price is required!',
    });
  }
  if (!req.body.photoDir) {
    return res.status(400).send({
      statusCode: '400',
      message: 'Please upload a photo for the meal!',
    });
  }
  const myMeal = meals.find(m => m.name == req.body.name);
  if (myMeal) {
    return res.status(409).send('Meal Already Exist!');
  }
  const meal = ({
    id: meals.length + 1,
    name: req.body.name,
    price: req.body.price,
    photoDir: req.body.photoDir,
    mealId: Math.floor(Math.random() * 200000),
  });
  meals.push(meal);
  return res.send(meal);
}

export function updateAMeal(req, res) {
  const meal = meals.find(m => m.mealId == req.params.mealId);
  if (!meal) {
    return res.status(404).send({
      statusCode: '400',
      message: 'Meal cannot be found!',
    });
  }
  if (!req.body.name || req.body.name.length < 3) {
    return res.status(400).send({
      statusCode: '400',
      message: 'Name is required and cannot be less than 3 characters',
    });
  }
  if (!req.body.price) {
    return res.status(400).send({
      statusCode: '400',
      message: 'Price is required!',
    });
  }
  if (!req.body.photoDir) {
    return res.status(400).send({
      statusCode: '400',
      message: 'Photo is missing!',
    });
  }
  meal.name = req.body.name;
  meal.price = req.body.price;
  meal.photoDir = req.body.photoDir;
  return res.send({

    statusCode: 200,
    message: 'success',
    meal,
  });
}

export function deleteMeal(req, res) {
  const meal = meals.find(m => m.mealId == req.params.mealId);
  if (!meal) {
    return res.status(404).send({
      statusCode: '404',
      message: 'Meal does not exist',
    });
  }
  const mealIndex = meals.indexOf(meal);
  meals.splice(mealIndex, 1);
  return res.send({
    statusCode: '200',
    message: 'Delete successful',
    meal,
  });
}

