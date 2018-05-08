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
  }
}

export default Validate;
