class Validate {
  static userLogin(req, res, next) {
    const customerEmail = req.body.customerEmail;
    const customerPassword = req.body.customerPassword;
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!customerEmail) {
      return res.status(400).send({
        message: 'Email field cannot be empty!',
      });
    } else if (!regularExpression.test(customerEmail)) {
      return res.status(400).send({
        message: 'Please enter a valid email',
      });
    } else if (!customerPassword) {
      return res.status(400).send({
        message: 'Password cannot be empty!',
      });
    } next();
    return true;
  }

  static userSignUp(req, res, next) {
    const customerEmail = req.body.customerEmail;
    const customerPassword = req.body.customerPassword;
    const customerName = req.body.customerName;
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!customerEmail) {
      return res.status(400).send({
        message: 'Email field cannot be empty!',
      });
    } else if (!regularExpression.test(customerEmail)) {
      return res.status(400).send({
        message: 'Please enter a valid email',
      });
    } else if (!customerPassword) {
      return res.status(400).send({
        message: 'Password cannot be empty!',
      });
    } else if (!customerName) {
      return res.status(400).send({
        message: 'Name cannot be empty!',
      });
    } else if (customerName.length < 2) {
      return res.status(400).send({
        message: 'Name cannot be less than two characters!',
      });
    } next();
    return true;
  }


  static addMeals(req, res, next) {
    if (!req.body.mealName || req.body.mealName.length < 2) {
      return res.status(400).send({
        message: 'mealName is required and must be more than 2 characters',
      });
    } else if (!req.body.mealPrice) {
      return res.status(400).send({
        message: 'mealPrice is required!',
      });
    } else if (!req.body.mealImage) {
      return res.status(400).send({
        message: 'Please upload a photo for the meal!',
      });
    } next();
    return true;
  }

  static updateMeals(req, res, next) {
    if (!req.body.mealName || req.body.mealName.length < 2) {
      return res.send({
        message: 'Meal Name is required and cannot be less than 2 characters',
      });
    }
    if (!req.body.mealPrice) {
      return res.send({
        message: 'Meal Price is required!',
      });
    }
    if (!req.body.mealImage) {
      return res.status(400).send({
        message: 'Meal Image is missing!',
      });
    } next();
    return true;
  }

  static checkTime(req, res, next) {
    const myDate = new Date(); // for now
    const myHours = myDate.getHours();

    if (myHours > 14) {
      return res.send({
        message: 'Order has closed for the day! Check back tommorrow',
      });
    } next();
    return true;
  }
}

export default Validate;
