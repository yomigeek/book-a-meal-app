import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';
import models from '../models';
import db from '../db/myDb';


let customersList;

class VendorController {
  static createVendor(req, res) {
  // checks if the customer information already exist
    db.admin.findOne({
      where: {
        customerEmail: req.body.customerEmail,
        customerRole: 'admin',
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

          // create customer information
          const customerSystemId = Math.floor(Math.random() * 2000000);

          models.users.build({
            id: customerSystemId,
            customerName: req.body.customerName,
            customerEmail: req.body.customerEmail,
            customerPassword: hashedPassword,
            customerRole: 'admin',
            customerId: customerSystemId,
          }).save();
          return res.status(201).send({
            message: 'Account has been created successfully!',
          });
        }
      })
      .catch(err => res.status(404).send({
        message: 'Proccess aborted in vendor',
      }));
  }


  // Vendor Login function
  static loginVendor(req, res) {
    // Entered user password hash
    models.users.findOne({
      where: {
        customerEmail: req.body.customerEmail,
        customerRole: 'admin',
      },
    })
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: 'This user not found. Wrong Information!',
          });
        }

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
        err,
      }));
  }
}

export default VendorController;
