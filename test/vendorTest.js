const chai = require('chai');

const chaiHttp = require('chai-http');

const server = require('../app').default;

const should = chai.should();

chai.use(chaiHttp);

// Test meals API/functions in the meal controller
describe('Meals API Tests', () => {
  it('should list ALL on /api/v1/meals GET', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(server)
      .get('/api/v1/meals')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('meals');
        res.body.error.should.be.false;
        res.body.meals[0].should.have.property('id');
        res.body.meals[0].should.have.property('mealName');
        res.body.meals[0].should.have.property('mealPrice');
        res.body.meals[0].should.have.property('mealImage');
        res.body.meals[0].should.have.property('mealId');

        done();
      });
  });

  it('should list a SINGLE meal on /api/v1/meals/id GET', (done) => {
    chai.request(server)
      .get('/api/v1/meals/' + '78v')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('mealName');
        res.body.should.have.property('mealPrice');
        res.body.should.have.property('mealImage');
        res.body.should.have.property('mealId');
        res.body.mealId.should.equal('78v');

        done();
      });
  });


  it('should add a SINGLE meal on /api/v1/meals POST', (done) => {
    chai.request(server)
      .post('/api/v1/meals/')
      .send({ mealName: 'Saucy', mealPrice: 78, mealImage: '11234.jpg' })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('mealName');
        res.body.should.have.property('mealPrice');
        res.body.should.have.property('mealImage');
        res.body.should.have.property('mealId');

        done();
      });
  });

  it('should return status code 400 when name is not passed to a SINGLE meal on /api/v1/meals POST', (done) => {
    chai.request(server)
      .post('/api/v1/meals/')
      .send({ mealName: '', mealPrice: 78, mealImage: '11234.jpg' })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');

        done();
      });
  });

  it('should return status code 400 when price is not passed to a SINGLE meal on /api/v1/meals POST', (done) => {
    chai.request(server)
      .post('/api/v1/meals/')
      .send({ mealName: 'Saucy', mealPrice: '', mealImage: '11234.jpg' })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');

        done();
      });
  });

  it('should return status code 400 when photo is not passed to a SINGLE meal on /api/v1/meals POST', (done) => {
    chai.request(server)
      .post('/api/v1/meals/')
      .send({ mealName: 'Saucy', mealPrice: 78, mealImage: '' })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');

        done();
      });
  });

  it('should update a SINGLE meal on /api/v1/meals/<id> PUT', (done) => {
    chai.request(server)
      .get('/api/v1/meals')
      .end((err, res) => {
        chai.request(server)
          .put('/api/v1/meals/' + '78v')
          .send({ mealName: 'new rice', mealPrice: 899, mealImage: '6779.jpg' })
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.meal.mealName.should.equal('new rice');

            done();
          });
      });
  });

  it('should return status code 400 when name is not passed to a SINGLE meal on /api/v1/meals/mealId PUT', (done) => {
    chai.request(server)
      .get('/api/v1/meals')
      .end((err, res) => {
        chai.request(server)
          .put('/api/v1/meals/' + '78v')
          .send({ mealName: '', mealPrice: 78, mealImage: '11234.jpg' })
          .end((err, response) => {
            response.should.have.status(400);
            response.should.be.json;
            response.body.should.be.a('object');

            done();
          });
      });
  });


  it('should return status code 400 when price is not passed to a SINGLE meal on /api/v1/meals PUT', (done) => {
    chai.request(server)
      .get('/api/v1/meals')
      .end((err, res) => {
        chai.request(server)
          .put('/api/v1/meals/' + '78v')
          .send({ mealName: 'pap', mealPrice: '', mealImage: '11234.jpg' })
          .end((err, response) => {
            response.should.have.status(400);
            response.should.be.json;
            response.body.should.be.a('object');

            done();
          });
      });
  });


  it('should return status code 400 when name is not passed to a SINGLE meal on /api/v1/meals PUT', (done) => {
    chai.request(server)
      .get('/api/v1/meals')
      .end((err, res) => {
        chai.request(server)
          .put('/api/v1/meals/' + '78v')
          .send({ mealName: 'pap', mealPrice: 78, mealImage: '' })
          .end((error, response) => {
            response.should.have.status(400);
            response.should.be.json;
            response.body.should.be.a('object');

            done();
          });
      });
  });


  it('should delete a SINGLE meal on /api/v1/meals/id DELETE', (done) => {
    chai.request(server)
      .get('/api/v1/meals')
      .end((err, res) => {
        chai.request(server)
          .delete('/api/v1/meals/' + '78v')
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('message');
            done();
          });
      });
  });


  it('should return meal does not exist on delete a SINGLE meal on /api/v1/meals/id DELETE', (done) => {
    chai.request(server)
      .get('/api/v1/meals')
      .end((err, res) => {
        chai.request(server)
          .delete('/api/v1/meals/' + 'u788')
          .end((error, response) => {
            response.should.have.status(404);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('message');

            done();
          });
      });
  });
});


// Test Menu API Functions from the menu controller

