const vendors = ([

  {
    id: 1,
    vendorName: 'semo',
    vendorBusinessName: 'Iya put',
    vendorEmail: 'g@gmail.com',
    vendorId: '3acd',
    vendorPassword: '123456',
  },

]);

export function createVendor(req, res) {
  if (!req.body.vendorName) {
    return res.status(400).send({
      message: 'Please enter a name',
    });
  }
  if (!req.body.vendorBusinessName) {
    return res.status(400).send({
      message: 'Please enter a business name',
    });
  }
  if (!req.body.vendorEmail) {
    return res.status(400).send({
      message: 'Please enter an email',
    });
  }
  if (!req.body.vendorPassword) {
    return res.status(400).send({
      message: 'Please enter a password',
    });
  }
  const myVendor = vendors
    .find((vendorFinder => vendorFinder.vendorName === req.body.vendorName) && (vendorFinder => vendorFinder.vendorBusinessName === req.body.vendorBusinessName));
  if (myVendor) {
    return res.status(409).send({
      message: 'Vendor Already Exist!',
    });
  }
  const vendorSingular = ({
    id: vendors.length + 1,
    vendorName: req.body.vendorName,
    vendorEmail: req.body.vendorEmail,
    vendorBusinessName: req.body.vendorBusinessName,
    vendorPassword: req.body.vendorPassword,
    vendorId: Math.floor(Math.random() * 200000),
  });
  vendors.push(vendorSingular);
  return res.send({
    message: 'success',
    vendorSingular,
  });
}


// Vendor Login function
export function loginVendor(req, res) {
  if (!req.body.vendorEmail) {
    return res.status(400).send({
      message: 'Please enter a name',
    });
  }
  if (!req.body.vendorPassword) {
    return res.status(400).send({
      message: 'Please enter a password',
    });
  }
  const myVendorLogin = vendors
    .find((vendorFinder => vendorFinder.vendorEmail === req.body.vendorEmail) && (vendorFinder => vendorFinder.vendorPassword === req.body.vendorPassword));
  if (myVendorLogin) {
    return res.status(200).send({
      message: 'success',
    });
  }
  return res.status(404).send({
    message: 'vendor does not exist',
  });
}
