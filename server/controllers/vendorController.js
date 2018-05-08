import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';
import models from '../models';

let customersList;

class VendorController {
  static createVendor(req, res) {
  // checks if the customer information already exist
    models.userCustomers.findOne({
      where: {
        customerEmail: req.body.customerEmail,
        customerRole: 'admin',
        customerName: req.body.customerName,
      },
    })
      .then((data) => {
        if (data) {
          return res.status(409).send({
            message: 'User already exist! Try using another name or email.',
          });
        } else if (!data) {
          // Password hashing using bcryptjs
          const hashedPassword = bcrypt.hashSync(req.body.customerPassword, 10);
          // All users
          models.userCustomers.findAll().then((listOfCustomers) => {
            customersList = listOfCustomers;
          });
          // create customer information
          models.userCustomers.build({
            id: customersList.length + 1,
            customerName: req.body.customerName,
            customerEmail: req.body.customerEmail,
            customerPassword: hashedPassword,
            customerRole: 'admin',
            customerId: Math.floor(Math.random() * 2000000000),
          }).save();
          return res.status(201).send({
            message: 'Account has been created successfully!',
          });
        }
        return res.send({
          message: 'Taking too long to complete...',
        });
      })
      .catch(err => res.status(404).send({
        message: 'Proccess aborted',
      }));
  }


  // Vendor Login function
  static loginVendor(req, res) {
    // Entered user password hash
    models.userCustomers.findOne({
      where: {
        customerEmail: req.body.customerEmail,
      },
    })
      .then((data) => {
        const comparedpassword = bcrypt.compareSync(req.body.customerPassword, data.dataValues.customerPassword);

        if (comparedpassword === true) {
          const token = jwt.sign(
            {
              myCustomerId: data.dataValues.id,
              myCustomerRole: data.dataValues.customerRole,
            },
            config.secret, {
              expiresIn: '1hr',
            },
          );
          return res.status(200).send({
            message: 'Login successful',
            token,

          });
        }
        return res.status(403).send({
          message: 'Wrong password!',
        });
      })
      .catch(err => res.status(404).send({
        message: 'Customer does not exist',
      }));
  }
}

export default VendorController;
