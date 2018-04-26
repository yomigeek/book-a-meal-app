const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const servers = require("../").servers;
const request = require("supertest").agent(servers);
chai.use(chaiHttp);

//Test meals API/functions
describe('Meals API Tests', function() {
   after(function (done) {
        servers.close();
        done();
    });

  before(() => console.log("Testing started"));
  after(() => console.log("Testing finished"));

  it('should list ALL on /api/v1/meals GET', function(done) {
    chai.request(server)
        .get('/api/v1/meals')
        .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('meals');
        res.body.error.should.be.false;
        res.body.meals[0].should.have.property('id');
        res.body.meals[0].should.have.property('name');
        res.body.meals[0].should.have.property('price');
        res.body.meals[0].should.have.property('photoDir');
        res.body.meals[0].should.have.property('mealId');

        done();
        });
});

  it('should list a SINGLE meal on /api/v1/meals/id GET' , function(done) {
    chai.request(server)
        .get('/api/v1/meals/'+'78v')
        .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('name');
        res.body.should.have.property('price');
        res.body.should.have.property('photoDir');
        res.body.should.have.property('mealId');
        res.body.mealId.should.equal('78v');

        done();
        });
});


it('should add a SINGLE meal on /api/v1/meals POST' , function(done) {
    chai.request(server)
        .post('/api/v1/meals/')
        .send({'name':'Saucy', 'price':78, 'photoDir':'11234.jpg'})
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('name');
          res.body.should.have.property('price');
          res.body.should.have.property('photoDir');
          res.body.should.have.property('mealId');

        done();
      });
      
      
});

  it('should return status code 400 when name is not passed to a SINGLE meal on /api/v1/meals POST' , function(done) {
    chai.request(server)
        .post('/api/v1/meals/')
        .send({'name':'', 'price':78, 'photoDir':'11234.jpg'})
        .end(function(err, res){
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('statusCode');
          res.body.message.should.be.equal('Name is required and must be more than 3 characters');         

        done();
      });
  });

  it('should return status code 400 when price is not passed to a SINGLE meal on /api/v1/meals POST' , function(done) {
    chai.request(server)
        .post('/api/v1/meals/')
        .send({'name':'Saucy', 'price':'', 'photoDir':'11234.jpg'})
        .end(function(err, res){
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('statusCode');
          res.body.message.should.be.equal('Price is required!');         

        done();
      });
  });

  it('should return status code 400 when photo is not passed to a SINGLE meal on /api/v1/meals POST' , function(done) {
    chai.request(server)
        .post('/api/v1/meals/')
        .send({'name':'Saucy', 'price':78, 'photoDir':''})
        .end(function(err, res){
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('statusCode');
          res.body.message.should.be.equal('Please upload a photo for the meal!');         

        done();
      });
      
      
});

it('should update a SINGLE meal on /api/v1/meals/<id> PUT', function(done) {
    
        chai.request(server)
          .get('/api/v1/meals')
          .end(function(err, res){
            
            chai.request(server)
              .put('/api/v1/meals/'+'78v')
              .send({'name': 'new rice', 'price':899, 'photoDir':'6779.jpg'})
              .end(function(error, response){
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('name');
                response.body.name.should.equal('new rice');

              done();
            });
      });

  });

it('should return status code 400 when name is not passed to a SINGLE meal on /api/v1/meals/mealId PUT' , function(done) {
    chai.request(server)
        .get('/api/v1/meals')
          .end(function(err, res){
                  
            chai.request(server)
              .put('/api/v1/meals/'+'78v')
              .send({'name':'', 'price':78, 'photoDir':'11234.jpg'})
              .end(function(err, response){
                response.should.have.status(400);
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('statusCode');
                response.body.message.should.be.equal('Name is required and cannot be less than 3 characters');         

            done();
      });
  });

});


it('should return status code 400 when price is not passed to a SINGLE meal on /api/v1/meals PUT' , function(done) {
    chai.request(server)
        .get('/api/v1/meals')
          .end(function(err, res){
                  
            chai.request(server)
              .put('/api/v1/meals/'+'78v')
              .send({'name':'pap', 'price':'', 'photoDir':'11234.jpg'})
              .end(function(err, response){
                response.should.have.status(400);
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('statusCode');
                response.body.message.should.be.equal('Price is required!');         

            done();
      });
  });

});



it('should return status code 400 when name is not passed to a SINGLE meal on /api/v1/meals PUT' , function(done) {
    chai.request(server)
        .get('/api/v1/meals')
          .end(function(err, res){
                  
            chai.request(server)
              .put('/api/v1/meals/'+'78v')
              .send({'name':'pap', 'price':78, 'photoDir':''})
              .end(function(err, response){
                response.should.have.status(400);
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('statusCode');
                response.body.message.should.be.equal('Photo is missing!');         

            done();
      });
  });

});


it('should delete a SINGLE meal on /api/v1/meals/id DELETE', function(done){

 chai.request(server)
      .get('/api/v1/meals')
      .end(function(err, res){
        chai.request(server)
          .delete('/api/v1/meals/'+'78v')
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('message');
            response.body.message.should.be.equal('Delete successful');         
            done();
        });
      });

});


