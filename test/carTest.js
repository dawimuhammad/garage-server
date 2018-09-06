const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const urlCar = 'http://localhost:3000/cars'

chai.use(chaiHttp)

let createdCarId = ''

describe('Car Controller Test', function() {
    describe('Find all Cars', function () {
        it('should return all cars data', function(done) {
            chai.request(urlCar)
            .get('/find/all')
            .end( function(err, result) {
                result.should.have.status(200)
                result.body.should.have.own.property('data')
                result.body.data.should.be.an('array')
                done()
            })
        })
    })

    describe('Find Cars by it\'s model name (tested with valid name)', function(done) {
        it('should return a car with provided model name', function(done) {
            chai.request(urlCar)
            .get('/find')
            .send({ keyword: 'Cam' })
            .end( function(err, result) {
                result.should.have.status(200)
                result.body.should.have.own.property('data')
                result.body.data.should.be.an('array')
                result.body.data.should.have.length(1)
                result.body.data[0].should.have.own.property('_id')
                result.body.data[0].should.have.own.property('brand')
                result.body.data[0].should.have.own.property('model')
                result.body.data[0].should.have.own.property('year')
                result.body.data[0].should.have.own.property('createdAt')
                result.body.data[0].should.have.own.property('updatedAt')
                done()
            })
        })
    })

    describe('Find Cars by it\'s model name (tested with invalid name)', function(done) {
        it('should return a message that explain no car data available with it\'s keyword', function(done) {
            chai.request(urlCar)
            .get('/find')
            .send({ keyword: 'cam' })
            .end( function(err, result) {
                result.should.have.status(200)
                result.body.message.should.equal('No car data available for the keyword')
                done()
            })
        })
    })

    describe('Find Cars by it\'s ID (tested with valid ID', function () {
        it('should return a car with provided ID', function (done) {
            chai.request(urlCar)
            .get('/find/5b90da0aedddb9141dda803e')
            .end( function(err, result) {
                result.should.have.status(200)
                result.body.should.have.own.property('data')
                result.body.data.should.be.an('Object')
                result.body.data.should.have.own.property('_id')
                result.body.data.should.have.own.property('brand')
                result.body.data.should.have.own.property('model')
                result.body.data.should.have.own.property('year')
                result.body.data.should.have.own.property('createdAt')
                result.body.data.should.have.own.property('updatedAt')
                done()
            })
        })
    })
    
    describe('Find Cars by it\'s ID (tested with invalid ID)', function(done) {
        it('should return a message that explain no car data available with it\'s ID', function(done) {
            chai.request(urlCar)
            .get('/find/5b90da0aedddb9141dda803f')
            .end( function(err, result) {
                result.should.have.status(204)
                done()
            })
        })
    })

    // create Car
    describe('Create Car', function() {
        it('should failed created a car because no brand value provided', function(done) {
            chai.request(urlCar)
            .post('/')
            .send({
                model: 'Fortuner',
                year: 2018,
                color: 'test-color-value',
                mileage: 200,
                engine: '170',
                power: 175,
                price: 100000000,
                image_url: 'test-image-url-value'
            })
            .end( function(err, result) {
                result.should.have.status(500)
                done()
            })
        })

        it('should return status 200', function(done) {
            chai.request(urlCar)
            .post('/')
            .send({
                brand: 'Toyota',
                model: 'Fortuner',
                year: 2018,
                color: 'test-color-value',
                mileage: 200,
                engine: '170',
                power: 175,
                price: 100000000,
                image_url: 'test-image-url-value'
            })
            .end( function(err, result) {
                // console.log(result.body.createdCar)
                createdCarId = result.body.createdCar._id
                result.should.have.status(200)
                result.body.should.have.own.property('createdCar')
                result.body.createdCar.should.be.an('Object')
                result.body.createdCar.should.have.own.property('_id')
                result.body.createdCar.should.have.own.property('brand')
                result.body.createdCar.should.have.own.property('model')
                result.body.createdCar.should.have.own.property('year')
                result.body.createdCar.should.have.own.property('createdAt')
                result.body.createdCar.should.have.own.property('updatedAt')
                done()
            })
        })
    })

    describe('Delete Car', function() {
        it('Should deleted a car with valid ID', function(done) {
            chai.request(urlCar)
            .delete(`/${createdCarId}`)
            .end( function(err, result) {
                result.should.have.status(200)
                done()
            })
        })
    })
})