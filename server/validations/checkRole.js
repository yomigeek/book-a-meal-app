class Checkrole {
  static checkAdmin(req, res, next) {
    const role = req.decoded.myCustomerRole;
    if (!role) {
      return res.send({
        message: 'Unauthorized access',
      });
    } else if (role !== 'admin') {
      return res.status(403).send({
        message: 'Unauthorized access',
      });
    } next();
    return true;
  }
}

export default Checkrole;