it('should return meal does not exist on delete a SINGLE meal on /api/v1/meals/id DELETE', function(done){

 chai.request(server)
      .get('/api/v1/meals')
      .end(function(err, res){
        chai.request(server)
          .delete('/api/v1/meals/'+'u788')
          .end(function(error, response){
            response.should.have.status(404);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('message');
            response.body.message.should.be.equal('Meal does not exist');         
          
          done();
        
        });
      });

});



});


// Test Menu API Functions

describe('Menu API Tests', function() {
   after(function (done) {
        servers.close();
        done();
    });
   before(() => console.log("Testing started"));
  after(() => console.log("Testing finished"));
  
  it('should list ALL on /api/v1/menu GET', function(done) {
    chai.request(server)
        .get('/api/v1/menu')
        .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('menu');
        res.body.error.should.be.false;
        res.body.menu[0].should.have.property('id');
        res.body.menu[0].should.have.property('dayOfWeek');
        res.body.menu[0].should.have.property('mealName');
        res.body.menu[0].should.have.property('price');
        res.body.menu[0].should.have.property('mealId');

        done();
        });
});



it('should list specific day menu on /api/v1/menu/id GET' , function(done) {
    chai.request(server)
        .get('/api/v1/menu/'+2)
        .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.dayMenu.should.have.property('id');
        res.body.dayMenu.should.have.property('dayOfWeek');
        res.body.dayMenu.should.have.property('mealName');
        res.body.dayMenu.should.have.property('price');
        res.body.dayMenu.should.have.property('mealId');
        res.body.message.should.equal('success');

        done();
        });
});

it('should return 404 error if specific day has no menu on /api/v1/menu/id GET' , function(done) {
    chai.request(server)
        .get('/api/v1/menu/'+1)
        .end(function(err, res){
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('message');
        res.body.message.should.equal('No Meal exist on this day menu.');

        done();

    });
});

it('should add a SINGLE meal to the menu on a specific day on /api/v1/menu POST' , function(done) {
    chai.request(server)
        .post('/api/v1/menu/')
        .send({'mealName':'pancake', 'dayOfWeek':7, 'price':2})
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.menuSingular.should.have.property('id');
          res.body.menuSingular.should.have.property('mealName');
          res.body.menuSingular.should.have.property('price');
          res.body.menuSingular.should.have.property('dayOfWeek');
          res.body.message.should.equal('success');


        done();
      });     
});

  
it('should return error 400 if specific day is missing from SINGLE meal parameter to menu on /api/v1/menu POST' , function(done) {
    chai.request(server)
        .post('/api/v1/menu/')
        .send({'mealName':'pancake', 'dayOfWeek':'', 'price':200})
        .end(function(err, res){
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('statusCode');
          res.body.message.should.equal('Please select a day of the week..');


        done();
      });     
});

it('should return error 409 if meal already added to the specific day menu on /api/v1/menu POST' , function(done) {
    chai.request(server)
        .post('/api/v1/menu/')
        .send({'mealName':'semo', 'dayOfWeek':7, 'price':200})
        .end(function(err, res){
          res.should.have.status(409);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('statusCode');
          res.body.message.should.equal('Meal already added for this day menu');


        done();
      });     
});

});

// Tests for Orders API Functions

describe('Orders API Tests', function() {
   after(function (done) {
        servers.close();
        done();
    });
 before(() => console.log("Testing started"));
  after(() => console.log("Testing finished"));
it('should list ALL on /api/v1/orders GET', function(done) {
    chai.request(server)
        .get('/api/v1/orders')
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('orders');
          res.body.error.should.be.false;
          res.body.orders[0].should.have.property('id');
          res.body.orders[0].should.have.property('name');
          res.body.orders[0].should.have.property('price');
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

it('should return status code 200 when order update is successful on /api/v1/orders/orderId PUT' , function(done) {
    chai.request(server)
        .get('/api/v1/orders')
          .end(function(err, res){
                  
            chai.request(server)
              .put('/api/v1/orders/'+56)
              .send({'orderId':56, 'quantity':7,})
              .end(function(err, response){
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('statusCode');
                response.body.message.should.be.equal('success');         

            done();
      });
  });

});

it('should return status code 400 when order does not exist on /api/v1/orders/orderId PUT' , function(done) {
    chai.request(server)
        .get('/api/v1/orders')
          .end(function(err, res){
                  
            chai.request(server)
              .put('/api/v1/orders/'+'78v')
              .send({'orderId':'78v', 'quantity':7,})
              .end(function(err, response){
                response.should.have.status(404);
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('statusCode');
                response.body.message.should.be.equal('Order not found');         

            done();
      });
  });

});

it('should add a SINGLE order on /api/v1/orders POST' , function(done) {
    chai.request(server)
        .post('/api/v1/orders/')
        .send({'name':'Saucy', 'price':78, 'mealId':'11234', 'buyerName':'Yomi Ola', 'deliveryAddress':'Ota', 'buyerPhone':'089000',
        'quantity':6, 'date':'2018-07-9',
            })
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('success');

        done();
      });

});

it('should return status code 400 when an order id is not passed to on /api/v1/orders POST' , function(done) {
    chai.request(server)
        .post('/api/v1/orders/')
        .send({'name':'Saucy', 'price':78, 'mealId':'', 'buyerName':'Yomi Ola', 'deliveryAddress':'Ota', 'buyerPhone':'089000',
        'quantity':6, 'date':'2018-07-9',})
        .end(function(err, res){
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('Please select a meal option to start an order');
          res.body.statusCode.should.equal(400);
         

        done();
      });
});


});
