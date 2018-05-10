import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';
import models from '../models';

class CustomerController {
  // Function to sign up new individual customers
  static createCustomer(req, res) {
  // checks if the customer information already exist
    models.users.findOne({
      where: {
        customerEmail: req.body.customerEmail,
        customerRole: 'user',
      },
    })
      .then((data) => {
        if (data) {
          return res.status(409).send({
            message: 'User already exist! Try using another name or email.',
          });
        }
        // Password hashing using bcryptjs
        const hashedPassword = bcrypt.hashSync(req.body.customerPassword, 10);
        // create customer information
        const customerSystemId = Math.floor(Math.random() * 2000000);
        models.users.build({
          id: customerSystemId,
          customerName: req.body.customerName,
          customerEmail: req.body.customerEmail,
          customerPassword: hashedPassword,
          customerRole: 'user',
          customerId: customerSystemId,
        }).save();
        return res.status(201).send({
          message: 'Account has been created successfully!',
          customerName: req.body.customerName,
          customerEmail: req.body.customerEmail,
        });
      })
      .catch(err => res.status(404).send({
        err,
      }));
  }

  // Customer Login function
  static loginCustomer(req, res) {
    // Entered user password hash
    models.users.findOne({
      where: {
        customerEmail: req.body.customerEmail,
        customerRole: 'user',
      },
    })
      .then((data) => {
      console.log(data);
        if (!data) {
          return res.status(404).send({
            message: 'This user not found. Wrong Information!',
          });
        }
        const comparedpassword = bcrypt.compareSync(req.body.customerPassword, data.dataValues.customerPassword);
        if (comparedpassword) {
          const token = jwt.sign(
            {
              myCustomerId: data.dataValues.id,
              myCustomerRole: data.dataValues.customerRole,
            },
            config.secret, {
              expiresIn: '48h',
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
      .catch(err => res.status(400).send({
        err,
      }));
  }
}

export default CustomerController;
