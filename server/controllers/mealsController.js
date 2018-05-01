const meals = ([

  {
    id: 1,
    mealmealName: 'semo',
    mealmealPrice: '200',
    mealImage: './meals_photo/111234.jpg',
    mealId: '7cd',
  },
  {
    id: 2,
    mealName: 'fried rice',
    mealPrice: '400',
    mealImage: './meals_photo/3456.jpg',
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
  const meal = meals.find(mealFinder => mealFinder.mealId === req.params.mealId);
  if (!meal) {
    res.status(404).send('Meal not found!');
    return;
  }
  res.send(meal);
}

export function addAMeal(req, res) {
  if (!req.body.mealName || req.body.mealName.length < 2) {
    return res.status(400).send({
      message: 'mealName is required and must be more than 2 characters',
    });
  }
  if (!req.body.mealPrice) {
    return res.status(400).send({
      message: 'mealPrice is required!',
    });
  }
  if (!req.body.mealImage) {
    return res.status(400).send({
      message: 'Please upload a photo for the meal!',
    });
  }
  const myMeal = meals.find(m => m.mealName === req.body.mealName);
  if (myMeal) {
    return res.status(409).send('Meal Already Exist!');
  }
  const meal = ({
    id: meals.length + 1,
    mealName: req.body.mealName,
    mealPrice: req.body.mealPrice,
    mealImage: req.body.mealImage,
    mealId: Math.floor(Math.random() * 200000),
  });
  meals.push(meal);
  return res.send(meal);
}

export function updateAMeal(req, res) {
  const meal = meals.find(mealFinder => mealFinder.mealId === req.params.mealId);
  if (!meal) {
    return res.status(404).send({
      message: 'Meal cannot be found!',
    });
  }
  if (!req.body.mealName || req.body.mealName.length < 2) {
    return res.status(400).send({
      message: 'MealName is required and cannot be less than 2 characters',
    });
  }
  if (!req.body.mealPrice) {
    return res.status(400).send({
      message: 'MealPrice is required!',
    });
  }
  if (!req.body.mealImage) {
    return res.status(400).send({
      message: 'Photo is missing!',
    });
  }
  meal.mealName = req.body.mealName;
  meal.mealPrice = req.body.mealPrice;
  meal.mealImage = req.body.mealImage;
  return res.send({
    message: 'success',
    meal,
  });
}

export function deleteMeal(req, res) {
  const meal = meals.find(mealFinder => mealFinder.mealId === req.params.mealId);
  if (!meal) {
    return res.status(404).send({
      message: 'Meal does not exist',
    });
  }
  const mealIndex = meals.indexOf(meal);
  meals.splice(mealIndex, 1);
  return res.send({
    message: 'Delete successful',
    meal,
  });
}
