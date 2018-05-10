const chai = require('chai');

const chaiHttp = require('chai-http');

const server = require('../app').default;

const should = chai.should();

chai.use(chaiHttp);


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
}