describe('Menu API Tests', () => {
  it('should list ALL on /api/v1/menu GET', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(server)
      .get('/api/v1/menu')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('menu');
        res.body.error.should.be.false;
        res.body.menu[0].should.have.property('id');
        res.body.menu[0].should.have.property('dayOfWeek');
        res.body.menu[0].should.have.property('mealName');
        res.body.menu[0].should.have.property('mealPrice');
        res.body.menu[0].should.have.property('mealId');

        done();
      });
  });


  it('should list specific day menu on /api/v1/menu/id GET', (done) => {
    chai.request(server)
      .get('/api/v1/menu/' + 2)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.dayMenu.should.have.property('id');
        res.body.dayMenu.should.have.property('dayOfWeek');
        res.body.dayMenu.should.have.property('mealName');
        res.body.dayMenu.should.have.property('mealPrice');
        res.body.dayMenu.should.have.property('mealId');

        done();
      });
  });

  it('should return 404 error if specific day has no menu on /api/v1/menu/id GET', (done) => {
    chai.request(server)
      .get(`/api/v1/menu/${1}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');

        done();
      });
  });

  it('should add a SINGLE meal to the menu on a specific day on /api/v1/menu POST', (done) => {
    chai.request(server)
      .post('/api/v1/menu/')
      .send({ mealName: 'pancake', dayOfWeek: 7, mealPrice: 2 })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.menuSingular.should.have.property('id');
        res.body.menuSingular.should.have.property('mealName');
        res.body.menuSingular.should.have.property('mealPrice');
        res.body.menuSingular.should.have.property('dayOfWeek');


        done();
      });
  });

  it('should return error 400 if specific day is missing from SINGLE meal parameter to menu on /api/v1/menu POST', (done) => {
    chai.request(server)
      .post('/api/v1/menu/')
      .send({ mealmealName: 'pancake', dayOfWeek: '', mealPrice: 200 })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');


        done();
      });
  });

  it('should return error 409 if meal already added to the specific day menu on /api/v1/menu POST', (done) => {
    chai.request(server)
      .post('/api/v1/menu/')
      .send({ mealmealName: 'semo', dayOfWeek: 7, mealPrice: 200 })
      .end((err, res) => {
        res.should.have.status(409);
        res.should.be.json;
        res.body.should.be.a('object');


        done();
      });
  });
});

// Tests for Orders API Functions from the order controller

describe('Orders API Tests', () => {
  it('should list ALL on /api/v1/orders GET', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(server)
      .get('/api/v1/orders')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('orders');
        res.body.error.should.be.false;
        res.body.orders[0].should.have.property('id');
        res.body.orders[0].should.have.property('mealName');
        res.body.orders[0].should.have.property('mealPrice');
        res.body.orders[0].should.have.property('buyerName');
        res.body.orders[0].should.have.property('deliveryAddress');
        res.body.orders[0].should.have.property('buyerPhone');
        res.body.orders[0].should.have.property('approval');
        res.body.orders[0].should.have.property('date');
        res.body.orders[0].should.have.property('orderId');
        res.body.orders[0].should.have.property('quantity');
        res.body.orders[0].should.have.property('mealId');


        done();
      });
  });

  it('should return status code 200 when order update is successful on /api/v1/orders/orderId PUT', (done) => {
    chai.request(server)
      .get('/api/v1/orders')
      .end((err, res) => {
        chai.request(server)
          .put(`/api/v1/orders/ ${56}`)
          .send({ orderId: 56, quantity: 7 })
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');

            done();
          });
      });
  });

  it('should return status code 400 when order does not exist on /api/v1/orders/orderId PUT', (done) => {
    chai.request(server)
      .get('/api/v1/orders')
      .end((err, res) => {
        chai.request(server)
          .put('/api/v1/orders/' + '78v')
          .send({ orderId: '78v', quantity: 7 })
          .end((error, response) => {
            response.should.have.status(404);
            response.should.be.json;
            response.body.should.be.a('object');

            done();
          });
      });
  });

  it('should add a SINGLE order on /api/v1/orders POST', (done) => {
    chai.request(server)
      .post('/api/v1/orders/')
      .send({
        mealName: 'Saucy',
        mealPrice: 78,
        mealId: '11234',
        buyermealName: 'Yomi Ola',
        deliveryAddress: 'Ota',
        buyerPhone: '089000',
        quantity: 6,
        date: '2018-07-9',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');

        done();
      });
  });

  it('should return status code 400 when an order id is not passed to on /api/v1/orders POST', (done) => {
    chai.request(server)
      .post('/api/v1/orders/')
      .send({
        mealName: 'Saucy',
        mealPrice: 78,
        mealId: '',
        buyermealName: 'Yomi Ola',
        deliveryAddress: 'Ota',
        buyerPhone: '089000',
        quantity: 6,
        date: '2018-07-9',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');


        done();
      });
  });
});


// Test Customer API/functions from the customerController
describe('Customer API Test', () => {
  it('should create a customer on /auth/customer/signup POST', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(server)
      .post('/auth/customer/signup')
      .send({
        customerName: 'Yomi',
        customerEmail: 'yoyo@gmail.com',
        customerPassword: '123456',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.customerSingular.should.have.property('id');
        res.body.customerSingular.should.have.property('customerName');
        res.body.customerSingular.should.have.property('customerEmail');
        res.body.customerSingular.should.have.property('customerId');

        done();
      });
  });

  it('should login a customer on /auth/customer/login POST', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(server)
      .post('/auth/customer/login')
      .send({
        customerEmail: 'g@gmail.com',
        customerPassword: '123456',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');

        done();
      });
  });
});

// Test User(Vendor) API from the vendorController

describe('Vendor API Tests', () => {
  it('should create a vendor on /auth/vendor/signup POST', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(server)
      .post('/auth/vendor/signup')
      .send({
        vendorName: 'Yomi',
        vendorEmail: 'yoyo@gmail.com',
        vendorBusinessName: 'Yummy',
        vendorPassword: '123456',

      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.vendorSingular.should.have.property('id');
        res.body.vendorSingular.should.have.property('vendorName');
        res.body.vendorSingular.should.have.property('vendorEmail');
        res.body.vendorSingular.should.have.property('vendorId');

        done();
      });
  });

  it('should login a vendor on /auth/vendor/login POST', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(server)
      .post('/auth/vendor/login')
      .send({
        vendorEmail: 'g@gmail.com',
        vendorPassword: '123456',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');

        done();
      });
  });
});
